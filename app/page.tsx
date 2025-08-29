import Navbar from "./ui/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full min-h-dvh">
      <div className="flex flex-col w-full h-full grow shrink basis-0 bg-gradient-to-r from-blue-500 to-indigo-600">
        <Navbar />
      </div>
    </div>
  );
}
