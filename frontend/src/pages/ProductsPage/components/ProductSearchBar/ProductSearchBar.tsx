import { useSearchProductsQuery } from '@/hooks';
import { LoadingSpinnerType, Product, Routes } from '@/models';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoadingSpinner } from '@/components/ui';

interface ProductSearchBarInterface {
  products: Product[];
}

const ProductSearchBar: React.FC<ProductSearchBarInterface> = () => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState<string>('');

    const { searchProducts, refetch, hasNextPage, fetchNextPage } = useSearchProductsQuery(searchTerm);

    const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setSearchTerm(e.target.value);

      if (e.target.value !== searchTerm) {
        refetch();
      }
    }

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      navigate(`${Routes.SEARCH}?q=${searchTerm}`);
    };

  return (
    <form className="sub-navbar__search-bar" onSubmit={(e) => handleSearchSubmit(e)}>
      <input
        className="sub-navbar__search-bar__input"
        type="text"
        placeholder="BUSCAR"
        onChange={(e) => handleSearchOnChange(e)}
      />

      <div className="sub-navbar__search-bar__input__autocomplete" id="hola">
        <InfiniteScroll
          dataLength={searchProducts.length}
          hasMore={hasNextPage}
          next={()=> fetchNextPage()}
          loader={<LoadingSpinner type={LoadingSpinnerType.FLEX}/>}
          scrollableTarget="hola"
        >
          {
            searchProducts.length !== 0 &&
            <ul className="sub-navbar__search-bar__input__autocomplete__list">
              {
                searchProducts.map(({ name, slug, images }, index) => (
                  <li key={index}>
                    <Link to={`${Routes.PRODUCTS}/${slug}`} className="autocomplete-item">
                      <div className="autocomplete-item__img-wrapper">
                        <img src={images[0]} alt={slug} />
                      </div>
                      <span className="autocomplete-item__name">{name}</span>
                    </Link>
                  </li>
                ))
              }
            </ul>
          }
        </InfiniteScroll>
      </div>
      
      <button className="sub-navbar__search-bar__btn" type="submit" >
        <Tooltip title="Buscar">
          <SearchOutlinedIcon sx={{ fontSize: 20 }} />
        </Tooltip>
      </button>
    </form>
  )
}

export default ProductSearchBar