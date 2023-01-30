import React from 'react'
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {useStateValue} from '../context/StateProvider'
import RowContainer from './RowContainer';


function RowItemView( {value , title ,id} ) {

  const [scrollValue, setScrollValue] = useState(0);
  const [{foodItems} , dispatch] = useStateValue();

  return (
    <section className="w-full mt-6 pr-8 pl-2">
    <div id={id} className="w-full flex items-center justify-between">
      <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-10">
        {title}
      </p>

      <div className="hidden md:flex gap-3 items-center">
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="w-8 h-8 rounded-lg bg-orange-400 hover:bg-orange-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
          onClick={() => setScrollValue(-1000)}
        >
          <MdChevronLeft className="text-lg text-white" />
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="w-8 h-8 rounded-lg bg-orange-400 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
          onClick={() => setScrollValue(1000)}
        >
          <MdChevronRight className="text-lg text-white" />
        </motion.div>
      </div>
    </div>

    <RowContainer 
      scroll_v = {scrollValue}
      flag={true} 
      data={foodItems?.filter( (item) => item.category === value)}/>

  </section>
  )
}

export default RowItemView