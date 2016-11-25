import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { BasePage } from '../base-page'
import { CustomerFormPage } from './customer-form'
import { ProductDetailPage } from '../product/product-detail'

@Component({
    selector: 'customer-list',
    templateUrl: 'customer-list.html'
})


export class CustomerListPage extends BasePage {

    customerList = [];

    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage) {
        super(multiLanguage);

        this.customerList.push({ "Id": "2", "Name": "Deneme1", "City": "İstanbul" });
        this.customerList.push({ "Id": "2", "Name": "Deneme2", "City": "İstanbul" });
        this.customerList.push({ "Id": "2", "Name": "Deneme3", "City": "İstanbul" });
        this.customerList.push({ "Id": "2", "Name": "Deneme4", "City": "İstanbul" });
        this.customerList.push({ "Id": "2", "Name": "Deneme5", "City": "İstanbul" });
        this.customerList.push({ "Id": "2", "Name": "Deneme6", "City": "İstanbul" });
    }

    openCustomerForm(companyId: any) {
        this.navCtrl.push(CustomerFormPage);

    }

    searchInCompany(event: any) {

    }

    selecteCompany(companyId: any) {
        this.navCtrl.setRoot(ProductDetailPage);
    }

}
