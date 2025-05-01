interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}

export default function Pagination({
  total,
  limit,
  page,
  setPage,
}: PaginationProps) {
  const numPages = Math.ceil(total / limit);

  return (
    <nav className="flex items-center justify-center gap-4 pb-4 bg-black">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-2 py-1 bg-green-600 text-white rounded cursor-pointer disabled:opacity-30"
      >
        &lt;
      </button>

      <span className="px-4 py-1 font-bold text-green-600">{page}</span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
        className="px-2 py-1 bg-green-600 text-white rounded cursor-pointer disabled:opacity-50"
      >
        &gt;
      </button>
    </nav>
  );
}
