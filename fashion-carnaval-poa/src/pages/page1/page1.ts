import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { BasePage } from '../base-page'

@Component({
    selector: 'page-page1',
    templateUrl: 'page1.html'
})
export class Page1 extends BasePage {

    selectedLanguage = "?i?i";

    constructor(public navCtrl:NavController, public multiLanguage:MultiLanguage) {
        super(multiLanguage);
        this.multiLanguage.reloadLanguageKeys();
        this.selectedLanguage = multiLanguage.getSelectedLanguage();
    }
}
