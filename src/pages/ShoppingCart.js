/* 
title: ShoppingCart

*/


import React from 'react'
import ProductLists from '../components/ProductLists';
import CarDrawerLists from '../components/CarDrawerLists';

export default function ShoppingCart() {
    return (
        <div>
            <ProductLists />
            <CarDrawerLists />
        </div>
    )
}
