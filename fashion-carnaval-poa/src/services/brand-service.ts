import { Injectable } from '@angular/core';
import { Api } from '../providers/api'
import { StorageService } from '../providers/storage'
import { Observable } from 'rxjs/Observable';
import { GlobalVariables } from '../providers/global-variables'

/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class BrandServices {
    constructor(public api: Api, public storage: StorageService, public globalService: GlobalVariables) {

    }

    getBrandList() {
        let brandDataFromLocal = this.storage.getAsJson("brand");
        if (brandDataFromLocal == null) {
            let result = this.api.get("Brand").map(res => res.json());
            this.globalService.presentLoading();
            result.subscribe(data => {
                this.storage.set("brand", data);
                this.globalService.dismissLoading();
            });
            return result;
        } else {
            return Observable.create(observer => {
                observer.next(brandDataFromLocal);
                observer.complete();
            });
        }
    };

    getSelectedBrand(brandId) {
        let brandDataFromLocal = this.storage.getAsJson("brand");
        let length = brandDataFromLocal.length;
        for (let i = 0; i < length; i++) {
            let currentData = brandDataFromLocal[i];
            if (currentData.Id == brandId) {
                return currentData;
            }
        }
        return null;
    }
}