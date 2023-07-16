import { Product } from "@/models";

export const sampleProducts: Product[] = [
    {
        name: 'Nike Slim shirt',
        slug: 'nike-slim-shirt',
        category: 'Shirts',
        image: './src/assets/nike-slim-shirt.jpg',
        price: 120,
        countInStock: 10,
        brand: 'Nike',
        rating: 4.5,
        numReviews: 10,
        description: 'high quality shirt'
    },
    {
        name: 'Lacoste Free Pants',
        slug: 'lacoste-free-pants',
        category: 'Pants',
        image: './src/assets/lacoste-free-pants.jpg',
        price: 220,
        countInStock: 0,
        brand: 'Lacoste',
        rating: 4.8,
        numReviews: 17,
        description: 'high quality product'
    },
    {
        name: 'Nike Slim pants',
        slug: 'nike-slim-pants',
        category: 'Pants',
        image: './src/assets/nike-slim-pants.jpg',
        price: 100,
        countInStock: 5,
        brand: 'Nike',
        rating: 3.0,
        numReviews: 2,
        description: 'high quality pants'
    },
    {
        name: 'Adidas Slim shirts',
        slug: 'adidas-slim-shirts',
        category: 'Shirts',
        image: './src/assets/adidas-slim-shirts.jpg',
        price: 300,
        countInStock: 3,
        brand: 'Adidas',
        rating: 1.5,
        numReviews: 89,
        description: 'high quality shirt'
    }
];
