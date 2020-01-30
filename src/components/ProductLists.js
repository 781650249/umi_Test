import React from 'react'
import { connect } from 'dva'
import Product from '../components/Product'
import SelectBox from '../components/SelectBox'
import SizeBox from '../components/SizeBox';
import styles from './ProductLists.css'
import CarDrawerLists from './CarDrawerLists'


@connect((products) => ({
	products,
}))


export default class ProductLists extends React.Component {

	state = {
		list: this.props,
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch({
			type: 'products/query',
		})
	}

	componentWillReceiveProps(nextProps) {
		const { products: { products: { list } } } = nextProps;
		console.log(list);
		this.setState({
			list: list
		})
	}

	render() {
		const { products: { products: { list } } } = this.props;
		console.log(list);
		const dd = (<div>
			<p style={{ position: 'absolute', left: 200, top: '120px' }}>{list.length}  Product(s)  found</p>
			<div className={styles.Products} >
				{list.map(item =>
					<Product item={item} key={item.id} />
				)}
			</div>
		</div>)
		return (
			<div>
				<SizeBox />
				<SelectBox />
				{dd}
				<CarDrawerLists />
			</div>
		)
	}
}

