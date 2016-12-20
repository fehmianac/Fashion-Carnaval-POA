import { Injectable } from '@angular/core';
import { Storage } from './storage'
import { CommonService } from '../services/common-service'
/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class MultiLanguage {
    constructor(public storage: Storage, public commonService: CommonService) {
    }

    getLabel(key: string) {
        let languageDict = this.storage.getAsJson("localization");
        if (languageDict == null) {
            return key;
        }

        let selectedLanguage = this.getSelectedLanguage();
        for (let i = 0; i < languageDict.length; i++) {
            let language = languageDict[i];
            if (language.key == key && language.languageKey == selectedLanguage) {
                return language.value;
            }
        }
        languageDict.push(
            {
                "key": key,
                "languageKey": "en",
                "value": key
            }
        );
        this.storage.set("localization", languageDict);
        return key;
    }

    getLanguageList() {
        let result = [];
        result.push({ LanguageKey: "en", DisplayName: "English" });
        return result;
        /*
        let result = this.storage.getAsJson("language");
        return result;
        */
    }

    getSelectedLanguage() {
        var selectedLanguage = this.storage.get("selectedLanguage");
        if (selectedLanguage == null) {
            //If current language doesn't selected, application will select english automatically.
            this.changeSelectedLanguage("en");
            var result = "en";
            return result.replace('"', '').replace('"', '');
        }
        return selectedLanguage.replace('"', '').replace('"', '');
    }

    changeSelectedLanguage(languageKey: string) {
        this.storage.set("selectedLanguage", languageKey, false);
    }

    reloadLanguageKeys() {
        this.commonService.getLanguageKeys(1).subscribe(data => {
            let length = data.length;
            let languageDict = [];
            for (let i = 0; i < length; i++) {
                let currentData = data[i];
                languageDict.push({
                    "key": currentData.Key,
                    "languageKey": currentData.LanguageKey,
                    "value": currentData.Value
                });
            }
            this.storage.set("localization", languageDict);
        }, error => {

        });
    }
}
