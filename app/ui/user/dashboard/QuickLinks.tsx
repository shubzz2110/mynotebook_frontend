import Link from "next/link";

export default function QuickLinks() {
  return (
    <div className="dashboard-card">
      <h1 className="text-surface-800 font-semibold text-xl leading-5">
        Quick Links
      </h1>
      <div className="flex items-center gap-5">
        <Link className="quick-link-card" href={"#"}>
          Create New Note
        </Link>
        <Link className="quick-link-card" href={"#"}>
          View All Notes
        </Link>
        <Link className="quick-link-card" href={"#"}>
          Search Notes
        </Link>
      </div>
    </div>
  );
}
