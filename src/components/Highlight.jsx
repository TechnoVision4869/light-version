import { useContext } from "react"
import { SidebarContext } from "../store/SidebarContextProvider"

export default function Highlight() {
    const { highlightedButton } = useContext(SidebarContext);
    const HIGHLIGHT_IMG = highlightedButton?.highlight;
    if (HIGHLIGHT_IMG) {
        return (
            <img
                src={HIGHLIGHT_IMG}
                className="w-full h-full object-cover object-center rounded-2xl  absolute inset-0 z-20 transition"
                alt="Highlight">
            </img>
        )
    }
}