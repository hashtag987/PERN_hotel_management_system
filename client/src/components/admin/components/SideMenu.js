import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import MenuItem from "./MenuItem";
import logo from "../../../utils/logos/fg3.png";
export const menuItems = [
  {
    name: "Dashboard",
    exact: true,
    to: "/dashboard",
    icon:<Icon icon="ci:dashboard" />,
  },
  {
    name: "Reservation",
    exact: true,
    to: "/reservation",
    icon:<Icon icon="icon-park-solid:hotel-please-clean" />,
  },
  {
    name: "Customers",
    exact: true,
    to: "/customers",
    icon:<Icon icon="bxs:user" />
  },
  {
    name: "Rooms",
    exact: true,
    to: "/rooms",
    icon:<Icon icon="ic:round-hotel" />,
  },
];

const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  //just an improvment and it is not recorded in video :(
  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  /*just a little improvement over click function of menuItem
    Now no need to use expand state variable in MenuItem component
  */
  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        // console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);
  // console.log(inactive + "dsdsfd");
  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="webscript" />
        </div>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <Icon icon="bi:arrow-right-square-fill" />
          ) : (
            <Icon icon="bi:arrow-left-square" />
          )}
        </div>
      </div>
      <br />
      <div className="divider"></div>
      <div className="main-menu">
        <ul className="ul">
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              // exact={menuItem.exact.toString()}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.icon}
              onClick={(e) => {
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
