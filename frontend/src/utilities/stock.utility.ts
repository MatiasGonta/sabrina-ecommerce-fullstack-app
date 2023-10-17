import { Product } from "@/models";

export const calculateTotalStock = (product: Product): number => {
    const stockVariantsArr: number[] = Object.values(product.countInStockByVariant);
    const totalStock: number = stockVariantsArr.reduce((total, count) => total + count, 0);

    return totalStock;
};