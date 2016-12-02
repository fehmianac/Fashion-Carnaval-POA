import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { CompanyService } from '../../services/company-service'

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
    constructor(public navCtrl: NavController, public params: NavParams, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public companyService: CompanyService) {
        super(multiLanguage, globalVariables);
        let customerId = this.params.get("customerId");
        if (customerId != "0" && customerId != undefined && customerId != null) {
            this.getCustomerDetail(customerId);
        }
    }

    saveCustomer() {
        this.companyService.saveCompany(this.customerModel);
    }

    getCustomerDetail(customerId) {
        this.companyService.getCompanyById(customerId).subscribe(data => {
            this.customerModel = data;
            this.globalVariables.dismissLoading();
        }, err => {
            this.globalVariables.dismissLoading();
        });;
    }
}