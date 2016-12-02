import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public companyService : CompanyService) {
        super(multiLanguage, globalVariables);
    }

    saveCustomer() {
        this.companyService.saveCompany(this.customerModel);
    }
}