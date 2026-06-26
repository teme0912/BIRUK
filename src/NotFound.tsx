export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#090d15] flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-8xl font-black text-[#0a84ff]">404</h1>
        <p className="mt-4 text-white/60">Page not found</p>
        <a 
          href="/" 
          className="mt-6 inline-block rounded-full bg-[#0a84ff] px-6 py-3 text-sm font-semibold"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}