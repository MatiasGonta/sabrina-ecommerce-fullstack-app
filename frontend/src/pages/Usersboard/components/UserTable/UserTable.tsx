import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useDeleteUserMutation, useGetAllUsers } from "@/hooks";
import { ApiError, LoadingSpinnerType, Routes } from "@/models";
import { dateFormat, getError } from "@/utilities";
import { DeleteCell } from "@/components";
import { LoadingSpinner, TableRefreshButton, TableSearchBar, TableWrapper, TablePagination, Td } from '@/components/ui';
import { useState } from "react";
import { Tooltip } from '@mui/material';
import { User } from '@/models';
import { useNavigate } from 'react-router-dom';

type PageRange = {
  min: number;
  max: number;
}

interface UserTableInterface {
  itemsPerPage: number;
}

const UserTable: React.FC<UserTableInterface> = ({ itemsPerPage }) => {
  const navigate = useNavigate();

  const initialPage: number = 1;

  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const [searchInput, setSearchInput] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  const [orderBy, setOrderBy] = useState<'createdAt' | 'isAdmin' | 'verify' | 'updatedAt'>('createdAt');
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('desc');

  const { mutateAsync: deleteUser } = useDeleteUserMutation();

  const { data: allUsers, isLoading, error, refetch } = useGetAllUsers(
    currentPage,
    itemsPerPage,
    searchTerm,
    orderBy,
    orderDirection
  );

  const pageRange: PageRange = {
    min: currentPage === 1 ? 1 : itemsPerPage * (currentPage - 1),
    max: allUsers?.hasNextPage ? itemsPerPage * currentPage : allUsers?.totalDocs
  }

  const handlePaginate = (newPage: number) => setCurrentPage(newPage);

  const handleSort = (property: 'createdAt' | 'isAdmin' | 'verify' | 'updatedAt') => {
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
                <th>Email</th>
                <th onClick={() => handleSort('isAdmin')}>
                  Admin
                  {orderBy === 'isAdmin' && (
                    <span>{orderDirection === 'asc' ? ': No' : ': Si'}</span>
                  )}
                </th>
                <th onClick={() => handleSort('verify')}>
                  Verify
                  {orderBy === 'verify' && (
                    <span>{orderDirection === 'asc' ? ': No verificado' : ': Verificado'}</span>
                  )}
                </th>
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
              {allUsers?.docs.length > 0 ? allUsers?.docs.map((user: User) => (
                <tr key={user._id}>
                  <Td>{user._id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  {
                    user.isAdmin
                      ? <Td status="complete">Si</Td>
                      : <Td status="cancelled">No</Td>
                  }
                  {
                    user.verify
                      ? <Td status="complete">Verificado</Td>
                      : <Td status="cancelled">No verificado</Td>
                  }
                  <Td>{dateFormat(user.createdAt)}</Td>
                  <Td>{dateFormat(user.updatedAt)}</Td>
                  <Td>
                    <Tooltip title='Actualizar'>
                      <button className="table-edit-btn">
                        <EditOutlinedIcon
                          sx={{ fontSize: 25, cursor: 'pointer' }}
                          onClick={() => navigate(`${Routes.DASHBOARD_USERS_UPDATE}/${user._id}`)}
                        />
                      </button>
                    </Tooltip>
                  </Td>
                  <Td>
                    <DeleteCell id={user._id} deleteFunc={deleteUser} loadingMsg='Eliminando usuario...' />
                  </Td>
                </tr>
              )) : <span className="table-empty-message">No hay usuarios en este momento...</span>
              }
            </tbody>
          </table>
        </div>
      )}

      <TablePagination
        currentPage={currentPage}
        totalPages={allUsers?.totalPages}
        totalItems={allUsers?.totalDocs}
        pageRange={pageRange}
        paginationHandler={handlePaginate}
      />
    </TableWrapper>
  );
}

export default UserTable