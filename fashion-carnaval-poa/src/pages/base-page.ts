import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../providers/multi-language'

export class BasePage {


    constructor(public multiLanguage:MultiLanguage) {

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
