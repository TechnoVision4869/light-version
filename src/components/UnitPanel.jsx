import { useState, useContext } from 'react';
import { DATA } from '../data/layers';

import { SidebarContext } from '../store/SidebarContextProvider';
import { MainContext } from '../store/MainContextProvider';

import AREA_ICON from "../assets/icons/area.svg"
import DOOR_ICON from "../assets/icons/door.svg"

export default function UnitPanel() {
    const { currentItem } = useContext(SidebarContext);
    const { handleInterior, handleBalconyView, handleGalleryType } = useContext(MainContext);

    const [isVisualsOpen, setIsVisualsOpen] = useState(true);
    const [isCutSectionsOpen, setIsCutSectionsOpen] = useState(false);
    const [isPaymentPlanOpen, setIsPaymentPlanOpen] = useState(false);

    //temporary visuals and payment plan
    const unitType = DATA.project.unitTypes[currentItem.unitTypeId];    
    const serviceRooms = unitType.serviceRooms;
    const gallery = unitType.gallery;
    const cutSections = unitType.cutSections;
    const paymentPlans = unitType.paymentPlans;

    const balconyView = currentItem.balconyView;

    return (
        <div className="h-full pr-1">
            <div className="flex flex-col gap-3 max-h-[calc(100vh-200px)] scrollbar-custom overflow-auto px-2 py-2 text-white">
                {/* name and area */}
                <div>
                    <h1 className="text-xl font-bold mb-2">{currentItem.displayName}</h1>
                    <div className="flex items-center gap-1">
                        <div className="w-6 h-6 items-center justify-center">
                            <img src={AREA_ICON} alt="Area icon" className="w-6 h-6 p-[1px]" />
                        </div>
                        <span>Area : {currentItem.area} m²</span>
                    </div>
                </div>

                <hr className="h-divider" />

                {/* Rooms & Interior & FLoor plan buttons */}
                <div>
                    <div className="flex items-left gap-1 mb-2">
                        <div className="w-6 h-6 flex items-center justify-center">
                            <img src={DOOR_ICON} alt="Area icon" className="w-6 h-6 p-[1px]" />
                        </div>
                        <span>Rooms : {currentItem.bedrooms}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <small className="text-sm">+ service Rooms</small>
                        <hr className="flex-grow border-b border-white opacity-50" />
                    </div>
                    {serviceRooms && <div className="grid grid-cols-2 gap-2">
                        {serviceRooms.map((room, i) => (
                            <div key={i} className="flex items-center gap-1 text-xs text-[#E4E3E3]">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/70">
                                    <path d="M12 12C12 10.8954 11.1046 10 10 10C8.89543 10 8 10.8954 8 12C8 13.1046 8.89543 14 10 14C11.1046 14 12 13.1046 12 12Z" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                {room}
                            </div>
                        ))}
                    </div>}

                    <div className="flex flex-col gap-2 mt-4">
                        <div className="flex gap-2">
                            <button className="flex-1 border-2 hover:bg-white/7 py-2 px-4 rounded-lg text-sm font-medium transition"
                                onClick={handleInterior}
                            >
                                Interior
                            </button>
                            <button className="flex-1 border-2 hover:bg-white/7 py-2 px-4 rounded-lg text-sm font-medium transition whitespace-nowrap"
                                onClick={() => handleGalleryType("floorPlans")}
                            >
                                Floor Plan
                            </button>
                        </div>
                    </div>
                </div>

                {balconyView &&
                    <>
                        <hr className="h-divider" />

                        <button className="w-full border-2 hover:bg-white/7 py-2 px-4 rounded-lg text-sm font-medium transition"
                            onClick={handleBalconyView}
                        >
                            Location View
                        </button>
                    </>
                }

                <hr className="h-divider" />

                {/* Visuals Section */}
                <div>
                    <button
                        onClick={() => setIsVisualsOpen(!isVisualsOpen)}
                        className="flex justify-between w-full"
                    >
                        <span className='font-semibold'>Visuals</span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform ${isVisualsOpen ? 'rotate-180' : ''}`}
                        >
                            <path d="M6 10L12 18L18 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    {isVisualsOpen && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {gallery.map((img) => (
                                <button className='hover:opacity-70' key={img.id} onClick={() => handleGalleryType("gallery")}>
                                    <img
                                        src={img.src}
                                        alt="Visual"
                                        className="w-full h-20 object-cover rounded-lg"
                                    />
                                </button>

                            ))}
                        </div>
                    )}
                </div>

                <hr className="h-divider" />

                {/* Cut Sections */}
                <div>
                    <button
                        onClick={() => setIsCutSectionsOpen(!isCutSectionsOpen)}
                        className="flex justify-between w-full"
                    >
                        <span className='font-semibold'>Cut Sections</span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform ${isCutSectionsOpen ? 'rotate-180' : ''}`}
                        >
                            <path d="M6 10L12 18L18 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    {isCutSectionsOpen && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {cutSections.map((img) => (
                                <button className='hover:opacity-70' key={img.id} onClick={() => handleGalleryType("cutSections")}>
                                    <img
                                        src={img.src}
                                        alt="Visual"
                                        className="w-full h-20 object-cover rounded-lg"
                                    />
                                </button>

                            ))}
                        </div>
                    )}
                </div>

                <hr className="h-divider" />

                {/* Payment Plan */}
                <div>
                    <button
                        onClick={() => setIsPaymentPlanOpen(!isPaymentPlanOpen)}
                        className="flex justify-between w-full"
                    >
                        <span className='font-semibold'>Payment Plan</span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform ${isPaymentPlanOpen ? 'rotate-180' : ''}`}
                        >
                            <path d="M6 10L12 18L18 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    {isPaymentPlanOpen && (
                        paymentPlans.map((plan, index) => (
                            <div className="mt-2 mb-3 flex justify-between gap-2 whitespace-nowrap" key={index}>
                                <div className="flex-1 text-center">
                                    <div className="font-bold text-xs">{plan.downPayment.toLocaleString()} L.E</div>
                                    <div className="text-xs text-white/70">Down Payment</div>
                                </div>
                                <div className="v-divider"></div>
                                <div className="flex-1 text-center">
                                    <div className="font-bold text-xs">{plan.monthly.toLocaleString()} L.E</div>
                                    <div className="text-xs text-white/70">Monthly</div>
                                </div>
                                <div className="v-divider"></div>
                                <div className="flex-1 text-center">
                                    <div className="font-bold text-xs">{plan.years}</div>
                                    <div className="text-xs text-white/70">Years</div>
                                </div>
                            </div>
                        )
                        )

                    )}
                </div>
            </div>
        </div>
    );
}