import React, { Component } from 'react'
import { Drawer, Icon, Button } from 'antd';
import CarDrawer from './CarDrawer';
import { connect } from 'dva';


@connect((products) => ({
    products
}))

export default class CarDrawerLists extends Component {
    state = {
        visible: false,
        cartData: []
    }

    // componentWillReceiveProps(nextProps) {
    //     const { products: { products: { cartData } } } = nextProps
    //     if (cartData && cartData.length) {
    //         this.showDrawer();
    //     } else {
    //         this.onClose()
    //     }
    // }


    showDrawer = () => {
        this.setState({
            visible: true
        })
    }

    onClose = () => {
        this.setState({
            visible: false
        })
    }
    handleCheckout = () => {
        const { products: { products: { cartData, subTotal } } } = this.props;
        // this.props.dispatch({
        //     type: 'products/checkTotal',
        //     payload: {
        //         cartData
        //     }
        // })
        alert(`总共消费了${subTotal.toFixed(2)}美元`)

    }

    render() {
        const { products: { products: { cartData, subTotal, count } } } = this.props;
        console.log(cartData);
        const bottom = (
            <div style={{ right: '0px', borderTop: '1px solid white', height: '160px', width: '450px', bottom: 0, position: 'fixed', background: 'black', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                    <p style={{ margin: 0 }}>SUBTOTAL</p>
                    <div style={{}}>
                        <p style={{ margin: 0, color: 'darkgoldenrod', fontSize: '24px' }}>${subTotal.toFixed(2)}</p>
                        <p style={{ margin: 0 }}>OR UP TO 9 x $ {(subTotal / 9).toFixed(2)}</p>
                    </div>
                </div>
                <Button
                    block
                    style={{ borderRadius: 0, background: '#222', color: 'white', fontSize: '20px', border: 'none', height: '40px', lineHeight: '40px', marginTop: '20px' }}
                    onClick={this.handleCheckout}
                >
                    CHECKOUT
        </Button>
            </div>
        )
        const empty = (
            <div style={{ height: '160px' }}>

            </div>
        )

        return (
            <div>

                <Button style={{ width: 50, height: 50, backgroundColor: 'black', position: 'fixed', top: 10, right: 0 }} onClick={this.showDrawer}><Icon style={{ color: 'white' }} type="shopping-cart" /></Button>

                <div style={{ width: '450px', height: '100%', oveflow: 'hidden' }}>

                    <Drawer
                        closable={true}
                        mask={false}
                        maskClosable={false}
                        onClose={this.onClose}
                        headerStyle={{ backgroundColor: '#1b1a20', color: 'white' }}
                        width={450}
                        drawerStyle={{
                            backgroundColor: '#1b1a20',
                            boxSizing: 'border-box',
                            transition: 'right 0.2s',
                            color: 'white',
                        }}
                        title={<div style={{ textAlign: 'center' }}><Icon style={{ color: 'white', fontSize: '40px', lineHeight: '60px' }} type="shopping-cart" />
                            <div style={{ position: 'absolute', top: 52, left: 220, color: 'black', fontSize: '5px', height: '18px', width: '18px', borderRadius: '9px', background: 'darkgoldenrod', lineHeight: '18px' }}>{count}</div>
                            <h2 style={{ color: 'white', position: 'absolute', left: 253, top: 37 }}>Cart</h2> </div>}
                        placement="right"
                        visible={this.state.visible}
                    >

                        {cartData.map(item => (<CarDrawer data={item} key={item.id} />))}
                        {!cartData.length && (<p style={{ textAlign: 'center', color: 'white' }}>
                            Add some products in the cart
                </p>)}
                        {empty}
                        {bottom}

                    </Drawer>

                </div>
            </div>
        )
    }
}
