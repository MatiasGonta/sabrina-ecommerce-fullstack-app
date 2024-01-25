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
    <div className='sub-navbar'>
        <h2 className="sub-navbar__route-path">{firstChild}</h2>
        {restChildren}
    </div>
  )
}

export default SubNavbar