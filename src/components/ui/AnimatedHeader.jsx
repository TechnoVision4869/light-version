import { useEffect, useMemo, useState } from "react";

export function AnimatedHeader() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["exceptional", "iconic", "modern", "inspiring", "next level"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex pt-6 pt-10 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl md:text-6xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-[#f9fafb] transition-all">Build Something</span>
              <span className="relative flex w-full justify-center overflow-hidden text-justify md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <span
                    key={index}
                    className={`absolute font-semibold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      titleNumber === 4 ? "text-[#FD0042]" : "text-[#f9fafb]"
                    } ${
                      titleNumber === index
                        ? "translate-y-0 opacity-100"
                        : titleNumber > index
                        ? "-translate-y-[150%] opacity-0"
                        : "translate-y-[150%] opacity-0"
                    }`}
                  >
                    {title}
                  </span>
                ))}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}