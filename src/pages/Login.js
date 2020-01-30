/* 
title: 登录页

*/

import React, { useRef } from 'react'
import router from 'umi/router'


export default function Login() {
    const txtLoginId = useRef()
    const txtLoginPwd = useRef()

    return (
        <div>
            <p>
                账号 :<input type="text" ref={txtLoginId} />
            </p>
            <p>
                密码 :<input type="password" ref={txtLoginPwd} />
            </p>
            <p>
                <button onClick={() => {
                    if (txtLoginPwd.current.value == 123123) {
                        localStorage.setItem("loginId", txtLoginId.current.value)
                        router.push('/welcome')
                    }
                    else {
                        alert('账号或密码错误')
                    }
                }}>登录</button>
            </p>
        </div>
    )
}
