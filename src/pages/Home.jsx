import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { filtersearch, filtersectionThunk, getProductsThunk } from '../store/slices/products.slice';
import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigatee=useNavigate()
    const dispatchh=useDispatch()
    const products=useSelector(state=>state.products)
    const[categorys,setCategorys]=useState([])
    const [inputsearch,setSearch]=useState("")
    

    useEffect(()=>{
        dispatchh(getProductsThunk())
        axios.get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
        .then(res=>setCategorys(res.data.data.categories))
    },[])

   


    return (
        <div>
            <section className='home-middlez'>

            <div className='home-categories'>
            <p>Categories</p>
            <select >
            <option onClick={()=>dispatchh(getProductsThunk())}>All</option>
            {categorys?.map(cate=><option onClick={()=>{
              dispatchh(filtersectionThunk(cate))
              }} key={cate.name}>{cate.name}</option>)}
            </select>
            </div>

            <InputGroup className="mb-3 homepin">
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
          onChange={(e)=>setSearch(e.target.value)}
          value={inputsearch}
        />
        <Button onClick={()=>dispatchh(filtersearch(inputsearch))} variant="outline-secondary" id="button-addon2">
        <i className='bx bx-search-alt'></i>
        </Button>
      </InputGroup>
    </section>
  
  <section className='container-cards'>
            {products.map(prod=>{  
    return(
      <ul style={{height:"50vh"}} key={prod.id} className='card'>
        <img src={prod.productImgs[0]}alt=""/>
        <li >{prod.title}</li>
        <li> {prod.category.name}</li>
        
        <li className='buying'>{prod.price}$</li>
        <Button onClick={()=>navigatee(`/product/${prod.id}`)} variant="secondary"><i className='bx bx-shopping-bag'></i> More</Button>
        </ul>
        )
    })}
 </section>


    </div>  
 );

};


export default Home;