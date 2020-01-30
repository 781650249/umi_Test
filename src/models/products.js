
import products from '../assets/products.json'

export default {
    namespace: 'products',
    state: {
        list: [],      //总的商品数
        cartData: [], //购物车渲染的商品
        subTotal: 0,
    },
    reducers: {
        setProducts: (state, { payload }) => {
            return {
                ...state,
                list: payload.products
            }
        },
        close(state, { payload }) {
            let count = 0;
            let subTotal = 0;
            const { id } = payload;
            const { cartData } = state;
            const index = cartData.findIndex(item => item.id = id);
            cartData.splice(index, 1);

            cartData.forEach(item => {
                count += item.quantity
            })


            return {
                ...state,
                cartData,
                subTotal,
                count,
            }

        },
        cartData(state, { payload }) {
            const { cartData } = state;
            const { msg } = payload;

            let num = 0;   //商品的品种数量
            let count = 0   //商品的总数目（每个商品单个的个数的个数之和）
            let subTotal = 0  //商品的总价格
            cartData.forEach(item => {
                if (item.id === msg.id) {
                    item.quantity += 1;
                }
                else {
                    num++
                }
                count += item.quantity
                // subTotal = subTotal + item.price + (item.quantity - 1)
            })

            if (cartData.length === num) {
                cartData.push({
                    ...msg,
                    quantity: 1
                })
                count += 1
            }

            cartData.forEach(item => {
                subTotal = subTotal + item.price * item.quantity
            })


            return {
                ...state,
                cartData,
                count,
                subTotal
            }
        },
        reduceData(state, { payload: { id, quantity } }) {
            const { cartData } = state;
            let count = 0;
            cartData.forEach(item => {
                if (item.id === id) {
                    item.quantity = quantity;
                    cartData.splice(cartData.findIndex(item => item.id === id), 1)
                }
            })
            cartData.forEach(item => {
                count += item.quantity
            })

            return {
                ...state,
                cartData,
                count
            }
        },

        countMinusOne(state, { payload: { id, quantity } }) {
            const { cartData } = state;
            let count = 0;
            cartData.forEach(item => {
                if (item.id === id) {
                    item.quantity = quantity;
                }
                cartData.forEach(item => {
                    count += item.quantity;
                })

            })

            return {
                ...state,
                cartData,
                count
            }
        },

        countPlusOne(state, { payload: { id, quantity } }) {
            const { cartData } = state
            let count = 0
            cartData.forEach(item => {
                if (item.id === id) {
                    item.quantity = quantity;
                }
                count += item.quantity
            })

            return {
                ...state,
                cartData,
                count
            }
        },
        setSort(state, payload) {
            const { checkedValues } = payload;
            console.log(checkedValues, 11111);
            const list = state.list.filter(item => {
                if (item.availableSizes.toString().indexOf(checkedValues) > -1) {
                    return item
                }
            })
            console.log(list);
            return {
                ...state,
                list,
            }

        },
        subTotal(state, payload) {
            let subTotal = 0;
            state.cartData.forEach(item => {
                subTotal = subTotal + item.price * item.quantity
            })
            return {
                ...state,
                subTotal
            }
        },
        sortState(state, payload) {
            return {
                ...state,
                list: payload.sortPrice
            }
        },
        checkState(state, payload) {
            const { cartData } = payload;
            cartData = [];
            console.log(cartData);
            return {
                ...state,
                cartData
            }
        }
    },

    effects: {
        *checkTotal({ payload: { cartData } }, { put }) {
            console.log(cartData);
            yield put({
                type: 'checkState',
                cartData
            })
        },
        *sort({ payload: { sortPrice } }, { put }) {
            yield put({
                type: 'sortState',
                sortPrice,
            })
        },

        *selectSize({ payload: { checkedValues } }, { put }) {
            console.log(checkedValues);
            yield put({
                type: 'setSort',
                checkedValues
            })
        },
        *query(_, { put }) {
            if (products) {
                yield put({
                    type: 'setProducts',
                    payload: products
                })
            }

        },
        *add({ payload }, { put }) {
            yield put({
                type: 'cartData',
                payload,
            })
        },
        *handleClose({ payload }, { put }) {
            const { quantity, id } = payload;
            yield put({
                type: 'close',
                payload: {
                    quantity,
                    id
                }
            })
            yield put({
                type: 'subTotal'
            })
        },
        *addQuantity({ payload: { id, quantity } }, { put }) {
            yield put({
                type: 'countPlusOne',
                payload: {
                    quantity,
                    id
                }
            })

            yield put({
                type: 'subTotal'
            })
        },
        *reduceQuantity({ payload: { id, quantity } }, { put }) {
            yield put({
                type: 'countMinusOne',
                payload: {
                    quantity,
                    id
                }
            })

            yield put({
                type: 'subTotal',
            })
        }
    }
}