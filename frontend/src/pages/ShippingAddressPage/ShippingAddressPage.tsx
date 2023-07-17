import { ThemeContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom"
import { CheckoutSteps } from "@/components";

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
    const [country, setCountry] = useState(shippingAddress.country || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    
    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        saveShippingAddress({
            fullName,
            address,
            city,
            postalCode,
            country,
        });

        localStorage.setItem('shippingAddress', JSON.stringify({
            fullName,
            address,
            city,
            postalCode,
            country
        }));

        navigate('/payment');
    }

    return (
    <div>
        <Helmet>
            <title>Shipping Address</title>
        </Helmet>
        <CheckoutSteps step1 step2 />
        <div className="container small-container">
            <h1>Shipping Address</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="full-name">Full Name :</label>
                    <input
                        name="full-name"
                        value={fullName}
                        required
                        onChange={(e)=> setFullName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address :</label>
                    <input
                        name="address"
                        value={address}
                        required
                        onChange={(e)=> setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="city">City :</label>
                    <input
                        name="city"
                        value={city}
                        required
                        onChange={(e)=> setCity(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="postal-code">PostalCode :</label>
                    <input
                        name="postal-code"
                        value={postalCode}
                        required
                        onChange={(e)=> setPostalCode(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="country">Country :</label>
                    <input
                        name="country"
                        value={country}
                        required
                        onChange={(e)=> setCountry(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Continue</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ShippingAddressPage