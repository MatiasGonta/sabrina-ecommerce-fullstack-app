import { useContext, useState } from "react";
import { FiltersContext } from "../../../context";
import { FilterItem } from "@/models";
import { Typography } from "@mui/material";

interface BrandFilterInterface {
    brands: FilterItem[];
}

const BrandFilter: React.FC<BrandFilterInterface> = ({ brands }) => {
    const { addFilter } = useContext(FiltersContext);

    const [visibleBrands, setVisibleBrands] = useState(7);

    const handleShowMoreBrands = () => {
        if (brands.length > 7 && visibleBrands !== brands.length) {
            setVisibleBrands(brands.length);
        } else {
            setVisibleBrands(7);
        }
    };

    return (
        <article className="filters-wrapper__brand">
            <Typography fontSize={20} fontWeight="bold" component="h4" mb="10px" noWrap={false}>
                Marca
            </Typography>
            <ul className="filters-wrapper__brand__list">
                {brands.slice(0, visibleBrands).map((brand: FilterItem) => (
                    <li key={brand._id}>
                        <span onClick={() => addFilter('brand', brand._id)}>{`${brand._id} (${brand.count})`}</span>
                    </li>
                ))}
            </ul>
            {
                brands.length > 7 && <button
                    className="filters-wrapper__brand__btn"
                    onClick={handleShowMoreBrands}
                >
                    {visibleBrands !== brands.length ? 'Ver más' : 'Ver menos'}
                </button>
            }
        </article>
    )
}

export default BrandFilter