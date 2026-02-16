import TECHNO_LOGO from "../assets/techno.png";
import { DATA } from '../data/layers';

export default function ProjectSelector({ onProjectSelect }) {
    const projects = DATA.developerProjects;

    return (
        <div
            className="w-screen h-screen flex flex-col items-center justify-center p-4 relative"
            style={{
                backgroundImage: `url(${DATA.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20">
                <img src={DATA.developerLogo} alt="Developer Logo" className="w-22 h-auto" />
            </div>
            <div className="absolute bottom-6 right-6 z-20">
                <img src={TECHNO_LOGO} alt="Techno Vision Logo" className="w-24 h-auto" />
            </div>
            <div className="max-w-5xl w-full relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {projects.map((project) => {
                        const disabled = !project.introVideo;

                        return (
                            <div key={project.id} className="w-full rounded-2xl overflow-hidden backdrop-blur-sm bg-[#1C1C1C8C]">
                                <div className="px-3 pt-3">
                                    <img
                                        src={project.thumbnail}
                                        alt={project.name}
                                        className="rounded-2xl w-full h-48 object-cover"
                                    />
                                </div>

                                <div className="p-4">
                                    <h2 className="tracking-wide text-lg font-semibold text-white mb-1">
                                        {project.name}
                                    </h2>
                                    <p className="text-[#DADADA] text-[11px] mb-4">
                                        {project.description}
                                    </p>

                                    <button
                                        onClick={() => onProjectSelect(project)}
                                        disabled={!project.introVideo}
                                        className={`w-full py-2 px-4 bg-transparent border ${disabled ? '' : 'hover:bg-white hover:text-black hover:border-white'} disabled:text-white/50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors duration-300`}
                                    >
                                        {disabled ? 'Coming Soon' : 'Open Project'}
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
