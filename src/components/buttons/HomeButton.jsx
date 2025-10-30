import HOME_LOGO from "../../assets/images/logo.png";

export default function HomeButton({onHomeClick}) {
    return (
        <div>
            <button
                onClick={onHomeClick}
                className="w-20 h-10 rounded-xl flex items-center justify-center 
              hover:bg-white/10 transition-all duration-200"
                aria-label="Home"
            >
                <img
                    src={HOME_LOGO}
                    alt="home logo"
                    className="w-auto h-6 object-contain"
                />
            </button>
        </div>
    )
}