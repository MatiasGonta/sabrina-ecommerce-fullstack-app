import { CheckoutSteps, Footer, Navbar } from "@/components";
import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from '@/redux/store';
import { savePaymentMethod } from "@/redux/states/cart.state";
import { setLocalStorage } from "@/utilities";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import '@/styles/layouts/PaymentMethodPage/PaymentMethodPage.scss';

interface PaymentMethodPageInterface {}

const PaymentMethodPage: React.FC<PaymentMethodPageInterface> = () => {
    const { shippingAddress, paymentMethod } = useSelector((store: AppStore) => store.cart);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    const [paymentMethodName, setPaymentMethodName] = useState<string>(paymentMethod || 'PayPal');

    useEffect(() => {
      if (!shippingAddress.address) {
        navigate('/shipping');
      }
    }, [shippingAddress, navigate]);
    
    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethodName));
        setLocalStorage('paymentMethod', paymentMethodName);
        navigate('/placeorder');
    }

    return (
    <>
        <Navbar />
        <main className="payment-main">
            <article>
                <CheckoutSteps step1 step2 step3 />
            </article>
            <article>
                <section>
                    <Helmet>
                        <title>Método de Pago</title>
                    </Helmet>
                    <h1>Método de Pago</h1>
                    <form onSubmit={submitHandler} >
                        <div className="payment-option">
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
                        <div className="payment-option">
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

export default PaymentMethodPage