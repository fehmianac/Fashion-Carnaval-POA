import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { BasePage } from '../base-page'

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

}
