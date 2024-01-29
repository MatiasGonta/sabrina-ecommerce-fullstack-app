import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Routes } from '@/models';
import { Typography } from '@mui/material';

interface FooterInterface { }

const Footer: React.FC<FooterInterface> = () => {
    const handlePracticeCommerce = () => {
        toast.warn('No te olvides que es un ecommerce falso con fines prácticos', {
            icon: '👷',
        });
    }

    return (
        <footer>
            <div className="footer-wrapper">
                <div className="footer-info">
                    <nav className="footer-info__navigation">
                        <Typography fontSize={25} color="inherit" fontWeight="bold" component="h5" mb="10px" noWrap={false}>NAVEGACIÓN</Typography>
                        <ul>
                            <li><Link to={Routes.HOME}>Inicio</Link></li>
                            <li><Link to={Routes.PRODUCTS}>Productos</Link></li>
                            <li><Link to={Routes.ORDER_HISTORY}>Compras</Link></li>
                            <li><Link to={Routes.FAVORITES}>Favoritos</Link></li>
                            <li><Link to={Routes.CART}>Carrito</Link></li>
                        </ul>
                    </nav>
                    <div className="footer-info__contact">
                        <Typography fontSize={25} color="inherit" fontWeight="bold" component="h5" mb="10px" noWrap={false}>CONTACTO</Typography>
                        <ul>
                            <li>
                                <PhoneEnabledOutlinedIcon sx={{ fontSize: 15 }} />
                                <span>02143373188</span>
                            </li>
                            <li>
                                <EmailOutlinedIcon sx={{ fontSize: 15 }} />
                                <span>sabrinaindumentariaC1005@gmail.com</span>
                            </li>
                            <li>
                                <LocationOnOutlinedIcon sx={{ fontSize: 15 }} />
                                <span>Florida 350, C1005 CABA, provincia de Buenos Aires</span>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-info__social-networks">
                        <Typography fontSize={25} color="inherit" fontWeight="bold" component="h5" mb="10px" noWrap={false}>REDES SOCIALES</Typography>
                        <ul>
                            <li onClick={handlePracticeCommerce}>
                                <Tooltip title="Instagram">
                                    <InstagramIcon sx={{ fontSize: 25 }} />
                                </Tooltip>
                            </li>
                            <li onClick={handlePracticeCommerce}>
                                <Tooltip title="Facebook">
                                    <FacebookIcon sx={{ fontSize: 25 }} />
                                </Tooltip>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-separator"></div>
                <div className="footer-copyright">
                    <Link to={Routes.HOME}>
                        <img
                            src="/src/assets/sabrina-icon.png"
                            alt="sabrina-icon"
                            className="footer-copyright__logo"
                        />
                    </Link>
                    <p className="footer-copyright__p">COPYRIGHT SABRINA CABA - 2023. TODOS LOS DERECHOS RESERVADOS. DEFENSA DE LAS Y LOS CONSUMIDORES. PARA RECLAMOS <a href="https://autogestion.produccion.gob.ar/consumidores" target="_blank" className="footer-copyright__p__link">INGRESE AQUÍ</a>.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer