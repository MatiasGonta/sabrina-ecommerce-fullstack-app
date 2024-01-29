import { Navbar } from "@/components";
import { CheckoutSteps, Footer } from '@/components/ui';
import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from '@/redux/store';
import { savePaymentMethod } from "@/redux/states/cart.state";
import { setLocalStorage } from "@/utilities";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import '@/styles/pages/PaymentMethodPage/PaymentMethodPage.scss';
import { Routes } from "@/models";
import { Typography } from "@mui/material";

interface PaymentMethodPageInterface { }

const PaymentMethodPage: React.FC<PaymentMethodPageInterface> = () => {
    const { shippingAddress, paymentMethod } = useSelector((store: AppStore) => store.cart);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [paymentMethodName, setPaymentMethodName] = useState<'PayPal' | 'MercadoPago' | 'Efectivo' | 'Otros' | 'Transferencia' | 'Depósito' | 'Rapi Pago' | 'Pago Fácil' | 'Billetera Santa Fe'>(paymentMethod || 'PayPal');

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate(Routes.SHIPPING);
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethodName));
        setLocalStorage('paymentMethod', paymentMethodName);
        navigate(Routes.PLACEORDER);
    }

    return (
        <>
            <Navbar />
            <main>
                <section>
                    <CheckoutSteps step1 step2 step3 />
                </section>
                <section>
                    <article className="payment-method-wrapper">
                        <Helmet>
                            <title>Método de Pago</title>
                        </Helmet>
                        <Typography fontSize={35} fontWeight="bold" mt="30px" mb="30px" component="h3" noWrap={false}>
                            Método de Pago
                        </Typography>
                        <form onSubmit={submitHandler} className="payment-method-form">
                            <div className="payment-method-form__field">
                                <label htmlFor="paypal">Paypal</label>
                                <input
                                    className="payment-method-form__field__input-radio"
                                    type="radio"
                                    id="PayPal"
                                    name="paypal"
                                    value="PayPal"
                                    checked={paymentMethodName === 'PayPal'}
                                    onChange={(e) => setPaymentMethodName(e.target.value as 'PayPal')}
                                />
                            </div>
                            <div className="payment-method-form__field">
                                <label htmlFor="mercadopago">MercadoPago</label>
                                <input
                                    className="payment-method-form__field__input-radio"
                                    type="radio"
                                    id="MercadoPago"
                                    name="mercadopago"
                                    value="MercadoPago"
                                    checked={paymentMethodName === 'MercadoPago'}
                                    onChange={(e) => setPaymentMethodName(e.target.value as 'MercadoPago')}
                                />
                            </div>
                            <div className="payment-method-form__field">
                                {
                                    paymentMethodName === 'Efectivo' &&
                                    <div className="payment-message payment-message--cash">
                                        <p>💡Si optas por el pago en <strong>efectivo</strong>, te esperamos con gusto en nuestra tienda para que realices el pago y retires tu pedido. Por favor, ten en cuenta que el stock de los productos se reservará únicamente durante <strong>48 horas</strong> a partir de la confirmación de tu pedido.</p>
                                    </div>
                                }
                                <label htmlFor="efectivo">Efectivo</label>
                                <input
                                    className="payment-method-form__field__input-radio"
                                    type="radio"
                                    id="Efectivo"
                                    name="efectivo"
                                    value="Efectivo"
                                    checked={paymentMethodName === 'Efectivo'}
                                    onChange={(e) => setPaymentMethodName(e.target.value as 'Efectivo')}
                                />
                            </div>
                            <div className="payment-method-form__field">
                                {
                                    paymentMethodName === 'Otros' &&
                                    <div className="payment-message payment-message--others">
                                        <p>💡Si eliges la opción de <strong>otros</strong> métodos de pago alternativos, que incluyen Transferencia, Depósito, Rapi Pago, Pago Fácil o Billetera Santa Fe, te invitamos a ponerte en contacto con nosotros. Una vez realizado el pedido, comunícate al número de teléfono <strong>+541152799723</strong> a través de nuestro chat de WhatsApp de atención al cliente. Estaremos encantados de atenderte dentro de las próximas <strong>24 horas</strong> de realizado el pedido, para coordinar la alternativa de pago y asegurarnos de que puedas completar tu compra de manera conveniente.</p>
                                    </div>
                                }
                                <label htmlFor="otros">Otros</label>
                                <input
                                    className="payment-method-form__field__input-radio"
                                    type="radio"
                                    id="Otros"
                                    name="otros"
                                    value="Otros"
                                    checked={paymentMethodName === 'Otros'}
                                    onChange={(e) => setPaymentMethodName(e.target.value as 'Otros')}
                                />
                            </div>
                            <div>
                                <button className="payment-method-form__submit" type="submit">Continuar</button>
                            </div>
                        </form>
                    </article>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default PaymentMethodPage