import { useLocation } from "react-router-dom";
import { Routes } from '@/models';

interface CheckoutStepsInterface {}

const CheckoutSteps: React.FC<CheckoutStepsInterface> = () => {
    let { pathname } = useLocation();

    const stepConditions = {
        firstStep: pathname === Routes.SHIPPING || pathname === Routes.PAYMENT || pathname === Routes.PLACEORDER,
        secondStep: pathname === Routes.SHIPPING || pathname === Routes.PAYMENT || pathname === Routes.PLACEORDER,
        thirdStep: pathname === Routes.PAYMENT || pathname === Routes.PLACEORDER,
        fourthStep: pathname === Routes.PLACEORDER,
    }

    return (
        <div className="checkout">
            <div className={`checkout__step ${stepConditions.firstStep ? 'checkout__step--active' : ''}`}>
                <span className="checkout__step__name">Sign-In</span>
            </div>
            <div className={`checkout__step ${stepConditions.secondStep ? 'checkout__step--active' : ''}`}>
                <span className="checkout__step__name">Envío</span>
            </div>
            <div className={`checkout__step ${stepConditions.thirdStep ? 'checkout__step--active' : ''}`}>
                <span className="checkout__step__name">Pago</span>
            </div>
            <div className={`checkout__step ${stepConditions.fourthStep ? 'checkout__step--active' : ''}`}>
                <span className="checkout__step__name">Realizar pedido</span>
            </div>
        </div>
    )
}

export default CheckoutSteps