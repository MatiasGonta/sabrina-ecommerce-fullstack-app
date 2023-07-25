import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Link } from 'react-router-dom';

interface FooterInterface {}

const Footer: React.FC<FooterInterface> = () => {
  return (
    <footer>
        <div className='footer-container'>
            <div className='footer-info-container'>
                <div className='footer-info-navigation'>
                    <h5>NAVEGACIÓN</h5>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/products">Productos</Link></li>
                        <li><Link to="/orderhistory">Compras</Link></li>
                        <li><Link to="/favorites">Favoritos</Link></li>
                        <li><Link to="/cart">Carrito</Link></li>
                    </ul>
                </div>
                <div className='footer-info-contact'>
                    <h5>CONTACTO</h5>
                    <ul>
                        <li>
                            <PhoneEnabledOutlinedIcon sx={{ fontSize: 15 }} />
                            <span>3415621917</span>
                        </li>
                        <li>
                            <EmailOutlinedIcon sx={{ fontSize: 15 }} />
                            <span>rebecafernandez.rf@gmail.com</span>
                        </li>
                        <li>
                            <LocationOnOutlinedIcon sx={{ fontSize: 15 }} />
                            <span>Ayacucho 372, Cañada de Gomez, provincia de Santa Fe</span>
                        </li>
                    </ul>
                </div>
                <div className='footer-info-social-networks'>
                    <h5>REDES SOCIALES</h5>
                    <ul>
                        <li>
                            <a href="" target="_blank">
                                <InstagramIcon sx={{ fontSize: 25 }} />
                            </a>
                        </li>
                        <li>
                            <a href="" target="_blank">
                                <FacebookIcon sx={{ fontSize: 25 }} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='footer-separator'></div>
            <div className='footer-copyright-container'>
                <Link to="/">
                    <img src="/src/assets/fym-icon.png" alt="fym-icon" />
                </Link>
                <p>COPYRIGHT FYM INDUMENTARIA CAÑADA DE GOMEZ - 2023. TODOS LOS DERECHOS RESERVADOS. DEFENSA DE LAS Y LOS CONSUMIDORES. PARA RECLAMOS <a href="https://autogestion.produccion.gob.ar/consumidores" target="_blank">INGRESE AQUÍ</a>.</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer