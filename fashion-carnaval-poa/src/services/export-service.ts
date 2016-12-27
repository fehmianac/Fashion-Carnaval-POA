import { Injectable } from '@angular/core';
import { Api } from '../providers/api'
import { Storage } from '../providers/storage'
import { Observable } from 'rxjs/Observable';
import { GlobalVariables } from '../providers/global-variables'

/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class ExportService {
    storageDirectory: string = '';
    constructor(public api: Api, public storage: Storage) {

    }

    exportPdf(orderId) {
        let apiCall = this.api.get("Util/" + orderId).map(res => res.json());
        apiCall.subscribe(data => {
            let url = data.Url;
            debugger;
            location.href = url;
        }, error => {

        })
        return apiCall;
    }

    sendToEmail(orderId) {
        let apiCall = this.api.post("Util", { Id: orderId }).map(res => res.json());

        return apiCall;
    }


}