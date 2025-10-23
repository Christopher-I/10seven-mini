/**
 * Content Management Types
 * Type definitions for the admin CMS system
 */

import { Timestamp } from 'firebase/firestore';

// Content element - simple text editing
export interface ContentElement {
  id: string;                           // Unique element ID
  type: 'heading' | 'paragraph';        // Simple text types only
  content: string;                      // Text content
  order: number;                        // Display order (0-based)
  editable: boolean;                    // Admin edit permission
  metadata: {
    created: Timestamp;                 // Creation timestamp
    modified: Timestamp;                // Last modification
    modifiedBy: string;                // Admin user ID
  };
}

// Page content structure
export interface PageContent {
  elements: ContentElement[];
  metadata: {
    title: string;
    version: number;                    // Version control
    migrated: boolean;                  // Migration status flag
    fallbackAvailable: boolean;         // Static content exists
    lastModified: Timestamp;
    modifiedBy: string;
  };
}

// Module overview for admin dashboard
export interface ModuleOverview {
  id: string;
  title: string;
  icon: string;
  units: UnitOverview[];
  totalContent: number;
  lastModified: Date;
}

// Unit overview for module page
export interface UnitOverview {
  id: string;
  title: string;
  pages: PageOverview[];
  contentCount: number;
  lastModified: Date;
}

// Page overview for unit page
export interface PageOverview {
  id: string;
  title: string;
  elementCount: number;
  hasContent: boolean;
  lastModified: Date;
}

// Content validation types
export interface ValidationError {
  type: 'error' | 'warning';
  message: string;
  elementId?: string;
}

// Migration types
export interface MigrationResult {
  success: boolean;
  elementsCreated?: number;
  error?: string;
  fallbackPreserved: boolean;
  testingRequired: boolean;
  rollbackRequired?: boolean;
}

export interface ValidationResult {
  contentMatches: boolean;
  renderingCorrect: boolean;
  performanceAcceptable: boolean;
}

// Recent changes for dashboard
export interface RecentChange {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  moduleId: string;
  unitId: string;
  pageId: string;
  modifiedBy: string;
}
