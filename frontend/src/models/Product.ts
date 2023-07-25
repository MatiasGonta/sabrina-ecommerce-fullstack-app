export type Product = {
    _id?: string;
    name: string;
    slug: string;
    images: string[];
    category: string;
    brand: string;
    price: number;
    countInStock: number;
    description: string;
    numReviews: number;
    colors: string[];
    sizes: string[];
}