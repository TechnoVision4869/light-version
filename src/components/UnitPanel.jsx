import { useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

import { SidebarContext } from '../store/SidebarContextProvider';
import { MainContext } from '../store/MainContextProvider';
import { APP_CONFIG } from "../config/appConfig";
import { CONFIG } from "../data/layers";
import { isInCompare, addToCompare, removeFromCompare, COMPARE_UPDATED_EVENT } from "../lib/compareStorage";
import { getMockRemainingCount, getMockViewCount, getMockUnitStatus } from "../lib/mockEngagementData";
import SimilarUnits from "./SimilarUnits";

const BOOK_NOW_URL = "https://siwar-aldahab-landing-production.up.railway.app/";

const STATUS_STYLES = {
    vacant: { label: "Vacant", className: "bg-green-600/80 text-white" },
    sold: { label: "Sold", className: "bg-red-600/80 text-white" },
};

import AREA_ICON from "../assets/icons/area.svg";
import DOOR_ICON from "../assets/icons/door.svg";
import TOILET_ICON from "../assets/icons/bathroom.svg";
import COMPARE_ICON from "../assets/icons/compare.svg";
import CALCULATOR_ICON from "../assets/icons/icons8-calculator-30.png";
import DOWNLOAD_ICON from "../assets/icons/download-pdf.png";

export default function UnitPanel({ unit, inCompareView = false, onOpenInterior } = {}) {
    const { currentProject, currentItem: contextCurrentItem } = useContext(SidebarContext);
    const currentItem = unit ?? contextCurrentItem;
    const useStatic = APP_CONFIG.USE_STATIC;

    const { openPanorama, openBalconyView, openGallery, openRoomInterior, openPaymentPlan, openSimilarUnit } = useContext(MainContext);
    const useHotspots = APP_CONFIG.USE_HOTSPOTS;

    const [inCompare, setInCompare] = useState(() => isInCompare(currentItem?.id));

    useEffect(() => {
        setInCompare(isInCompare(currentItem?.id));
    }, [currentItem?.id]);

    // Resync when the compare list changes elsewhere (e.g. removed from CompareView's
    // own "X" button) — currentItem?.id doesn't change in that case, so the effect above
    // alone won't catch it.
    useEffect(() => {
        const handleUpdate = () => setInCompare(isInCompare(currentItem?.id));
        window.addEventListener(COMPARE_UPDATED_EVENT, handleUpdate);
        return () => window.removeEventListener(COMPARE_UPDATED_EVENT, handleUpdate);
    }, [currentItem?.id]);

    const handleToggleCompare = () => {
        if (inCompare) {
            removeFromCompare(currentItem.id);
            setInCompare(false);
            return;
        }
        const result = addToCompare(currentItem.id);
        if (!result.ok) {
            toast.error("You can compare only 4 units at a time");
            return;
        }
        setInCompare(true);
    };

    const [isVisualsOpen, setIsVisualsOpen] = useState(true);
    const [isCutSectionsOpen, setIsCutSectionsOpen] = useState(true);
    const [isPaymentPlanOpen, setIsPaymentPlanOpen] = useState(false);

    const unitType = useStatic
        ? currentProject?.unitTypes?.[currentItem?.unitTypeId]
        : currentProject?.unitTypes?.find(type => type.id === currentItem?.unitTypeId);

    const [isGeneratingBrochure, setIsGeneratingBrochure] = useState(false);

    const handleDownloadBrochure = async () => {
        setIsGeneratingBrochure(true);
        try {
            const { generateUnitBrochure } = await import("../lib/generateUnitBrochure");
            const { anyImageFailed } = await generateUnitBrochure(currentItem, unitType, {
                developerId: currentProject?.developerId,
            });
            if (anyImageFailed) {
                toast("Some images couldn't be included in the brochure");
            }
        } catch {
            toast.error("Failed to generate brochure");
        } finally {
            setIsGeneratingBrochure(false);
        }
    };

    // console.log("type id:", currentProject?.unitTypes?.find(type => type.id));
    // console.log("unitTypeId:", currentItem?.unitTypeId);

    // console.log("type name:", unitType?.namecurrentProject?.unitTypes?.find(type => type.name));
    // console.log("visualTypeId:", currentItem?.visualTypeId);

    const levels = useStatic ? unitType?.interior?.levels : unitType?.levels;
    const serviceRooms = unitType?.serviceRooms;
    // console.log(serviceRooms);
    const gallery = unitType?.gallery;
    // console.log(gallery);
    
    const cutSections = unitType?.cutSections;
    const paymentPlans = unitType?.paymentPlans;
    // console.log(paymentPlans);
    const floorPlans = unitType?.floorPlans;
    // console.log(floorPlans);
    
    const balconyView = currentItem.balconyView;

    return (
        <div className="h-full pr-1">
            <div className="flex flex-col gap-3 max-h-[calc(100vh-200px)] scrollbar-custom overflow-auto px-2 py-2 text-white">
                {/* name and area */}
                <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <h1 className="text-xl font-bold">{currentItem.displayName || currentItem.name}</h1>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${STATUS_STYLES[getMockUnitStatus(currentItem)].className}`}>
                            {STATUS_STYLES[getMockUnitStatus(currentItem)].label}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-6 h-6 items-center justify-center">
                            <img src={AREA_ICON} alt="Area icon" className="w-6 h-6 p-[1px]" />
                        </div>
                        <span>Area : {Math.round(unitType?.area)} m²</span>
                    </div>
                    {unitType?.roofarea &&<div className="flex items-center gap-1">
                        <div className="w-6 h-6 items-center justify-center">
                            <img src={AREA_ICON} alt="Area icon" className="w-6 h-6 p-[1px]" />
                        </div>
                         <span>Roof Area : {Math.round(unitType?.roofarea)} m²</span>
                    </div>}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-white/70">
                        <span className="flex items-center gap-1 whitespace-nowrap">
                            🔥 Only {getMockRemainingCount(currentItem.unitTypeId)} left of this model
                        </span>
                        <span className="flex items-center gap-1 whitespace-nowrap">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                            {getMockViewCount(currentItem.id)} views
                        </span>
                    </div>
                </div>

                {/* Rooms & Interior & FLoor plan buttons */}
                <div>
                    {currentItem.bedrooms !== null && (
                        <>
                        <hr className="h-divider" />
                        <div className="flex items-left gap-1 mb-2">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <img src={DOOR_ICON} alt="Area icon" className="w-6 h-6 p-[1px]" />
                            </div>
                            <span>Rooms : {currentItem.bedrooms}</span>
                        </div>
                        </>
                    )}
                    {currentItem.bathrooms !== null && (
                        <div className="flex items-left gap-1 mb-2">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <img src={TOILET_ICON} alt="Area icon" className="w-6 h-6 p-[1px]" />
                            </div>
                            <span>Toilets : {currentItem.bathrooms}</span>
                        </div>
                    )}
                    {serviceRooms?.length > 0 && <>
                        <div className="flex items-center gap-2 mb-4">
                            <small className="text-sm">+ Services</small>
                            <hr className="flex-grow border-b border-white opacity-50" />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {serviceRooms.map((room, i) => (
                                <div key={i} className="flex items-center gap-1 text-xs text-[#E4E3E3]">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/70">
                                        <path d="M12 12C12 10.8954 11.1046 10 10 10C8.89543 10 8 10.8954 8 12C8 13.1046 8.89543 14 10 14C11.1046 14 12 13.1046 12 12Z" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    {room.name}
                                </div>
                            ))}
                        </div>
                    </>}


                    <div className="flex flex-col gap-2 mt-4">
                        <div className="flex gap-2">
                            <button className="flex-1 border-2 hover:bg-white/7 py-2 px-4 rounded-lg text-sm font-medium transition"
                                onClick={() => {
                                    if (useHotspots) {
                                        openPanorama(currentItem);
                                    } else if (inCompareView) {
                                        onOpenInterior?.(currentItem);
                                    } else {
                                        const firstRoom = levels?.[0]?.rooms?.[0];
                                        if (firstRoom) openRoomInterior(firstRoom);
                                    }
                                }}
                            >
                                Interior
                            </button>
                            {floorPlans?.length > 0 && <button className="flex-1 border-2 hover:bg-white/7 py-2 px-4 rounded-lg text-sm font-medium transition whitespace-nowrap"
                                onClick={() => openGallery(currentItem, "floorPlans")}
                            > Floor Plan
                            </button>}
                        </div>
                    </div>
                </div>

                {balconyView &&
                    <>
                        <hr className="h-divider" />
                        <button className="w-full border-2 hover:bg-white/7 py-2 px-4 rounded-lg text-sm font-medium transition"
                            onClick={() => openBalconyView(currentItem)}
                        > { CONFIG.BALCONY_TITLE }
                        </button>
                    </>
                }

                {!inCompareView &&
                    <>
                        <hr className="h-divider" />
                        <button
                            className={`bg-[#00000066] border-1 border-black py-3 px-4 rounded-lg text-sm font-medium relative w-full flex justify-center transition ${inCompare ? 'opacity-100 ring-2 ring-white rounded-xl' : 'opacity-90 hover:opacity-100'}`}
                            onClick={handleToggleCompare}
                            aria-pressed={inCompare}
                        >
                            <div className="flex items-center gap-2">
                                <img src={COMPARE_ICON} alt={'Compare Icon'} className="w-5 h-auto" />
                                <span>Add to Compare</span>
                            </div>
                        </button>
                    </>
                }

                {currentItem?.price > 0 &&
                    <button
                        className="bg-[#00000066] border-1 border-black py-3 px-4 rounded-lg text-sm font-medium relative w-full flex justify-center transition opacity-90 hover:opacity-100"
                        onClick={() => openPaymentPlan(currentItem)}
                    >
                        <div className="flex items-center gap-1">
                            <img src={CALCULATOR_ICON} alt={'Calculator Icon'} className="w-5 h-auto" />
                            <span>Payment Plan</span>
                        </div>

                    </button>
                }

                <a
                    href={BOOK_NOW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#00000066] border-1 border-black py-3 px-4 rounded-lg text-sm font-medium relative w-full flex justify-center transition opacity-90 hover:opacity-100"
                >
                    Book Now
                </a>


                {/* Visuals Section */}
                {gallery?.length > 0 &&
                <>
                    <hr className="h-divider" />
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
                                {gallery?.map((img) => (
                                    <button className='hover:opacity-70' key={img.id} onClick={() => openGallery(currentItem, "gallery")}>
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
                </>
                }


                {/* Cut Sections */}
                {cutSections?.length > 0 &&
                <>
                    <hr className="h-divider" />
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
                                {cutSections?.map((img) => (
                                    <button className='hover:opacity-70' key={img.id} onClick={() => openGallery(currentItem, "cutSections")}>
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
                </>
                }

                {paymentPlans?.length > 0 &&
                <>
                    <hr className="h-divider" />
                    {/* Payment Options */}
                    <div>
                        <button
                            onClick={() => setIsPaymentPlanOpen(!isPaymentPlanOpen)}
                            className="flex justify-between w-full"
                        >
                            <span className='font-semibold'>Payment Options</span>
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
                            paymentPlans?.map((plan, index) => (
                                <div className="mt-2 mb-3 flex justify-between gap-2 whitespace-nowrap" key={index}>
                                    <div className="flex-1 text-center">
                                        <div className="font-bold text-xs">{Number(plan.downPayment).toLocaleString()} SAR</div>
                                        <div className="text-xs text-white/70">Down Payment</div>
                                    </div>
                                    <div className="v-divider"></div>
                                    <div className="flex-1 text-center">
                                        <div className="font-bold text-xs">{Number(plan.monthlyPayment).toLocaleString()} SAR</div>
                                        <div className="text-xs text-white/70">Monthly</div>
                                    </div>
                                    {plan.years > 0 && (
                                        <>
                                            <div className="v-divider"></div>
                                            <div className="flex-1 text-center">
                                                <div className="font-bold text-xs">{plan.years}</div>
                                                <div className="text-xs text-white/70">Years</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </>
                }

                <hr className="h-divider" />
                <button
                    className="w-full border-2 hover:bg-white/7 py-2 px-4 rounded-lg text-sm font-medium flex justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleDownloadBrochure}
                    disabled={isGeneratingBrochure}
                >
                    <div className="flex items-center gap-1">
                        <img src={DOWNLOAD_ICON} alt={'Download Icon'} className="w-5 h-auto" />
                        <span>{isGeneratingBrochure ? 'Generating...' : 'Download Brochure'}</span>
                    </div>
                </button>

                {!inCompareView &&
                    <SimilarUnits
                        currentItem={currentItem}
                        unitType={unitType}
                        currentProject={currentProject}
                        onSelect={openSimilarUnit}
                    />
                }
            </div>
        </div>
    );
}