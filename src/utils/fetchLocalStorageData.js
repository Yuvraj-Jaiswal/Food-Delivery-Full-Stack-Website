
export const fetchuser = () => {
    var user_info = localStorage.getItem("user");
    if(user_info !== "undefined"){
        user_info = JSON.parse(user_info)
    }
    else{
        localStorage.clear()
    }
    return user_info;
}

export const fetchItems = () => {
    var user_info = localStorage.getItem("Items");
    if(user_info !== "undefined"){
        user_info = JSON.parse(user_info)
    }
    else{
        localStorage.clear()
    }
    return user_info ? user_info : [];
}
