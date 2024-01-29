import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { Navbar, ProductItem } from "@/components";
import { LoadingSpinner, Footer, PurchaseInfoBanner } from '@/components/ui';
import { ApiError, Product, FilterItem, LoadingSpinnerType, Routes } from '@/models';
import { useGetFilterCountsQuery, useGetProductsCatalogQuery } from '@/hooks';
import { getError } from '@/utilities';
import { useNavigate } from 'react-router-dom';
import { Accordion } from './components';
import { Helmet } from 'react-helmet-async';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductsListWrapper } from '@/components/ui';
import { Typography } from '@mui/material';
import 'swiper/swiper-bundle.css';
import '@/styles/pages/Home/Home.scss';

SwiperCore.use([Navigation, Pagination, Autoplay]);

interface HomeInterface { }

const Home: React.FC<HomeInterface> = () => {
    const navigate = useNavigate();

    const swiperParams = {
        slidesPerView: 1,
        navigation: true,
        loop: true,
        className: "commerce-carousel",
        pagination: {
            clickable: true,
        },
        autoplay: {
            delay: 5000,
        },
    };

    // Getting products
    const { products, isLoading, error } = useGetProductsCatalogQuery();

    // Getting filters
    const { categories, isLoading: filterCountsLoading, error: filterCountsError } = useGetFilterCountsQuery();

    const getShuffledItems = (items: any[], count: number) => {
        const shuffledItems = items.sort(() => 0.5 - Math.random());
        return shuffledItems.slice(0, count);
    }

    const handleCategoryNavigate = (category: string) => {
        const queryParams = new URLSearchParams();
        queryParams.append('category', category);
        queryParams.toString();

        navigate(`${Routes.PRODUCTS}/?${queryParams}`)
    }

    const accordions = [
        {
            number: 1,
            title: 'Realiza tu Pedido',
            text: 'Explora nuestra amplia variedad de artículos y agrega tus productos deseados al carrito. Completa el proceso con tus datos personales para asegurar una experiencia de compra sin complicaciones.',
            icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 50 }} />
        },
        {
            number: 2,
            title: 'Realizas el Pago',
            text: 'Tienes un plazo máximo de 48 horas para retirar tu compra en nuestro local o realizar el pago. No hacerlo en este tiempo podría afectar la disponibilidad de stock. Aceptamos pagos en efectivo, a través de PayPal o MercadoPago, así como otros métodos alternativos como Transferencia, Depósito, Rapi Pago, Pago Fácil o Billetera Santa Fe.',
            icon: <PaidOutlinedIcon sx={{ fontSize: 50 }} />
        },
        {
            number: 3,
            title: 'Armamos tu Pedido',
            text: 'Una vez recibido tu pago, nuestro equipo se pone manos a la obra para armar tu pedido con cuidado y eficiencia, asegurándonos de que esté listo para ser enviado.',
            icon: <AssignmentOutlinedIcon sx={{ fontSize: 50 }} />
        },
        {
            number: 4,
            title: 'Envío/entrega de tu pedido',
            text: 'Realizamos envíos de lunes a viernes a cualquier parte del país a través de Correo Argentino y diversas empresas de transporte. También ofrecemos la opción de retiro en nuestro local durante los horarios especificados.',
            icon: <LocalShippingOutlinedIcon sx={{ fontSize: 50 }} />
        },
    ]

    return (
        isLoading || filterCountsLoading
            ? <LoadingSpinner type={LoadingSpinnerType.NOFLEX} /> : error || filterCountsError
                ? <Typography fontSize={20} fontWeight="bold" component="h2" noWrap={false}>{getError(error as ApiError)}</Typography> : (
                    <>
                        <Helmet>
                            <title>SABRINA</title>
                        </Helmet>
                        <Navbar />
                        <main>
                            <section className="home__commerce">
                                <article className="home__commerce__carrousel">
                                    <Swiper {...swiperParams}>
                                        <SwiperSlide className="home__commerce__carrousel__item">
                                            <img
                                                className="home__commerce__carrousel__item__img"
                                                src="/src/assets/sabrina-local-exterior.png"
                                                alt="sabrina-local-exterior"
                                                onClick={() => navigate(Routes.PRODUCTS)}
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide className="home__commerce__carrousel__item">
                                            <img
                                                className="home__commerce__carrousel__item__img"
                                                src="/src/assets/sabrina-local-interior.jpg"
                                                alt="sabrina-local-interior"
                                                onClick={() => navigate(Routes.PRODUCTS)}
                                            />
                                        </SwiperSlide>
                                    </Swiper>
                                </article>
                                <article className="home__commerce__category-prices">
                                    {
                                        getShuffledItems(categories, 4).map((category: FilterItem) => (
                                            <div
                                                key={category._id}
                                                className="home__commerce__category-prices__card"
                                                onClick={() => handleCategoryNavigate(category._id)}
                                            >
                                                <Typography fontSize={{ xs: 17.5, sm: 20 }} color="inherit" fontWeight="bold" component="h2" noWrap={false}>
                                                    {category._id.toLocaleUpperCase()}
                                                </Typography>
                                                <span className="home__commerce__category-prices__card__text">Desde ${category.minPrice}</span>
                                            </div>
                                        ))
                                    }
                                </article>
                            </section>
                            <section className="home__purchase-info">
                                <article>
                                    <PurchaseInfoBanner />
                                </article>
                            </section>
                            <section className="home__products-preview products-catalog">
                                <article>
                                    <ProductsListWrapper isEmpty={products.length > 0}>
                                        {
                                            products.splice(0, 21).map((product: Product) => <ProductItem key={product.slug} product={product} />)
                                        }
                                    </ProductsListWrapper>
                                    <div className="home__products-preview__more">
                                        <button className="home__products-preview__more__btn" onClick={() => navigate(Routes.PRODUCTS)}>VER TODOS LOS PRODUCTOS</button>
                                    </div>
                                </article>
                            </section>
                            <section className="home__purchase-path">
                                <article>
                                    {
                                        accordions.map(accordion => (
                                            <Accordion
                                                key={accordion.title}
                                                number={accordion.number}
                                                title={accordion.title}
                                                icon={accordion.icon}
                                            >
                                                {accordion.text}
                                            </Accordion>
                                        ))
                                    }
                                </article>
                            </section>
                        </main>
                        <Footer />
                    </>
                )
    )
}

export default Home