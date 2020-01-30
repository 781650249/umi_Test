import React, { Component } from 'react'
import { Select } from 'antd';
const { Option } = Select
import { connect } from 'dva';

@connect((products) => ({
    products,
}))
export default class SelectBox extends Component {
    handleChange = (value) => {
        const { products: { products: { list } } } = this.props;
        if (value == "low") {
            console.log(list);
            const sortPrice = list.sort((a, b) => (a.price - b.price))
            this.props.dispatch({
                type: "products/sort",
                payload: {
                    sortPrice
                }
            })
        } else if (value == 'high') {
            const sortPrice = list.sort((a, b) => (b.price - a.price))
            this.props.dispatch({
                type: "products/sort",
                payload: {
                    sortPrice
                }
            })
        } else {
            window.location.reload();
        }

    }


    render() {
        const select = <Select defaultValue="Select" style={{ width: 160 }} onChange={this.handleChange}>
            <Option value="Select">Select</Option>
            <Option value="low">Lowest To  Highest</Option>
            <Option value="high">Highest To Lowest</Option>
        </Select>
        return (
            <div style={{ position: 'absolute', right: 0, top: 80 }}>
                order by {select}
            </div>
        )
    }
}
