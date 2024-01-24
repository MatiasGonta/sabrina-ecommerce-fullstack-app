import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from '@/redux/store';
import { saveShippingAddress } from '@/redux/states/cart.state';
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom"
import { Navbar } from "@/components";
import { CheckoutSteps, Footer } from '@/components/ui';
import { handleFormInputChange, setLocalStorage } from "@/utilities";
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
                <CheckoutSteps step1 step2 />
            </section>
            <section>
                <article>
                    <div className="form-container">
                    <h3>Dirección de envío</h3>
                    <form onSubmit={submitHandler}>
                        <div className="group">      
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                required
                                onChange={(e) => handleFormInputChange(e, formData, setFormData)}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label htmlFor="fullName">Nombre Completo</label>
                        </div>
                        <div className="group">      
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                required
                                onChange={(e) => handleFormInputChange(e, formData, setFormData)}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label htmlFor="city">Ciudad</label>
                        </div>
                        <div className="group">      
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                required
                                onChange={(e) => handleFormInputChange(e, formData, setFormData)}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label htmlFor="address">Domicilio</label>
                        </div>
                        <div className="group">      
                            <input
                                type="number"
                                name="postalCode"
                                value={formData.postalCode}
                                required
                                onChange={(e) => handleFormInputChange(e, formData, setFormData)}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label htmlFor="postalCode">Código Postal</label>
                        </div>
                        <div className="form-submit">
                            <button type="submit">Continuar</button>
                        </div>
                    </form>
                    </div>
                </article>
            </section>
        </main>
        <Footer />
        </>
    )
}

export default ShippingAddressPage