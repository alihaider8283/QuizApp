import SharedPreferences from '../DataManager/SharedPreferences';
import DataService from "../Services/DataService";

class ClientLayer {

    sharedPreferences = null 
    dataService = null
    static instance = null

    static createInstance () {
        if(this.instance == null){
            this.instance = new ClientLayer();
        }
    }

    static getInstance () {
        return this.instance
    }

    Initialize () {
       this.sharedPreferences = new SharedPreferences();
       this.dataService = new DataService();
    }

    InitializeWithCallBack (successCallBack, errorCallBack) {
       error = this.Initialize();
       if(error == null) {
           successCallBack();
       }else {
           errorCallBack();
       }
    }

    getDataManager () {
        return this.sharedPreferences
    }

    getDataService () {
        return this.dataService
    }

}

export default ClientLayer;