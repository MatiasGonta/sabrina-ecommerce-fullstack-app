import ReplayIcon from '@mui/icons-material/Replay';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useDeleteOrderMutation, useGetAllOrdersHistoryQuery } from "@/hooks";
import { ApiError, LoadingSpinnerType, Routes, monthNames } from "@/models";
import { getError } from "@/utilities";
import { Link, useNavigate } from "react-router-dom";
import { DeleteCell } from "..";
import { LoadingSpinner } from '@/components/ui';
import { useState } from "react";
import { Tooltip } from '@mui/material';
import { Order } from '@/models';
import { UpdateOrderCell } from './UpdateOrderCell';

type PageRange = {
  min: number;
  max: number;
}

interface OrderTableInterface {
  itemsPerPage: number;
  type: 'short' | 'default' | 'admin';
  user?: boolean;
}

const OrderTable: React.FC<OrderTableInterface> = ({ itemsPerPage, type, user }) => {
  const navigate = useNavigate();

  const initialPage: number = 1;

  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const [searchInput, setSearchInput] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const [orderBy, setOrderBy] = useState<'createdAt' | 'totalPrice' | 'paidAt' | 'deliveredAt'>('createdAt');
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('desc');

  const { mutateAsync: deleteOrder } = useDeleteOrderMutation();

  const { data: allOrders, isLoading, error, refetch } = useGetAllOrdersHistoryQuery(
    currentPage,
    searchTerm,
    orderBy,
    orderDirection,
    itemsPerPage,
    user
  );

  const pageRange: PageRange = {
    min: currentPage === 1 ? 1 : itemsPerPage * (currentPage - 1),
    max: allOrders?.hasNextPage ? itemsPerPage * currentPage : allOrders?.totalDocs
  }

  const handlePaginate = (newPage: number) => {
    setCurrentPage(newPage);
  }

  const handleSort = (property: 'createdAt' | 'totalPrice' | 'paidAt' | 'deliveredAt') => {
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
      {type !== 'short' && (
        <form className="table-search" onSubmit={(e) => handleOnSubmit(e)}>
          <input type="text" placeholder="BUSCAR" onChange={(e) => setSearchInput(e.target.value)} />
          <button type="submit">
            <Tooltip title='Buscar'>
              <SearchOutlinedIcon sx={{ fontSize: 20 }} />
            </Tooltip>
          </button>
        </form>
      )
      }
      {type !== 'short' && (
        <Tooltip title='Refrescar'>
          <button className="table-reload-btn">
            <ReplayIcon
              sx={{ fontSize: 30 }}
              onClick={() => refetch()}
            />
          </button>
        </Tooltip>
      )}
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
                {type !== 'default' && <th>Email del Usuario</th>}
                <th onClick={() => handleSort('createdAt')}>
                  Fecha de creación
                  {orderBy === 'createdAt' && (
                    <span>{orderDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                  )}
                </th>
                <th onClick={() => handleSort('totalPrice')}>
                  Total
                  {orderBy === 'totalPrice' && (
                    <span>{orderDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                  )}
                </th>
                <th>Metodo de Pago</th>
                <th onClick={() => handleSort('paidAt')}>
                  Pagado
                  {orderBy === 'paidAt' && (
                    <span>{orderDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                  )}
                </th>
                <th onClick={() => handleSort('deliveredAt')}>
                  Entregado
                  {orderBy === 'deliveredAt' && (
                    <span>{orderDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                  )}
                </th>
                <th>Estado</th>
                <th>Detalle</th>
                {type !== 'default' && <th>Actualizar</th>}
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {allOrders?.docs.length > 0 ? allOrders?.docs.map((order: Order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  {type !== 'default' && <td>{order.userEmail}</td>}
                  <td>{`${order.createdAt.substring(8, 10)} ${monthNames[parseInt(order.createdAt.substring(5, 7)) - 1]} ${order.createdAt.substring(0, 4)}`}</td>
                  <td className="price-cell">${order.totalPrice.toFixed(2)}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    {
                      order.isPaid
                        ? `${order.paidAt.substring(8, 10)} ${monthNames[parseInt(order.paidAt.substring(5, 7)) - 1]} ${order.paidAt.substring(0, 4)}`
                        : 'No'
                    }
                  </td>
                  <td>
                    {
                      order.isDelivered
                        ? `${order.deliveredAt.substring(8, 10)} ${monthNames[parseInt(order.deliveredAt.substring(5, 7)) - 1]} ${order.deliveredAt.substring(0, 4)}`
                        : 'No'
                    }
                  </td>
                  <td>
                    {order.isDelivered && order.isPaid ? (
                      <span className="completed">Completado</span>
                    ) : order.isCancelled ? (
                      <span className="cancelled">Cancelado</span>
                    ) : (
                      <span className="pending">Pendiente</span>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => navigate(`${Routes.ORDER}/${order._id}`)}
                      className="details-btn"
                    >Detalle</button>
                  </td>
                  {
                    type !== 'default' &&
                    <td>
                      <UpdateOrderCell
                        orderId={order._id}
                        orderItems={order.orderItems}
                        isDelivered={order.isDelivered}
                        isPaid={order.isPaid}
                        payMethod={order.paymentMethod}
                      />
                    </td>
                  }
                  <td>
                    {order.isPaid && type === 'default'
                      ? (
                        <button
                          className="delete-btn disabled"
                          type="button"
                          disabled
                        >
                          <DeleteForeverOutlinedIcon sx={{ fontSize: 25 }} />
                        </button>
                      ) : (
                        <DeleteCell id={order._id} deleteFunc={deleteOrder} loadingMsg="Eliminando orden..." />
                      )
                    }
                  </td>
                </tr>
              )) : (
                user
                  ? <span className="table-empty-message">No hay pedidos para mostrar. <Link to={Routes.PRODUCTS}>¿Por qué no empiezas haciendo tu primer pedido?</Link></span>
                  : <span className="table-empty-message">No hay pedidos disponibles en este momento...</span>
              )
              }
            </tbody>
          </table>
        </div>
      )}
      {type !== 'short' && (
        <div className="table-pagination">
          <span className="table-pagination__range">{pageRange.min}-{pageRange.max} de {allOrders?.totalDocs}</span>
          <button
            className={`table-pagination__back-btn ${currentPage === 1 && 'disabled'}`}
            onClick={() => handlePaginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon sx={{ fontSize: 25 }} />
          </button>
          <span className="table-pagination__current-page">{currentPage}</span>
          <button
            className={`table-pagination__next-btn ${currentPage === allOrders?.totalPages && 'disabled'}`}
            onClick={() => handlePaginate(currentPage + 1)}
            disabled={currentPage === allOrders?.totalPages}
          >
            <ChevronRightIcon sx={{ fontSize: 25 }} />
          </button>
        </div>
      )
      }
    </div>
  );
}

export default OrderTable