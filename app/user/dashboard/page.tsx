import NotesStats from "@/app/ui/user/dashboard/NotesStats";
import PinnedNotes from "@/app/ui/user/dashboard/PinnedNotes";
import QuickLinks from "@/app/ui/user/dashboard/QuickLinks";
import RecentNotes from "@/app/ui/user/dashboard/RecentNotes";
import Tags from "@/app/ui/user/dashboard/Tags";

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full gap-7">
      <QuickLinks />
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-7">
        <NotesStats />
        <Tags />
        <RecentNotes />
        <PinnedNotes />
      </div>
    </div>
  );
}
