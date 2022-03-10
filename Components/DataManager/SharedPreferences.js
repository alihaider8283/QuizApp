
import AsyncStorage from "@react-native-async-storage/async-storage";

class SharedPreferences {
    // Used for saving value.
    SaveValueForKey (key,value) {
        AsyncStorage.setItem(key,value)
    }
    // Used for fetching value.
    GetValueForKey (key,responseCallBack){
        AsyncStorage.getItem(key,(err,result)=>{
            if(result == ""){
                result = null
            }
            responseCallBack(result)
        })
    }
    // Removes a traget key.
    RemoveKey(key){
        AsyncStorage.removeItem(key)
    }
    // Removes all the data.
    RemoveAll(){
        AsyncStorage.clear()
    }
}
export default SharedPreferences;