import Lottie from "lottie-react";
import LoadingAnim from "../assets/animation/Loading.json";

export default function Loading() {
    return (
        <div className="text-center text-white p-6 absolute inset-0 flex items-center justify-center z-10">
            <Lottie
                animationData={LoadingAnim}
                loop={true}
                style={{ width: 120, height: 120 }}
            />
        </div>
    )
}