/**
 * Admin Service Functions
 * Handles admin-specific operations like student management, analytics, and progress tracking
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  deleteDoc,
  Timestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';

export interface ModuleProgressData {
  completed: boolean;
  progress: number;
  lastAccessed: Date;
  timeSpent: number; // in minutes
  score?: number;
}

export interface StudentProgress {
  userId: string;
  userEmail: string;
  displayName: string;
  totalProgress: number;
  modulesCompleted: number;
  currentModule: string | null;
  lastActive: Date;
  joinedDate: Date;
  status: 'active' | 'inactive' | 'completed';
  moduleProgress: {
    [moduleId: string]: ModuleProgressData;
  };
  questionsAsked: number;
  avgScore: number;
}

export interface PlatformAnalytics {
  totalUsers: number;
  activeUsers: number;
  dailySessions: number;
  avgSessionDuration: number;
  moduleCompletionRates: { [moduleId: string]: number };
  questionCategories: { [category: string]: number };
  deviceBreakdown: { desktop: number; mobile: number; tablet: number };
  retentionRates: {
    weekly: number;
    monthly: number;
  };
}

/**
 * Get all students with their progress data
 */
export async function getAllStudents(): Promise<StudentProgress[]> {
  try {
    const usersQuery = query(
      collection(db, 'users'),
      orderBy('lastActive', 'desc')
    );

    const usersSnapshot = await getDocs(usersQuery);
    const students: StudentProgress[] = [];

    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();

      // Get user progress data
      const progressDoc = await getDoc(doc(db, 'user_progress', userDoc.id));
      const progressData = progressDoc.exists() ? progressDoc.data() : {};

      // Get user questions count
      const questionsQuery = query(
        collection(db, 'questions'),
        where('userId', '==', userDoc.id)
      );
      const questionsSnapshot = await getDocs(questionsQuery);

      // Calculate overall progress and status
      const moduleProgress = (progressData.modules as Record<string, ModuleProgressData>) || {};
      const completedModules = Object.values(moduleProgress).filter(
        (module: ModuleProgressData) => module.completed
      ).length;

      const totalProgress = calculateTotalProgress(moduleProgress);
      const avgScore = calculateAverageScore(moduleProgress);
      const status = determineUserStatus(userData.lastActive?.toDate(), totalProgress);

      students.push({
        userId: userDoc.id,
        userEmail: userData.email || '',
        displayName: userData.displayName || 'Unknown User',
        totalProgress,
        modulesCompleted: completedModules,
        currentModule: getCurrentModule(moduleProgress),
        lastActive: userData.lastActive?.toDate() || new Date(),
        joinedDate: userData.createdAt?.toDate() || new Date(),
        status,
        moduleProgress,
        questionsAsked: questionsSnapshot.size,
        avgScore
      });
    }

    return students;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw new Error('Failed to fetch student data');
  }
}

/**
 * Get detailed progress for a specific student
 */
export async function getStudentDetails(userId: string): Promise<StudentProgress | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) {
      return null;
    }

    const userData = userDoc.data();
    const progressDoc = await getDoc(doc(db, 'user_progress', userId));
    const progressData = progressDoc.exists() ? progressDoc.data() : {};

    const questionsQuery = query(
      collection(db, 'questions'),
      where('userId', '==', userId)
    );
    const questionsSnapshot = await getDocs(questionsQuery);

    const moduleProgress = (progressData.modules as Record<string, ModuleProgressData>) || {};
    const completedModules = Object.values(moduleProgress).filter(
      (module: ModuleProgressData) => module.completed
    ).length;

    return {
      userId,
      userEmail: userData.email || '',
      displayName: userData.displayName || 'Unknown User',
      totalProgress: calculateTotalProgress(moduleProgress),
      modulesCompleted: completedModules,
      currentModule: getCurrentModule(moduleProgress),
      lastActive: userData.lastActive?.toDate() || new Date(),
      joinedDate: userData.createdAt?.toDate() || new Date(),
      status: determineUserStatus(userData.lastActive?.toDate(), calculateTotalProgress(moduleProgress)),
      moduleProgress,
      questionsAsked: questionsSnapshot.size,
      avgScore: calculateAverageScore(moduleProgress)
    };
  } catch (error) {
    console.error('Error fetching student details:', error);
    throw new Error('Failed to fetch student details');
  }
}

/**
 * Get platform analytics data
 */
export async function getPlatformAnalytics(): Promise<PlatformAnalytics> {
  try {
    // Get total users
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const totalUsers = usersSnapshot.size;

    // Get active users (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const activeUsersQuery = query(
      collection(db, 'users'),
      where('lastActive', '>=', Timestamp.fromDate(weekAgo))
    );
    const activeUsersSnapshot = await getDocs(activeUsersQuery);
    const activeUsers = activeUsersSnapshot.size;

    // Get today's sessions
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sessionsQuery = query(
      collection(db, 'user_sessions'),
      where('startTime', '>=', Timestamp.fromDate(today))
    );
    const sessionsSnapshot = await getDocs(sessionsQuery);
    const dailySessions = sessionsSnapshot.size;

    // Calculate average session duration
    let totalDuration = 0;
    sessionsSnapshot.docs.forEach(doc => {
      const session = doc.data();
      if (session.duration) {
        totalDuration += session.duration;
      }
    });
    const avgSessionDuration = sessionsSnapshot.size > 0 ? totalDuration / sessionsSnapshot.size : 0;

    // Get module completion rates
    const moduleCompletionRates = await calculateModuleCompletionRates();

    // Get question categories
    const questionCategories = await getQuestionCategories();

    // Mock device breakdown (would be collected from user agents in real implementation)
    const deviceBreakdown = {
      desktop: 68,
      mobile: 28,
      tablet: 4
    };

    // Calculate retention rates
    const retentionRates = await calculateRetentionRates();

    return {
      totalUsers,
      activeUsers,
      dailySessions,
      avgSessionDuration,
      moduleCompletionRates,
      questionCategories,
      deviceBreakdown,
      retentionRates
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw new Error('Failed to fetch analytics data');
  }
}

