import { useState, useEffect, useCallback } from 'react';
import { DATA } from '../data/layers';

// Carousel component for gallery
export default function Gallery({ currentItem, galleryType, autoPlay = true, interval = 5000 }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentApartment = DATA.apartments.find(a => a.id === currentItem?.id);
    const images = currentApartment?.[galleryType] || [];

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Auto-play logic
    useEffect(() => {
        if (!autoPlay) return;
        const play = setInterval(nextSlide, interval);
        return () => clearInterval(play);
    }, [autoPlay, interval, nextSlide]);

    return (
        <div className="fixed inset-0 z-30 overflow-hidden">
            {/* Centered Sharp Image */}
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

            {/* Navigation Arrows */}
            {
                (images.length > 1) && (
                    <>  <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 pointer-events-auto"
                        aria-label="Previous slide"
                    >
                        &#8249;
                    </button>
                        <button
                            onClick={nextSlide}
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
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};