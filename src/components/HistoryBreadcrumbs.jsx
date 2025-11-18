export default function HistoryBreadcrumbs({ history, currentItem }) {
    return (
        <div className=" inline-flex items-center gap-3 bg-white/9 rounded-full px-4 py-2 text-sm">
            {history.slice(1).map(
                (entry) =>
                    entry.item?.id && (
                        <div key={entry.item.id} className=" flex gap-2">
                            <button
                                className="w-auto cursor-pointer text-white"
                            >
                                {String(entry.item.name).charAt(0).toUpperCase() +
                                    String(entry.item.name).slice(1)}
                            </button>
                            {entry.item.id !== currentItem.id && (
                                <span className="text-white">›</span>
                            )}
                        </div>
                    )
            )}
        </div>
    )
}