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
        setStartX(e.clientX);
    };
    const handleMouseUp = (e) => {
        setTranslateX(startX - e.clientX);
    };

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTranslateX(startX - e.touches[0].clientX);
    };

    useEffect(() => {
        console.log("change happened");
        console.log(translateX);

        if (translateX > 0) nextSlide()
        else if (translateX < 0) prevSlide();
    }, [translateX]);

    return (
        <div className="fixed inset-0 z-30 overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}>
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

            <div className="absolute w-50 h-50 top-50 left-50 z-10 bg-black/50 pointer-events-auto" />
            {/* Navigation Arrows */}
            {(images.length > 1) && (
                <>  <button
                    // onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 pointer-events-auto"
                    aria-label="Previous slide"
                >
                    &#8249;
                </button>
                    <button
                        // onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 pointer-events-auto"
                        aria-label="Next slide"
                    >
                        &#8250;
                    </button>
                </>
            )}

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2 pointer-events-auto">
                {images.map((_, index) => (
                    <button
                        key={index}
                        // onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};