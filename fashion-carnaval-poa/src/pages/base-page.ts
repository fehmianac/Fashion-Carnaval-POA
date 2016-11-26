import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../providers/multi-language'
import { GlobalVariables } from '../providers/global-variables'

export class BasePage {
    @ViewChild(Nav) nav: Nav;

    constructor(public multiLanguage: MultiLanguage, public globalVariables : GlobalVariables) {

    }


    getSelectedLanguage() {
        var result = this.multiLanguage.getSelectedLanguage();
        return result;
    }

    getLabel(key) {
        var result = this.multiLanguage.getLabel(key);
        return result;
    }

    gotoPage(component: any, params?: any) {
        debugger;
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(component, params);
    }
}
