interface CheckoutStepsInterface {
    step1?:boolean,
    step2?:boolean,
    step3?:boolean,
    step4?:boolean
}

const CheckoutSteps: React.FC<CheckoutStepsInterface> = (props) => {
    return (
    <div className="checkout">
        <div className={`checkout__step ${props.step1 ? 'checkout__step--active' : ''}`}>
            <span className="checkout__step__name">Sign-In</span>
        </div>
        <div className={`checkout__step ${props.step2 ? 'checkout__step--active' : ''}`}>
            <span className="checkout__step__name">Envío</span>
        </div>
        <div className={`checkout__step ${props.step3 ? 'checkout__step--active' : ''}`}>
            <span className="checkout__step__name">Pago</span>
        </div>
        <div className={`checkout__step ${props.step4 ? 'checkout__step--active' : ''}`}>
            <span className="checkout__step__name">Realizar pedido</span>
        </div>
    </div>
  )
}

export default CheckoutSteps