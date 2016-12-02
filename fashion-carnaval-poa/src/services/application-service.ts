import { Injectable } from '@angular/core';
import { Api } from '../providers/api'
import { Storage } from '../providers/storage'
import { Observable } from 'rxjs/Observable';
import { GlobalVariables } from '../providers/global-variables'

/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class ApplicationService {
    constructor(public api: Api, public storage: Storage, public globalService: GlobalVariables) {

    }

    getApplicationSetting() {
        let appsettingsFromLocal = this.storage.getAsJson("appsettings");
        if (appsettingsFromLocal == null) {
            let result = this.api.get("AppSetting").map(res => res.json());
            this.globalService.presentLoading();
            result.subscribe(data => {
                //this.storage.set("localization", data.LocalizationResourceList);
                this.storage.set("language", data.LanguageList);
                data.LocalizationResourceList = null;
                data.LanguageList = null;

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
}