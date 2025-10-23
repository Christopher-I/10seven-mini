/**
 * Simple Section Progress Component
 * Placeholder component to fix import errors
 */

'use client';

interface SectionProgressProps {
  currentPage?: number;
  totalPages?: number;
  currentSection?: number;
  totalSections?: number;
  title?: string;
  className?: string;
  onPageChange?: (page: number) => void | Promise<void>;
}

export function SectionProgress({
  currentPage,
  totalPages,
  currentSection,
  totalSections,
  title = "Progress",
  className = "",
  onPageChange
}: SectionProgressProps) {
  // Use currentPage/totalPages if provided, otherwise fallback to currentSection/totalSections
  const current = currentPage ?? currentSection ?? 1;
  const total = totalPages ?? totalSections ?? 1;
  const progress = (current / total) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <span className="text-sm text-gray-500">{current} of {total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-[#2E1E72] h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}