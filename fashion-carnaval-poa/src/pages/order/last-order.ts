import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { CustomerListPage } from '../customer/customer-list'

@Component({
    selector: 'last-order',
    templateUrl: 'last-order.html'
})
export class LastOrderPage extends BasePage {

    customerList = [];
    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables) {
        super(multiLanguage, globalVariables);
        this.customerList.push({ "Id": "2", "Name": "Deneme1", "City": "İstanbul" });
        this.customerList.push({ "Id": "2", "Name": "Deneme2", "City": "İstanbul" });
        this.customerList.push({ "Id": "2", "Name": "Deneme3", "City": "İstanbul" });
        this.customerList.push({ "Id": "2", "Name": "Deneme4", "City": "İstanbul" });
        this.customerList.push({ "Id": "2", "Name": "Deneme5", "City": "İstanbul" });
        this.customerList.push({ "Id": "2", "Name": "Deneme6", "City": "İstanbul" });
    }

    searchLastOrder(event: any) {

    }
}
