import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useDeleteOrderMutation, useGetAllOrdersHistoryQuery } from "@/hooks";
import { ApiError, LoadingSpinnerType, Routes } from "@/models";
import { dateFormat, getError } from "@/utilities";
import { Link, useNavigate } from "react-router-dom";
import { DeleteCell } from "..";
import { LoadingSpinner, Table, TablePagination, TableRefreshButton, TableSearchBar, TableWrapper, Td } from '@/components/ui';
import { useState } from "react";
import { Order } from '@/models';
import { UpdateOrderCell } from './UpdateOrderCell';
import { Typography } from '@mui/material';

interface OrderTableInterface {
  itemsPerPage: number;
  template: 'short' | 'default' | 'admin';
  user?: boolean;
}

const OrderTable: React.FC<OrderTableInterface> = ({ itemsPerPage, template, user }) => {
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

  const pageRange = {
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
    <TableWrapper>
      {template !== 'short' && (
        <TableSearchBar
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
          onSubmit={handleOnSubmit}
        />
      )}

      {template !== 'short' && <TableRefreshButton onClick={() => refetch()} />}

      {isLoading ? (
        <LoadingSpinner type={LoadingSpinnerType.FLEX} />
      ) : error ? (
        <Typography fontSize={20} fontWeight="bold" component="h2" noWrap={false}>{getError(error as ApiError)}</Typography>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              {template !== 'default' && <th>Email del Usuario</th>}
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
              {template !== 'default' && <th>Actualizar</th>}
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {allOrders?.docs.length > 0 ? allOrders?.docs.map((order: Order) => (
              <tr key={order._id}>
                <Td>{order._id}</Td>
                {template !== 'default' &&
                  <Td>
                    {order.userEmail}
                  </Td>
                }
                <Td>{dateFormat(order.createdAt)}</Td>
                <Td textAlign='right'>${order.totalPrice.toFixed(2)}</Td>
                <Td>{order.paymentMethod}</Td>
                <Td>
                  {
                    order.isPaid
                      ? dateFormat(order.paidAt)
                      : 'No'
                  }
                </Td>
                <Td>
                  {
                    order.isDelivered
                      ? dateFormat(order.deliveredAt)
                      : 'No'
                  }
                </Td>
                {order.isDelivered && order.isPaid ? (
                  <Td status="complete">Completado</Td>
                ) : order.isCancelled ? (
                  <Td status="cancelled">Cancelado</Td>
                ) : (
                  <Td status="pending">Pendiente</Td>
                )}
                <Td>
                  <button
                    type="button"
                    onClick={() => navigate(`${Routes.ORDER}/${order._id}`)}
                    className="table-details-btn"
                  >Detalle</button>
                </Td>
                {
                  template !== 'default' &&
                  <Td>
                    <UpdateOrderCell
                      orderId={order._id}
                      orderItems={order.orderItems}
                      isDelivered={order.isDelivered}
                      isPaid={order.isPaid}
                      payMethod={order.paymentMethod}
                    />
                  </Td>
                }
                <Td>
                  {order.isPaid && template === 'default'
                    ? (
                      <button
                        className="table-delete-btn table-disabled-btn"
                        type="button"
                        disabled
                      >
                        <DeleteForeverOutlinedIcon sx={{ fontSize: 65 }} />
                      </button>
                    ) : (
                      <DeleteCell id={order._id} deleteFunc={deleteOrder} loadingMsg="Eliminando orden..." />
                    )
                  }
                </Td>
              </tr>
            )) : (
              user
                ? <span className="table-empty-message">No hay pedidos para mostrar. <Link to={Routes.PRODUCTS}>¿Por qué no empiezas haciendo tu primer pedido?</Link></span>
                : <span className="table-empty-message">No hay pedidos disponibles en este momento...</span>
            )
            }
          </tbody>
        </Table>
      )}

      {template !== 'short' &&
        <TablePagination
          currentPage={currentPage}
          totalPages={allOrders?.totalPages}
          totalItems={allOrders?.totalDocs}
          pageRange={pageRange}
          paginationHandler={handlePaginate}
        />
      }
    </TableWrapper>
  );
}

export default OrderTable