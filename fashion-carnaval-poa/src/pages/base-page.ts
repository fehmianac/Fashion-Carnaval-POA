import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../providers/multi-language'
import { GlobalVariables } from '../providers/global-variables'
import { SettingPage } from './setting/setting'
export class BasePage {
    @ViewChild(Nav) nav: Nav;

    constructor(public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public settingPage = false) {
        let userId = this.globalVariables.getCurrentUserId();
        if (userId == null && !this.settingPage) {
            
            //this.globalVariables.gotoSettingPage(SettingPage);
        }
    }


    getSelectedLanguage() {
        var result = this.multiLanguage.getSelectedLanguage();
        return result;
    }

    getLabel(key) {
        var result = this.multiLanguage.getLabel(key);
        return result;
    }
}
