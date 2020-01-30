import axios from 'axios';

export default {
    getProducts: () => axios.get('api/products'),
}