import React, { Component } from 'react'
import { Button, Checkbox } from 'antd';
import { connect } from 'dva'


@connect((proudcts) => ({
    proudcts,
}))
export default class SizeBox extends Component {

    changeSize = (checkedValues) => {
        this.props.dispatch({
            type: 'products/selectSize',
            payload: {
                checkedValues
            }
        })
    }

    render() {
        const sizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
        const item = sizes.map((item, index) => (<Button onClick={this.changeSize} key={index} style={{ fontSize: '12px', width: 40, height: 40, borderRadius: '50%', backgroundColor: 'black', color: 'white' }}>{item}</Button>))
        return (
            <div style={{ width: 180 }}>
                <p>Size:</p>
                <Checkbox.Group options={sizes} onChange={this.changeSize} />
            </div>
        )
    }
}
