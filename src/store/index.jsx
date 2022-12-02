import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice from './slices/isLoading.slice'
import productCartSlice  from './slices/productCart.slice'
import productsSlice from './slices/products.slice'
import  PurchaseSlice  from './slices/Purchase.slice'

export default configureStore({
    reducer: {
        loading:isLoadingSlice,
        products:productsSlice,
        Purchase:PurchaseSlice,
        cart:productCartSlice,
    }
})
