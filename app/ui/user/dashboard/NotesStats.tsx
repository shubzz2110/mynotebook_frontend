export default function NotesStats() {
  return (
    <div className="dashboard-card">
      <h1 className="text-surface-800 font-semibold text-xl leading-5">
        Notes Stats
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
        <div className="stats-card">
          <h1 className="text-surface-400 font-normal text-lg leading-6">Total Notes</h1>
          <h1 className="text-surface-800 font-bold text-4xl leading-10">38</h1>
        </div>
        <div className="stats-card">
          <h1 className="text-surface-400 font-normal text-lg leading-6">This Week</h1>
          <h1 className="text-surface-800 font-bold text-4xl leading-10">06</h1>
        </div>
        <div className="stats-card">
          <h1 className="text-surface-400 font-normal text-lg leading-6">Pinned Notes</h1>
          <h1 className="text-surface-800 font-bold text-4xl leading-10">12</h1>
        </div>
        <div className="stats-card">
          <h1 className="text-surface-400 font-normal text-lg leading-6">Archived Notes</h1>
          <h1 className="text-surface-800 font-bold text-4xl leading-10">04</h1>
        </div>
      </div>
    </div>
  );
}
