import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoading } from './isLoading.slice';
import getConfig from '../../ultis/getConfig';

export const PurchaseSlice = createSlice({
    name: 'PurchaseSlice',
    initialState: [],
    reducers: {
        setPurchase:(state,action)=>{
            return action.payload
        }
    }
})

export const getPurchaseThunk=()=>(dispath)=>{
    dispath(setLoading(true))
    axios.get("https://e-commerce-api.academlo.tech/api/v1/purchases",getConfig())
    .then(res=>dispath(setPurchase(res.data.data.purchases)))
    .finally(()=>dispath(setLoading(false)))
}


export const { setPurchase } = PurchaseSlice.actions;
export default PurchaseSlice.reducer;
