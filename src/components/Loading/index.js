import { useEffect, useRef } from "react";

export function Loading(){
    const ref = useRef(null);
    
    useEffect(() => {
        import("@lottiefiles/lottie-player");
    }, [])

    return(
        <lottie-player
            id="firstLottie"
            ref={ref}
            autoplay     
            loop
            mode="normal"
            src="https://assets4.lottiefiles.com/packages/lf20_Stt1R6.json"
            style={{ width: "64px", height: "64px" }}
        ></lottie-player>
    )
}