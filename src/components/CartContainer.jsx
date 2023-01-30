import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { motion } from 'framer-motion'
import { RiRefreshFill } from 'react-icons/ri'
import EmptyCart from '../components/img/emptyCart.svg'
import CartItem from './CartItem'
import {useEffect , useState} from 'react'

function CartContainer() {

  const [{cartShow} , dispatch] = useStateValue();
  const [{cartItems} , setCartItem_dis] = useStateValue();
  const [{user}, disp_user] = useStateValue();
  const [total, settotal] = useState(0);
  var cur_item = [];


  const getTotal = () => {
    var new_total = 0;
    cartItems.forEach(elem => {
        new_total += (parseFloat(elem.price)*elem.qty)
    });
    settotal(new_total)
  }

  const setShowCart = () => {
    dispatch({
        type : actionType.SET_CART_SHOW,
        cartShow : !cartShow
    });
  }

  const clearCart = () => {
    setCartItem_dis({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });

    localStorage.setItem("Items", JSON.stringify([]));
  };

  useEffect(() => {
    getTotal()
    console.log("get total called")
  }, [cur_item,total]);

  useEffect(() => {
    cur_item = cartItems;
  }, [cur_item]);

  return (
    <motion.div
    initial={{ opacity: 0, x: 200 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 200 }}
     className='fixed top-0 right-0 w-full md:w-375 h-screen bg-white z-50 drop-shadow-md flex flex-col'>
        {/* top icon and text div */}
        <div className='w-full flex items-center justify-between p-4 cursor-pointer'>

            {/* backspace logo */}
            <motion.div whileTap={{scale:0.75}} onClick={setShowCart}>
                <MdOutlineKeyboardBackspace className='text-textColor text-3xl'/>
            </motion.div>

            {/* cart text */}
            <p className='text-textColor text-lg font-semibold'>
                Cart
            </p>
            
            {/* left icon clear */}
            <motion.p whileTap={{scale:0.75}} 
            className='text-textColor p-1 px-2 my-1 gap-2 text-lg flex 
            justify-between items-center rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer'
            onClick={clearCart}>
                Clear 
                <RiRefreshFill/>
            </motion.p>

        </div>
        
        {/* main section item */}
        <div className='w-full h-full flex flex-col bg-cartBg rounded-t-[2rem]'>
            {/* item container cart */}
            {cartItems && cartItems.length > 0 && (
                <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'>

                    {cartItems && cartItems.map( (item) => (
                        <CartItem key={`${item?.id} ${Date.now()}`} item={item}/>
                    ))}
                    {/* each item */}

                </div>
            )}
            


            {/* total section */}

            {cartItems && cartItems.length > 0 ? (
            <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
                <div className="w-full flex items-center justify-between">
                    <p className="text-gray-400 text-lg">Sub Total</p>
                    <p className="text-gray-400 text-lg">$ {total}</p>
                </div>
            <div className="w-full flex items-center justify-between">
                <p className="text-gray-400 text-lg">Delivery</p>
                <p className="text-gray-400 text-lg">$ 2.5</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
                <p className="text-gray-200 text-lg font-semibold">Total</p>
                <p className="text-gray-200 text-lg font-semibold">${total + 2.5}</p>
            </div>

            {/* button check out */}

            {user ? (
                <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg">
                Check Out
                </motion.button>
            ) : (
                <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg">
                Login to Check Out
                </motion.button>
            )}
            </div>
                
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-white">
                    <img src={EmptyCart} className="w-300" alt="" />
                    <p className="text-xl text-textColor font-semibold">
                        Add some items to your cart
                    </p>
                </div>
            )}
         
        </div>

    </motion.div>
  )
}

export default CartContainer