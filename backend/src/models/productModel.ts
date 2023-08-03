import { model, Schema, Document, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface ProductItem {
  name: string;
  slug: string;
  images: string[];
  brand: string;
  category: string;
  description: string;
  price: number;
  countInStock: number;
  colors: string[];
  sizes: string[];
}

const productSchema = new Schema<ProductItem>({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  images: {
    type: [String],
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
  colors: {
    type: [String],
    required: true,
    default: []
  },
  sizes: {
    type: [String],
    required: true,
    default: []
  },
});

// Aplica el plugin de paginación al esquema
productSchema.plugin(mongoosePaginate);

// Define y exporta el modelo de Mongoose paginado
// El tipo de la variable ProductModel será PaginateModel<ProductItem & Document>
export const ProductModel: PaginateModel<ProductItem & Document> = model<ProductItem>('productitems', productSchema);