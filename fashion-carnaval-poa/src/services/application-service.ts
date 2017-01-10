import { Injectable } from '@angular/core';
import { Api } from '../providers/api'
import { StorageService } from '../providers/storage'
import { Observable } from 'rxjs/Observable';
import { GlobalVariables } from '../providers/global-variables'

/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class ApplicationService {
    constructor(public api: Api, public storage: StorageService, public globalService: GlobalVariables) {

    }

    getApplicationSetting() {
        let appsettingsFromLocal = this.storage.getAsJson("appsettings");
        if (appsettingsFromLocal == null) {
            let result = this.api.get("AppSetting").map(res => res.json());
            this.globalService.presentLoading();
            result.subscribe(data => {
                //this.storage.set("localization", data.LocalizationResourceList);
                this.storage.set("language", data.LanguageList);
                this.storage.set("isDummyVersion", data.IsDummyVersion);
                data.LocalizationResourceList = null;
                data.LanguageList = null;
                console.log(data);
                this.storage.set("appsettings", data);
                this.globalService.dismissLoading();
            });
            return result;
        } else {
            return Observable.create(observer => {
                observer.next(appsettingsFromLocal);
                observer.next(appsettingsFromLocal);
                observer.complete();
            });
        }
    };

    getColorList() {
        let colorData = this.storage.getAsJson("colorList");
        if (colorData == null) {
            let apiCall = this.api.get("Color").map(res => res.json());
            apiCall.subscribe(data => {
                this.storage.set("colorList", data);
            }, error => {

            });
            return apiCall;
        }
        return Observable.create(observer => {
            observer.next(colorData);
            observer.next(colorData);
            observer.complete();
        });
    }
}