import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import { Navbar, Sidebar } from '@/components';
import { LoadingSpinner, Footer, Form, FormField, FieldRecommendations, SwitchFormField, CheckboxFormField, Checkbox, FileFormField, ColorBadge } from '@/components/ui';
import { useCreateProductMutation, useGetFilterCountsQuery, useGetProductDetailsBySlugQuery, useUpdateProductMutation } from '@/hooks';
import { ApiError, FilterItem, TypeWithKey, LoadingSpinnerType, COLORS, Routes } from '@/models';
import { useWorkspace } from './hooks';
import { WorkspaceAction } from './models';
import { getError } from '@/utilities';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '@/styles/pages/WorkspaceProductPage/WorkspaceProductPage.scss';

interface WorkspaceProductPageInterface {}

const WorkspaceProductPage: React.FC<WorkspaceProductPageInterface> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  let { pathname } = useLocation();
  const WORKSPACE_ACTION = pathname.split('/')[3];

  const { categories, brands, isLoading: filterCountsLoading, error: filterCountsError } = useGetFilterCountsQuery();
  
  const { product, isLoading } = WORKSPACE_ACTION === WorkspaceAction.UPDATE ? useGetProductDetailsBySlugQuery(slug!) : { product: null, isLoading: false };

  const emptyFormData = {
    name: '',
    images: [],
    category: '',
    brand: '',
    price: '',
    colors: [],
    sizes: [],
    countInStockByVariant: {}
  }

  const defaultFormData = {
    name: product?.name!,
    images: product?.images!,
    category: product?.category!,
    brand: product?.brand!,
    price: product?.price.toString()!,
    colors: product?.colors!,
    sizes: product?.sizes!,
    countInStockByVariant: product?.countInStockByVariant!
  }

  const initialFormData = WORKSPACE_ACTION === WorkspaceAction.UPDATE ? defaultFormData : emptyFormData;

  const {
    formData,
    setFormData,
    selectedImageIndex,
    setSelectedImageIndex,
    isLoadingInitialFormData,
    handleWorkspaceProductData,
    handleCheckboxWorkspaceProductData,
    handleStockWorkspaceProductData,
    handleAddImageWorkspaceProductData,
    handleRemoveImageWorkspaceProductData
  } = useWorkspace(initialFormData);

  const [hasSizes, setHasSizes] = useState<boolean>(true);

  useEffect(() => {
    if (product) {
      setFormData(initialFormData);
      setHasSizes(defaultFormData.sizes && defaultFormData.sizes.length !== 0 ? true : false);
    }
  }, [product]);

  //Form submit handler
  const { mutateAsync: createProduct } = useCreateProductMutation();
  const { mutateAsync: updateProduct } = useUpdateProductMutation();

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

      if (WORKSPACE_ACTION === WorkspaceAction.CREATE && selectedImageIndex !== 0) {
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

      if (WORKSPACE_ACTION === WorkspaceAction.CREATE) {
        formData.images.forEach((image) => {
          formDataToSend.append('images', image);
        });
      } else {
        const deletedImages = product!.images.filter((image) => !formData.images.includes(image));

        formDataToSend.append('selectedImageIndex', JSON.stringify(selectedImageIndex));
        formDataToSend.append('oldImages', JSON.stringify(formData.images.filter((image) => typeof image === 'string')));
        formDataToSend.append('deletedImages', JSON.stringify(deletedImages));
        formData.images.filter((image) => typeof image !== 'string').forEach((image) => {
          formDataToSend.append('images', image);
        });
      }

      const submitFunc = WORKSPACE_ACTION === WorkspaceAction.CREATE ? createProduct(formDataToSend) : updateProduct(formDataToSend);
      const submitFuncPendingMsg = WORKSPACE_ACTION === WorkspaceAction.CREATE ? 'Creando nuevo producto...' : 'Actualizando producto...';

      await toast.promise(submitFunc, {
        pending: {
          render() {
            return submitFuncPendingMsg
          },
        },
        success: {
          render({ data }) {
            return data?.data.message
          },
        },
      });

      if (WORKSPACE_ACTION === WorkspaceAction.CREATE) {
        // Reset formData
        setFormData(emptyFormData);
      } else {
        navigate(Routes.DASHBOARD_PRODUCTS);
      }
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };

  const categoriesArray: string[] = categories?.map((category: FilterItem) => category._id);
  const brandsArray: string[] = brands?.map((brand: FilterItem) => brand._id);
  const colorsArray: string[] = Object.keys(COLORS);
  const sizesArray: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  console.log(colorsArray);

  return (
    isLoading || filterCountsLoading || WORKSPACE_ACTION === WorkspaceAction.UPDATE  && isLoadingInitialFormData
      ? <LoadingSpinner type={LoadingSpinnerType.NOFLEX} /> : filterCountsError
        ? <h4>{getError(filterCountsError as ApiError)}</h4> : (
        <>
          <Helmet>
            <title>Crear producto - SABRINA</title>
          </Helmet>
          <Navbar />
          <main className="main--admin">
            <Sidebar />
            <section className="workspace-product">
              <article className="workspace-product__from-wrapper">
                <Form
                  formTitle={WORKSPACE_ACTION === WorkspaceAction.CREATE ? "Crear Producto" : "Actualizar Producto"}
                  buttonText={WORKSPACE_ACTION === WorkspaceAction.CREATE ? "Crear producto" : "Actualizar producto"}
                  buttonProps={{ disabled: isLoading }}
                  columns={2}
                  encType="multipart/form-data"
                  onSubmit={submitHandler}
                >
                  <FormField
                    label="Nombre"
                    type="text"
                    name="name"
                    defaultValue={formData.name}
                    customClass={formData.name !== '' ? 'form-field__input--active' : ''}
                    pattern=".{4,40}"
                    title="El nombre debe tener entre 4 y 40 caracteres"
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleWorkspaceProductData('name', e.target.value)}
                  />

                  <FormField
                    label="Marca"
                    type="text"
                    name="brand"
                    defaultValue={formData.brand}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleWorkspaceProductData('brand', e.target.value)}
                  >
                    <FieldRecommendations>
                      {
                        brandsArray.map((brand, index) => (
                          <li key={index} onClick={() => handleWorkspaceProductData('brand', brand)}>
                            <span>{brand}</span>
                          </li>
                        ))
                      }
                    </FieldRecommendations>
                  </FormField>

                  <FormField
                    label="Precio"
                    type="number"
                    name="price"
                    min={0}
                    customClass={formData.price !== '' ? 'form-field__input--active' : ''}
                    defaultValue={formData.price}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleWorkspaceProductData('price', e.target.value)}
                  />

                  <FormField
                    label="Categoria"
                    type="text"
                    name="category"
                    defaultValue={formData.category}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleWorkspaceProductData('category', e.target.value)}
                  >
                    <FieldRecommendations>
                      {
                        categoriesArray.map((category, index) => (
                          <li key={index} onClick={() => handleWorkspaceProductData('category', category)}>
                            <span>{category}</span>
                          </li>
                        ))
                      }
                    </FieldRecommendations>
                  </FormField>

                  <SwitchFormField
                    switchTitle="¿Producto con talles?"
                    checked={hasSizes}
                    onChange={() => {
                      setFormData((prevFormData) => ({ ...prevFormData, countInStockByVariant: {} }));
                      setHasSizes(!hasSizes);
                    }}
                  />

                  <CheckboxFormField title={`Selecciona los colores ${formData.colors && formData.colors.length > 0 ? `(${formData.colors.join(' - ')})` : ''}`}>
                    {colorsArray.map((name, index) => (
                      <Checkbox
                        key={index}
                        label={name}
                        template='small'
                        checkCondition={formData.colors && formData.colors.includes(name)}
                        name={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxWorkspaceProductData(e, { name: 'colors', value: formData.colors })}
                      >
                        <ColorBadge color={name} size="large" />
                      </Checkbox>
                    ))}
                  </CheckboxFormField>

                  {
                    hasSizes &&
                    <CheckboxFormField title={`Selecciona los talles ${formData.sizes && formData.sizes.length > 0 ? `(${formData.sizes.join(' - ')})` : ''}`}>
                      {sizesArray.map((size, index) => (
                        <Checkbox
                          key={index}
                          label={size}
                          template='small'
                          checkCondition={formData.sizes && formData.sizes.includes(size)}
                          name={size}
                          disabled={hasSizes ? false : true}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxWorkspaceProductData(e, { name: 'sizes', value: formData.sizes })}
                        >
                          <StraightenOutlinedIcon sx={{ fontSize: 25, width: '25px', height: '25px' }} />
                        </Checkbox>
                      ))}
                    </CheckboxFormField>
                  }

                  {
                    hasSizes
                      ? formData.colors && formData.colors.map((color: string) => (
                        formData.sizes && formData.sizes.map((size: string) => (
                          <FormField
                            key={`${color}-${size}`}
                            label={`Stock para: ${color} - ${size}`}
                            type="number"
                            name={`${color}-${size}`}
                            min={0}
                            defaultValue={formData.countInStockByVariant[`${color}-${size}`] ?? 0}
                            customClass="form-field__input--active"
                            required
                            onLoad={handleStockWorkspaceProductData}
                            onChange={handleStockWorkspaceProductData}
                          />
                        ))
                      ))
                      : formData.colors && formData.colors.map((color: string) => (
                        <FormField
                          key={color}
                          label={`Stock para: ${color}`}
                          type="number"
                          name={`${color}-`}
                          min={0}
                          defaultValue={formData.countInStockByVariant[`${color}-`] ?? 0}
                          customClass="form-field__input--active"
                          required
                          onLoad={handleStockWorkspaceProductData}
                          onChange={handleStockWorkspaceProductData}
                        />
                      ))
                  }

                  <FileFormField
                    images={formData.images}
                    selectedIndex={selectedImageIndex}
                    handleSelectedIndex={setSelectedImageIndex}
                    required
                    onChange={handleAddImageWorkspaceProductData}
                    onClickFunc={handleRemoveImageWorkspaceProductData}
                  />
                </Form>
              </article>
            </section>
          </main>
          <Footer />
        </>
      )
  )
}

export default WorkspaceProductPage