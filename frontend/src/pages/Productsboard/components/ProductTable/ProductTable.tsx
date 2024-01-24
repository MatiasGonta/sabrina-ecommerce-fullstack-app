import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useDeleteProductMutation, useGetProductsQuery } from "@/hooks";
import { ApiError, COLORS, LoadingSpinnerType, Product, Routes, monthNames } from "@/models";
import { getError } from "@/utilities";
import { DeleteCell } from "@/components";
import { LoadingSpinner } from '@/components/ui';
import { useState } from "react";
import { Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ProductStock } from './ProductStock';

type PageRange = {
  min: number;
  max: number;
}

interface ProductTableInterface { }

const ProductTable: React.FC<ProductTableInterface> = () => {
  const navigate = useNavigate();

  const itemsPerPage: number = 10;
  const initialPage: number = 1;

  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const [searchInput, setSearchInput] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const [orderBy, setOrderBy] = useState<'price' | 'createdAt' | 'updatedAt'>('updatedAt');
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('desc');

  const { mutateAsync: deleteProduct } = useDeleteProductMutation();

  const { data: allProducts, isLoading, error, refetch } = useGetProductsQuery(
    currentPage,
    itemsPerPage,
    searchTerm,
    orderBy,
    orderDirection
  );

  const pageRange: PageRange = {
    min: currentPage === 1 ? 1 : itemsPerPage * (currentPage - 1),
    max: allProducts?.hasNextPage ? itemsPerPage * currentPage : allProducts?.totalDocs
  }

  const handlePaginate = (newPage: number) => setCurrentPage(newPage);

  const handleSort = (property: 'price' | 'createdAt' | 'updatedAt') => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderBy(property);
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setCurrentPage(initialPage);
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(initialPage);
    setSearchTerm(searchInput);
    refetch();
  }

  return (
    <div className="table-container">
      <form className="table-search" onSubmit={(e) => handleOnSubmit(e)}>
        <input type="text" placeholder="BUSCAR" onChange={(e) => setSearchInput(e.target.value)} />
        <button type="submit">
          <Tooltip title='Buscar'>
            <SearchOutlinedIcon sx={{ fontSize: 20 }} />
          </Tooltip>
        </button>
      </form>
      <Tooltip title='Refrescar'>
        <button className="table-reload-btn">
          <ReplayIcon
            sx={{ fontSize: 30 }}
            onClick={() => refetch()}
          />
        </button>
      </Tooltip>
      {isLoading ? (
        <LoadingSpinner type={LoadingSpinnerType.FLEX} />
      ) : error ? (
        <h4>{getError(error as ApiError)}</h4>
      ) : (
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Imagen principal</th>
                <th>Imagenes secundarias</th>
                <th>Categoria</th>
                <th>Marca</th>
                <th onClick={() => handleSort('price')}>
                  Precio
                  {orderBy === 'price' && (
                    <span>{orderDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                  )}
                </th>
                <th>Colores</th>
                <th>Talles</th>
                <th>Stock</th>
                <th onClick={() => handleSort('createdAt')}>
                  Fecha de creación
                  {orderBy === 'createdAt' && (
                    <span>{orderDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                  )}
                </th>
                <th onClick={() => handleSort('updatedAt')}>
                  Última actualización
                  {orderBy === 'updatedAt' && (
                    <span>{orderDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                  )}
                </th>
                <th>Actualizar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {allProducts?.docs.length > 0 ? allProducts?.docs.map((product: Product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td className="name-cell">
                    <Link to={`${Routes.PRODUCTS}/${product.slug}`}>{product.name}</Link>
                  </td>
                  <td className="img-cell__main">
                    <img src={product.images[0]} alt={product.slug} />
                  </td>
                  <td className="img-cell__secondary">
                    <ul>
                      {
                        product.images.slice(1).length > 0
                          ? product.images.slice(1).map(img => (
                            <li key={img}>
                              <img src={img} alt={product.slug} />
                            </li>
                          ))
                          : <span className="bar">-</span>
                      }
                    </ul>
                  </td>
                  <td>{product.category}</td>
                  <td>
                    {
                      product.brand !== ''
                        ? <span>{product.brand}</span>
                        : <span className="bar">-</span>
                    }
                  </td>
                  <td className="price-cell">${product.price.toFixed(2)}</td>
                  <td className="colors-cell">
                    <ul>
                      {
                        product.colors.map(color => (
                          <li key={color}>
                            <Tooltip title={color} >
                              <div style={{ backgroundColor: COLORS[color as keyof typeof COLORS] }}></div>
                            </Tooltip>
                          </li>
                        ))
                      }
                    </ul>
                  </td>
                  <td className="sizes-cell">
                    <ul>
                      {
                        product.sizes.length > 0
                          ? product.sizes.map(size => (
                            <li key={size}>
                              <span>{size}</span>
                            </li>
                          ))
                          : <span className="bar">-</span>
                      }
                    </ul>
                  </td>
                  <td className="stock-cell">
                    <ProductStock product={product} />
                  </td>
                  <td className="date-cell">{`${product.createdAt.substring(8, 10)} ${monthNames[parseInt(product.createdAt.substring(5, 7)) - 1]} ${product.createdAt.substring(0, 4)}`}</td>
                  <td className="date-cell">{`${product.updatedAt.substring(8, 10)} ${monthNames[parseInt(product.updatedAt.substring(5, 7)) - 1]} ${product.updatedAt.substring(0, 4)}`}</td>
                  <td>
                    <Tooltip title='Actualizar'>
                      <button className="edit-btn">
                        <EditOutlinedIcon
                          sx={{ fontSize: 25, cursor: 'pointer' }}
                          onClick={() => navigate(`${Routes.DASHBOARD_PRODUCTS_UPDATE}/${product.slug}`)}
                        />
                      </button>
                    </Tooltip>
                  </td>
                  <td>
                    <DeleteCell id={product._id!} deleteFunc={deleteProduct} loadingMsg='Eliminando producto...' />
                  </td>
                </tr>
              )) : <span className="table-empty-message">No hay productos en este momento...</span>
              }
            </tbody>
          </table>
        </div>
      )}
      <div className="table-pagination">
        <span className="table-pagination__range">{pageRange.min}-{pageRange.max} de {allProducts?.totalDocs}</span>
        <button
          className={`table-pagination__back-btn ${currentPage === 1 && 'disabled'}`}
          onClick={() => handlePaginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon sx={{ fontSize: 25 }} />
        </button>
        <span className="table-pagination__current-page">{currentPage}</span>
        <button
          className={`table-pagination__next-btn ${currentPage === allProducts?.totalPages && 'disabled'}`}
          onClick={() => handlePaginate(currentPage + 1)}
          disabled={currentPage === allProducts?.totalPages}
        >
          <ChevronRightIcon sx={{ fontSize: 25 }} />
        </button>
      </div>
    </div>
  );
}

export default ProductTable