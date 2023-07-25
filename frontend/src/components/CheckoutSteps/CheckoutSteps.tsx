
interface CheckoutStepsInterface {
    step1?:boolean,
    step2?:boolean,
    step3?:boolean,
    step4?:boolean
}

const CheckoutSteps: React.FC<CheckoutStepsInterface> = (props) => {
    return (
    <section className="checkout-steps">
        <div className={props.step1 ? 'active' : ''}>
            <span>Sign-In</span>
        </div>
        <div className={props.step2 ? 'active' : ''}>
            <span>Envío</span>
        </div>
        <div className={props.step3 ? 'active' : ''}>
            <span>Pago</span>
        </div>
        <div className={props.step4 ? 'active' : ''}>
            <span>Realizar pedido</span>
        </div>
    </section>
  )
}

export default CheckoutSteps