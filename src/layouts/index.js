import React from 'react'
import './index.css'
import NavLink from 'umi/NavLink';

export default function index(props) {

    const config = props.route.routes.find(config => config.path === props.location.pathname)
    var title = "无标题";
    if (config && config.title) {
        title = config.title;
    }
    document.title = title;



    return (
        <>
            <div style={{ paddingLeft: '10px', margin: 20 }}>
                <NavLink style={{ padding: '20px' }} to='/'>Popular</NavLink>
                <NavLink style={{ padding: '20px' }} to="/Battle">Battle </NavLink>
                <NavLink style={{ padding: '20px' }} to="/ShoppingCart">ShoppingCart </NavLink>
                <NavLink style={{ padding: '20px' }} to='/Login'>Login</NavLink>


            </div>
            <div>
                {props.children}
            </div>

        </>
    )
}
