import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { CustomerFormPage } from './customer-form'
import { ProductDetailPage } from '../product/product-detail'

@Component({
    selector: 'customer-list',
    templateUrl: 'customer-list.html'
})


export class CustomerListPage extends BasePage {

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

    openCustomerForm(companyId) {
        this.navCtrl.push(CustomerFormPage);

    }

    searchInCompany(event) {

    }

    selecteCompany(companyId) {
        this.navCtrl.setRoot(ProductDetailPage);
    }

}
