/**
 * Page Number Component
 * Shows page numbers only in development mode
 */

interface PageNumberProps {
  current: number;
  total: number;
}

export function PageNumber({ current, total }: PageNumberProps) {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="hidden md:block text-center mt-8">
      <p className="text-sm text-gray-500">
        Page {current} of {total}
      </p>
    </div>
  );
}
