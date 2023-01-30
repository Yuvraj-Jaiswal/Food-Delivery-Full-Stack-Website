import React from 'react'
import Logo from './img/logo.png'
import { MdShoppingBasket , MdAdd , MdLogout } from 'react-icons/md'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { app } from "../firebase.config"
import { motion } from 'framer-motion'
import Avatar from './img/avatar.png'
import { Link } from 'react-router-dom'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { useState } from 'react'
import MenuContainer from './MenuContainer'

function Header() {

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{user},dispatch] = useStateValue();
  const [isMenu, setisMenu] = useState(false);
  const [{cartShow} , setCartShow_dis] = useStateValue();
  const [{cartItems} , setCI ] = useStateValue();

  const scrolltoElem = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' ,block: 'start' });
    }
  }

  const setShowCart = () => {
    console.log("function call");
    setCartShow_dis({
        type : actionType.SET_CART_SHOW,
        cartShow : !cartShow
    });
  }

  const login = async () => {
      if(!user){
        const {user : {refreshToken , providerData}} = await signInWithPopup(firebaseAuth,provider);
        await dispatch({
          type : actionType.SET_USER,
          user : providerData[0],
        });
        localStorage.setItem("user",JSON.stringify(providerData[0]))
      }else{
        setisMenu(!isMenu)
      }
  };

  const logout = () => {
    setisMenu(false)
    localStorage.clear()
    dispatch({
      type : actionType.SET_USER,
      user : null
    });
  }
  
  return (

    <header className='fixed z-50 w-screen bg-primary p-3 text-cyan-50 px-4 md:px-11 md:p-4'>
        {/* Desktop */}
        <div className='hidden md:flex w-full h-full justify-between'>
            {/* Logo */}
            <Link to={'/'} className='flex items-center gap-2'>
              <motion.img whileHover={{scale : 1.1}} src={Logo} className="w-8 object-cover"/>
              <p className="text-headingColor text-xl font-bold">CookBar</p>
            </Link>
            {/* Nested Div */}
            <div className='flex justify-centre items-center gap-8'>

              {/* Menu Item */}
              <motion.ul 
                initial={{opacity : 0 , x : 200}}
                animate={{opacity : 1 , x : 0}}
                exit={{opacity : 0 , x : 200}}
                className='flex items-center gap-8 text-black ml-auto'>
                <Link to={"/"}><li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li></Link>
                <li onClick={() => scrolltoElem("scrollxyx")} className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
                <li onClick={() => scrolltoElem("chicken_sc")} className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Chicken</li>
                <li onClick={() => scrolltoElem("icecream_sc")} className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Icecream</li>
                <li onClick={() => scrolltoElem("rice_sc")} className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Rice</li>
              </motion.ul>

              {/* Cart  */}
              <motion.div whileHover={{scale : 1.1}}
               onClick={setShowCart}
               className='relative flex items-center justify-center cursor-pointer'>
                <MdShoppingBasket className='text-textColor text-2xl '/>
                { cartItems && cartItems.length > 0 && (
                  <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                     <p className='text-xs text-white font-semibold'>{cartItems.length}</p>
                  </div>
                )}
              </motion.div>

              {/* Avatar */}
              <div className='relative rounded-full' onClick={login} >
                <motion.img whileTap={{scale : 0.6}} whileHover={{scale : 1.1}} 
                src={user ? user.photoURL : Avatar} className="w-10 rounded-full min-w-[40px] h-10 min-h-[40px] drop-shadow-md cursor-pointer"
                alt="userprofile"/>

                {/* user info */}
                {
                  isMenu && (
                    <motion.div
                     initial={{opacity : 0 , scale : 0.6}}
                     animate={{opacity : 1 , scale : 1}}
                     exit={{opacity : 0 , scale : 0.6}}
                     className='w-40 bg-gray-50 text-textColor drop-shadow-lg rounded-lg flex flex-col absolute top-12 right-0'>
                    {
                      user && user.email === "yuvrajj982@gmail.com" && (
                        <Link to={"/createItem"}>
                         <p className='py-1 flex justify-center items-center cursor-pointer hover:bg-slate-100 duration-100 
                        ease-in-out gap-4 rounded-lg'>Add Item <MdAdd/> </p>
                        </Link>
                       
                      )
                    }

                    <p className='py-2 flex justify-center items-center cursor-pointer hover:bg-slate-100 duration-100 
                    ease-in-out gap-4 rounded-lg' onClick={logout}>Log out <MdLogout/> </p>
                    </motion.div>
                  )
                }

              </div>
              

            </div>

        </div>

        {/* Mobile */}
        <div className='flex items-center justify-between md:hidden w-full h-full'>
          
          {/* Cart  */}
          <div className='relative flex items-center justify-center' onClick={setShowCart}>
                <MdShoppingBasket className='text-textColor text-2xl cursor-pointer'/>
                { cartItems && cartItems.length > 0 && (
                  <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                     <p className='text-xs text-white font-semibold'>{cartItems.length}</p>
                  </div>
                )}
          </div>

          {/* Logo */}
          <Link to={'/'} className='flex items-center gap-2'>
              <img src={Logo} className="w-8 object-cover"/>
              <p className="text-headingColor text-xl font-bold">CookBar</p>
          </Link>

          {/* Avatar */}
          <div className='relative rounded-full' onClick={login} >
                <motion.img whileTap={{scale : 0.6}} 
                src={user ? user.photoURL : Avatar} className="w-10 rounded-full min-w-[40px] h-10 min-h-[40px] drop-shadow-md cursor-pointer"
                alt="userprofile"/>

                {/* user info */}
                {
                  isMenu && (
                    <motion.div
                     initial={{opacity : 0 , scale : 0.6}}
                     animate={{opacity : 1 , scale : 1}}
                     exit={{opacity : 0 , scale : 0.6}}
                     className='w-40 bg-gray-50 text-textColor drop-shadow-lg rounded-lg flex flex-col absolute top-12 right-0 px-0 py-0'>
                    {
                      user && user.email === "yuvrajj982@gmail.com" && (
                        <Link to={"/createItem"}>
                         <p className='py-1 flex justify-start items-center cursor-pointer hover:bg-slate-100 duration-100 
                        ease-in-out gap-4 rounded-lg'>Add Item <MdAdd/> </p>
                        </Link>
                       
                      )
                    }
                    
                    {/* Menu Item */}
                     <ul 
                      className='flex w-full flex-col text-black ml-auto'>
                      <Link to={"/"}><li className='text-base px-4 py-2 my-1 text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer'>Home</li></Link>
                      <li onClick={() => scrolltoElem("scrollxyx")} className='text-base px-4 py-2 my-1 text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
                      <li onClick={() => scrolltoElem("chicken_sc")} className='text-base px-4 py-2 my-1 text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer'>Chicken</li>
                      <li onClick={() => scrolltoElem("icecream_sc")} className='text-base px-4 py-2 my-1 text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer'>Icecream</li>
                      <li onClick={() => scrolltoElem("rice_sc")} className='text-base px-4 py-2 my-1 text-textColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer'>Rice</li>
                    </ul>

                    <p className='py-2 flex justify-start px-4 items-center cursor-pointer bg-slate-200 hover:bg-slate-300 duration-100 
                    ease-in-out gap-4' onClick={logout}>Log out <MdLogout/> </p>
                    </motion.div>
                  )
                }
            </div>
        </div>
    </header>
  )
}

export default Header