import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { CompanyService } from '../../services/company-service'
import { CustomerListPage } from './customer-list'
import { BasketPage } from '../basket/basket'

@Component({
    selector: 'customer-form',
    templateUrl: 'customer-form.html'
})


export class CustomerFormPage extends BasePage {

    customerModel = {
        Id: "",
        ConfirmationId: "",
        Name: "",
        Email: "",
        CC: "",
        Phone: "",
        Fax: "",
        Addresse: "",
        City: "",
        State: "",
        ZipCode: "",
        BillToDetail: "",
        SpecialWants: "",
        Notes: "",
    };
    fromBasket = false;

    constructor(public navCtrl: NavController, public params: NavParams, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public companyService: CompanyService) {
        super(multiLanguage, globalVariables);
        let customerId = this.params.get("customerId");
        this.fromBasket = this.params.get("fromBasket");
        if (customerId != "0" && customerId != undefined && customerId != null) {
            this.getCustomerDetail(customerId);
        }
    }

    saveCustomer() {
        this.globalVariables.presentLoading();
        let apiCall = this.companyService.saveCompany(this.customerModel);
        apiCall.subscribe(data => {
            this.globalVariables.showSuccessAlert();
            this.globalVariables.dismissLoading();
            this.navCtrl.pop();

        },
            err => {
                this.globalVariables.showErrorAlert();
                this.globalVariables.dismissLoading();
            });
    }

    getCustomerDetail(customerId) {
        this.globalVariables.presentLoading();
        this.companyService.getCompanyById(customerId).subscribe(data => {
            this.customerModel = data;
            this.globalVariables.dismissLoading();
        }, err => {
            this.globalVariables.dismissLoading();
        });;
    }
    
}