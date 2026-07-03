export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="hidden w-1/2 flex-col justify-center bg-[#1A5F7A] p-16 text-white lg:flex">
        <h1 className="mb-4 text-5xl font-bold">
          SlotSmart
        </h1>

        <p className="max-w-md text-lg text-slate-200">
          Smart parking made simple.
          Book, park, scan and pay from anywhere.
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <h2 className="mb-2 text-3xl font-bold text-slate-800">
            {title}
          </h2>

          <p className="mb-8 text-slate-500">
            {subtitle}
          </p>

          {children}
        </div>
      </div>
    </div>
  );
}