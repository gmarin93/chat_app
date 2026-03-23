export default function SidebarSkeleton() {
    return (
    <div className="flex flex-col gap-1 p-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-2 py-3">
          <div className="w-12 h-12 rounded-full bg-[#2a3942] animate-pulse" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-3 w-32 bg-[#2a3942] rounded animate-pulse" />
            <div className="h-2 w-48 bg-[#2a3942] rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
    );
}