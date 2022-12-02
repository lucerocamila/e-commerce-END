import { produceWithPatches } from 'immer';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductsThunk } from '../store/slices/products.slice';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import { addproductCartThunk, updateproductCartThunk } from '../store/slices/productCart.slice';
import { getCartThunk } from '../store/slices/productCart.slice';


const Newsdetail = () => {

    const navigatee=useNavigate()
    const {id}=useParams()
    const dispatch=useDispatch()
    const products=useSelector(state=>state.products)

    useEffect(()=>{
        dispatch(getProductsThunk())
    },[])

    const productDetail=products.find(pro=>pro.id==id)
    const sugeridos=products.filter(pro=>pro.category.id==productDetail.category.id)

    const [imagesele,setImage]=useState(productDetail?.productImgs[0])
    const [quantityy,setQuanty]=useState(1)

    const addProduct=()=>{
        if(quantityy !==0){
             const news={
                id:id,
                quantity:quantityy,
            }
         setQuanty(1)
         dispatch(addproductCartThunk(news))
        }
    
    }

    useEffect(()=>{
        setImage(imagesele)
    },[])

    return (
        <div>

            <h2 className='detail-title title-prod'>{productDetail?.title}</h2>
            <ul>
                <li>Product {productDetail?.category.name}</li>
                <li className='buying'>{productDetail?.price}$</li>
            </ul>

            <section className='card-detail'>
            <img className='image-detail' src={imagesele} alt="Click a una :)" />
            <ul>
                <li>{productDetail?.description}</li>
            </ul>
            </section>

  
            <article className='detail-button-buy'>
            <div style={{display:"flex"}}>
                <i className="bx bxs-minus-circle bx-md buyy" onClick={()=>{
                   quantityy===0 ?setQuanty(quantityy):setQuanty(quantityy-1)
                }}></i>
                <input type="number" placeholder='quantity' value={quantityy} onChange={(e)=>setQuanty(e.target.value)}/>
                <i className='bx bxs-plus-circle bx-md buyy' onClick={()=>setQuanty(quantityy +1)}></i>
            </div>
            <button onClick={addProduct} className='buy-details' style={{justifySelf:'start'}}>Buy <i className='bx bxs-shopping-bags'></i></button>
            </article>

            

        <section style={{background:" rgba(0, 0, 0, 0.034)",marginTop:"3rem"}}>

         <article className='container-cards'>

                {sugeridos.map(prod=>{
                    return(
                <ul style={{height:"280px"}} key={prod.id} className='card'>                    <img src={prod.productImgs[0]}alt=""/>

                         <li >{prod.title}</li>
                        <li> {prod.category.name}</li>
                     <li className='buying'>{prod.price}$</li>
                    <Button onClick={()=>{
                        setImage(prod.productImgs[0])
                        navigatee(`/product/${prod.id}`)
                        }} variant="secondary"><i className='bx bx-shopping-bag'></i> More details
                    </Button>
                </ul>
                    )
                })}

            </article>
    </section>

        </div>
    );
};

export default Newsdetail;