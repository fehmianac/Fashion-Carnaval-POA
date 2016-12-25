import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { CustomerFormPage } from './customer-form'
import { ProductDetailPage } from '../product/product-detail'
import { CompanyService } from '../../services/company-service'
import { BasketService } from '../../services/basket-service'

@Component({
    selector: 'customer-list',
    templateUrl: 'customer-list.html'
})


export class CustomerListPage extends BasePage {

    customerList = [];
    filteredCustomerList = [];
    currentPage = 0;
    searchKey = null;
    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public companyService: CompanyService, public basketService: BasketService) {
        super(multiLanguage, globalVariables);

    }

    ionViewWillEnter() {
        this.currentPage = 0;
        this.doRefresh(null);
    }

    doRefresh(event) {
        this.customerList = [];
        this.filteredCustomerList = [];
        this.globalVariables.presentLoading();
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
            let limit = 10 * this.currentPage;
            if (event != null) {
                let limit = 10;
                this.currentPage = 0;
            }
            if (limit == 0) {
                limit = 10;
            }
            let array = [];
            for (let i = 0; i < limit; i++) {

                if (this.customerList.length < i) {
                    continue;
                }
                let item = this.customerList[i];
                if (item == undefined) {
                    continue;
                }
                array.push(item);
            }
            this.filteredCustomerList = array;
            this.globalVariables.dismissLoading();
            if (event != null) {
                event.complete();
            }
        },
            err => {
                this.globalVariables.dismissLoading();
                if (event != null) {

                    event.complete();
                }
            });


    }

    doInfinite(event) {
        this.currentPage++;
        let limit = 10 * this.currentPage;
        if (limit < 10) {
            limit = 10;
        }
        let customerList = this.searchCompanyInArray(this.searchKey);;
        for (let i = limit; i < limit + 10; i++) {
            if (customerList.length < i) {
                continue;
            }
            let item = customerList[i];
            if (item == undefined) {
                continue;
            }
            this.filteredCustomerList.push(item);
        }
        console.log("infinite");
        event.complete();
    }
    openCustomerForm(companyId) {
        this.navCtrl.push(CustomerFormPage, { customerId: companyId });

    }

    searchInCompany(event) {

        let searchKey = event.target.value;
        this.searchKey = searchKey;
        this.currentPage = 0;
        this.filteredCustomerList = this.searchCompanyInArray(searchKey);
    }

    private searchCompanyInArray(searchKey: string) {
        if (searchKey == undefined || searchKey == null) {
            return this.customerList;
        }
        let result = [];
        var addedId = [];
        for (let i = 0; i < this.customerList.length; i++) {
            let customer = this.customerList[i];
            if (customer.Name != null && customer.Name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1) {
                result.push(customer);
                addedId.push(customer.Id);
            }
        }

        for (let i = 0; i < this.customerList.length; i++) {
            let customer = this.customerList[i];
            if (customer.Addresse != null && customer.Addresse.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 && addedId.indexOf(customer.Id) == -1) {
                result.push(customer);
                addedId.push(customer.Id);
            }
        }

        for (let i = 0; i < this.customerList.length; i++) {
            let customer = this.customerList[i];
            if (customer.City != null && customer.City.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 && addedId.indexOf(customer.Id) == -1) {
                result.push(customer);
                addedId.push(customer.Id);
            }
        }


        for (let i = 0; i < this.customerList.length; i++) {
            let customer = this.customerList[i];
            if (customer.State != null && customer.State.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 && addedId.indexOf(customer.Id) == -1) {
                result.push(customer);
                addedId.push(customer.Id);
            }
        }

        return result;
    }

    selectCompany(companyId) {
        let lastCustomerId = this.globalVariables.getCurrentCustomerId();
        let clearBasketData = lastCustomerId != companyId;
        this.globalVariables.setCurrentCustomerId(companyId);
        if (clearBasketData) {
            this.basketService.clearBasket();
        }
        let navCtrl = this.navCtrl;
        setTimeout(function () {
            navCtrl.setRoot(ProductDetailPage);
        }, 11);

    }

}
