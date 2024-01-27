import { TypeWithKey } from "@/models"

export enum WorkspaceAction {
    CREATE = 'create-product',
    UPDATE = 'update-product'
}

export type WorkspaceFormData = {
    name: string,
    images: (string | File)[],
    category: string,
    brand: string,
    price: string,
    colors: string[],
    sizes: string[],
    countInStockByVariant: TypeWithKey<number>
}