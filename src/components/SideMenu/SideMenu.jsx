import React from 'react'
import "./SideMenu.css"
import booksIcon from "../../assets/booksIcon.png"
import ordersIcon from "../../assets/ordersIcon.png"
import usersIcon from "../../assets/usersIcon.png"
import { Link, Outlet, useLocation } from "react-router-dom";

function SideMenu() {

    const { pathname } = useLocation()
    console.log(pathname.includes("dashboard"))

    const dashboard = pathname.endsWith("dashboard") || pathname.endsWith("products/create")
        || pathname.includes("products/edit");
    const orders = pathname.includes("dashboard/orders");
    const users = pathname.endsWith("users") || pathname.includes("users/edit");

    return (
        <div className="side-menu">
            <ul className="menu">
                <li>
                    <Link to={""} className={dashboard ? "active" : ""}>
                        <img src={booksIcon} alt="Books" />
                        <span>Books</span>
                    </Link>
                </li>
                <li>
                    <Link to={"orders"} className={orders ? "active" : ""}>
                        <img src={ordersIcon} alt="Orders" />
                        <span>Orders</span>
                    </Link>
                </li>
                <li>
                    <Link to={"users"} className={users ? "active" : ""}>
                        <img src={usersIcon} alt="Users" />
                        <span>Users</span>
                    </Link>
                </li>
            </ul>
            <div className="outlet">
                <Outlet />
            </div>
        </div>
    )
}

export default SideMenu;