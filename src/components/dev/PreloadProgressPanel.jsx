import { useContext, useState } from "react";
import { SidebarContext } from "../../store/SidebarContextProvider";

const STATUS_COLOR = {
    idle: "bg-gray-500",
    loading: "bg-yellow-400",
    done: "bg-green-500",
    error: "bg-red-500",
};

function LevelBar({ level, name, loaded, total, status }) {
    const pct = total > 0 ? Math.round((loaded / total) * 100) : 0;
    return (
        <div className="mb-1.5 last:mb-0">
            <div className="flex justify-between text-[13px] text-white/80 mb-0.5">
                <span>Level {level}: {name}</span>
                <span>{loaded}/{total} ({pct}%)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-200 ${STATUS_COLOR[status] ?? "bg-gray-500"}`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

export default function PreloadProgressPanel() {
    const [open, setOpen] = useState(false);
    const { preloadStats } = useContext(SidebarContext);

    // if (!import.meta.env.DEV) return null;

    const levels = Object.entries(preloadStats ?? {});
    const totalLoaded = levels.reduce((sum, [, s]) => sum + s.loaded, 0);
    const totalAssets = levels.reduce((sum, [, s]) => sum + s.total, 0);
    const overallPct = totalAssets > 0 ? Math.round((totalLoaded / totalAssets) * 100) : 0;

    return (
        <div className="absolute top-2 right-2 z-50 text-white flex flex-col items-end">
            <button
                onClick={() => setOpen((o) => !o)}
                className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 text-[13px] font-mono border border-white/10 hover:bg-black/80"
            >
                {open ? 'Preload' : ''} {overallPct}%
            </button>

            {open && (
                <div className="mt-1.5 w-96 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 p-4">
                    <div className="mb-1.5">
                        <div className="flex justify-between text-[13px] text-white/80 mb-0.5">
                            <span>Overall</span>
                            <span>{totalLoaded}/{totalAssets} ({overallPct}%)</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-blue-400 transition-all duration-200"
                                style={{ width: `${overallPct}%` }}
                            />
                        </div>
                    </div>

                    {levels.map(([level, stats]) => (
                        <LevelBar key={level} level={level} {...stats} />
                    ))}
                </div>
            )}
        </div>
    );
}
