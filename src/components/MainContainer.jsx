import React from 'react'
import Home from './Home'
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import RowContainer from './RowContainer';
import {useStateValue} from '../context/StateProvider'
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';
import RowItemView from './RowItemView';


function MainContainer() {

  const [{cartShow} , setCartShow] = useStateValue();

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      {/* home full  */}
      <Home/>

      <RowItemView value="fruits" title="Our fresh & healthy fruits" id="fruit_sc"/>
     
      <RowItemView value="chicken" title="Special Flavoured Chicken" id="chicken_sc"/>

      <RowItemView value="icecreams" title="Special Icecream Variety" id="icecream_sc"/>
      
      <RowItemView value="rice" title="Special Rice Variety" id="rice_sc"/>

       <MenuContainer/>

       { cartShow && ( <CartContainer/> )}


    </div>
  )
}

export default MainContainer