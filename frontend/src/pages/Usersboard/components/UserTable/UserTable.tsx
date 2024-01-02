import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useDeleteUserMutation, useGetAllUsers } from "@/hooks";
import { ApiError, Routes, monthNames } from "@/models";
import { getError } from "@/utilities";
import { DeleteCell, LoadingSpinner } from "@/components";
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
        <LoadingSpinner type='flex' />
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
                  <td>{user._id}</td>
                  <td className="name-cell">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {
                      user.isAdmin
                        ? <span className="completed">Si</span>
                        : <span className="cancelled">No</span>
                    }
                  </td>
                  <td>
                    {
                      user.verify
                        ? <span className="completed">Verificado</span>
                        : <span className="cancelled">No verificado</span>
                    }
                  </td>
                  <td className="date-cell">{`${user.createdAt.substring(8, 10)} ${monthNames[parseInt(user.createdAt.substring(5, 7)) - 1]} ${user.createdAt.substring(0, 4)}`}</td>
                  <td className="date-cell">{`${user.updatedAt.substring(8, 10)} ${monthNames[parseInt(user.updatedAt.substring(5, 7)) - 1]} ${user.updatedAt.substring(0, 4)}`}</td>
                  <td>
                    <Tooltip title='Actualizar'>
                      <button className="edit-btn">
                        <EditOutlinedIcon
                          sx={{ fontSize: 25, cursor: 'pointer' }}
                          onClick={() => navigate(`${Routes.DASHBOARD_USERS_UPDATE}/${user._id}`)}
                        />
                      </button>
                    </Tooltip>
                  </td>
                  <td>
                    <DeleteCell id={user._id} deleteFunc={deleteUser} loadingMsg='Eliminando usuario...' />
                  </td>
                </tr>
              )) : <span className="table-empty-message">No hay usuarios en este momento...</span>
              }
            </tbody>
          </table>
        </div>
      )}
      <div className="table-pagination">
        <span className="table-pagination__range">{pageRange.min}-{pageRange.max} de {allUsers?.totalDocs}</span>
        <button
          className={`table-pagination__back-btn ${currentPage === 1 && 'disabled'}`}
          onClick={() => handlePaginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon sx={{ fontSize: 25 }} />
        </button>
        <span className="table-pagination__current-page">{currentPage}</span>
        <button
          className={`table-pagination__next-btn ${currentPage === allUsers?.totalPages && 'disabled'}`}
          onClick={() => handlePaginate(currentPage + 1)}
          disabled={currentPage === allUsers?.totalPages}
        >
          <ChevronRightIcon sx={{ fontSize: 25 }} />
        </button>
      </div>
    </div>
  );
}

export default UserTable