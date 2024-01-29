import { useContext, useState } from "react";
import { FiltersContext } from "../../../context";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Tooltip, Typography } from '@mui/material';

interface PriceRangeFilterInterface { }

type PriceRange = {
    minPrice: string;
    maxPrice: string;
}

const PriceRangeFilter: React.FC<PriceRangeFilterInterface> = () => {
    const { addFilter } = useContext(FiltersContext);

    const emptyPriceRange: PriceRange = {
        minPrice: '',
        maxPrice: ''
    }

    const [priceRange, setPriceRange] = useState<PriceRange>(emptyPriceRange);

    const handlePriceRangeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addFilter('priceMin', priceRange.minPrice);
        addFilter('priceMax', priceRange.maxPrice);
    }

    return (
        <article className="filters-wrapper__price">
            <Typography fontSize={20} fontWeight="bold" component="h4" mb="10px" noWrap={false}>
                Precio
            </Typography>
            <form className="filters-wrapper__price__form" onSubmit={(e) => handlePriceRangeSubmit(e)}>
                <input
                    className="filters-wrapper__price__form__input-min"
                    type="number"
                    placeholder="Mínimo"
                    onChange={(e) => setPriceRange({ ...priceRange, minPrice: e.target.value })}
                />
                <span>-</span>
                <input
                    className="filters-wrapper__price__form__input-max"
                    type="number"
                    placeholder="Máximo"
                    onChange={(e) => setPriceRange({ ...priceRange, maxPrice: e.target.value })}
                />
                <button className="filters-wrapper__price__form__btn" type='submit'>
                    <Tooltip title="Aplicar">
                        <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
                    </Tooltip>
                </button>
            </form>
        </article>
    )
}

export default PriceRangeFilter