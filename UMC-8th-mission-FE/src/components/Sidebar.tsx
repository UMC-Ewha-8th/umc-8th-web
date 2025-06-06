type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-60 bg-black text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform`}
    >
      <button onClick={onClose}>닫기</button>
      <ul className="mt-8">
        <li>🔍 찾기</li>
        <li>👤 마이페이지</li>
      </ul>
    </div>
  );
}
