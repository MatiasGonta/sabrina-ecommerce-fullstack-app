import { Typography } from "@mui/material";
import React from "react"

interface SubNavbarInterface {
  children: React.ReactNode | React.ReactNode[];
}

const SubNavbar: React.FC<SubNavbarInterface> = ({ children }) => {
  // Get the children as an array
  const childrenArray = React.Children.toArray(children);

  const firstChild = childrenArray[0];
  const restChildren = childrenArray.slice(1);

  return (
    <div className="sub-navbar">
      <Typography fontSize={24} fontWeight="bold" component="h2" noWrap={false}>
        {firstChild}
      </Typography>
      {restChildren}
    </div>
  )
}

export default SubNavbar