export default function RecentNotes() {
  return (
    <div className="dashboard-card">
      <h1 className="text-surface-800 font-semibold text-xl leading-5">
        Recent Notes
      </h1>
      <div className="grid grid-cols-1 gap-2.5">
        <div className="rounded-[15px] shadow-sm hover:shadow-md transition cursor-pointer border border-gray-200 bg-white">
          <div className="p-4 space-y-2">
            <h3 className="text-base font-semibold text-gray-900 truncate">
              A textbook of planetary system
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus corrupti dolore error possimus libero. Odio cum,
              inventore cupiditate vel aliquid nesciunt velit eius doloremque
              minima incidunt consectetur asperiores! Ducimus, illo?
            </p>
            <span className="text-xs text-gray-400">Edited 1w ago</span>
          </div>
        </div>
        <div className="rounded-[15px] shadow-sm hover:shadow-md transition cursor-pointer border border-gray-200 bg-white">
          <div className="p-4 space-y-2">
            <h3 className="text-base font-semibold text-gray-900 truncate">
              A textbook of planetary system
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus corrupti dolore error possimus libero. Odio cum,
              inventore cupiditate vel aliquid nesciunt velit eius doloremque
              minima incidunt consectetur asperiores! Ducimus, illo?
            </p>
            <span className="text-xs text-gray-400">Edited 1w ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
