import { Product, Routes } from '@/models';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

interface ProductSearchBarInterface {
  products: Product[];
}

const ProductSearchBar: React.FC<ProductSearchBarInterface> = ({ products }) => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      navigate(`${Routes.SEARCH}?q=${searchTerm}`);
    };

  return (
    <form className="sub-navbar__search-bar" onSubmit={(e) => handleSearchSubmit(e)}>
      <input
        className="sub-navbar__search-bar__input"
        list="products"
        type="text" placeholder="BUSCAR"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <datalist id="products">
        {
          products.map(({ name }) => (
            <option value={name}></option>
          ))
        }
      </datalist>
      
      <button className="sub-navbar__search-bar__btn" type="submit" >
        <Tooltip title="Buscar">
          <SearchOutlinedIcon sx={{ fontSize: 20 }} />
        </Tooltip>
      </button>
    </form>
  )
}

export default ProductSearchBar