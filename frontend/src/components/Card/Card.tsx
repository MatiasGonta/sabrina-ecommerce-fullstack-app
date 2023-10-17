import { CSSProperties, ReactNode } from "react";

export interface CardInterface {
  title: string;
  text: string;
  icon: ReactNode;
  iconBackground: string;
  iconBoxShadow: string;
}

const Card: React.FC<CardInterface> = ({ title, text, iconBackground, iconBoxShadow, icon }) => {
  const cardStyles: CSSProperties = {
    backgroundColor: iconBackground,
    boxShadow: `0px 0px 23px 5px ${iconBoxShadow}`,
    WebkitBoxShadow: `0px 0px 23px 5px ${iconBoxShadow}`,
    MozBoxShadow: `0px 0px 23px 5px ${iconBoxShadow}`
  }

  return (
    <div className="card">
      <div className="card-icon" style={cardStyles}>
        {icon}
      </div>
      <div className="card-body">
        <span className="card-body__title">{title}</span>
        <span className="card-body__text">{text}</span>
      </div>
    </div>
  )
}

export default Card