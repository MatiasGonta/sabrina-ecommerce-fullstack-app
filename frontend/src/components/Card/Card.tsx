import { CSSProperties, ReactNode } from "react";

export interface CardInterface {
  title: string;
  children: ReactNode;
  icon: ReactNode;
  iconBackground: string;
  iconBoxShadow: string;
}

const Card: React.FC<CardInterface> = ({ title, children, iconBackground, iconBoxShadow, icon }) => {
  const cardStyles: CSSProperties = {
    borderTop: `5px solid ${iconBackground}`,
  }

  const cardIconStyles: CSSProperties = {
    backgroundColor: iconBackground,
    boxShadow: `0px 0px 23px 5px ${iconBoxShadow}`,
    WebkitBoxShadow: `0px 0px 23px 5px ${iconBoxShadow}`,
    MozBoxShadow: `0px 0px 23px 5px ${iconBoxShadow}`
  }

  return (
    <div className="card" style={cardStyles}>
      <div className="card__icon" style={cardIconStyles}>
        {icon}
      </div>
      <div className="card__body">
        <span className="card__body__title">{title}</span>
        <span className="card__body__text">{children}</span>
      </div>
    </div>
  )
}

export default Card