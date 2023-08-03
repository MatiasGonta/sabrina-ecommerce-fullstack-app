import { Product } from "@/models";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";

interface ProductsCarouselInterface {
    title: string;
    items: Product[];
}

const ProductsCarousel: React.FC<ProductsCarouselInterface> = ({ title, items }) => {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        smallLargeDesktop: {
            breakpoint: { max: 1300, min: 900 },
            items: 4
        },
        largeTablet: {
            breakpoint: { max: 900, min: 700 },
            items: 3
        },
        tablet: {
          breakpoint: { max: 700, min: 454 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 454, min: 0 },
          items: 1
        }
    };

  return (
    <article className="products-carousel">
        <section>
            <h5>{title}</h5>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true}
                infinite={true}
                keyBoardControl={true}
                customTransition="all 0.5s"
                transitionDuration={500}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
            >
                {
                    items.map(
                        (item: Product) => (
                            <div key={item._id} className='carousel-item'>
                                <Link to={`/product/${item.slug}`}>
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
                                    <a className='carousel-item__name'>{item.name}</a>
                                    <span className='carousel-item__price'>${item.price}</span>
                                </div>
                            </div>
                        )   
                    )
                }
            </Carousel>
        </section>
    </article>
  )
}

export default ProductsCarousel