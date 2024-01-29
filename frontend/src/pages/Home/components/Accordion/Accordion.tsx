import { Typography } from "@mui/material";
import { ReactNode } from "react";

export interface AccordionInterface {
  number: number;
  title: string;
  children: ReactNode;
  icon: ReactNode;
}

const Accordion: React.FC<AccordionInterface> = ({ number, title, children, icon }) => {
  return (
    <div className="accordion">
      <div className="accordion__header">
        <span className="accordion__header__number">{number}</span>
        <Typography fontSize={30} lineHeight={1.1} fontWeight="bold" display="inline" ml="10px" component="h3" noWrap={false}>
          {title}
        </Typography>
      </div>
      <div className="accordion__body">
        <p className="accordion__body__text">{children}</p>
        <div className="accordion__body__icon">
          {icon}
        </div>
      </div>
    </div>
  )
}

export default Accordion