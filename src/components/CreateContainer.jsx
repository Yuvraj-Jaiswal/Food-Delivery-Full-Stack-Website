import React from 'react'
import { motion } from 'framer-motion'
import { useState , useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import { categories } from '../utils/data'
import { MdFastfood , MdDelete , MdCloudUpload , MdFoodBank , MdAttachMoney } from 'react-icons/md'
import { storage } from '../firebase.config'
import Loader from '../components/Loader'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { saveItem , getAllFoodItems } from '../utils/firebaseFunctions'

function CreateContainer() {

  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const img_file = e.target.files[0];
    const firebase_storage = ref(storage,`Images/${Date.now()}-${img_file.name}`);
    const upload_task = uploadBytesResumable(firebase_storage,img_file);

    upload_task.on("state_changed", 

    // snapshot progress
    (snapshot) => {
      const upload_progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      console.log(upload_progress);

    // if any error
    } , (error) => {
      console.log(error)
      setFields(true)
      setMsg("Error while uploading : try again ")
      setAlertStatus("danger")
      setIsLoading(false)

      setTimeout(() => {
        setFields(false)
      }, 3000);

    // on complete
    } , () => {
        getDownloadURL(upload_task.snapshot.ref).then((downloadUrl) => {
          setImageAsset(downloadUrl)
          setIsLoading(false)

          setFields(true)
          setMsg("Image uploaded successfully")
          setAlertStatus("success")
    
          setTimeout(() => {
            setFields(false)
          }, 3000);
        })
    })

  };


  const deleteImage = () => {
    setIsLoading(true);
    const firebase_del_ref = ref(storage,imageAsset);
    deleteObject(firebase_del_ref).then( () => {
      setImageAsset(null);
      setIsLoading(false);

      setFields(true)
      setMsg("Image deleted successfully")
      setAlertStatus("success")
    
      setTimeout(() => {
        setFields(false)
      }, 3000);
    })
  };


  const saveDetails = () => {
    setIsLoading(true)
    try {
      // check if fields are empty
      if(!title || !calories || !price || !categories || !imageAsset){
        setFields(true)
        setMsg("Require field can not be empty")
        setAlertStatus("danger")

        setIsLoading(false)

        setTimeout(() => {
          setFields(false)
        }, 3000);
      }
      // if not empty fields
      else{

        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };

        saveItem(data);
        setIsLoading(false);
        setFields(true)
        setMsg("Data Saved successfully")
        setAlertStatus("success")
        clearData();

        setTimeout(() => {
          setFields(false);
        }, 3000);

      }
      
      // if any error 
    } catch (error) {
      console.log(error)
      setFields(true)
      setMsg("Error while uploading : try again ")
      setAlertStatus("danger")
      setIsLoading(false)

      setTimeout(() => {
        setFields(false)
      }, 3000);
    }
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
  }

  return (
    <div className="w-full min-h-screen -mt-4 flex items-center justify-center">
      <div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 
      flex flex-col items-center justify-center gap-4">

        {/* error field */}
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        {/* input title */}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        {/* category selector */}
        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted
         border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
          {/* if loading */}
          {isLoading ? <Loader/> : 
          <>
            {/* if not image show upload layout */}
            {!imageAsset ? 
            <>
              <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                  </div>
                  <input type="file" name="uploadimage"
                      accept="image/*" onChange={uploadImage}
                      className="w-0 h-0"/>
              </label>
            </> : 
            // else show uploaded image layout
            <>
               <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="w-full h-full object-cover"/>

                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={deleteImage}>
                      <MdDelete className="text-white" />
                    </button>
                </div>
            </>}
          </>}
        </div>

        {/* calorie input field */}
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          {/* price input field */}
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        {/* save button */}
        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  )
}

export default CreateContainer