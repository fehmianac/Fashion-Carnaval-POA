import { Injectable } from '@angular/core';
import { Api } from '../providers/api'
import { StorageService } from '../providers/storage'
import { Observable } from 'rxjs/Observable';
import { GlobalVariables } from '../providers/global-variables'

/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class CompanyService {
    constructor(public api: Api, public storage: StorageService, public globalService: GlobalVariables) {

    }

    getCompanyList() {
        this.globalService.presentLoading();
        let currentUserId = this.globalService.getCurrentUserId();
        let apiCall = this.api.get("Customer?UserId=" + currentUserId).map(res => res.json());
        return apiCall;
    };


    saveCompany(companyModel: any) {
        companyModel.UserId = this.globalService.getCurrentUserId();
        let apiCall = this.api.post("Customer", companyModel);
        return apiCall;
    }

    getCompanyById(companyId) {
       
        let apiCall = this.api.get("Customer/" + companyId).map(res => res.json());
        return apiCall;
    }
}