export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-1 border-b-4 border-green-500"></div>
    </div>
  );
}
