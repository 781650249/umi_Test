
import axios from 'axios';
export async function getProducts() {
    return await axios.get('../assets/products.json');
}   