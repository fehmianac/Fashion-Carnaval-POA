import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { CustomerFormPage } from './customer-form'
import { ProductDetailPage } from '../product/product-detail'
import { CompanyService } from '../../services/company-service'

@Component({
    selector: 'customer-list',
    templateUrl: 'customer-list.html'
})


export class CustomerListPage extends BasePage {

    customerList = [];
    filteredCustomerList = [];

    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public companyService: CompanyService) {
        super(multiLanguage, globalVariables);

        this.companyService.getCompanyList().subscribe(data => {
            let length = data.length;
            for (let i = 0; i < length; i++) {
                let currentCustomer = data[i];
                this.customerList.push({
                    "Id": currentCustomer.Id,
                    "Name": currentCustomer.Name,
                    "City": currentCustomer.City,
                    "State": currentCustomer.State,
                    "Phone": currentCustomer.Phone,
                    "Addresse": currentCustomer.Addresse
                });
            }
        });
        this.filteredCustomerList = this.customerList;
    }

    openCustomerForm(companyId) {
        this.navCtrl.push(CustomerFormPage, { customerId: companyId });

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
        var addedId = [];
        for (let i = 0; i < this.customerList.length; i++) {
            let customer = this.customerList[i];
            if (customer.Name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1) {
                result.push(customer);
                addedId.push(customer.Id);
            }
        }

        for (let i = 0; i < this.customerList.length; i++) {
            let customer = this.customerList[i];
            if (customer.Addresse.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 && addedId.indexOf(customer.Id) == -1) {
                result.push(customer);
                addedId.push(customer.Id);
            }
        }

        for (let i = 0; i < this.customerList.length; i++) {
            let customer = this.customerList[i];
            if (customer.City.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 && addedId.indexOf(customer.Id) == -1) {
                result.push(customer);
                addedId.push(customer.Id);
            }
        }


        for (let i = 0; i < this.customerList.length; i++) {
            let customer = this.customerList[i];
            if (customer.State.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 && addedId.indexOf(customer.Id) == -1) {
                result.push(customer);
                addedId.push(customer.Id);
            }
        }

        return result;
    }

    selectCompany(companyId) {
        this.globalVariables.setCurrentCustomerId(companyId);
        this.navCtrl.setRoot(ProductDetailPage);
    }

}
