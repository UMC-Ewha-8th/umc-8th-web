import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutation/usePostLike";
import useDeleteLike from "../hooks/mutation/useDeleteLike";

const LPDetailPage = () => {
  const { lpId } = useParams();
  const { accessToken } = useAuth();

  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });

  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  const isLiked = lp?.data.likes
    .map((like) => like.userId)
    .includes(me?.data.id as number);

  const handleLikeLp = () => {
    if (isLiked) {
      disLikeMutate({ lpId: Number(lpId) });
    } else {
      likeMutate({ lpId: Number(lpId) });
    }
  };

  if (isPending || isError) {
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-20 p-8 bg-gray-900 rounded-3xl shadow-xl text-white">
      <div className="flex justify-center">
        <img
          src={lp?.data.thumbnail}
          alt={lp?.data.title}
          className="w-64 aspect-square object-cover rounded-xl shadow-md mb-8"
        />
      </div>

      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-white">{lp?.data.title}</h1>
        <button onClick={handleLikeLp} className="text-2xl">
          {isLiked ? (
            <IoHeart className="text-red-500" />
          ) : (
            <IoHeartOutline className="text-gray-200" />
          )}
        </button>
      </div>

      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
        {lp?.data.content}
      </p>

      <div className="mt-6 text-sm text-gray-500">
        작성일: {new Date(lp?.data.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default LPDetailPage;
