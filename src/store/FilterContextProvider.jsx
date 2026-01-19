import { createContext, useState } from "react";
import { SidebarContext } from "./SidebarContextProvider";

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

    const [filters, setFilters] = useState(null);

    function onFilterChange(f) {
        setFilters(f);
    }

    const ctxValue = {
        filters,
        onFilterChange,
    };

    return <SidebarContext.Provider value={ctxValue}>{children}</SidebarContext.Provider>
}