import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ApiError, FilterItem, LoadingSpinnerType } from '@/models';
import { useContext, useState } from 'react';
import { FiltersContext } from '../../context';
import { useGetFilterCountsQuery } from '@/hooks';
import { getError } from '@/utilities';
import { ColorBadge, LoadingSpinner } from '@/components/ui';
import { PriceRangeFilter } from './PriceRangeFilter';
import { BrandFilter } from './BrandFilter';
import { Typography } from '@mui/material';

interface FiltersboardInterface { }

const Filtersboard: React.FC<FiltersboardInterface> = () => {
    const { filters, filteredProductsFounded, addFilter, removeFilter } = useContext(FiltersContext);

    // Getting filters
    const { categories, brands, colors, sizes, isLoading, error } = useGetFilterCountsQuery();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleIsOpen = (value: boolean) => {
        if (value !== isOpen) {
            setIsOpen(value);
        }
    }

    return (
        isLoading
            ? (
                <div className="loader-wrapper">
                    <LoadingSpinner type={LoadingSpinnerType.NOFLEX} />
                </div>
            ) : error
                ? <Typography fontSize={20} fontWeight="bold" component="h2" noWrap={false}>{getError(error as ApiError)}</Typography> : (
                    <>
                        <div className="filters-switch">
                            <div className="filters-switch__btn" onClick={() => handleIsOpen(true)}>
                                <span>Filtrar</span>
                                <ArrowForwardIosIcon sx={{ fontSize: 24 }} />
                            </div>
                        </div>
                        <aside className={`filters-wrapper ${isOpen && 'filters-wrapper--open'}`}>
                            <article className="filters-wrapper__head">
                                <div onClick={() => handleIsOpen(false)}>
                                    <ArrowBackIosNewIcon sx={{ fontSize: 32.5 }} />
                                    <Typography fontSize={35} display="inline" fontWeight="bold" component="h2" noWrap={false}>
                                        Filtros
                                    </Typography>
                                </div>
                                <span>{filteredProductsFounded} resultados</span>

                                <ul className="filters-wrapper__head__list">
                                    {filters.q && (
                                        <li className="filters-wrapper__head__list__selected-filter" onClick={() => removeFilter('q')}>
                                            <HighlightOffIcon sx={{ fontSize: 15 }} />
                                            <span>Búsqueda: {filters.q}</span>
                                        </li>
                                    )}
                                    {filters.category && filters.category.map((c) => (
                                        <li className="filters-wrapper__head__list__selected-filter" key={c} onClick={() => removeFilter('category', c)}>
                                            <HighlightOffIcon sx={{ fontSize: 15 }} />
                                            <span>{c}</span>
                                        </li>
                                    ))}
                                    {filters.brand && filters.brand.map((b) => (
                                        <li className="filters-wrapper__head__list__selected-filter" key={b} onClick={() => removeFilter('brand', b)}>
                                            <HighlightOffIcon sx={{ fontSize: 15 }} />
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                    {filters.size && filters.size.map((s) => (
                                        <li className="filters-wrapper__head__list__selected-filter" key={s} onClick={() => removeFilter('size', s)}>
                                            <HighlightOffIcon sx={{ fontSize: 15 }} />
                                            <span>{s}</span>
                                        </li>
                                    ))}
                                    {filters.color && filters.color.map((c) => (
                                        <li className="filters-wrapper__head__list__selected-filter" key={c} onClick={() => removeFilter('color', c)}>
                                            <HighlightOffIcon sx={{ fontSize: 15 }} />
                                            <span>
                                                <ColorBadge color={c} size="medium" />
                                            </span>
                                        </li>
                                    ))}
                                    {filters.priceMin && filters.priceMax && (
                                        <li className="filters-wrapper__head__list__selected-filter" key={`${filters.priceMin}-${filters.priceMax}`} onClick={() => {
                                            removeFilter('priceMin')
                                            removeFilter('priceMax')
                                        }}>
                                            <HighlightOffIcon sx={{ fontSize: 15 }} />
                                            <span>{`Entre $${filters.priceMin} - $${filters.priceMax}`}</span>
                                        </li>
                                    )}
                                    {filters.priceMin && !filters.priceMax && (
                                        <li className="filters-wrapper__head__list__selected-filter" key={filters.priceMin} onClick={() => removeFilter('priceMin')}>
                                            <HighlightOffIcon sx={{ fontSize: 15 }} />
                                            <span>{`Desde $${filters.priceMin}`}</span>
                                        </li>
                                    )}
                                    {!filters.priceMin && filters.priceMax && (
                                        <li className="filters-wrapper__head__list__selected-filter" key={filters.priceMax} onClick={() => removeFilter('priceMax')}>
                                            <HighlightOffIcon sx={{ fontSize: 15 }} />
                                            <span>{`Hasta $${filters.priceMax}`}</span>
                                        </li>
                                    )}
                                </ul>
                            </article>
                            <article className="filters-wrapper__category">
                                <Typography fontSize={20} fontWeight="bold" component="h4" mb="10px" noWrap={false}>
                                    Categoría
                                </Typography>
                                <ul className="filters-wrapper__category__list">
                                    {
                                        categories.map((category: FilterItem) => (
                                            <li key={category._id}>
                                                <span onClick={() => addFilter('category', category._id)}>{`${category._id} (${category.count})`}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </article>
                            <article className="filters-wrapper__size">
                                <Typography fontSize={20} fontWeight="bold" component="h4" mb="10px" noWrap={false}>
                                    Talle
                                </Typography>
                                <ul className="filters-wrapper__size__list">
                                    {
                                        sizes.map((size: FilterItem) => (
                                            <li key={size._id}>
                                                <span onClick={() => addFilter('size', size._id)}>{`${size._id} (${size.count})`}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </article>
                            <article className="filters-wrapper__color">
                                <Typography fontSize={20} fontWeight="bold" component="h4" mb="10px" noWrap={false}>
                                    Color
                                </Typography>
                                <ul className="filters-wrapper__color__list">
                                    {
                                        colors.map((color: FilterItem) => (
                                            <li
                                                key={color._id}
                                                className="filters-wrapper__color__list__color-filter"
                                                onClick={() => addFilter('color', color._id)}
                                            >
                                                <ColorBadge color={color._id} size="large" />
                                            </li>
                                        ))
                                    }
                                </ul>
                            </article>
                            <BrandFilter brands={brands} />
                            <PriceRangeFilter />
                        </aside>
                    </>
                )
    )
}

export default Filtersboard