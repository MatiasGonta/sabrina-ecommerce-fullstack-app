import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Routes } from '@/models';

interface SidebarInterface {}

const Sidebar: React.FC<SidebarInterface> = () => {
  let { pathname } = useLocation();
  let currentPath = pathname.split("/")[2];

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const [isSticky, setIsSticky] = useState<boolean>(false);

  const handleScroll = () => {
    const offsetTop = 150;
    setIsSticky(window.scrollY >= offsetTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <aside className={`sidebar ${!isMenuOpen && "sidebar--close"} ${isSticky && "sidebar--sticky"}`}>
      {/* Sidebar toggle icon */}
      <div className="sidebar__icon">
        <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`sidebar__icon__line ${isMenuOpen && "sidebar__icon__line--activeLine1"}`}></div>
          <div className={`sidebar__icon__line ${isMenuOpen && "sidebar__icon__line--activeLine2"}`}></div>
          <div className={`sidebar__icon__line ${isMenuOpen && "sidebar__icon__line--activeLine3"}`}></div>
        </div>
      </div>

      <nav className="sidebar__navigate">
        <ul className="sidebar__navigate__list">
          <li className="sidebar__navigate__list__item">
            <Link to={Routes.DASHBOARD} className={`sidebar__navigate__list__item__link ${currentPath !== 'products'&& currentPath !== 'orders' && currentPath !== 'users' && "sidebar__navigate__list__item__link--active"}`}>
              <DashboardIcon sx={{ fontSize: 25 }} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="sidebar__navigate__list__item">
            <Link to={Routes.DASHBOARD_PRODUCTS} className={`sidebar__navigate__list__item__link ${currentPath === 'products' && "sidebar__navigate__list__item__link--active"}`}>
              <InventoryIcon sx={{ fontSize: 25 }} />
              <span>Productos</span>
            </Link>
          </li>
          <li className="sidebar__navigate__list__item">
            <Link to={Routes.DASHBOARD_ORDERS} className={`sidebar__navigate__list__item__link ${currentPath === 'orders' && "sidebar__navigate__list__item__link--active"}`}>
              <ShoppingCartIcon sx={{ fontSize: 25 }} />
              <span>Pedidos</span>
            </Link>
          </li>
          <li className="sidebar__navigate__list__item">
            <Link to={Routes.DASHBOARD_USERS} className={`sidebar__navigate__list__item__link ${currentPath === 'users' && "sidebar__navigate__list__item__link--active"}`}>
              <GroupIcon sx={{ fontSize: 25 }} />
              <span>Usuarios</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar