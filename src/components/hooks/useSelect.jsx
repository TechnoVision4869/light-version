import { useState } from "react";

export function useSelect() {
    const [selectedId, setSelectedId] = useState(null);

    const isSelected = (id) => selectedId === id;

    const select = (id) => {
        setSelectedId(id);
    };

    const clearSelection = () => {
        setSelectedId(null);
    };

    return {
        selectedId,
        isSelected,
        select,
        clearSelection,
    };
}