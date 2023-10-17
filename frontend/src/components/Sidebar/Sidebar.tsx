import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SidebarInterface {
  page: 'dashboard' | 'productsboard' | 'ordersboard'| 'usersboard'
}

const Sidebar: React.FC<SidebarInterface> = ({ page }) => {
  const navigate = useNavigate();

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
    <aside className={`${isMenuOpen ? "sidebar" : "sidebar close"} ${isSticky ? "sticky" : ""}`}>
      <div className="sidebar-logo">
        <div className="menu-bar" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={isMenuOpen ? "line activeLine1" : "line"}></div>
          <div className={isMenuOpen ? "line activeLine2" : "line"}></div>
          <div className={isMenuOpen ? "line activeLine3" : "line"}></div>
        </div>
      </div>
      <nav className="sidebar-navigate">
        <ul>
          <li
            className={page === 'dashboard' ? "sidebar-navigate__item active" : "sidebar-navigate__item"}
            onClick={() => navigate('/dashboard')}
          >
            <DashboardIcon sx={{ fontSize: 25 }} />
            <span>Dashboard</span>
          </li>
          <li
            className={page === 'productsboard' ? "sidebar-navigate__item active" : "sidebar-navigate__item"}
            onClick={() => navigate('/dashboard/products')}
          >
            <InventoryIcon sx={{ fontSize: 25 }} />
            <span>Productos</span>
          </li>
          <li
            className={page === 'ordersboard' ? "sidebar-navigate__item active" : "sidebar-navigate__item"}
            onClick={() => navigate('/dashboard/orders')}
          >
            <ShoppingCartIcon sx={{ fontSize: 25 }} />
            <span>Pedidos</span>
          </li>
          <li
            className={page === 'usersboard' ? "sidebar-navigate__item active" : "sidebar-navigate__item"}
            onClick={() => navigate('/dashboard/users')}
          >
            <GroupIcon sx={{ fontSize: 25 }} />
            <span>Usuarios</span>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar