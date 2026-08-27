import { useContext, useState } from "react";
import { SidebarContext } from "../../store/SidebarContextProvider";
import { useAuth } from "../hooks/use-auth";
import { ROLES } from "../../constants/roles";
import { useCountUp } from "../hooks/useCountUp";

const STATUS_COLOR = {
    idle: "bg-gray-500",
    loading: "bg-yellow-400",
    done: "bg-green-500",
    error: "bg-red-500",
};

const ALLOWED_ROLES = [ROLES.ADMIN, ROLES.SYSTEM_ADMIN, ROLES.SYSTEM_TECHNICIAN];

function LevelBar({ level, name, loaded, total, status }) {
    const displayedLoaded = useCountUp(loaded);
    const pct = total > 0 ? Math.round((displayedLoaded / total) * 100) : 0;
    return (
        <div className="mb-1.5 last:mb-0 py-0.5">
            <div className="flex justify-between text-[12px] text-white/85 mb-0.5">
                <span>Level {level}: {name}</span>
                <span>{displayedLoaded}/{total} ({pct}%)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-750 ${STATUS_COLOR[status] ?? "bg-gray-500"}`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

export default function PreloadProgressPanel() {
    const [open, setOpen] = useState(false);
    const { preloadStats } = useContext(SidebarContext);
    const { user } = useAuth();

    const levels = Object.entries(preloadStats ?? {});
    const totalLoaded = levels.reduce((sum, [, s]) => sum + s.loaded, 0);
    const totalAssets = levels.reduce((sum, [, s]) => sum + s.total, 0);
    const displayedTotalLoaded = useCountUp(totalLoaded);
    const overallPct = totalAssets > 0 ? Math.round((displayedTotalLoaded / totalAssets) * 100) : 0;

    if (!ALLOWED_ROLES.includes(user?.role)) return null;

    return (
        <div className="absolute top-14 right-2 z-50 text-white flex flex-col items-end">
            <button
                onClick={() => setOpen((o) => !o)}
                className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 text-[13px] font-mono border border-white/10 hover:bg-black/80"
            >
                {open ? 'Preload' : ''} {overallPct}%
            </button>

            {open && (
                <div className="mt-1.5 w-85 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 p-4">
                    <div className="mb-1.5">
                        <div className="flex justify-between text-[12px] text-white/85 mb-0.5">
                            <span>Overall</span>
                            <span>{displayedTotalLoaded}/{totalAssets} ({overallPct}%)</span>
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
