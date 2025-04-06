import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState={
    totalItems: localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")):0,
    cart:localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],
    total:localStorage.getItem("total")?JSON.parse(localStorage.getItem("total")):0,
}
const cartSlice= createSlice({
    name:'cart',
    initialState:initialState,
    reducers:{
        setTotalItems(state,value) {
            state.totalItems=value.payload;
        },
        setCart(state,value) {
            state.cart=value.payload;
        },
        removeFromCart(state,value) {
            const filter =state.cart.filter((item)=>item._id!==value.payload);
            const course=state.cart.filter((item)=>item._id===value.payload);
            state.cart=filter;
            state.totalItems--;
            state.total-=course[0].price;
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
            localStorage.setItem("total",JSON.stringify(state.total));
            toast.success("item remove from cart")
            
        },
        addToCart(state,value) {
            const index=state.cart.findIndex((item)=>item._id===value.payload._id);
            if(index>=0) {
                toast.error("item already in cart");
                return;
            }
            state.cart.push(value.payload);
            state.totalItems++;
            state.total+=value.payload.price;
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
            localStorage.setItem("total",JSON.stringify(state.total));
            localStorage.setItem("cart",JSON.stringify(state.cart));
            toast.success("item added to cart")

        },
        resetCart(state,value) {
            state.cart=[];
            state.totalItems=0;
            state.total=0;
            
            localStorage.removeItem("cart");
            localStorage.removeItem("totalItems");
            localStorage.removeItem("total");
        }
        
    }

})

export const {setTotalItems,setCart,removeFromCart,addToCart,resetCart} = cartSlice.actions;
export default cartSlice.reducer;