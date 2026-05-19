export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas">
      <div className="flex flex-col items-center gap-8">
        {/* Wordmark placeholder — replace when logo asset exists */}
        <div className="text-ink font-display text-2xl tracking-tight select-none">
          Solven Syntrix
        </div>
        <div className="h-px w-24 bg-hairline-strong overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-ink animate-[slide_1.4s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes slide {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(200%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
