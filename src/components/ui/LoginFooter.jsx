import TECHNO_LOGO from "../../assets/techno.png";

export function LoginFooter() {
  return (
    <footer className="w-full flex flex-wrap items-center justify-between gap-4 px-2 py-4 text-[#f9fafb] z-10">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <span className="text-sm text-[#f9fafb99] whitespace-nowrap">
          Join <span className="text-[#f9fafb] font-medium">top</span> developers
        </span>
        <div className="flex items-center gap-4 opacity-80">
          <span className="text-sm font-semibold tracking-wide">
            LMD
            {/* <sup className="text-[10px]">°</sup> */}
          </span>
          <span className="font-serif text-base">TBK</span>
          <span className="text-sm tracking-wide">SOMABAY</span>
        </div>
      </div>

      <footer className="absolute right-6 bottom-4 w-22 h-auto">
        <img src={TECHNO_LOGO} className="w-full h-auto" />
      </footer>
    </footer>
  );
}
