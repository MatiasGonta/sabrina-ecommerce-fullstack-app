import { FiltersInterface } from '@/models';
import React, { createContext, useState } from 'react';

export interface FiltersContextInterface {
    filters: FiltersInterface;
    filteredProductsFounded: number;
    handleFilteredProductsFounded: (productsFounded: number) => void;
    addFilter: (filterType: keyof FiltersInterface, value: string) => void;
    removeFilter: (filterType: keyof FiltersInterface, filterIndex?: string) => void;
}

interface FiltersProviderInterface {
    defaultValue: FiltersInterface;
    children: JSX.Element | JSX.Element[];
}

const initialSelectedFilters: FiltersInterface = {
    category: null,
    brand: null,
    color: null,
    size: null,
    priceMin: null,
    priceMax: null,
    q: null,
};

export const FiltersContext = createContext<FiltersContextInterface>({
    filters: initialSelectedFilters,
    filteredProductsFounded: 0,
    handleFilteredProductsFounded: () => { },
    addFilter: () => { },
    removeFilter: () => { },
});

export const FiltersProvider: React.FC<FiltersProviderInterface> = ({ defaultValue, children }) => {
    const [filters, setFilters] = useState<FiltersInterface>(defaultValue);
    const [filteredProductsFounded, setFilteredProductsFounded] = useState<number>(0);

    const handleFilteredProductsFounded = (productsFounded: number) => setFilteredProductsFounded(productsFounded);

    const addFilter = (filterType: keyof FiltersInterface, value: string) => {
        if (filterType === 'priceMin' || filterType === 'priceMax' || filterType === 'q') {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [filterType]: value,
            }));
        } else if (!filters[filterType]!.includes(value)) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [filterType]: [...filters[filterType]!, value],
            }));
        }
    }

    const removeFilter = (filterType: keyof FiltersInterface, filterIndex?: string) => {
        if (filterType !== 'priceMin' && filterType !== 'priceMax' && filterIndex && filterType !== 'q') {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [filterType]: filters[filterType]!.filter((item: string) => item !== filterIndex),
            }));
        } else {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [filterType]: null,
            }));
        }
    }

    const contextFiltersValue: FiltersContextInterface = {
        filters,
        filteredProductsFounded,
        handleFilteredProductsFounded,
        addFilter,
        removeFilter,
    };

    return (
        <FiltersContext.Provider value={contextFiltersValue}>
            {children}
        </FiltersContext.Provider>
    );
};