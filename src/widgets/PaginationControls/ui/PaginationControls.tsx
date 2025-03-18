interface PaginationControlsProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
}

export const PaginationControls = ({
  setCurrentPage,
  currentPage,
  totalPages,
}: PaginationControlsProps) => (
  <div className="bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm py-2 z-40">
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 text-sm"
        aria-disabled={currentPage === 1}
        aria-label="Previous page"
      >
        이전
      </button>
      <span className="px-3 py-1 bg-gray-800 text-white text-sm">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 text-sm"
        aria-disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        다음
      </button>
    </div>
  </div>
);
