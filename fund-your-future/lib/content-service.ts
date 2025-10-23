/**
 * Content Management Service
 * Handles CRUD operations for admin-managed content
 */

import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { 
  ContentElement, 
  PageContent, 
  ModuleOverview, 
  UnitOverview, 
  PageOverview,
  RecentChange,
  MigrationResult
} from './content-types';

export class ContentService {
  // Get page content for admin editing
  static async getPageContent(
    moduleId: string,
    unitId: string,
    pageId: string
  ): Promise<PageContent | null> {
    try {
      const docId = `${moduleId}-${unitId}-${pageId}`;
      console.log('📖 Getting page content for:', { moduleId, unitId, pageId, docId });
      const docRef = doc(db, 'content', docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as PageContent;
      }

      // Return null if no admin override exists
      return null;
    } catch (error) {
      console.error('Error getting page content:', error);
      return null;
    }
  }

  // Save admin content changes
  static async savePageContent(
    moduleId: string,
    unitId: string,
    pageId: string,
    elements: ContentElement[],
    adminId: string
  ): Promise<boolean> {
    try {
      const docRef = doc(db, 'content', `${moduleId}-${unitId}-${pageId}`);
      
      const pageContent: PageContent = {
        elements,
        metadata: {
          title: ContentService.getPageTitle(moduleId, unitId, pageId),
          version: await ContentService.getNextVersion(moduleId, unitId, pageId),
          migrated: true,
          fallbackAvailable: true,
          lastModified: Timestamp.now(),
          modifiedBy: adminId
        }
      };

      await setDoc(docRef, pageContent);
      
      // Log the change for recent activity
      await ContentService.logContentChange(
        moduleId, unitId, pageId, 
        `Updated ${elements.length} content elements`, 
        adminId
      );
      
      return true;
    } catch (error) {
      console.error('Error saving content:', error);
      return false;
    }
  }

  // Get content for student pages (with fallback)
  static async getStudentContent(
    moduleId: string, 
    unitId: string, 
    pageId: string
  ): Promise<ContentElement[]> {
    const pageContent = await ContentService.getPageContent(moduleId, unitId, pageId);
    return pageContent?.elements || [];
  }

  // Get module overview for admin dashboard
  static async getModuleOverview(): Promise<ModuleOverview[]> {
    try {
      // For now, return hardcoded modules - will be dynamic later
      const modules: ModuleOverview[] = [
        {
          id: 'banking-fees',
          title: 'Module 2: Banking',
          icon: '🏦',
          units: await ContentService.getUnitsOverview('banking-fees'),
          totalContent: 0, // Will be calculated
          lastModified: new Date()
        }
      ];

      // Calculate total content for each module
      for (const moduleItem of modules) {
        moduleItem.totalContent = moduleItem.units.reduce((acc, unit) => acc + unit.contentCount, 0);
      }

      return modules;
    } catch (error) {
      console.error('Error getting module overview:', error);
      return [];
    }
  }

  // Get units overview for a module
  static async getUnitsOverview(moduleId: string): Promise<UnitOverview[]> {
    try {
      // Hardcoded for Module 2 - will be dynamic later
      const units = [
        { id: 'unit-1-basics', title: 'Unit 1: Banking Basics' },
        { id: 'unit-2-fees', title: 'Unit 2: Banking Fees' },
        { id: 'unit-3-accounts', title: 'Unit 3: Account Types' },
        { id: 'unit-4-relationships', title: 'Unit 4: Banking Relationships' },
        { id: 'unit-5-alternatives', title: 'Unit 5: Alternative Banking' }
      ];

      const unitOverviews: UnitOverview[] = [];
      
      for (const unit of units) {
        const pages = await ContentService.getPagesOverview(moduleId, unit.id);
        unitOverviews.push({
          id: unit.id,
          title: unit.title,
          pages,
          contentCount: pages.reduce((acc, page) => acc + page.elementCount, 0),
          lastModified: new Date()
        });
      }

      return unitOverviews;
    } catch (error) {
      console.error('Error getting units overview:', error);
      return [];
    }
  }

