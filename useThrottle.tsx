import React, { useRef } from "react";

type ThrottleFunction = (func: () => void, delay?: number) => void;

const useThrottle = (): ThrottleFunction => {
    const throttleSeed = useRef<NodeJS.Timeout | null>(null);

    const throttleFunction = useRef<ThrottleFunction>((func, delay = 200) => {
        if (!throttleSeed.current) {
            func();
            throttleSeed.current = setTimeout(() => {
                throttleSeed.current = null;
            }, delay);
        }
    });

    return throttleFunction.current;
};

export default useThrottle;

// HOW TO USE
// const throttle = useThrottle();
// throttle(() => console.log("test"), 3000);
