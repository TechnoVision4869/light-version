import { useState, useCallback, useEffect } from 'react';
import { DATA } from '../data/layers';

// Carousel component for gallery
export default function Gallery({ unit, galleryType }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const unitType = DATA.unitTypes[unit.unitTypeId];
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

    const handleMouseDown = (e) => {
        console.log("mouse down", e);
        setStartX(e.clientX);
    };
    const handleMouseUp = (e) => {
        console.log("mouse up", e);
        setTranslateX(startX - e.clientX);
    };

    const handleTouchStart = (e) => {
        console.log("touch start", e);
        setStartX(e.changedTouches[0].clientX)
        // setStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        console.log("touch end", e);
        setTranslateX(startX - e.changedTouches[0].clientX);
    }

    const handleTouchMove = (e) => {
        // e.preventDefault();
        // setTranslateX(startX - e.touches[0].clientX);
    };

    useEffect(() => {
        console.log("change happened", translateX);

        if (translateX > 50) nextSlide()
        else if (translateX < -50) prevSlide();
    }, [translateX]);

    return (
        <div className="fixed inset-0 z-30 overflow-hidden">
            <div
                className="absolute inset-0 z-10"
                style={{ background: 'transparent', touchAction: 'none' }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
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
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2 pointer-events-auto">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};