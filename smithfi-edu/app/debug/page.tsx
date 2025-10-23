/**
 * Debug Page - Test Firebase Connection
 */

'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, AuthError } from 'firebase/auth';

export default function DebugPage() {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testFirebaseConnection = async () => {
    setLoading(true);
    setResults([]);

    try {
      addResult("🔄 Testing Firebase connection...");

      // Test 1: Try to read users collection
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        addResult(`✅ Users collection accessible. Found ${usersSnapshot.size} users`);

        if (usersSnapshot.size > 0) {
          usersSnapshot.docs.forEach((doc, index) => {
            const data = doc.data();
            addResult(`   User ${index + 1}: ${data.email || 'No email'} (${data.displayName || 'No name'})`);
          });
        }
      } catch (error) {
        addResult(`❌ Error reading users collection: ${error}`);
      }

      // Test 2: Try to read user_progress collection
      try {
        const progressSnapshot = await getDocs(collection(db, 'user_progress'));
        addResult(`✅ User progress collection accessible. Found ${progressSnapshot.size} progress records`);
      } catch (error) {
        addResult(`❌ Error reading user_progress collection: ${error}`);
      }

      // Test 3: Try to read questions collection
      try {
        const questionsSnapshot = await getDocs(collection(db, 'questions'));
        addResult(`✅ Questions collection accessible. Found ${questionsSnapshot.size} questions`);
      } catch (error) {
        addResult(`❌ Error reading questions collection: ${error}`);
      }

      // Test 4: Try to write a test document
      try {
        const testDoc = doc(db, 'debug_test', 'connection_test');
        await setDoc(testDoc, {
          message: 'Firebase connection test',
          timestamp: Timestamp.now(),
          success: true
        });
        addResult("✅ Write test successful - Firebase is connected and writable");
      } catch (error) {
        addResult(`❌ Write test failed: ${error}`);
      }

    } catch (error) {
      addResult(`❌ General Firebase error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const createTestUser = async () => {
    try {
      addResult("🔄 Creating test user...");

      const testUserId = 'test-user-' + Date.now();
      const userDoc = doc(db, 'users', testUserId);

      await setDoc(userDoc, {
        email: 'test@smith.edu',
        displayName: 'Test User',
        emailVerified: true,
        createdAt: Timestamp.now(),
        lastActive: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

      // Create progress record
      const progressDoc = doc(db, 'user_progress', testUserId);
      await setDoc(progressDoc, {
        userId: testUserId,
        totalProgress: 25,
        completedModules: [],
        currentModule: 'Module 2: Banking',
        avgScore: 0,
        updatedAt: Timestamp.now()
      });

      addResult("✅ Test user created successfully!");

      // Re-test to see if it shows up
      setTimeout(testFirebaseConnection, 1000);

    } catch (error) {
      addResult(`❌ Error creating test user: ${error}`);
    }
  };

  const createAdminUser = async () => {
    try {
      addResult("🔄 Creating admin user...");

      const adminEmail = 'admin@fundyourfuture.edu';
      const adminPassword = 'Admin123!';

      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
      const user = userCredential.user;

      // Update profile
      await updateProfile(user, {
        displayName: 'Fund Your Future Admin'
      });

      // Create user document in Firestore
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, {
        email: adminEmail,
        displayName: 'Fund Your Future Admin',
        emailVerified: true,
        role: 'admin',
        createdAt: Timestamp.now(),
        lastActive: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

      addResult("✅ Admin user created successfully!");
      addResult(`📧 Admin Email: ${adminEmail}`);
      addResult(`🔑 Admin Password: ${adminPassword}`);
      addResult("🔗 You can now log in at /admin/login");

    } catch (error: unknown) {
      const authError = error as AuthError;
      if (authError.code === 'auth/email-already-in-use') {
        addResult("✅ Admin user already exists!");
        addResult("🔗 You can log in at /admin/login");
      } else {
        addResult(`❌ Error creating admin user: ${authError.message}`);
      }
    }
  };

  useEffect(() => {
    // Wait for authentication first
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setAuthLoading(false);
      if (user) {
        addResult(`✅ Authenticated as: ${user.email}`);
        testFirebaseConnection();
      } else {
        addResult('❌ Not authenticated');
      }
    });

    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔄</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Firebase Debug Page</h1>

        {!isAuthenticated && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-red-800 mb-2">⚠️ Not Authenticated</h3>
            <p className="text-red-700">You need to log in first to test Firebase permissions.</p>
            <a href="/login" className="inline-block mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Go to Login
            </a>
          </div>
        )}

        <div className="bg-white rounded-lg p-6 shadow mb-6">
          <div className="flex gap-4 mb-4">
            <button
              onClick={testFirebaseConnection}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Firebase Connection'}
            </button>

            <button
              onClick={createTestUser}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Create Test User
            </button>

            <button
              onClick={createAdminUser}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Create Admin User
            </button>
          </div>

          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
            {results.length === 0 ? (
              <div className="text-gray-500">No results yet...</div>
            ) : (
              results.map((result, index) => (
                <div key={index} className="mb-1">
                  {result}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Firebase Configuration</h3>
          <div className="text-sm text-yellow-700 font-mono">
            <div>Project ID: seven-3efe8</div>
            <div>Auth Domain: seven-3efe8.firebaseapp.com</div>
            <div>Database URL: (Firestore)</div>
          </div>
        </div>
      </div>
    </div>
  );
}