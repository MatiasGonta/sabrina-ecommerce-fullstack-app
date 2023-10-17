import { TypeWithKey } from ".";

export type Product = {
    _id?: string;
    name: string;
    slug: string;
    images: string[];
    category: string;
    brand: string;
    price: number;
    countInStockByVariant: TypeWithKey<number>,  
    colors: string[];
    sizes: string[];
    createdAt: string;
    updatedAt: string;
}