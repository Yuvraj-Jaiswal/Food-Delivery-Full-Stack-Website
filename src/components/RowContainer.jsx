import React from 'react'
import { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

function RowContainer({flag , data , scroll_v}) {

  const [{cartItems}, dispatch_CI] = useStateValue();
  const [items, setItems] = useState(cartItems);
  const rowContainer = useRef();

  useEffect( () => {
    rowContainer.current.scrollLeft += scroll_v
  },[scroll_v])

  const updateCart = () => {
    dispatch_CI({
      type : actionType.SET_CART_ITEMS,
      cartItems : items,
    });
    localStorage.setItem("Items" , JSON.stringify(items));
  }

  const addToCart = (item) => {
    var is_present = false;
    cartItems.forEach( (elem) => {
      if(elem.id === item.id){
        is_present = true
      }
    });

    if(!is_present){
      setItems([...cartItems, item])
    }else{
      console.log("item already present");
    }
    return is_present;
  }
  
  useEffect( () => {
    updateCart()
  } , [items])

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3  my-10 scroll-smooth   ${
      flag
        ? "overflow-x-scroll scrollbar-none"
        : "overflow-x-hidden flex-wrap justify-center" }`}>

        {data && data.map((item) => (
          <div key={item?.id} 
          className='w-300 min-w-[300px] md:w-340 md:min-w-[340px] h-[225px] bg-cardOverlay my-6
          rounded-lg m-2 backdrop-blur-lg hover:drop-shadow-lg drop-shadow-sm hover:bg-gray-200'>

            {/* image and icon */}
            <div className='w-full flex items-center justify-between px-2 py-2'>
                <motion.div whileHover={{scale : 1.2}} className='w-40 h-40 -mt-8'>
                  <motion.img  src={item?.imageURL} className='w-full h-full object-contain '/>
                </motion.div>
                <motion.div whileHover={{scale : 1.2}} 
                 onClick={() => addToCart(item)}
                 whileTap={{scale : 0.75}}
                 className='w-8 h-8 drop-shadow-md
                  rounded-full cursor-pointer hover:shadow-lg bg-red-600 flex items-center justify-center'>
                    <MdShoppingBasket className="text-white" />
                </motion.div>
            </div>

            {/* discription */}
            <motion.div
             whileHover={{scale : 0.97}}
             className='w-full flex flex-col items-end justify-end px-3'>
                <p className='text-gray-900 font-semibold text-lg'>{item?.title}</p>
                <p className='text-gray-500 text-sm mt-1'>{`${item?.calories} calories`}</p>
                <p className='font-semibold text-lg text-headingColor'>
                    <span className='text-sm text-red-500'>$</span> {item?.price}
                </p>
            </motion.div>
            
          </div>
        ))}

    </div>
  )
}

export default RowContainer