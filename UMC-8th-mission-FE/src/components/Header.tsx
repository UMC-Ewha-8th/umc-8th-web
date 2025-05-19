type SortType = "old" | "new";

type HeaderProps = {
  sort: SortType;
  setSort: (sort: SortType) => void;
};

export default function Header({ sort, setSort }: HeaderProps) {
  return (
    <header className="flex justify-between items-center px-4 py-2 bg-black text-white">
      <button
        onClick={() => {
          // TODO: 사이드바 열기 구현
        }}
      >
        ☰
      </button>
      <div>
        <button
          className={`mr-2 ${sort === "old" ? "font-bold" : ""}`}
          onClick={() => setSort("old")}
        >
          오래된순
        </button>
        <button
          className={`${sort === "new" ? "font-bold" : ""}`}
          onClick={() => setSort("new")}
        >
          최신순
        </button>
      </div>
    </header>
  );
}
