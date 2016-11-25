import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { BasePage } from '../base-page'

@Component({
    selector: 'customer-form',
    templateUrl: 'customer-form.html'
})


export class CustomerFormPage extends BasePage {

    customerList = {};

    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage) {
        super(multiLanguage);
    }

}