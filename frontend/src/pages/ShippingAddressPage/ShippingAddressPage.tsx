import { ThemeContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom"
import { CheckoutSteps, Footer, Navbar } from "@/components";
import { setLocalStorage } from "@/utilities";
import '@/styles/layouts/ShippingAddressPage/ShippingAddressPage.scss';

interface ShippingAddressPageInterface {}

const ShippingAddressPage: React.FC<ShippingAddressPageInterface> = () => {
    const navigate = useNavigate();
    const { userInfo, cart: {shippingAddress}, saveShippingAddress } = useContext(ThemeContext);

    useEffect(() => {
      if (!userInfo) {
        navigate('/signin?redirect=/shipping');
      }
    }, [userInfo, navigate]);

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    
    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        saveShippingAddress({
            fullName,
            address,
            city,
            postalCode
        });

        setLocalStorage('shippingAddress', {
            fullName,
            address,
            city,
            postalCode
        });

        navigate('/payment');
    }

    return (
        <>
        <Navbar />
        <main className="shipping-main">
            <Helmet>
                <title>Dirección de envío</title>
            </Helmet>
            <article>
                <CheckoutSteps step1 step2 />
            </article>
            <article className="form-container">
                <section>
                    <h1>Dirección de envío</h1>
                    <form onSubmit={submitHandler}>
                        <div className="group">      
                            <input
                                type="text"
                                name="full-name"
                                value={fullName}
                                required
                                onChange={(e)=> setFullName(e.target.value)}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label htmlFor="full-name">Full Name</label>
                        </div>
                        <div className="group">      
                            <input
                                type="text"
                                name="address"
                                value={address}
                                required
                                onChange={(e)=> setAddress(e.target.value)}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label htmlFor="full-name">Dirección</label>
                        </div>
                        <div className="group">      
                            <input
                                type="text"
                                name="city"
                                value={city}
                                required
                                onChange={(e)=> setCity(e.target.value)}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label htmlFor="city">Ciudad</label>
                        </div>
                        <div className="group">      
                            <input
                                type="number"
                                name="postal-code"
                                value={postalCode}
                                required
                                onChange={(e)=> setPostalCode(e.target.value)}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label htmlFor="postal-code">Código Postal</label>
                        </div>
                        <div className="from-submit">
                            <button type="submit">Continuar</button>
                        </div>
                    </form>
                </section>
            </article>
        </main>
        <Footer />
        </>
    )
}

export default ShippingAddressPage