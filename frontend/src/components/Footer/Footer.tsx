import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

interface FooterInterface {}

const Footer: React.FC<FooterInterface> = () => {
    const handlePracticeCommerce = () => {
        toast.warn('No te olvides que es un ecommerce falso con fines prácticos', {
            icon: '👷',
        });
    }

    return (
        <footer>
            <div className='footer-container'>
                <div className='footer-info-container'>
                    <nav className='footer-info-navigation'>
                        <h5>NAVEGACIÓN</h5>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/products">Productos</Link></li>
                            <li><Link to="/orderhistory">Compras</Link></li>
                            <li><Link to="/favorites">Favoritos</Link></li>
                            <li><Link to="/cart">Carrito</Link></li>
                        </ul>
                    </nav>
                    <div className='footer-info-contact'>
                        <h5>CONTACTO</h5>
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
                    <div className='footer-info-social-networks'>
                        <h5>REDES SOCIALES</h5>
                        <ul>
                            <li onClick={handlePracticeCommerce}>
                                <Tooltip title='Instagram'>
                                    <InstagramIcon sx={{ fontSize: 25 }} />
                                </Tooltip>
                            </li>
                            <li onClick={handlePracticeCommerce}>
                                <Tooltip title='Facebook'>
                                    <FacebookIcon sx={{ fontSize: 25 }} />
                                </Tooltip>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='footer-separator'></div>
                <div className='footer-copyright-container'>
                    <Link to="/">
                        <img src="/src/assets/sabrina-icon.png" alt="sabrina-icon" />
                    </Link>
                    <p>COPYRIGHT SABRINA CABA - 2023. TODOS LOS DERECHOS RESERVADOS. DEFENSA DE LAS Y LOS CONSUMIDORES. PARA RECLAMOS <a href="https://autogestion.produccion.gob.ar/consumidores" target="_blank">INGRESE AQUÍ</a>.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer