import React from 'react'
import Delivery from '../components/img/delivery.png'
import HeroBg from '../components/img/heroBg.png'
import { Data } from '../utils/data'
import { motion } from "framer-motion";


function Home() {
  return (
    <section id='home' className='grid grid-cols-1 md:grid-cols-2 md:px-4 gap-2 w-full'>

      {/* logo */}
      <div className='flex-1 flex flex-col justify-center items-center mt-8 md:mt-0 md:items-start'>
        <motion.div whileHover={{scale : 1.1}} className='flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full'>
          <p className='text-orange-500 font-semibold'>Bike Delivery</p>
          <div className='w-6 h-6 bg-white drop-shadow-lg rounded-full overflow-hidden'>
            <img src={Delivery} className='w-full h-full object-contain'/>
          </div>
        </motion.div>

      {/* Title text */}
        <p className=' text-[3rem] lg:text-[4.25rem] py-4 font-bold text-center md:text-left md:tracking-wide tracking-wider text-headingColor'>
          The Fastest Delivery in <span className='text-orange-600 lg:text-[5rem] text-[3.2rem]'>Your City</span>
        </p>

       {/* Discription */}
        <p className='text-base text-textColor text-center md:text-left lg:w-[85%]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non metus mattis, dictum nulla vitae,
            erat. Sed non facilisis. Vivamus Integer fringilla non mollis. Suspendisse at metus pretium, suscipit 
            augue quis, ornare ligula.
        </p>

        <motion.button whileHover={{scale : 1.05}} type='button' className='bg-orange-500 text-white w-full md:w-auto px-4 py-2 mt-6 rounded-lg hover:shadow-lg transition-all duration-100 ease-in-out'>
            Order Now
        </motion.button>
      </div>

      {/* left side */}
      <div className='p-4 flex-1 relative'>

          {/* left bg img */}
          <div className='w-full flex items-center md:justify-end justify-center'>
              <img className='h-600' src={HeroBg}/>
          </div>

          {/* items view */}
          <div className='w-full h-full p-4 absolute top-0 left-0 flex items-center justify-center lg:px-26 xl:px-27 2xl:px-28  py-4 gap-4 flex-wrap'>
            {Data && Data.map(n => (
              <motion.div whileTap={{scale : 0.9}} key={n.id} className='lg:w-190 md:w-90 sm:w-60 sm:p-4 flex flex-col items-center justify-center p-2 m-2 bg-cardOverlay backdrop-blur-md rounded-lg'>
                <motion.img whileHover={{scale : 1.08}} src={n.imageSrc} className='w-24 md:w-10 lg:w-40 -mt-8 lg:-mt-20 object-contain'/>
                <p className='text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4'>{n.name}</p>
                <p className='text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3'>{n.decp}</p>
                <p className='text-sm font-semibold text-headingColor'><span className='text-xs text-red-600'>$ </span> 
                {n.price} </p>
              </motion.div>
            ))};
          </div>

      </div>
    </section>
  )
}

export default Home