import { Injectable } from '@angular/core';
import { Api } from '../providers/api'
import { Storage } from '../providers/storage'
import { Observable } from 'rxjs/Observable';
import { GlobalVariables } from '../providers/global-variables'

/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class UserService {
    constructor(public api: Api, public storage: Storage, public globalService: GlobalVariables) {

    }

    getAllUser() {
        this.globalService.presentLoading();
        let apiCall = this.api.get("/User").map(res => res.json());

        apiCall.subscribe(data => {
            this.storage.set("userlist", data);
            this.globalService.dismissLoading();
        },
            err => {
                this.globalService.dismissLoading();
            });
        return apiCall;
    };

    findUserInLocalData(userName: string) {
        let userData = this.storage.getAsJson("userlist");
        let length = userData.length;
        let userResultData = null;
        for (let i = 0; i < length; i++) {
            let currentUser = userData[i];
            if (currentUser.Username.toLowerCase() == userName.toLowerCase()) {
                userResultData = currentUser;
                break;
            }
        }
        return Observable.create(observer => {
            observer.next(userResultData);
            observer.complete();
        });
    }
}