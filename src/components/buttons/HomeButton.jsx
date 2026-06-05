import HOME_ICON from "../../assets/icons/home.svg?react";
// import HOME_ICON from "../../assets/white-logo.png";

export default function HomeButton({ onHomeClick }) {
    return (
        <div>
            {/* <button
                onClick={onHomeClick}
                className="w-12 h-12 rounded-xl flex items-center justify-center hover:opacity-85 transition"
                aria-label="Home"
            >
                <img
                    src={HOME_ICON}
                    alt="Home icon"
                    className="w-auto h-12 object-contain"
                />
            </button> */}
            <button
                onClick={onHomeClick}
                className="w-10 h-10 rounded-xl bg-white/85 flex items-center justify-center hover:bg-white/7 transition"
                aria-label="Home"
            >
                <img
                    src={HOME_ICON}
                    alt="Home icon"
                    className="w-auto h-6 object-contain"
                />
            </button>
        </div>
    )
}