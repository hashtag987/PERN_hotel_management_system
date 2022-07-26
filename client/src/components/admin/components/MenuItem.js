import React, { useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";

const MenuItem = (props) => {
  const { name, subMenus, iconClassName, onClick, to, exact } = props;
  const [expand, setExpand] = useState(false);

  return (
    <li onClick={props.onClick} className="li">
      <Link to={"/admin" + to} className={`menu-item`}>
        <div className="menu-icon"></div>
        <span>{name}</span>
      </Link>
    </li>
  );
};

export default MenuItem;