/**
 * Update student status (admin action)
 */
export async function updateStudentStatus(
  userId: string,
  updates: {
    status?: 'active' | 'inactive' | 'completed';
    notes?: string;
  }
): Promise<void> {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating student status:', error);
    throw new Error('Failed to update student status');
  }
}

/**
 * Delete student account (admin action)
 */
export async function deleteStudent(userId: string): Promise<void> {
  try {
    // Delete user document
    await deleteDoc(doc(db, 'users', userId));

    // Delete user progress
    await deleteDoc(doc(db, 'user_progress', userId));

    // Delete user questions
    const questionsQuery = query(
      collection(db, 'questions'),
      where('userId', '==', userId)
    );
    const questionsSnapshot = await getDocs(questionsQuery);

    const deletePromises = questionsSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting student:', error);
    throw new Error('Failed to delete student account');
  }
}

/**
 * Get real-time student activity updates
 */
export function subscribeToStudentActivity(
  callback: (students: StudentProgress[]) => void
): () => void {
  const unsubscribe = onSnapshot(
    query(collection(db, 'users'), orderBy('lastActive', 'desc'), limit(20)),
    async (snapshot) => {
      const students: StudentProgress[] = [];

      for (const userDoc of snapshot.docs) {
        const userData = userDoc.data();
        const progressDoc = await getDoc(doc(db, 'user_progress', userDoc.id));
        const progressData = progressDoc.exists() ? progressDoc.data() : {};

        const moduleProgress = (progressData.modules as Record<string, ModuleProgressData>) || {};
        students.push({
          userId: userDoc.id,
          userEmail: userData.email || '',
          displayName: userData.displayName || 'Unknown User',
          totalProgress: calculateTotalProgress(moduleProgress),
          modulesCompleted: Object.values(moduleProgress).filter((m: ModuleProgressData) => m.completed).length,
          currentModule: getCurrentModule(moduleProgress),
          lastActive: userData.lastActive?.toDate() || new Date(),
          joinedDate: userData.createdAt?.toDate() || new Date(),
          status: determineUserStatus(userData.lastActive?.toDate(), calculateTotalProgress(moduleProgress)),
          moduleProgress,
          questionsAsked: 0, // Would need separate query
          avgScore: calculateAverageScore(moduleProgress)
        });
      }

      callback(students);
    },
    (error) => {
      console.error('Error in student activity subscription:', error);
    }
  );

  return unsubscribe;
}

// Helper functions

function calculateTotalProgress(moduleProgress: Record<string, ModuleProgressData>): number {
  if (Object.keys(moduleProgress).length === 0) return 0;

  const totalProgress = Object.values(moduleProgress).reduce(
    (sum: number, module: ModuleProgressData) => sum + (module.progress || 0),
    0
  );

  return Math.round(totalProgress / Object.keys(moduleProgress).length);
}

function calculateAverageScore(moduleProgress: Record<string, ModuleProgressData>): number {
  const scores = Object.values(moduleProgress)
    .map((module: ModuleProgressData) => module.score)
    .filter((score): score is number => typeof score === 'number');

  if (scores.length === 0) return 0;

  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}

function getCurrentModule(moduleProgress: Record<string, ModuleProgressData>): string | null {
  // Find the first incomplete module
  for (const [moduleId, module] of Object.entries(moduleProgress)) {
    if (!module.completed) {
      return moduleId;
    }
  }
  return null; // All modules completed
}

function determineUserStatus(lastActive: Date, totalProgress: number): 'active' | 'inactive' | 'completed' {
  if (totalProgress >= 100) return 'completed';

  const daysSinceActive = (Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceActive > 7 ? 'inactive' : 'active';
}

async function calculateModuleCompletionRates(): Promise<{ [moduleId: string]: number }> {
  // This would query user_progress collection and calculate completion rates per module
  // Mock data for now
  return {
    'module1': 85.9,
    'module2': 79.5,
    'module3': 72.8,
    'module4': 68.3,
    'module5': 71.2
  };
}

async function getQuestionCategories(): Promise<{ [category: string]: number }> {
  try {
    const questionsSnapshot = await getDocs(collection(db, 'questions'));
    const categories: { [category: string]: number } = {};

    questionsSnapshot.docs.forEach(doc => {
      const question = doc.data();
      const category = question.category || 'General';
      categories[category] = (categories[category] || 0) + 1;
    });

    return categories;
  } catch (error) {
    console.error('Error getting question categories:', error);
    return {};
  }
}

async function calculateRetentionRates(): Promise<{ weekly: number; monthly: number }> {
  // This would calculate actual retention rates from user activity data
  // Mock data for now
  return {
    weekly: 78.5,
    monthly: 65.2
  };
}