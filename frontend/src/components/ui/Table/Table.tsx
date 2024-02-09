import ReplayIcon from '@mui/icons-material/Replay';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Tooltip } from '@mui/material';
import { HTMLProps } from 'react';
import React from 'react';

interface TableWrapperInterface {
    children: React.ReactNode;
}

export const TableWrapper: React.FC<TableWrapperInterface> = ({ children }) => <div className="table-wrapper">{children}</div>

interface TableInterface {
    children: React.ReactNode;
}

export const Table: React.FC<TableInterface> = ({ children }) => {
    return (
        <div className="table">
            <table>
                {children}
            </table>
        </div>
    )
}

interface TableSearchBarInterface {
    onChange: HTMLProps<HTMLInputElement>['onChange'];
    onSubmit: HTMLProps<HTMLFormElement>['onSubmit'];
}

export const TableSearchBar: React.FC<TableSearchBarInterface> = ({ onChange, onSubmit }) => {
    return (
        <form className="table-search-bar" onSubmit={onSubmit}>
            <input className="table-search-bar__input" type="text" placeholder="BUSCAR" onChange={onChange} />
            <button type="submit" className="table-search-bar__submit-btn">
                <Tooltip title='Buscar'>
                    <SearchOutlinedIcon sx={{ fontSize: 20 }} />
                </Tooltip>
            </button>
        </form>
    )
}

interface TableRefreshButtonInterface {
    onClick: HTMLProps<HTMLButtonElement>['onClick'];
}

export const TableRefreshButton: React.FC<TableRefreshButtonInterface> = (props) => {
    return (
        <Tooltip title='Refrescar'>
            <button className="table-reload-btn" {...props}>
                <ReplayIcon sx={{ fontSize: 30 }} />
            </button>
        </Tooltip>
    )
}

type PageRange = {
    min: number;
    max: number;
}

interface TablePaginationInterface {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageRange: PageRange;
    paginationHandler: (newPage: number) => void;
}

export const TablePagination: React.FC<TablePaginationInterface> = ({ currentPage, totalPages, totalItems, pageRange, paginationHandler }) => {
    return (
        <div className="table-pagination">
            <span className="table-pagination__range">{pageRange.min}-{pageRange.max} de {totalItems}</span>
            <button
                className={`table-pagination__btn ${currentPage === 1 && 'table-pagination__btn--disabled'}`}
                onClick={() => paginationHandler(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeftIcon sx={{ fontSize: 25 }} />
            </button>
            <span className="table-pagination__current-page">{currentPage}</span>
            <button
                className={`table-pagination__btn ${currentPage === totalPages && 'table-pagination__btn--disabled'}`}
                onClick={() => paginationHandler(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRightIcon sx={{ fontSize: 25 }} />
            </button>
        </div>
    )
}

interface TdInterface extends HTMLProps<HTMLTableCellElement> {
    textAlign?: 'left' | 'center' | 'right';
    textWeight?: 'normal' | 'bold';
    status?: 'complete' | 'pending' | 'cancelled';
    children?: React.ReactNode;
}

export const Td: React.FC<TdInterface> = ({ textAlign = 'center', textWeight = 'normal', status, children, ...rest }) => {
    return (
        <td className="table-td" style={{ textAlign: textAlign, fontWeight: textWeight }} {...rest}>
            {children
                ? status
                    ? <span className={'table-td--' + status}>{children}</span>
                    : children
                : <span className="table-td__empty-bar">-</span>
            }
        </td>
    )
}