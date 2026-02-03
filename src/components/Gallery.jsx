import { useState, useCallback, useEffect } from 'react';
import { DATA } from '../data/layers';

// Carousel component for gallery
export default function Gallery({ unit, galleryType }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const unitType = DATA.project.unitTypes[unit.unitTypeId];
    const images = unitType?.[galleryType] || [];

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Swipe States
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const threshold = 50;

    const handleMouseDown = (e) => {
        setStartX(e.clientX);
    };
    const handleMouseUp = (e) => {
        setTranslateX(startX - e.clientX);
    };

    const handleTouchStart = (e) => {
        setStartX(e.changedTouches[0].clientX)
    };

    const handleTouchEnd = (e) => {
        setTranslateX(startX - e.changedTouches[0].clientX);
    }

    useEffect(() => {
        if (translateX > threshold) nextSlide()
        else if (translateX < -threshold) prevSlide();
    }, [translateX]);

    return (
        <div className="fixed inset-0 z-30 overflow-hidden">
            <div
                className="absolute inset-0 z-10"
                style={{ background: 'transparent', touchAction: 'none' }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            />
            {/* Slides */}
            <div
                className="absolute inset-0 flex transition-transform duration-800 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((img, index) => (
                    <div key={index} className="w-screen h-screen flex-shrink-0 flex items-center justify-center">
                        <img
                            src={img.src}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-contain"
                        />
                    </div>
                ))}
            </div>

            {/* Indicators */}
            <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2 pointer-events-auto">
                {images.map((_, index) => (
                    <span key={index}
                        className={`w-3 h-3 rounded-full`}>
                        <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill={index === currentIndex ? "white" : "#ffffff80"}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="10"
                                cy="10"
                                r="6"
                            />
                        </svg>
                    </span>
                ))}
            </div>
        </div>
    );
};