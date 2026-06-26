export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#090d15] flex items-center justify-center text-white px-5">
      <div className="text-center max-w-md">
        <h1 className="text-6xl sm:text-8xl font-black text-[#0a84ff]">404</h1>
        <p className="mt-4 text-sm sm:text-base text-white/60">Page not found</p>
        <a
          href="/"
          className="mt-6 inline-block rounded-full bg-[#0a84ff] px-6 py-3 text-sm font-semibold hover:bg-[#1593ff] transition"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}
