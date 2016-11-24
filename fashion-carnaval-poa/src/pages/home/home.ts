import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { BasePage } from '../base-page'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage extends BasePage {

    selectedLanguage = "";

    constructor(public navCtrl:NavController, public multiLanguage:MultiLanguage) {
        super(multiLanguage);
        this.multiLanguage.reloadLanguageKeys();
        this.selectedLanguage = multiLanguage.getSelectedLanguage();
    }
}
