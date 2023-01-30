import React from 'react';
import './index.css';
import Header from './components/Header';
import CreateContainer from './components/CreateContainer';
import MainContainer from './components/MainContainer';
import {Route , Routes} from "react-router-dom"
import {AnimatePresence} from "framer-motion"
import { useEffect } from 'react';
import { getAllFoodItems } from '../src/utils/firebaseFunctions'
import { useStateValue } from '../src/context/StateProvider'
import { actionType } from '../src/context/reducer'

function App() {

  const [{ foodItems },dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then( (data) => {
      dispatch({
        type : actionType.SET_FOOD_ITEMS,
        foodItems : data,
      });
    });
  };

  useEffect(() => {
    fetchData();
    }, [] );

  return (
    <AnimatePresence mode='wait'>
      <div className='w-screen h-auto flex flex-col bg-primary'>
          <Header/>

          <main className='mt-14 md:mt-20 px-4 w-full'>
            <Routes>
              <Route path="/" element={<MainContainer/>}/>
              <Route path="/createItem" element={<CreateContainer/>}/>
            </Routes>
          </main>
          
      </div>
    </AnimatePresence>
  );
}

export default App;
