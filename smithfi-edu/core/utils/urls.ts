/**
 * URL generation utilities
 */

/**
 * Convert unit ID to URL-friendly path
 * For numbered routes (unit-1, unit-2) use numbers
 * For named routes use the full ID
 */
export function getUnitUrlPath(unitId: string): string {
  const unitMap: Record<string, string> = {
    'unit-1-basics': '1',
    'unit-2-fees': '2',
    'unit-3-accounts': 'unit-3-accounts',
    'unit-4-neobanks': 'unit-4-neobanks',
    'unit-5-smithie-banking': 'unit-5-smithie-banking',
    // Legacy mappings (for backwards compatibility)
    'unit-3-impact': '3',
    'unit-4-relationships': 'unit-4-relationships',
    'unit-5-abroad': '5',
  };

  return unitMap[unitId] || unitId;
}

/**
 * Generate unit URL
 */
export function getUnitUrl(moduleId: string, unitId: string): string {
  const unitPath = getUnitUrlPath(unitId);
  return `/${moduleId}/${unitPath}`;
}

/**
 * Generate module URL
 */
export function getModuleUrl(moduleId: string): string {
  return `/${moduleId}`;
}
