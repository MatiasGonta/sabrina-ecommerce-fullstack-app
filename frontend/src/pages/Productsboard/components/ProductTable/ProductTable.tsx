import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useDeleteProductMutation, useGetProductsQuery } from "@/hooks";
import { ApiError, COLORS, LoadingSpinnerType, Product, Routes } from "@/models";
import { dateFormat, getError } from "@/utilities";
import { DeleteCell } from "@/components";
import { LoadingSpinner, TablePagination, TableRefreshButton, TableSearchBar, TableWrapper, Td } from '@/components/ui';
import { useState } from "react";
import { Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ProductStock } from './ProductStock';

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

  const pageRange = {
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
    <TableWrapper>
      <TableSearchBar
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
        onSubmit={handleOnSubmit}
      />
      <TableRefreshButton onClick={() => refetch()} />

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
                  <Td>{product._id}</Td>
                  <Td textWeight='bold'>
                    <Link to={`${Routes.PRODUCTS}/${product.slug}`}>{product.name}</Link>
                  </Td>
                  <Td>
                    <img className="product-image" src={product.images[0]} alt={product.slug + 'main-image'} />
                  </Td>
                  {
                    product.images && product.images.slice(1).length > 0 ? (
                      <Td>
                        <ul className="product-image-list">
                          {product.images.slice(1).map((src, index) => (
                            <li key={index}>
                              <img src={src} alt={product.slug} />
                            </li>
                          ))}
                        </ul>
                      </Td>
                    ) : (<Td />)
                  }
                  <Td>{product.category}</Td>
                  {
                    product.brand !== ''
                      ? <Td>{product.brand}</Td>
                      : <Td />
                  }
                  <Td textAlign='right'>${product.price.toFixed(2)}</Td>
                  {
                    product.colors ? (
                      <Td>
                        <ul className="product-colors">
                          {product.colors.map(color => (
                            <li key={color}>
                              <Tooltip title={color} >
                                <div style={{ backgroundColor: COLORS[color as keyof typeof COLORS] }}></div>
                              </Tooltip>
                            </li>
                          ))}
                        </ul>
                      </Td>
                    ) : (<Td />)
                  }
                  {
                    product.sizes && product.sizes.length > 0
                      ? (
                        <Td>
                          <ul className="product-sizes">
                            {product.sizes.map(size => (
                              <li key={size}>
                                <span>{size}</span>
                              </li>
                            ))}
                          </ul>
                        </Td>
                      ) : (<Td />)
                  }
                  <Td>
                    <ProductStock product={product} />
                  </Td>
                  <Td>{dateFormat(product.createdAt)}</Td>
                  <Td>{dateFormat(product.updatedAt)}</Td>
                  <Td>
                    <Tooltip title='Actualizar'>
                      <button className="table-edit-btn">
                        <EditOutlinedIcon
                          sx={{ fontSize: 25, cursor: 'pointer' }}
                          onClick={() => navigate(`${Routes.DASHBOARD_PRODUCTS_UPDATE}/${product.slug}`)}
                        />
                      </button>
                    </Tooltip>
                  </Td>
                  <Td>
                    <DeleteCell id={product._id!} deleteFunc={deleteProduct} loadingMsg='Eliminando producto...' />
                  </Td>
                </tr>
              )) : <span className="table-empty-message">No hay productos en este momento...</span>
              }
            </tbody>
          </table>
        </div>
      )}

      <TablePagination
        currentPage={currentPage}
        totalPages={allProducts?.totalPages}
        totalItems={allProducts?.totalDocs}
        pageRange={pageRange}
        paginationHandler={handlePaginate}
      />
    </TableWrapper>
  );
}

export default ProductTable