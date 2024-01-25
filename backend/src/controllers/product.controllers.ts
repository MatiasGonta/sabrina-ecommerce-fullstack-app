import { ProductItem, ProductModel } from "../models";
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { FilterQuery } from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

export const getProductsCatalog = asyncHandler(async (req, res) => {
    try {
        const { page = 1, limit = 21, q, category, brand, size, color, priceMin, priceMax } = req.query;
        const regex = new RegExp(q as string, 'i');

        const options: { page: number, limit: number, sort: { [key: string]: number } } = {
            page: parseInt(page as string),
            limit: parseInt(limit as string),
            sort: { createdAt: -1 }
        };

        const filter: FilterQuery<ProductItem> = {};

        // Adding existing filters to the "filter" object
        if (category) {
            filter.category = category as string;
        }

        if (brand) {
            filter.brand = brand as string;
        }

        if (color) {
            filter.colors = { $in: color as string[] };
        }

        if (size) {
            filter.sizes = { $in: size as string[] };
        }

        if (priceMin || priceMax) {
            filter.price = {};

            if (priceMin && priceMax) {
                filter.price.$gte = parseFloat(priceMin as string);
                filter.price.$lte = parseFloat(priceMax as string);
            } else if (priceMin) {
                filter.price.$gte = parseFloat(priceMin as string);
            } else if (priceMax) {
                filter.price.$lte = parseFloat(priceMax as string);
            }
        }

        const products = await ProductModel.paginate({
            ...filter,
            $or: [
                { name: regex },
                { brand: regex },
                { category: regex },
                { colors: regex },
                { sizes: regex }
            ]
        }, options);

        // Sort the sizes according to the sizesOrder
        const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

        if (products.docs && products.docs.length > 0) {
            products.docs.forEach((product: ProductItem) => {
                if (product.sizes) {
                    product.sizes.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b));
                }
            });
        }

        if (products) {
            res.status(201).json(products);
        } else {
            res.status(404).json({ message: 'Productos no encontrados' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

export const getFiltersCounts = asyncHandler(async (req: Request, res: Response) => {
    const filterCounts = {
        categories: await ProductModel.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]),
        sizes: await ProductModel.aggregate([
            {
                $unwind: '$sizes'
            },
            {
                $group: {
                    _id: '$sizes',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]),
        colors: await ProductModel.aggregate([
            {
                $unwind: '$colors'
            },
            {
                $group: {
                    _id: '$colors',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]),
        brands: await ProductModel.aggregate([
            {
                $group: {
                    _id: '$brand',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]),
    };

    if (filterCounts) {
        res.status(201).json(filterCounts);
    } else {
        res.status(404).json({ message: 'Recuentos de filtros no encontrados' });
    }
}
);

export const searchProducts = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, q } = req.query;
    const regex = new RegExp(q as string, 'i');

    const options = {
        page: parseInt(page as string),
        limit: 21,
    };

    // Search products with the expReg formed with the user's search
    const searchResults = await ProductModel.paginate({
        $or: [
            { name: regex },
            { brand: regex },
            { category: regex },
            { colors: regex },
            { sizes: regex }
        ]
    }, options);

    if (searchResults) {
        res.status(201).json(searchResults);
    } else {
        res.status(404).json({ message: 'Resultados de búsqueda no encontrados' });
    }
}
);

export const getProductBySlug = asyncHandler(async (req: Request, res: Response) => {
    const product = await ProductModel.findOne({ slug: req.params.slug });

    if (product) {
        const relatedProducts = await ProductModel.find({
            category: product.category,
        }).limit(21);

        if (relatedProducts) {
            const data = {
                product,
                relatedProducts
            }

            res.status(201).json(data);
        }
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
}
);

export const getCartItemsStock = asyncHandler(async (req: Request, res: Response) => {
    try {
        const itemsId = Object.values(req.query) as string[];

        const products = await ProductModel.find({ _id: { $in: itemsId } });
        if (products && products.length !== 0) {
            // Create a mapping object from _id to countInStock
            const stockMap: {
                [id: string]: {
                    [variant: string]: number;
                }
            } = {};

            products.forEach((product) => {
                stockMap[product._id] = product.countInStockByVariant || {};
            });

            res.status(201).json(stockMap);
        } else {
            res.status(404).json({ message: 'No se encontraron los productos del carrito' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
}
);

export const updateProductsStock = asyncHandler(async (req: Request, res: Response) => {
    try {
        const itemsToUpdate = req.body;
        const { action } = req.query;

        if (!itemsToUpdate) {
            res.status(400).json({ message: 'No se han recibido nuevos productos para actualizar el stock' });
        }

        if (action === 'discount') {
            for (let item of itemsToUpdate) {
                const variant = `${item.colorSelected}-${item.sizeSelected}`;

                await ProductModel.findByIdAndUpdate(
                    item._id,
                    {
                        $inc: { [`countInStockByVariant.${variant}`]: -item.quantity } // Subtract the order quantity from the stock
                    },
                    { new: true } // Return updated document
                );
            }
        } else {
            for (let item of itemsToUpdate) {
                const variant = `${item.colorSelected}-${item.sizeSelected}`;

                await ProductModel.findByIdAndUpdate(
                    item._id,
                    {
                        $inc: { [`countInStockByVariant.${variant}`]: +item.quantity } // Add the stock order quantity
                    },
                    { new: true } // Return updated document
                );
            }
        }

        res.status(201).json({ message: 'Stock actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { name, brand, price, category, countInStockByVariant, sizes, colors } = req.body;

        const nameFound = await ProductModel.findOne({ name }) || null;

        // Check if the new product name exists in another product
        if (nameFound) {
            res.status(404).json({ message: `Ya hay otro producto con "${name}" de nombre` });
            return;
        }

        // Check if req.files is defined and is an array
        if (!req.files || req.files.length === 0 || !Array.isArray(req.files)) {
            res.status(404).json({ message: 'No se han proporcionado imágenes' });
            return;
        }

        const imageBuffers = req.files.map((file: Express.Multer.File) => file.buffer);

        // Upload images to Cloudinary and get image URLs
        const cloudinaryImages = await Promise.all(
            imageBuffers.map((imageBuffer) => {
                return new Promise<string>((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { resource_type: 'image' },
                        (error, result) => {
                            if (error) {
                                reject('Error al subir la imagen a Cloudinary');
                            } else {
                                resolve(result!.secure_url);
                            }
                        }
                    ).end(imageBuffer);
                });
            })
        );

        const newProduct = {
            name,
            slug: name.split(' ').join('-').toLowerCase(),
            images: cloudinaryImages,
            brand,
            category,
            price: parseInt(price),
            countInStockByVariant: JSON.parse(countInStockByVariant),
            colors: JSON.parse(colors),
            sizes: JSON.parse(sizes),
        };

        const createdProduct = await ProductModel.create(newProduct);

        if (createdProduct) {
            res.status(201).json({ message: 'Producto creado correctamente', product: createdProduct });
        } else {
            res.status(404).json({ message: 'Error al crear el producto' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

export const productWithUpload = upload.array('images', 7);

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id, name, brand, price, category, countInStockByVariant, sizes, colors, oldImages, deletedImages, selectedImageIndex } = req.body;

        let cloudinaryImages: string[] = [];

        // Check if req.files is defined and is an array. Then add new images to Cloudinary
        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            const imageBuffers = req.files.map((file: Express.Multer.File) => file.buffer);
            // Upload images to Cloudinary and get image URLs
            cloudinaryImages = await Promise.all(
                imageBuffers.map((imageBuffer) => {
                    return new Promise<string>((resolve, reject) => {
                        cloudinary.uploader.upload_stream(
                            { resource_type: 'image' },
                            (error, result) => {
                                if (error) {
                                    reject('Error al subir la imagen a Cloudinary');
                                } else {
                                    resolve(result!.secure_url);
                                }
                            }
                        ).end(imageBuffer);
                    });
                })
            );
        }

        // Delete not uptated images
        if (deletedImages) {
            await Promise.all(
                JSON.parse(deletedImages).map((imageUrl: string) => {
                    const publicId = imageUrl.match(/\/v\d+\/(.+?)\./)![1]; // Extract the public_id from the URL
                    return cloudinary.uploader.destroy(publicId);
                })
            );
        }

        // All uptated images
        const updatedImages = [...JSON.parse(oldImages), ...cloudinaryImages];
        const selectedImage = updatedImages[parseInt(selectedImageIndex)];
        updatedImages.splice(selectedImageIndex, 1);
        updatedImages.unshift(selectedImage);

        const updateProduct = {
            name,
            slug: name.split(' ').join('-').toLowerCase(),
            images: updatedImages,
            brand,
            category,
            price: parseInt(price),
            countInStockByVariant: JSON.parse(countInStockByVariant),
            colors: JSON.parse(colors),
            sizes: JSON.parse(sizes),
        };

        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateProduct);

        if (updatedProduct) {
            res.status(201).json({ message: 'Producto actualizado correctamente', updatedProduct: updatedProduct });
        } else {
            res.status(404).json({ message: 'Error al actualizar el producto' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await ProductModel.findByIdAndDelete(productId);

        if (deletedProduct) {
            await Promise.all(
                deletedProduct.images.map((imageUrl: string) => {
                    const publicId = imageUrl.match(/\/v\d+\/(.+?)\./)![1]; // Extract the public_id from the URL
                    return cloudinary.uploader.destroy(publicId);
                })
            );

            res.status(201).json({ message: 'Producto eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

export const getProducts = asyncHandler(
    async (req: Request, res: Response) => {
        const { page = 1, q, sort, order, limit = 20 } = req.query;
        const regex = new RegExp(q as string, 'i');

        const options = {
            page: parseInt(page as string),
            limit: parseInt(limit as string),
            sort: { updatedAt: -1 } as { [key: string]: number }
        };

        if (sort && order) {
            options.sort = { [sort as string]: order === 'asc' ? 1 : -1 };
        }

        const products = await ProductModel.paginate({
            $or: [
                { name: regex },
                { category: regex }
            ],
        }, options);

        if (products) {
            res.status(201).json(products);
            return;
        }

        res.status(404).json({ message: 'Productos no encontrados' });
    }
);