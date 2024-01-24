import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { Navbar, Sidebar } from '@/components';
import { LoadingSpinner, Footer } from '@/components/ui';
import { useCreateProductMutation, useGetFilterCountsQuery } from '@/hooks';
import { ApiError, FilterItem, TypeWithKey, LoadingSpinnerType, COLORS } from '@/models';
import { getError, handleFormInputChange } from '@/utilities';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { Tooltip } from '@mui/material';
import '@/styles/pages/CreateProductPage/CreateProductPage.scss';

const CreateProductPage = () => {
  const { categories, brands, isLoading: filterCountsLoading } = useGetFilterCountsQuery();

  const emptyFormData = {
    name: '',
    images: [],
    category: '',
    brand: '',
    price: '',
    colors: [],
    sizes: [],
    countInStockByVariant: {}
  };

  const [formData, setFormData] = useState<{
    name: string,
    images: File[],
    category: string,
    brand: string,
    price: string,
    colors: string[],
    sizes: string[],
    countInStockByVariant: TypeWithKey<number>
  }>(emptyFormData);
  
  const [hasSizes, setHasSizes] = useState<boolean>(true);

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

    if (files && formData.images.length < 7) {
      const selectedImages = Array.from(files);
      const updatedImages = [...formData.images, ...selectedImages];
      setFormData({ ...formData, images: updatedImages });
      return;
    }

    toast.warn('Máximo 6 imágenes permitidas.');
    return;
  }

  const handleRemoveImageInputChange = (index: number) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({
      ...formData,
      images: updatedImages,
    });

    if (index === selectedImageIndex) {
      setSelectedImageIndex(0);
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
  const { mutateAsync: createProduct } = useCreateProductMutation();

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

      if (selectedImageIndex !== 0) {
        const selectedImage = formData.images[selectedImageIndex];
        formData.images.splice(selectedImageIndex, 1);
        formData.images.unshift(selectedImage);
      }

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('brand', formData.brand);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('colors', JSON.stringify(formData.colors));
      formDataToSend.append('sizes', JSON.stringify(formData.sizes));
      formDataToSend.append('countInStockByVariant', JSON.stringify(formData.countInStockByVariant));
      formData.images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      await toast.promise(createProduct(formDataToSend), {
        pending: {
          render() {
            return 'Creando nuevo producto...'
          },
        },
        success: {
          render({ data }) {
            return data?.data.message
          },
        },
      });

      // Reset formData
      setFormData(emptyFormData);
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };

  const categoriesArray: string[] = categories?.map((category: FilterItem) => category._id);
  const brandsArray: string[] = brands?.map((brand: FilterItem) => brand._id);
  const colorsArray: [string, string][] = Object.entries(COLORS);
  const sizesArray: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  return (
    filterCountsLoading
      ? <LoadingSpinner type={LoadingSpinnerType.NOFLEX} />
      : (
        <>
          <Helmet>
            <title>Crear producto - SABRINA</title>
          </Helmet>
          <Navbar />
          <main className="main--admin">
            <Sidebar />
            <section className="create-product-form">
              <article>
                <div className="form-container">
                  <h3>Crear Producto</h3>
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
                      <h5>Selecciona los colores {formData.colors.length > 0 && <span>({formData.colors.join(' - ')})</span>}</h5>
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
                              <span className={formData.colors.includes(name) ? "checkbox-tile checked" : "checkbox-tile"}>
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
                        <h5>Selecciona los talles {formData.sizes.length > 0 && <span>({formData.sizes.join(' - ')})</span>}</h5>
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
                                <span className={formData.sizes.includes(size) ? "checkbox-tile checked" : "checkbox-tile"}>
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
                        ? formData.colors.map((color: string) => (
                          formData.sizes.map((size: string) => (
                            <div key={`${color}-${size}`} className="group">
                              <input
                                type="number"
                                name={`${color}-${size}`}
                                min={0}
                                value={formData.countInStockByVariant[`${color}-${size}`]}
                                className="active"
                                required
                                onLoad={handleStockInputChange}
                                onChange={handleStockInputChange}
                              />
                              <span className="highlight"></span>
                              <span className="bar"></span>
                              <label htmlFor={`${color}-${size}`}>Stock para: {color} - {size}</label>
                            </div>
                          ))
                        ))
                        : formData.colors.map((color: string) => (
                          <div key={color} className="group">
                            <input
                              type="number"
                              name={`${color}-`}
                              min={0}
                              value={formData.countInStockByVariant[`${color}-`]}
                              className="active"
                              required
                              onLoad={handleStockInputChange}
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
                        required
                        onChange={handleAddImageInputChange}
                      />
                      <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 50, margin: '15px 0' }} />
                      <label htmlFor="images">Imágenes <span>(De no seleccionar ninguna, la primer imagen añadida sera la principal)</span></label>
                      {
                        formData.images.length > 0 &&
                        <ul className="selected-images">
                          {formData.images.map((image: File, index: number) => (
                            <li key={index} className="selected-images__item">
                              <div className={selectedImageIndex === index ? "selected" : ""}>
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`Imagen ${index + 1}`}
                                  onClick={() => setSelectedImageIndex(index)}
                                />
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
                      <button type="submit">Crear producto</button>
                    </div>
                  </form>
                </div>
              </article>
            </section>
          </main>
          <Footer />
        </>
      )
  )
}

export default CreateProductPage