  // Get pages overview for a unit
  static async getPagesOverview(moduleId: string, unitId: string): Promise<PageOverview[]> {
    try {
      // Query existing content pages
      const pagesRef = collection(db, 'content');
      const q = query(pagesRef, where('__name__', '>=', `${moduleId}-${unitId}-`), where('__name__', '<', `${moduleId}-${unitId}-z`));
      const querySnapshot = await getDocs(q);
      
      const pages: PageOverview[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data() as PageContent;
        // Extract pageId from document ID (e.g., banking-fees-unit-1-basics-page-2 -> page-2)
        const docId = doc.id;
        const pageId = docId.split('-').slice(-2).join('-'); // Get last two parts (page-2)
        console.log('📄 Found page document:', { docId, pageId });

        pages.push({
          id: pageId,
          title: data.metadata.title,
          elementCount: data.elements.length,
          hasContent: data.elements.length > 0,
          lastModified: data.metadata.lastModified?.toDate() || new Date()
        });
      });

      return pages.sort((a, b) => a.id.localeCompare(b.id));
    } catch (error) {
      console.error('Error getting pages overview:', error);
      return [];
    }
  }

  // Get recent content changes
  static async getRecentChanges(limitCount: number = 10): Promise<RecentChange[]> {
    try {
      // Query recent changes from activity log
      const changesRef = collection(db, 'content_activity');
      const q = query(
        changesRef,
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const changes: RecentChange[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        changes.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          timestamp: data.timestamp?.toDate()?.toLocaleString() || 'Unknown',
          moduleId: data.moduleId,
          unitId: data.unitId,
          pageId: data.pageId,
          modifiedBy: data.modifiedBy
        });
      });
      
      return changes;
    } catch (error) {
      console.error('Error getting recent changes:', error);
      return [];
    }
  }

  // Helper: Get page title
  static getPageTitle(moduleId: string, unitId: string, pageId: string): string {
    // Generate readable title from IDs
    const pageNumber = pageId.replace('page-', '');
    return `Page ${pageNumber}`;
  }

  // Helper: Get next version number
  static async getNextVersion(moduleId: string, unitId: string, pageId: string): Promise<number> {
    try {
      const current = await ContentService.getPageContent(moduleId, unitId, pageId);
      return (current?.metadata.version || 0) + 1;
    } catch {
      return 1;
    }
  }

  // Helper: Log content changes
  static async logContentChange(
    moduleId: string,
    unitId: string,
    pageId: string,
    description: string,
    adminId: string
  ): Promise<void> {
    try {
      const activityRef = collection(db, 'content_activity');
      await setDoc(doc(activityRef), {
        moduleId,
        unitId,
        pageId,
        title: ContentService.getPageTitle(moduleId, unitId, pageId),
        description,
        modifiedBy: adminId,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error('Error logging content change:', error);
    }
  }

  // Migration helper: Test migration for a single page
  static async testPageMigration(
    moduleId: string,
    unitId: string,
    pageId: string,
    elements: ContentElement[]
  ): Promise<MigrationResult> {
    try {
      // Validate elements
      const validElements = elements.every(el => 
        el.id && el.type && el.content && typeof el.order === 'number'
      );

      if (!validElements) {
        return {
          success: false,
          error: 'Invalid content elements provided',
          fallbackPreserved: true,
          testingRequired: true
        };
      }

      // Test save
      const saved = await ContentService.savePageContent(
        moduleId, unitId, pageId, elements, 'migration-test'
      );

      return {
        success: saved,
        elementsCreated: elements.length,
        fallbackPreserved: true,
        testingRequired: true
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
        fallbackPreserved: true,
        testingRequired: true,
        rollbackRequired: true
      };
    }
  }
}
