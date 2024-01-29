import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from '@/redux/store';
import { saveShippingAddress } from '@/redux/states/cart.state';
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom"
import { Navbar } from "@/components";
import { CheckoutSteps, Footer, Form, FormField } from '@/components/ui';
import { setLocalStorage } from "@/utilities";
import { Routes, ShippingAddress } from '@/models';
import '@/styles/pages/ShippingAddressPage/ShippingAddressPage.scss';

interface ShippingAddressPageInterface {}

const ShippingAddressPage: React.FC<ShippingAddressPageInterface> = () => {
    const { shippingAddress } = useSelector((store: AppStore) => store.cart);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [formData, setFormData] = useState<ShippingAddress>({
        fullName: shippingAddress.fullName || '',
        address: shippingAddress.address || '',
        city: shippingAddress.city || '',
        postalCode: shippingAddress.postalCode || ''
    });

    const isCompletedFormData = formData.fullName !== '' || formData.address !== '' || formData.city !== '' || formData.postalCode !== '';

    const handleFormData = (key: keyof ShippingAddress, value: string) => setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));
    
    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(saveShippingAddress(formData));

        setLocalStorage('shippingAddress', formData);

        navigate(Routes.PAYMENT);
    }

    return (
        <>
        <Navbar />
        
        <main className="shipping-main">
            <Helmet>
                <title>Dirección de envío</title>
            </Helmet>
            <section>
                <CheckoutSteps />
            </section>
            <section>
                <article>
                    <Form
                        formTitle="Dirección de envío"
                        buttonText="Continuar"
                        buttonProps={{ disabled: !isCompletedFormData }}
                        onSubmit={submitHandler}
                    >
                        <FormField
                            label="Nombre Completo"
                            type="text"
                            name="fullName"
                            defaultValue={formData.fullName}
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormData('fullName', e.target.value)}
                        />

                        <FormField
                            label="Ciudad"
                            type="text"
                            name="city"
                            defaultValue={formData.city}
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormData('city', e.target.value)}
                        />

                        <FormField
                            label="Domicilio"
                            type="text"
                            name="address"
                            defaultValue={formData.address}
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormData('address', e.target.value)}
                        />

                        <FormField
                            label="Código Postal"
                            type="number"
                            name="postalCode"
                            defaultValue={formData.postalCode}
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormData('postalCode', e.target.value)}
                        />
                    </Form>
                </article>
            </section>
        </main>
        <Footer />
        </>
    )
}

export default ShippingAddressPage