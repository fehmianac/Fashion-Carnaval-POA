import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { CustomerListPage } from '../customer/customer-list'
import { BasePage } from '../base-page'

@Component({
    selector: 'order-completed',
    templateUrl: 'order-completed.html'
})
export class OrderCompletedPage extends BasePage {

    constructor(public navCtrl: NavController, public params: NavParams, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables) {
       super(multiLanguage, globalVariables);
    }

}
