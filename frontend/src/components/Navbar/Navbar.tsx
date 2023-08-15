import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from '@/redux/store';
import { clearCart } from "@/redux/states/cart.state";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { useGetProfileDetails } from "@/hooks";

interface NavbarInterface {}

const Navbar: React.FC<NavbarInterface> = () => {
    const favorites = useSelector((store: AppStore) => store.favorites);
    const userInfo = useSelector((store: AppStore) => store.userInfo);
    const cart = useSelector((store: AppStore) => store.cart);
    const dispatch = useDispatch();

    // Account menu status
    const [open, setOpen] = useState<boolean>(false);

    const menuRef: any = useRef();
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpen(false);
          }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const cartItemsLength: number = cart.cartItems.reduce((a, c) => a + c.quantity, 0);

    const userId = userInfo?._id || '';
    const userToken = userInfo?.token || '';

    const { profileDetails } = useGetProfileDetails(userToken, userId);

    const signoutHandler = () => {
        dispatch(clearCart);
        localStorage.removeItem('userInfo');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        window.location.href = '/signin';
    }
    
  return (
    <header>
        <nav>
            <Link to="/">
                <img src="/src/assets/fym-icon.png" alt="fym-icon" />
            </Link>
            <div className="nav-actions">
                <div className="nav-actions__navigate">
                    <Link to="/">
                        <span>Inicio</span>
                    </Link>
                    <Link to="/products">
                        <span>Productos</span>
                    </Link>
                    <Link to="/orderhistory">
                        <span>Compras</span>
                    </Link>
                    <Link to="/favorites">
                        <FavoriteBorderOutlinedIcon sx={{ fontSize: 25 }} />
                        {favorites.length > 0 && <span className="counter favorites">{favorites.length > 9 ? '+9' : favorites.length}</span>}
                        <span>Favoritos</span>
                    </Link>
                    <Link to="/cart">
                        <ShoppingCartOutlinedIcon sx={{ fontSize: 25 }} />
                        {cart.cartItems.length > 0 && <span className="counter cart">{cartItemsLength > 9 ? '+9' : cartItemsLength}</span>}
                        <span>Carrito</span>
                    </Link>
                </div>
                {
                    userInfo ? (
                        <div className="nav-actions__account" ref={menuRef}>
                            <div onClick={() => setOpen(!open)}>
                                <span id="account-name">{userInfo.name}</span>
                                <button id="account-icon">
                                    <AccountCircleIcon sx={{ fontSize: 35 }} />
                                </button>
                                <ExpandLessOutlinedIcon className={open ? "arrow" : "arrow down"} />
                            </div>
                            {
                                open && (
                                    <div className="account-menu">
                                        <ul>
                                            <li>
                                                <span>{userInfo.name}</span>
                                            </li>
                                            {
                                                profileDetails.isAdmin && (
                                                    <li className="account-menu__option">
                                                        <Link to="/dashboard" className="dropdown-item">
                                                            <LeaderboardIcon />
                                                            <span>Dashboard</span>
                                                        </Link>
                                                    </li>
                                                )
                                            }
                                            <li className="account-menu__option">
                                                <Link to="#signout" className="dropdown-item" onClick={signoutHandler}>
                                                    <LogoutIcon />
                                                    <span>Sign Out</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <Link className="dropdown-item" to="/signin">
                            <span>Sign In</span>
                        </Link>
                    )
                }
            </div>
        </nav>
    </header>
  )
}

export default Navbar