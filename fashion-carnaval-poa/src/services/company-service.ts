import { Injectable } from '@angular/core';
import { Api } from '../providers/api'
import { Storage } from '../providers/storage'
import { Observable } from 'rxjs/Observable';
import { GlobalVariables } from '../providers/global-variables'

/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class CompanyService {
    constructor(public api: Api, public storage: Storage, public globalService: GlobalVariables) {

    }

    getCompanyList() {

    };


    saveCompany(companyModel: any) {
        this.globalService.presentLoading();
        let apiCall = this.api.post("Customer", companyModel);
        apiCall.subscribe(data => {
            //debugger;
            this.globalService.dismissLoading();
        },
            err => {
                this.globalService.showErrorAlert();
                this.globalService.dismissLoading();
            });
    }
}