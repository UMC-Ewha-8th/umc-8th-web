import { useState } from "react";
import { useEffect } from "react";
import { useLps } from "../hooks/useLps";
import LPCard from "../components/LPCard";
import { LP } from "../types/lp";

const HomePage = () => {
  const [sort, setSort] = useState<"old" | "new">("new");
  const { data: lps, isLoading, isError, error } = useLps(sort);

  useEffect(() => {
    console.log("useEffect - lps:", lps);
  }, [lps]);

  // 데이터 상태 콘솔 출력 (디버깅용)
  console.log("lps 전체 데이터:", lps);
  console.log("lps.data:", lps?.data);
  console.log("lps.data.data (LP 배열):", lps?.data?.data);
  console.log("LP 배열 길이:", lps?.data?.data?.length);

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

      {lps?.data?.data?.length ? (
        <div className="grid grid-cols-3 gap-4">
          {lps.data.data.map((lp: LP) => (
            <LPCard key={lp.id} lp={lp} isLoggedIn={true} />
          ))}
        </div>
      ) : (
        <p>표시할 LP가 없습니다.</p>
      )}
    </main>
  );
};

export default HomePage;
