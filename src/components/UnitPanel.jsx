import { useState } from 'react';

import AREA_ICON from "../assets/icons/area.svg"
import DOOR_ICON from "../assets/icons/door.svg"

export default function UnitPanel({ unit }) {
    const [isVisualsOpen, setIsVisualsOpen] = useState(true);
    const [isCutSectionsOpen, setIsCutSectionsOpen] = useState(false);
    const [isPaymentPlanOpen, setIsPaymentPlanOpen] = useState(false);

    // Mock data
    const property = {
        name: "Town Casa A",
        area: "203 M²",
        rooms: 4,
        serviceRooms: ["Nanny's Room", "Drivers Room", "Hard Kitchen", "Play Room", "Guards Room"],
        visuals: [
            { id: 1, src: "https://via.placeholder.com/150/4A90E2/FFFFFF?text=Exterior" },
            { id: 2, src: "https://via.placeholder.com/150/4A90E2/FFFFFF?text=Pool" },
            { id: 3, src: "https://via.placeholder.com/150/4A90E2/FFFFFF?text=Entrance" },
            { id: 4, src: "https://via.placeholder.com/150/4A90E2/FFFFFF?text=Living" },
        ],
        paymentPlan: {
            downPayment: 4999999,
            monthly: 499999,
            years: 8,
        },
    };

    return (
        <div className="text-white">
            <h1 className="text-xl font-bold mb-2">{property.name}</h1>
            <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 items-center justify-center">
                    <img src={AREA_ICON} alt="Area icon" className="w-6 h-6 p-[1px]" />
                </div>
                <span>Area : {property.area}</span>
            </div>

            <hr className="border-white border-1 opacity-50 mb-3" />

            {/* Rooms */}
            <div className="mb-4">
                <div className="flex items-left gap-2 mb-2">
                    <div className="w-6 h-6 flex items-center justify-center">
                        <img src={DOOR_ICON} alt="Area icon" className="w-6 h-6 p-[1px]" />
                    </div>
                    <span>Rooms : {property.rooms}</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <small className="text-sm">+ service Rooms</small>
                    <hr className="flex-grow border-b border-white opacity-50" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {property.serviceRooms.map((room, i) => (
                        <div key={i} className="flex items-center gap-1 text-xs text-[#E4E3E3]">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/70">
                                <path d="M12 12C12 10.8954 11.1046 10 10 10C8.89543 10 8 10.8954 8 12C8 13.1046 8.89543 14 10 14C11.1046 14 12 13.1046 12 12Z" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            {room}
                        </div>
                    ))}
                </div>
            </div>


            {/* Action Buttons */}
            <div className="flex flex-col gap-2 mb-4">
                <div className="flex gap-2">
                    <button className="flex-1 border-2 hover:bg-white/7 py-2 px-4 rounded-lg text-sm font-medium transition">
                        Interior
                    </button>
                    <button className="flex-1 border-2 hover:bg-white/7 py-2 px-4 rounded-lg text-sm font-medium transition">
                        Floor Plan
                    </button>
                </div>
                <hr className="border-white opacity-50 mb-4" />

                <button className="w-full border-2 hover:bg-white/7 py-2 px-4 rounded-lg text-sm font-medium transition">
                    View From Balcony
                </button>
            </div>

            <hr className="border-white opacity-50 mb-4" />

            {/* Visuals Section */}
            <div className="mb-4">
                <button
                    onClick={() => setIsVisualsOpen(!isVisualsOpen)}
                    className="flex justify-between w-full pb-2 text-sm font-medium"
                >
                    <span>Visuals</span>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform ${isVisualsOpen ? 'rotate-180' : ''}`}
                    >
                        <path d="M12 18L6 12L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                {isVisualsOpen && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {property.visuals.map((img) => (
                            <img
                                key={img.id}
                                src={img.src}
                                alt="Visual"
                                className="w-full h-20 object-cover rounded-lg"
                            />
                        ))}
                    </div>
                )}
            </div>

            <hr className="border-white opacity-50 mb-4" />

            {/* Cut Sections */}
            <div className="mb-4">
                <button
                    onClick={() => setIsCutSectionsOpen(!isCutSectionsOpen)}
                    className="flex justify-between w-full pb-2 text-sm font-medium"
                >
                    <span>Cut Sections</span>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform ${isCutSectionsOpen ? 'rotate-180' : ''}`}
                    >
                        <path d="M12 18L6 12L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                {isCutSectionsOpen && (
                    <div className="mt-2">
                        {/* Placeholder for cut sections content */}
                        <div className="bg-black/10 p-4 rounded-lg text-center text-sm text-white/70">
                            Cut sections content will appear here.
                        </div>
                    </div>
                )}
            </div>

            <hr className="border-white opacity-50 mb-4" />

            {/* Payment Plan */}
            <div>
                <button
                    onClick={() => setIsPaymentPlanOpen(!isPaymentPlanOpen)}
                    className="flex justify-between w-full pb-2 text-sm font-medium"
                >
                    <span>Payment Plan</span>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform ${isPaymentPlanOpen ? 'rotate-180' : ''}`}
                    >
                        <path d="M12 18L6 12L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                {isPaymentPlanOpen && (
                    <div className="mt-2 flex justify-between gap-2">
                        <div className="flex-1 bg-black/10 p-2 rounded-lg text-center">
                            <div className="text-lg font-bold">{property.paymentPlan.downPayment.toLocaleString()} L.E</div>
                            <div className="text-xs text-white/70">Down Payment</div>
                        </div>
                        <div className="flex-1 bg-black/10 p-2 rounded-lg text-center">
                            <div className="text-lg font-bold">{property.paymentPlan.monthly.toLocaleString()} L.E</div>
                            <div className="text-xs text-white/70">Monthly</div>
                        </div>
                        <div className="flex-1 bg-black/10 p-2 rounded-lg text-center">
                            <div className="text-lg font-bold">{property.paymentPlan.years}</div>
                            <div className="text-xs text-white/70">Years</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}