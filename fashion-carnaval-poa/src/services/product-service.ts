import { Injectable } from '@angular/core';
import { Api } from '../providers/api'
import { Storage } from '../providers/storage'
import { Observable } from 'rxjs/Observable';
import { GlobalVariables } from '../providers/global-variables'

/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class ProductService {
    constructor(public api: Api, public storage: Storage, public globalService: GlobalVariables) {

    }

    searchProduct(searchKey: string) {
        this.globalService.presentLoading();
        let apiCall = this.api.get("/Product?manufactureCode=" + searchKey).map(res => res.json());

        apiCall.subscribe(data => {
            this.globalService.dismissLoading();
        },
            err => {
                this.globalService.dismissLoading();
            });
        return apiCall;
    };
}