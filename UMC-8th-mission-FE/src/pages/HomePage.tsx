import { useEffect, useState } from "react";
import { useLps } from "../hooks/useLps";
import LPCard from "../components/LPCard";
import { LP } from "../types/lp";
import { useInView } from "react-intersection-observer";

const HomePage = () => {
  const [sort, setSort] = useState<"old" | "new">("new");
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLps(sort);
  const { ref, inView } = useInView();

  // 무한 스크롤 트리거
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    console.error("LP 데이터 로딩 에러:", error);
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <main className="p-4 pt-16 bg-white text-black min-h-screen">
      <div className="mb-4 space-x-2">
        <button
          className={sort === "new" ? "font-bold" : ""}
          onClick={() => setSort("new")}
        >
          최신순
        </button>
        <button
          className={sort === "old" ? "font-bold" : ""}
          onClick={() => setSort("old")}
        >
          오래된순
        </button>
      </div>

      {data?.pages && data.pages.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {data.pages.flatMap((page) =>
            page.data.data.map((lp: LP) => (
              <LPCard key={lp.id} lp={lp} isLoggedIn={true} />
            ))
          )}
        </div>
      ) : (
        <p>표시할 LP가 없습니다.</p>
      )}

      {/* 스크롤 감지 지점 */}
      <div ref={ref} className="h-8 mt-4 text-center text-gray-500">
        {isFetchingNextPage
          ? "불러오는 중..."
          : hasNextPage
          ? "더 불러오기..."
          : "모든 데이터를 불러왔습니다."}
      </div>
    </main>
  );
};

export default HomePage;
