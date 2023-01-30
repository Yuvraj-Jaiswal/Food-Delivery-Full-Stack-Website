import React from 'react'
import { BiMinus , BiPlus} from 'react-icons/bi'
import {motion} from 'framer-motion'
import { useState , useEffect } from 'react';
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

function CartItem( {item} ) {
  const [qty, setqty] = useState(item.qty);
  const [{cartItems} , setCartItem_dis] = useStateValue();
  var cur_item = [];

  const updateQty = (type , id) => {
    if(type === "add"){
        setqty(qty + 1);
        cartItems.map( (item) => {
            if(item.id === id){
                item.qty += 1;
            }
        })
        updateItems()
    }
    else if(type == "minus"){
        if(qty > 1){
            setqty(qty - 1);
            cartItems.map( (item) => {
                if(item.id === id){
                    item.qty -= 1;
                }
            })
            updateItems()
        }
        else{
            cur_item = cartItems.filter( (item) => item.id !== id)
            updateItems();
        }
    }
  }

  const updateItems = () => {
    setCartItem_dis({
        type : actionType.SET_CART_ITEMS,
        cartItems : cur_item,
    })
    localStorage.setItem("Items", JSON.stringify(cur_item))
  }

  useEffect(() => {
    cur_item = cartItems;
  }, [qty, cur_item]);

  return (
    <div className='w-full h-auto'>
        { qty > 0 && (
        <div className='w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2'>
            {/* item img */}
            <img src={item?.imageURL} className='object-contain w-20 h-20 max-w-[60px] rounded-full'/>

            {/* item text */}
            <div className='flex flex-col gap-2'>
                <p className='text-base text-gray-50'>{item?.title}</p>
                <p className='text-sm block text-gray-300 font-semibold'>
                    $ {parseFloat(item?.price) * qty}
                </p>
            </div>

            {/* button add minus */}
            <div className='group flex items-center gap-2 ml-auto cursor-pointer'>
                <motion.div whileTap={{scale:0.75}}>
                    <BiMinus onClick={() => updateQty("minus" , item?.id)} className='text-gray-100'/>
                </motion.div>
                <p className='w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center 
                justify-center'>{qty}</p>
                <motion.div whileTap={{scale:0.75}}>
                    <BiPlus onClick={() => updateQty("add" , item?.id)} className='text-gray-100'/>
                </motion.div>
            </div>
        </div>
        ) }
    </div>
  )
}

export default CartItem