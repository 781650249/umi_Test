import React, { Component } from 'react'
import { connect } from 'dva';
import { Card, Button } from 'antd';
import styles from './Product.css'

const { Meta } = Card;
@connect((products) => ({
  products,
}))

export default class Product extends Component {
  constructor(props) {
    super(props);
  }

  Add = async () => {
    await this.props.dispatch({
      type: 'products/add',
      payload: {
        msg: this.props.item,
      }
    })
  }

  render() {
    const { item, key } = this.props;
    return (
      <div>

        <Card className={styles.Card} key={key}
          hoverable
          style={{ textAlign: 'center', width: 240, marginLeft: '2%', padding: '10px', border: 'none', cursor: 'pointer', position: 'relative', marginBottom: '30px' }}
          cover={<img style={{ height: '100%', width: '100%', minHeight: '342px' }} alt={item.id} src={`./imgs/${item.sku}_1.jpg`} />}
        >
          <div style={{ fontSize: '12px', position: 'absolute', right: 10, top: 10, background: 'black', color: 'white', padding: '0 2px', borderRadius: '2px' }}>{item.isFreeShipping ? 'Free Shipping' : ''}</div>
          <Meta style={{
            position: 'relative',
            padding: '0 20px',
            height: '45px', fontSize: '12', padding: 0, flexWrap: 'nowrap'
          }} title={item.title} />

          <p style={{ fontWeight: 600, fontSize: 18, textAlign: 'center' }}>${item.price.toFixed(2)}</p>
          <p style={{ textAlign: 'center' }}>or  {item.installments}  X  ${(item.price / item.installments).toFixed(2)}</p>

          <Button className={styles.Btn} onClick={this.Add}>Add to cart</Button>
        </Card>


      </div>

    )
  }
}



