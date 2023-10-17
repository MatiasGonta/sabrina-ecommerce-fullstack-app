import { model, Schema, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface ProductItem extends Document {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  brand: string;
  category: string;
  price: number;
  countInStockByVariant: {
    [variant: string]: number;
  },  
  colors: string[];
  sizes: string[];
}

const productSchema = new Schema<ProductItem>({
  name: {
    type: String,
    required: true,
    unique: true
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
  price: {
    type: Number,
    required: true,
    default: 0
  },
  countInStockByVariant: {
    type: Map,
    of: Number,
    required: true,
    default: {},
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
}, {
  timestamps: true
});

// Aplica el plugin de paginación al esquema
productSchema.plugin(mongoosePaginate);

// Define y exporta el modelo de Mongoose paginado
// El tipo de la variable ProductModel será PaginateModel<ProductItem & Document>
export const ProductModel = model<ProductItem>('productitems', productSchema);