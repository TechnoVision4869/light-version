import HOME_ICON from "../../assets/icons/home.svg?react";

export default function HomeButton({disabled, onHomeClick }) {
    return (
        <div>
            <button
                onClick={onHomeClick}
                disabled={disabled}
                className={`w-10 h-10 rounded-xl bg-white/85 flex items-center justify-center 
              hover:bg-white/7 transition ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
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