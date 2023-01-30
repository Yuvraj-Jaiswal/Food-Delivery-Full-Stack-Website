import React from 'react'
import { IoFastFood } from "react-icons/io5";
import {useState} from 'react'
import { motion } from "framer-motion";
import { categories } from '../utils/data'
import RowContainer from './RowContainer';
import {useStateValue} from '../context/StateProvider'


function MenuContainer() {

  const [cur_category , set_cur_category] = useState("chicken");
  const [{foodItems} , dispatch] = useStateValue();


  return (
    <section className="w-full h-autp pb-4 pr-8 pl-2">
      <div id="scrollxyx" className="w-full flex flex-col gap-8 items-start">
          <p className="text-2xl font-semibold capitalize text-headingColor
           relative before:absolute before:rounded-lg before:content
            before:w-20 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr
             from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Our Hot Dishes
          </p>

        <div className='w-full flex items-center py-8 lg:justify-center gap-2 md:gap-8  md:scrollbar-none overflow-x-scroll'>

         {categories && categories.map( (category) => (
           <motion.div 
           whileTap={{scale : 0.8}}
           onClick={() => set_cur_category(category.urlParamName)} key={category.id} className={`group w-24 min-w-[94px] h-28 cursor-pointer rounded-lg
            drop-shadow-xl flex flex-col gap-3 items-center justify-center
             ${ cur_category === category.urlParamName ? 'bg-cartNumBg' :  'bg-card' } hover:bg-cartNumBg`}>

             <div className={`w-10 h-10 rounded-full shadow-lg group-hover:bg-card flex items-center 
             justify-center ${ cur_category === category.urlParamName ? 'bg-card' :  'bg-cartNumBg'} `}>
                 <IoFastFood className={` ${ cur_category === category.urlParamName ? 'text-textColor' :  'text-white' } group-hover:text-textColor `}/>
             </div>
             <p className={`text-sm ${ cur_category === category.urlParamName ? 'text-white' :  'text-textColor'}  group-hover:text-white`}> {category.name}</p>
            </motion.div>
         ))};

         </div>

         <RowContainer 
          flag={false} 
          data={foodItems?.filter( (item) => item.category === cur_category)}/>
        
      </div>

    </section>
  )
}

export default MenuContainer