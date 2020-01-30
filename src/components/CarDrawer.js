import React, { Component } from 'react'
import { connect } from 'dva';
import { Button, Icon } from 'antd';

const ButtonGroup = Button.Group;
@connect((products) => ({
    products
}))
export default class carDrawer extends Component {

    close = () => {
        console.log(this.props.data);
        const { data: { id } } = this.props;
        this.props.dispatch({
            type: 'products/handleClose',
            payload: {
                id,
                quantity: 0
            }
        })
    }


    addQuantity = () => {
        const { data: { id, quantity } } = this.props;
        this.props.dispatch({
            type: 'products/addQuantity',
            payload: {
                id,
                quantity: quantity + 1
            }
        })
    }

    reduceQuantity = () => {
        const { data: { id, quantity } } = this.props;
        this.props.dispatch({
            type: 'products/reduceQuantity',
            payload: {
                id,
                quantity: quantity - 1
            }
        })

    }


    render() {
        const { data } = this.props;
        const row = (<div style={{
            verticalAlign: 'middle',
            width: '15 %',
            marginRight: '3 %',
            position: 'relative',
            minHeight: '200px',
            marginBottom: '20px'
        }}>
            <img style={{ display: 'inlineBlock', height: 'auto', backgroundSize: '100%' }} alt={data.id} src={`./imgs/${data.sku}_2.jpg`} />
            <div style={{ position: 'absolute', left: '130px', top: '48px', }}>
                <h4 style={{ color: 'white' }}> {data.title} </h4>
                <p style={{ color: '#5b5a5e' }}> {data.style} </p>
                <p style={{ color: '#5b5a5e' }}>Quantity: {data.quantity} </p>
            </div>
            <Icon
                style={{
                    top: -3,
                    right: 0,
                    color: 'white',
                    textAlign: 'center',
                    position: 'absolute',
                    backgroundSize: 'auto 100%',
                    cursor: 'pointer'
                }}
                type="close"
                onClick={this.close}
            />


            <div style={{ color: "white", position: 'absolute', left: '315px', top: '68px', }}>
                <p style={{ textAlign: 'center', color: '#eabf00', fontSize: '16px' }}>${data.price.toFixed(2)}  </p>
                <ButtonGroup>
                    <Button size="small" onClick={this.addQuantity} icon="plus"></Button>
                    <Button disabled={data.quantity === 1 ? true : false} size="small" icon="minus" onClick={this.reduceQuantity}></Button>
                </ButtonGroup>
            </div>

            <hr style={{ marginTop: '15  px' }} />
        </div>)

        return (
            <div style={{
                boxSizing: 'border-box',
                transition: 'background - color 0.2s',
                opacity: ' 0.2s',

            }}>


                {row}


            </div>
        )
    }
}
