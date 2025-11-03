import { useEffect } from "react";

export default function VideoPreloader({ loadingProgress }) {
    return (
        <div className="fixed inset-0 bg-gray-900/10 backdrop-blur-remove flex flex-col items-center justify-center z-50">
            <div className="text-white text-xl mb-4">Loading Videos...</div>
            <div className="w-64 h-4 bg-[#4b514a] rounded-full overflow-hidden">
                <div
                    className="h-full bg-[#82a67d] transition-all duration-300 ease-out"
                    style={{ width: `${loadingProgress}%` }}
                />
            </div>
            <div className="text-white text-sm mt-2">{loadingProgress}%</div>
        </div>
    );
}