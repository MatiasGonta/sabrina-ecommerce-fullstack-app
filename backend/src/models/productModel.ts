import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { timestamps: true } })
export class ProductItem {
    public _id?: string

    @prop({ required: true })
    public name!: string

    @prop({ required: true, unique: true })
    public slug!: string

    @prop({ required: true })
    public images!: string[]

    @prop({ required: true })
    public brand!: string

    @prop({ required: true })
    public category!: string
    
    @prop({ required: true })
    public description!: string

    @prop({ required: true, default: 0 })
    public price!: number
    
    @prop({ required: true, default: 0 })
    public countInStock!: number

    @prop({ required: false, default: 0 })
    public colors!: string[]

    @prop({ required: false, default: 0 })
    public sizes!: string[]
}

export const ProductModel = getModelForClass(ProductItem);