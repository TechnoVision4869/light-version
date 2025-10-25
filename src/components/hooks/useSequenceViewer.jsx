// hooks/useImageSequence.js
import { useState, useRef, useEffect, useCallback } from "react";
import { MODE_CONFIG, TABS } from "../../data/layers";

export function useSequenceViewer({
    currentPath,
    history,
    activeTab,
    onGoBack
}) {
    // States
    const [isImagesLoaded, setIsImagesLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // Refs
    const imagesRef = useRef([]);
    const intervalRef = useRef(null);
    const currentIndexRef = useRef(0);
    const imageRef = useRef(null);
    const justNavigatedBackRef = useRef(false);

    // Constants
    const NO_OF_FRAMES = activeTab === TABS.HOME ? 1 : 45;
    const FPS = 45;

    // Update image src when currentIndexRef changes and imagesLoaded is true
    const updateImage = useCallback(() => {
        const currentImage = imagesRef.current[currentIndexRef.current];
        if (imageRef.current && currentImage) {
            imageRef.current.src = currentImage.src;
        }
    }, []);

    // Play forward sequence
    const StartTransition = useCallback(() => {
        if (intervalRef.current) return; // Prevent multiple intervals
        setIsPlaying(true);

        intervalRef.current = setInterval(() => {
            if (currentIndexRef.current >= NO_OF_FRAMES - 1) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
                setIsPlaying(false);
                return;
            }
            currentIndexRef.current += 1;
            updateImage();
        }, 1000 / FPS);
    }, [NO_OF_FRAMES, updateImage]);

    const StartReverse = useCallback(() => {
        if (intervalRef.current || history.length <= 1) return; // Prevent multiple intervals
        setIsPlaying(true);

        intervalRef.current = setInterval(() => {
            if (currentIndexRef.current <= 0) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
                setIsPlaying(false);
                onGoBack(); // Call the goBack function from navigation hook
                return;
            }
            currentIndexRef.current -= 1;
            updateImage();
        }, 1000 / FPS);
    }, [history.length, updateImage, onGoBack]);

    // Load all images once
    useEffect(() => {
        // Clean up previous interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // Reset states for new path
        setIsImagesLoaded(false);

        // 1. define a function that returns a Promise.
        // Promise is an object that represents a value that will be available in the future. It's either loading, resolved or rejected
        const loadImage = (src) => {
            // we use Promise because loading images takes time and JS doesn't wait for it to finish
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img); // When loaded, resolved with the img
                img.onerror = () => reject(new Error(`Failed to load: ${src}`)); // When failed, rejected with an error
                img.src = src; // Set src to start loading
            });
        };

        const loadAllImages = async () => {
            const shouldSkipAutoPlay = justNavigatedBackRef.current;
            // Immediately reset the ref (safe because we stored the value)
            justNavigatedBackRef.current = false;

            let paths;
            // Special handling for HOME layer
            if (activeTab === TABS.HOME) {
                // For HOME, just load a single image at "/home.jpg"
                paths = [currentPath];
            } else {
                // For all other layers, use the sequence pattern
                paths = Array.from(
                    { length: NO_OF_FRAMES },
                    (_, i) =>
                        `${MODE_CONFIG}${currentPath}${currentPath}_${(i + 1)
                            .toString()
                            .padStart(2, "0")}.jpg`
                );
            }

            // 2. use Promise.all to load all images in parallel
            // Promise.all takes an array of Promises and returns a single Promise
            // that resolves when all of the Promises in the array have resolved
            try {
                const loadedImages = await Promise.all(paths.map(loadImage));
                imagesRef.current = loadedImages;
                setIsImagesLoaded(true);

                if (shouldSkipAutoPlay) {
                    // Start at the LAST frame (which matches the previous sequence's first frame)
                    currentIndexRef.current = NO_OF_FRAMES - 1;
                    updateImage();
                } else {
                    // Start at the FIRST frame (normal forward navigation)
                    currentIndexRef.current = 0;
                    updateImage();
                }

                // Only auto-play for non-HOME layers
                if (activeTab !== TABS.HOME && !shouldSkipAutoPlay) {
                    setTimeout(() => StartTransition(), 100);
                } else {
                    setIsPlaying(false);
                }
            } catch (error) {
                console.error("Image loading failed:", error);
            }
        };

        if (currentPath) {
            loadAllImages();
        }
    }, [history]); // Run when component mounts and when dependencies changes

    // Cleanup intervals on unmount
    // we separated the cleanup from the async loading process
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // Function to trigger back navigation with flag
    const goBackWithFlag = useCallback(() => {
        justNavigatedBackRef.current = true;
        onGoBack();
    }, [onGoBack]);

    return {
        isImagesLoaded,
        isPlaying,
        imageRef,
        imagesRef,
        currentIndexRef,
        StartTransition,
        StartReverse,
        updateImage,
        goBackWithFlag
    };
}