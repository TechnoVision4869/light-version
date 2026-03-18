import { useContext } from "react"
import { SidebarContext } from "../store/SidebarContextProvider"

export default function HistoryBreadcrumbs() {
    const { history, currentItem } = useContext(SidebarContext);
    if (history.length <= 1) return null;
    return (
        <div className=" inline-flex items-center gap-3 bg-white/9 rounded-full px-4 py-2 text-sm">
            {history.slice(1).map(
                (entry) =>
                    <div key={Math.random()} className=" flex gap-2">
                        <button
                            className="w-auto cursor-pointer text-white"
                        >
                            {String(entry.item.displayName || entry.item.name || entry.item.zoneName).charAt(0).toUpperCase() +
                                String(entry.item.displayName || entry.item.name || entry.item.zoneName).slice(1)}
                        </button>
                        {entry.item.id !== currentItem.id && (
                            <span className="text-white">›</span>
                        )}
                    </div>   
            )}
        </div>
    )
}