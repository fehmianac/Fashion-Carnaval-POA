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
    filteredCustomerList = [];

    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables) {
        super(multiLanguage, globalVariables);

        this.customerList.push({ "Id": "1", "Name": "ABC", "City": "İstanbul" });
        this.customerList.push({ "Id": "2", "Name": "CDE", "City": "İstanbul" });
        this.customerList.push({ "Id": "3", "Name": "EFG", "City": "İstanbul" });
        this.customerList.push({ "Id": "4", "Name": "HKL", "City": "İstanbul" });
        this.customerList.push({ "Id": "5", "Name": "LMN", "City": "İstanbul" });
        this.customerList.push({ "Id": "6", "Name": "ABC", "City": "İstanbul" });
        this.customerList.push({ "Id": "7", "Name": "CDE", "City": "İstanbul" });
        this.customerList.push({ "Id": "8", "Name": "EFG", "City": "İstanbul" });
        this.customerList.push({ "Id": "9", "Name": "HKL", "City": "İstanbul" });
        this.customerList.push({ "Id": "10", "Name": "LMN", "City": "İstanbul" }); 
        this.filteredCustomerList = this.customerList;
    }

    openCustomerForm(companyId) {
        this.navCtrl.push(CustomerFormPage);

    }

    searchInCompany(event) {
        let searchKey = event.target.value;
        this.filteredCustomerList = this.searchCompanyInArray(searchKey);
    }

    private searchCompanyInArray(searchKey: string) {
        if (searchKey == undefined) {
            return this.customerList;
        }
        let result = [];
        for (let i = 0; i < this.customerList.length; i++) {
            let customer = this.customerList[i];
            if (customer.Name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1) {
                result.push(customer);
            }
        }
        return result;
    }

    selectCompany(companyId) {
        this.navCtrl.setRoot(ProductDetailPage);
    }

}
