import { Injectable } from '@angular/core';
import { Api } from '../providers/api'
import { Storage } from '../providers/storage'
import { Observable } from 'rxjs/Observable';
import { GlobalVariables } from '../providers/global-variables'

/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class CommonService {
    constructor(public api: Api, public storage: Storage) {

    }

    getLanguageKeys(id) {
        let languageData = this.storage.getAsJson("localization");
        if (languageData == null) {
            let apiCall = this.api.get("Language").map(res => res.json());
            return apiCall;
        }
        let newData = [];
        let length = languageData.length;
        for (let i = 0; i < length; i++) {
            let currentData = languageData[i];
            newData.push({
                "Key": currentData.key,
                "LanguageKey": currentData.languageKey,
                "Value": currentData.value
            });
        }
        return Observable.create(observer => {
            observer.next(newData);
            observer.complete();
        });
    }


    getShowList(userId) {
        let showData = this.storage.getAsJson("show" + userId);
        if (showData == null) {
            let apiCall = this.api.get("Show?userId=" + userId).map(res => res.json());
            apiCall.subscribe(data => {
                this.storage.set("show" + userId, data);
            }, error => {

            });
            return apiCall;
        } else {
            return Observable.create(observer => {
                observer.next(showData);
                observer.complete();
            });
        }
    }
}