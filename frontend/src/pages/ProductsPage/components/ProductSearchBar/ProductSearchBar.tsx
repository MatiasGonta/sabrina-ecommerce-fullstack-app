import { useSearchProductsQuery } from '@/hooks';
import { LoadingSpinnerType, Routes } from '@/models';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoadingSpinner } from '@/components/ui';
import { FiltersContext } from '../../context';

interface ProductSearchBarInterface { }

const ProductSearchBar: React.FC<ProductSearchBarInterface> = () => {
  const { filters, addFilter, removeFilter } = useContext(FiltersContext);

  const [searchTerm, setSearchTerm] = useState<string>(filters.q || '');

  const { searchProducts, refetch, hasNextPage, fetchNextPage } = useSearchProductsQuery(searchTerm);

  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);

    if (e.target.value !== searchTerm) {
      refetch();
    }
  }

  const handleClearSearch = () => {
    if (searchTerm === filters.q) {
      removeFilter('q');
    }
    
    setSearchTerm('')
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFilter('q', searchTerm);
  };

  return (
    <form className={`sub-navbar__search-bar ${searchTerm !== '' && 'sub-navbar__search-bar--active'}`} onSubmit={(e) => handleSearchSubmit(e)}>
      {searchTerm !== '' && (
          <div className="sub-navbar__search-bar__clear">
            <CloseIcon sx={{ fontSize: 25 }} onClick={handleClearSearch} />
          </div>
        )
      }

      <input
        className="sub-navbar__search-bar__input"
        type="text"
        placeholder="BUSCAR"
        value={searchTerm}
        defaultValue={searchTerm}
        onChange={(e) => handleSearchOnChange(e)}
      />

      {
        searchProducts.length !== 0 &&
        <div className="sub-navbar__search-bar__input__autocomplete" id="autocomplete-wrapper">
          <InfiniteScroll
            dataLength={searchProducts.length}
            hasMore={hasNextPage}
            next={() => fetchNextPage()}
            loader={<LoadingSpinner type={LoadingSpinnerType.FLEX} />}
            scrollableTarget="autocomplete-wrapper"
          >
            <ul className="sub-navbar__search-bar__input__autocomplete__list">
              {
                searchProducts.map(({ name, image, slug }, index) => (
                  <li key={index}>
                    <Link to={`${Routes.PRODUCTS}/${slug}`} className="autocomplete-item">
                      <div className="autocomplete-item__img-wrapper">
                        <img src={image} alt={slug} />
                      </div>
                      <span className="autocomplete-item__name">{name}</span>
                    </Link>
                  </li>
                ))
              }
            </ul>
          </InfiniteScroll>
        </div>
      }

      <button className="sub-navbar__search-bar__btn" type="submit" >
        <Tooltip title="Buscar">
          <SearchOutlinedIcon sx={{ fontSize: 20 }} />
        </Tooltip>
      </button>
    </form>
  )
}

export default ProductSearchBar