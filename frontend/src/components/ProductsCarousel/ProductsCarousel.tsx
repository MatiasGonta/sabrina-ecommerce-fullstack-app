import React from 'react';
import { Product, Routes } from "@/models";
import { Link } from "react-router-dom";
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Typography } from '@mui/material';

SwiperCore.use([Navigation, Pagination, Autoplay]);

interface ProductsCarouselInterface {
    children: string;
    items: Product[];
}

const ProductsCarousel: React.FC<ProductsCarouselInterface> = ({ children, items }) => {
    const swiperParams = {
        slidesPerView: 5,
        slidesPerGroup: 5,
        breakpoints: {
            300: {
                slidesPerView: 2,
            },
            400: {
                slidesPerView: 2.25,
            },
            500: {
                slidesPerView: 2.75,
            },
            600: {
                slidesPerView: 3.5,
            },
            700: {
                slidesPerView: 3.75,
            },
            800: {
                slidesPerView: 4.5,
            },
            900: {
                slidesPerView: 4.75,
            },
            1000: {
                slidesPerView: 5,
            },
            1100: {
                slidesPerView: 5.75,
            },
            1200: {
                slidesPerView: 6,
            },
            1300: {
                slidesPerView: 6.5,
            }
        },
        spaceBetween: 10,
        navigation: true,
        loop: false,
        className: "carousel-container",
        pagination: {
            clickable: true,
        },
        autoplay: {
            delay: 5000,
        },
    };

    return (
        <div className="products-carousel">
            <Typography fontSize={30} fontWeight="bold" component="h5" ml="15px" mr="15px" mb="15px" mt="15px" noWrap={false}>
                {children}
            </Typography>
            <Swiper {...swiperParams}>
                {items.map((item: Product) => (
                    <SwiperSlide key={item._id} className="carousel-item">
                        <Link to={`${Routes.PRODUCTS}/${item.slug}`}>
                            <img
                                src={item.images[0]}
                                alt={item.name}
                                className="carousel-item__image"
                            />
                        </Link>
                        <div>
                            <div className="carousel-item__colors">
                                <span>{item.colors.length} colores</span>
                            </div>
                            <Link to={`${Routes.PRODUCTS}/${item.slug}`} className="carousel-item__name">{item.name}</Link>
                            <span className="carousel-item__price">${item.price.toFixed(2)}</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductsCarousel;