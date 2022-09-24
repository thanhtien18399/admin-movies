import React from 'react'
import { Menu } from 'antd';
import {NavLink} from "react-router-dom"

function MenuNav() {
    return (
        <Menu
            style={{
                width: "100%",
                background: "none",
                color: "#fff"
            }}
            mode="inline"
            theme="dark"
            items={[
                { label: ` Cyber Cinema`, key: "logo", icon: <i className="fa-solid fa-film"></i> },
                { label: "User", key: "user" },
                {
                    label: "Filims", key: "films", children: [{
                        label: <NavLink to="/">Films</NavLink> , key: "film"
                    },
                    {
                        label:<NavLink to="/create">add new</NavLink>, key:"addfilm"
                    }]
                },
                { label: "Showtime", key: "showTime" },

            ]}
        >

        </Menu>
    )
}

export default MenuNav