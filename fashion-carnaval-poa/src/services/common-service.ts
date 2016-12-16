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
        let apiCall = this.api.get("Language").map(res => res.json());
        return apiCall;
    }
}