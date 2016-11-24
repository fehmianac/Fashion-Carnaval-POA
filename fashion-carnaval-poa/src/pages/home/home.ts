import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
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
    currentUserName = "Fehmi Anaç";

    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage) {
        super(multiLanguage);
        this.multiLanguage.reloadLanguageKeys();
        this.selectedLanguage = multiLanguage.getSelectedLanguage();

        this.brandList.push({ id: "1", "imageUrl": "assets/card-saopaolo.png", "title": "41 Listings" });
        this.brandList.push({ id: "1", "imageUrl": "assets/card-amsterdam.png", "title": "Deneme" });
    }

    selectBrand(id: number) {
        this.navCtrl.setRoot(CustomerListPage);
        //this.gotoPage(CustomerListPage);
    }
}
