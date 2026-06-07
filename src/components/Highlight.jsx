import { useContext } from "react"
import { SidebarContext } from "../store/SidebarContextProvider"

export default function Highlight() {
    const { highlightedButton } = useContext(SidebarContext);
    const HIGHLIGHT_IMG = highlightedButton?.highlight || highlightedButton?.highlightAssetId;
    if (HIGHLIGHT_IMG) {
        return (
            <>
            <img
                src={HIGHLIGHT_IMG}
                className="w-full h-full object-cover object-center rounded-2xl absolute inset-0 z-20 transition"
                alt="Highlight">
            </img>
            {/* <div
                className="w-full h-full rounded-2xl absolute inset-0 z-20 transition"
                style={{
                    opacity: 0.4,
                    backgroundColor: '#648B8F',
                    mixBlendMode: 'multiply',
                    maskImage: `url("${HIGHLIGHT_IMG}")`,
                    maskSize: 'cover',
                    maskPosition: 'center',
                    maskRepeat: 'no-repeat',
                    maskMode: 'alpha',
                    WebkitMaskImage: `url("${HIGHLIGHT_IMG}")`,
                    WebkitMaskSize: 'cover',
                    WebkitMaskPosition: 'center',
                    WebkitMaskRepeat: 'no-repeat',
                }}
            /> */}
            </>

        )
    }
}