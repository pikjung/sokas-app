const BadgeBanner = () => {
  return (
    <a href="/promotion" className="group -my-2 ml-6 items-center gap-2 rounded-full hidden bg-white/25 px-3 py-2 text-xs text-slate-900 ring-1 ring-inset ring-black/[0.08] hover:bg-white/50 hover:ring-black/[0.13] sm:flex md:ml-8 lg:hidden min-[1300px]:flex">
      <span className="font-semibold">Promo Menarik</span>
      <svg width="2" height="2" aria-hidden="true" className="fill-slate-900"><circle cx="1" cy="1" r="1"></circle></svg>
      <span className="font-medium">Klik disini untuk keuntungan berlimpah</span>
      <svg viewBox="0 0 5 8" className="h-2 w-[5px] fill-black/30 group-hover:fill-black/60" aria-hidden="true"><path d="M.2.24A.75.75 0 0 1 1.26.2l3.5 3.25a.75.75 0 0 1 0 1.1L1.26 7.8A.75.75 0 0 1 .24 6.7L3.148 4 .24 1.3A.75.75 0 0 1 .2.24Z"></path></svg>
    </a>
  );
}

export default BadgeBanner;