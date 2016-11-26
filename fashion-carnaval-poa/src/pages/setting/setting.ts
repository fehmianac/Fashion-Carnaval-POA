import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'setting-page',
    templateUrl: 'setting.html'
})
export class SettingPage extends BasePage {

    selectedLanguage = "";
    languageList = [];
    selectedLanguageSelectBox = "";
    currentUserName = "";
    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public alertCtrl: AlertController) {
        super(multiLanguage, globalVariables);
        this.selectedLanguageSelectBox = this.multiLanguage.getSelectedLanguage();
        this.languageList = multiLanguage.getLanguageList();
        this.currentUserName = this.globalVariables.getCurrentUserName()
    }

    saveSetting() {
        this.multiLanguage.changeSelectedLanguage(this.selectedLanguageSelectBox);
        this.globalVariables.setCurrentUserName(this.currentUserName);

        this.globalVariables.showAlert(this.getLabel('Alert.SettingSaved.Title'), this.getLabel('Alert.SettingSaved.Description'));
    }
}
