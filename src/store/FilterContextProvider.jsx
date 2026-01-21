import { createContext, useState } from "react";

export const FilterContext = createContext({
    filters: {},
    onFilterChange: () => { },
});

export default function FilterContextProvider({ children }) {
    const initFilters = {
        unitType: [],
        bedrooms: [],
        bathrooms: [],
        area: null,
        price: null,
    };

    const [filters, setFilters] = useState(initFilters);

    function onFilterChange(f) {
        setFilters(f);
    }

    const ctxValue = {
        filters,
        onFilterChange,
    };

    return <FilterContext.Provider value={ctxValue}>{children}</FilterContext.Provider>
}