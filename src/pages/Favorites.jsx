import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPurchaseThunk } from '../store/slices/Purchase.slice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Favorites = () => {
const Purchase=useSelector(state=>state.Purchase)
const dispatch=useDispatch(); 

useEffect(()=>{
dispatch(getPurchaseThunk())
},[])

console.log(Purchase)
    return (
        <div>
            <h2 style={{textAlign:"center"}}>purchases</h2>
            {Purchase.map(Purchase=>{
                return(
                    <div className='Purchase-card' key={Purchase.cartId}>
                        <p>{Purchase.createdAt}</p>
                        {Purchase.cart.products.map((product,index)=>{
                            return(
                                <ul key={index}>
                                    <Link to={`/product/${product.id}`}>
                                    <li>{product.title} {product.brand}</li>
                                    </Link>
                                    <li>Quantity:{product.productsInCart.quantity}</li>
                                    <li>Total Price:{product.price*product.productsInCart.quantity}$</li>
                                </ul>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
};

export default Favorites;