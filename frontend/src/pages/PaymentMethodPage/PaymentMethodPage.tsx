import { CheckoutSteps } from "@/components";
import { ThemeContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

interface PaymentMethodPageInterface {}

const PaymentMethodPage: React.FC<PaymentMethodPageInterface> = () => {
    const navigate = useNavigate();
    const { cart: {shippingAddress, paymentMethod}, savePaymentMethod } = useContext(ThemeContext);
    
    const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'PayPal');

    useEffect(() => {
      if (!shippingAddress.address) {
        navigate('/shipping');
      }
    }, [shippingAddress, navigate]);
    
    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        savePaymentMethod(paymentMethodName);
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeholder');
    }

    return (
    <div>
        <CheckoutSteps step1 step2 step3 />
        <div className="container small-container">
            <Helmet>
                <title>Payment Method</title>
            </Helmet>
            <h1>Payment Method</h1>
            <form onSubmit={submitHandler} >
                <div>
                    <label htmlFor="paypal">Paypal</label>
                    <input
                        type="radio"
                        id="PayPal"
                        name="paypal"
                        value="PayPal"
                        checked={paymentMethodName === 'PayPal'}
                        onChange={(e) => setPaymentMethodName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="stripe">Stripe</label>
                    <input
                        type="radio"
                        id="Stripe"
                        name="stripe"
                        value="Stripe"
                        checked={paymentMethodName === 'Stripe'}
                        onChange={(e) => setPaymentMethodName(e.target.value)}
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

export default PaymentMethodPage