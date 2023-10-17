import { AccordionInterface } from "../../models";

const Accordion: React.FC<AccordionInterface> = ({ number, title, text, icon }) => {
  return (
    <div className="accordion">
      <div className="accordion-header">
        <span className="accordion-header__number">{number}</span>
        <h3 className="accordion-header__title">{title}</h3>
      </div>
      <div className="accordion-body">
        <p className="accordion-body__text">{text}</p>
        <div className="accordion-body__icon">
          {icon}
        </div>
      </div>
    </div>
  )
}

export default Accordion