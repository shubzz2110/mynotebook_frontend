import GetStartedForm from "@/app/ui/auth/GetStartedForm";

export default function Page() {
  return (
    <div className="bg-white w-full h-auto lg:min-w-[28rem] lg:max-w-sm lg:min-h-[36rem] shadow-xl rounded-2.5xl shadow-blue-600 p-7 lg:h-auto">
      <div className="flex flex-col space-y-2.5 w-full h-max pb-7">
        <h1 className="text-surface-900 font-semibold text-2xl leading-6">
          Get started with MyNotebook.
        </h1>
        <p className="text-surface-500 font-normal text-sm leading-4 mb-0">
          Please fill the details below to register
        </p>
      </div>
      <GetStartedForm />
    </div>
  );
}
