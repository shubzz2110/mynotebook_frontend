export default function Tags() {
  return (
    <div className="dashboard-card">
      <h1 className="text-surface-800 font-semibold text-xl leading-5">
        Popular Tags
      </h1>
      <div className="grid grid-cols-1 gap-2.5">
        <div className="bg-white px-5 py-1.5 rounded-md w-full shadow-xs">
          <h1 className="text-surface-800 font-semibold text-base leading-5">Entertainment</h1>
        </div>
        <div className="bg-white px-5 py-1.5 rounded-md w-full shadow-xs">
          <h1 className="text-surface-800 font-semibold text-base leading-5">News</h1>
        </div>
        <div className="bg-white px-5 py-1.5 rounded-md w-full shadow-xs">
          <h1 className="text-surface-800 font-semibold text-base leading-5">Artificial Intelligence</h1>
        </div>
        <div className="bg-white px-5 py-1.5 rounded-md w-full shadow-xs">
          <h1 className="text-surface-800 font-semibold text-base leading-5">Web Development</h1>
        </div>
        <div className="bg-white px-5 py-1.5 rounded-md w-full shadow-xs">
          <h1 className="text-surface-800 font-semibold text-base leading-5">World</h1>
        </div>
      </div>
    </div>
  );
}
