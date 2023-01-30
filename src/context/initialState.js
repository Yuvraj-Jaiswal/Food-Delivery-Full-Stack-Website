import { fetchuser , fetchItems } from "../utils/fetchLocalStorageData"

const user_info = fetchuser();
const item_info = fetchItems();

export const initialState = {
    user : user_info,
    foodItems: null,
    cartShow : false,
    cartItems : item_info,
}