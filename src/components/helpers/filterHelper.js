export const FILTER_ENUM = {
  TYPE: "unitType",
  AREA: "area",
  PRICE: "price",
  BEDROOMS: "bedrooms",
  BATHROOMS: "bathrooms",
}

export function getMinMaxRange(units, filterName) {
    if(!units) return {
        min: 0,
        max:0,
    }
    
    if (units?.length === 0) {
        return { min: 0, max: 0 };
    }

    let min = Number(units[0][filterName]);
    let max = Number(units[0][filterName]);

    for (let i = 1; i < units.length; i++) {
        const value = Number(units[i][filterName]);
        if (value < min) min = value;
        if (value > max) max = value;
    }
    return {
        min: min,
        max: max,
    }
}

export function getDiscreteValues(units, filterName) {
    return [...new Set(units.map(a => a[filterName]))].sort((a, b) => a - b);
}