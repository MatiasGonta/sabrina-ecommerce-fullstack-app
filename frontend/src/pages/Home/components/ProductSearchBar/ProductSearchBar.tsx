import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

interface ProductSearchBarInterface {}

const ProductSearchBar: React.FC<ProductSearchBarInterface> = () => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      navigate(`/search?q=${searchTerm}`);
    };

  return (
    <form className="sub-navbar__search-box" onSubmit={(e) => handleSearchSubmit(e)}>
      <input type="text" placeholder="BUSCAR" onChange={(e) => setSearchTerm(e.target.value)} />
      <button type="submit" >
        <SearchOutlinedIcon sx={{ fontSize: 20 }} />
      </button>
    </form>
  )
}

export default ProductSearchBar