import { createContext, useState } from "react";

export const FilterContext = createContext({
    filters: {},
    onFilterChange: () => { },
    resetFilters: () => { },
});

const createInitialFilters = () => ({
    unitType: [],
    bedrooms: [],
    bathrooms: [],
    area: null,
    price: null,
});

export default function FilterContextProvider({ children }) {
    const [filters, setFilters] = useState(createInitialFilters());

    function onFilterChange(f) {
        setFilters(f);
    }

    function resetFilters() {
        setFilters(createInitialFilters());
    }

    const ctxValue = {
        filters,
        onFilterChange,
        resetFilters,
    };

    return <FilterContext.Provider value={ctxValue}>{children}</FilterContext.Provider>
}