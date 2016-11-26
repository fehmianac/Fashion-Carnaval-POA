import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { CustomerListPage } from '../customer/customer-list'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage extends BasePage {

    @ViewChild(Nav) nav: Nav;
    selectedLanguage = "";
    brandList = [];
    currentUserName = "";

    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables) {
        super(multiLanguage, globalVariables);
        this.selectedLanguage = multiLanguage.getSelectedLanguage();
        this.currentUserName = this.globalVariables.getCurrentUserName();
        this.brandList.push({ id: "1", "imageUrl": "assets/card-saopaolo.png", "title": "41 Listings" });
        this.brandList.push({ id: "1", "imageUrl": "assets/card-amsterdam.png", "title": "Deneme" });
    }

    selectBrand(id: number) {
        if (this.currentUserName == "" || this.currentUserName == "null" || this.currentUserName == undefined) {
            this.globalVariables.showAlert(this.getLabel("Validation.UserName.MustNotBeNull.Title"), this.getLabel("Validation.UserName.MustNotBeNull.Description"));
            return;
        }
        this.globalVariables.setCurrentUserName(this.currentUserName);
        this.navCtrl.setRoot(CustomerListPage);
        //this.gotoPage(CustomerListPage);
    }
}
