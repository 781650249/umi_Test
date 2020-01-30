import Link from 'umi/link'
import React from 'react'

export default function PrivateRouter(props) {
    var loginId = localStorage.getItem("loginId")
    if(loginId){
        return props.children
    }
    else{
        return (
            <div>
                <p>该页面必须登录后才能访问,<Link to="/login">请先登录</Link></p>
            </div>
        )
    }
 
}
