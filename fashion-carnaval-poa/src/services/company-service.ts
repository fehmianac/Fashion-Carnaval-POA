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
        this.globalService.presentLoading();
        let currentUserId = this.globalService.getCurrentUserId();
        let apiCall = this.api.get("Customer?UserId=" + currentUserId).map(res => res.json());
        return apiCall;
    };


    saveCompany(companyModel: any) {
        this.globalService.presentLoading();
        companyModel.UserId = this.globalService.getCurrentUserId();
        let apiCall = this.api.post("Customer", companyModel);
        apiCall.subscribe(data => {
            this.globalService.showSuccessAlert();
            this.globalService.dismissLoading();
        },
            err => {
                this.globalService.showErrorAlert();
                this.globalService.dismissLoading();
            });
    }

    getCompanyById(companyId) {
       
        let apiCall = this.api.get("Customer/" + companyId).map(res => res.json());
        return apiCall;
    }
}