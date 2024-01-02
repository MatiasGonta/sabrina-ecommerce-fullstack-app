import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { Navbar, Sidebar, Footer, LoadingSpinner } from '@/components';
import { useGetFilterCountsQuery, useGetProductDetailsBySlugQuery, useUpdateProductMutation } from '@/hooks';
import { ApiError, FilterItem, TypeWithKey, COLORS, Routes, LoadingSpinnerType } from '@/models';
import { getError, handleFormInputChange } from '@/utilities';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { Tooltip } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import '@/styles/pages/UpdateProductPage/UpdateProductPage.scss';

interface UpdateProductPageInterface { }

const CreateProductPage: React.FC<UpdateProductPageInterface> = () => {
  const { categories, brands, isLoading: filterCountsLoading, error: filterCountsError } = useGetFilterCountsQuery();

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const { product, isLoading, error } = useGetProductDetailsBySlugQuery(slug!);

  const defaultFormData = {
    id: product?._id!,
    name: product?.name!,
    images: product?.images!,
    category: product?.category!,
    brand: product?.brand!,
    price: product?.price.toString()!,
    colors: product?.colors!,
    sizes: product?.sizes!,
    countInStockByVariant: product?.countInStockByVariant!
  };

  const [formData, setFormData] = useState<{
    id: string,
    name: string,
    images: any[],
    category: string,
    brand: string,
    price: string,
    colors: string[],
    sizes: string[],
    countInStockByVariant: TypeWithKey<number>
  }>(defaultFormData);

  useEffect(() => {
    setFormData(defaultFormData);
    setHasSizes(defaultFormData.sizes ? true : false);
  }, [product]);

  const [hasSizes, setHasSizes] = useState<boolean>(defaultFormData.sizes ? true : false);

  //Form handlers
  const handleColorCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    e.preventDefault();

    if (checked) {
      if (!formData.colors.includes(name)) {
        const updatedColors = [...formData.colors, name];
        setFormData({
          ...formData,
          colors: updatedColors,
        });
      }
    } else {
      if (formData.colors.includes(name)) {
        const updatedColors = formData.colors.filter((color: string) => color !== name);
        setFormData({
          ...formData,
          colors: updatedColors,
        });
      }
    }
  }

  const handleSizeCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    e.preventDefault();

    if (checked) {
      if (!formData.sizes.includes(name)) {
        const updatedSizes = [...formData.sizes, name];
        setFormData({
          ...formData,
          sizes: updatedSizes,
        });
      }
    } else {
      if (formData.sizes.includes(name)) {
        const updatedSizes = formData.sizes.filter((size: string) => size !== name);
        setFormData({
          ...formData,
          sizes: updatedSizes,
        });
      }
    }
  }

  const handleAddImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    e.preventDefault();

    if (files && formData.images && formData.images.length < 7) {
      const selectedImages = Array.from(files);
      const updatedImages = [...formData.images, ...selectedImages];
      setFormData({ ...formData, images: updatedImages });
      return;
    }

    toast.warn('Máximo 6 imágenes permitidas.');
    return;
  }

  const handleRemoveImageInputChange = (index: number) => {
    if (formData.images) {
      const updatedImages = [...formData.images];
      updatedImages.splice(index, 1);
      setFormData({
        ...formData,
        images: updatedImages,
      });

      if (index === selectedImageIndex) {
        setSelectedImageIndex(0);
      }
    }
  };

  const handleStockInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    e.preventDefault();

    setFormData({
      ...formData,
      countInStockByVariant: {
        ...formData.countInStockByVariant,
        [name]: parseInt(value) || 0,
      }
    });
  };


  //Form submit handler
  const { mutateAsync: updateProduct } = useUpdateProductMutation();

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      let filteredCountInStockByVariant: TypeWithKey<number> = {};

      if (!hasSizes) {
        setFormData({ ...formData, sizes: [] })

        for (const color of formData.colors) {
          const key = `${color}-`;
          if (formData.countInStockByVariant.hasOwnProperty(key)) {
            filteredCountInStockByVariant[key] = formData.countInStockByVariant[key];
          }
        }
      } else {
        for (const color of formData.colors) {
          for (const size of formData.sizes) {
            const key = `${color}-${size}`;
            if (formData.countInStockByVariant.hasOwnProperty(key)) {
              filteredCountInStockByVariant[key] = formData.countInStockByVariant[key];
            }
          }
        }
      }

      const deletedImages = product!.images.filter((image) => !formData.images.includes(image));

      const formDataToSend = new FormData();
      formDataToSend.append('id', formData.id);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('brand', formData.brand);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('colors', JSON.stringify(formData.colors));
      formDataToSend.append('sizes', JSON.stringify(formData.sizes));
      formDataToSend.append('countInStockByVariant', JSON.stringify(filteredCountInStockByVariant));
      formDataToSend.append('selectedImageIndex', JSON.stringify(selectedImageIndex));
      formDataToSend.append('oldImages', JSON.stringify(formData.images.filter((image) => typeof image === 'string')));
      formDataToSend.append('deletedImages', JSON.stringify(deletedImages));
      formData.images.filter((image) => typeof image !== 'string').forEach((image) => {
        formDataToSend.append('images', image);
      });

      await toast.promise(updateProduct(formDataToSend), {
        pending: {
          render() {
            return 'Actualizando producto...'
          },
        },
        success: {
          render({ data }) {
            return data?.data.message
          },
        },
      });

      navigate(Routes.DASHBOARD_PRODUCTS);
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };

  const categoriesArray: string[] = categories?.map((category: FilterItem) => category._id);
  const brandsArray: string[] = brands?.map((brand: FilterItem) => brand._id);
  const colorsArray: [string, string][] = Object.entries(COLORS);
  const sizesArray: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  return (
    isLoading || filterCountsLoading
      ? <LoadingSpinner type={LoadingSpinnerType.NOFLEX} /> : error || filterCountsError
        ? <h4>{getError(error as ApiError)}</h4> : (
          <>
            <Helmet>
              <title>Actualizar producto - SABRINA</title>
            </Helmet>
            <Navbar />
            <main className="admin">
              <Sidebar page="productsboard" />
              <article className="update-product-form">
                <section>
                  <div className="form-container">
                    <h3>Actualizar Producto</h3>
                    <form className="multi-column-form" onSubmit={submitHandler} encType="multipart/form-data">
                      <div className="group">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          pattern=".{4,40}"
                          title="El nombre debe tener entre 4 y 40 caracteres"
                          className={formData.name !== '' ? 'active' : ''}
                          required
                          onChange={(e) => handleFormInputChange(e, formData, setFormData)}
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label htmlFor="name">Nombre</label>
                      </div>
                      <div className="group">
                        <input
                          type="text"
                          name="brand"
                          value={formData.brand}
                          className={formData.brand !== '' ? 'active' : ''}
                          required
                          onChange={(e) => handleFormInputChange(e, formData, setFormData)}
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label htmlFor="brand">Marca</label>
                        <div className="group__existing-recommendations">
                          <h5>Existentes:</h5>
                          <ul>
                            {
                              brandsArray.map((brand, index) => (
                                <li key={index} onClick={() => setFormData({ ...formData, brand: brand })}>
                                  <span>{brand}</span>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                      <div className="group">
                        <input
                          type="number"
                          name="price"
                          min={0}
                          value={formData.price}
                          className={formData.price !== '' ? 'active' : ''}
                          required
                          onChange={(e) => handleFormInputChange(e, formData, setFormData)}
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label htmlFor="price">Precio</label>
                      </div>
                      <div className="group">
                        <input
                          type="text"
                          name="category"
                          value={formData.category}
                          className={formData.category !== '' ? 'active' : ''}
                          required
                          onChange={(e) => handleFormInputChange(e, formData, setFormData)}
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <div className="group__existing-recommendations">
                          <h5>Existentes:</h5>
                          <ul>
                            {
                              categoriesArray.map((category, index) => (
                                <li key={index} onClick={() => setFormData({ ...formData, category: category })}>
                                  <span>{category}</span>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                        <label htmlFor="category">Categoria</label>
                      </div>
                      <div className="group">
                        <h4>¿Producto con talles?</h4>
                        <div className="switch">
                          <input
                            id="size-option"
                            type="checkbox"
                            checked={hasSizes}
                            onChange={() => {
                              setFormData({ ...formData, countInStockByVariant: {} });
                              setHasSizes(!hasSizes);
                            }}
                          />
                          <label htmlFor="size-option"></label>
                        </div>
                      </div>
                      <div className="colors">
                        <h5>Selecciona los colores {formData.colors && formData.colors.length > 0 && <span>({formData.colors.join(' - ')})</span>}</h5>
                        <div className="checkbox-container">
                          {colorsArray.map(([name, value], index) => (
                            <div key={index} className="checkbox">
                              <label className="checkbox-wrapper">
                                <input
                                  type="checkbox"
                                  name={name}
                                  className="checkbox-input"
                                  onChange={handleColorCheckboxChange}
                                />
                                <span className={formData.colors && formData.colors.includes(name) ? "checkbox-tile checked" : "checkbox-tile"}>
                                  <span className="checkbox-icon">
                                    <div style={{ backgroundColor: value }}></div>
                                  </span>
                                  <span className="checkbox-label">{name}</span>
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      {
                        hasSizes &&
                        <div className="sizes">
                          <h5>Selecciona los talles {formData.sizes && formData.sizes.length > 0 && <span>({formData.sizes.join(' - ')})</span>}</h5>
                          <div className="checkbox-container">
                            {sizesArray.map((size, index) => (
                              <div key={index} className="checkbox">
                                <label className="checkbox-wrapper">
                                  <input
                                    type="checkbox"
                                    name={size}
                                    className="checkbox-input"
                                    disabled={hasSizes ? false : true}
                                    onChange={handleSizeCheckboxChange}
                                  />
                                  <span className={formData.sizes && formData.sizes.includes(size) ? "checkbox-tile checked" : "checkbox-tile"}>
                                    <span className="checkbox-icon">
                                      <StraightenOutlinedIcon sx={{ fontSize: 25 }} />
                                    </span>
                                    <span className="checkbox-label">{size}</span>
                                  </span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      }
                      {
                        hasSizes
                          ? formData.colors && formData.sizes && formData.colors.map((color: string) => (
                            formData.sizes.map((size: string) => (
                              <div key={`${color}-${size}`} className="group">
                                <input
                                  type="number"
                                  name={`${color}-${size}`}
                                  min={0}
                                  value={formData.countInStockByVariant[`${color}-${size}`]}
                                  className="active"
                                  required
                                  onChange={handleStockInputChange}
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label htmlFor={`${color}-${size}`}>Stock para: {color} - {size}</label>
                              </div>
                            ))
                          ))
                          : formData.colors && formData.colors.map((color: string) => (
                            <div key={color} className="group">
                              <input
                                type="number"
                                name={`${color}-`}
                                value={formData.countInStockByVariant[`${color}-`]}
                                className="active"
                                required
                                onChange={handleStockInputChange}
                              />
                              <span className="highlight"></span>
                              <span className="bar"></span>
                              <label htmlFor={color}>Stock para: {color}</label>
                            </div>
                          ))
                      }
                      <div className="file">
                        <input
                          type="file"
                          name="images"
                          accept="image/*"
                          multiple
                          onChange={handleAddImageInputChange}
                        />
                        <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 50, margin: '15px 0' }} />
                        <label htmlFor="images">Imágenes <span>(De no seleccionar ninguna, la primer imagen añadida sera la principal)</span></label>
                        {
                          formData.images &&
                          <ul className="selected-images">
                            {formData.images.map((image: any, index: number) => (
                              <li key={index} className="selected-images__item">
                                <div className={selectedImageIndex === index ? "selected" : ""}>
                                  {
                                    typeof image === 'string'
                                      ? (
                                        <img
                                          src={image}
                                          alt={`Imagen ${index + 1}`}
                                          onClick={() => setSelectedImageIndex(index)}
                                        />
                                      ) : (
                                        <img
                                          src={URL.createObjectURL(image)}
                                          alt={`Imagen ${index + 1}`}
                                          onClick={() => setSelectedImageIndex(index)}
                                        />
                                      )
                                  }
                                </div>
                                <Tooltip title="Cerrar">
                                  <div className="selected-images__item-close" onClick={() => handleRemoveImageInputChange(index)}>
                                    <CloseIcon sx={{ fontSize: 20 }} />
                                  </div>
                                </Tooltip>
                              </li>
                            ))}
                          </ul>
                        }
                      </div>
                      <div className="form-submit">
                        <button type="submit">Actualizar producto</button>
                      </div>
                    </form>
                  </div>
                </section>
              </article>
            </main>
            <Footer />
          </>
        )
  )
}

export default CreateProductPage