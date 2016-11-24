import { Injectable } from '@angular/core';
import { Storage } from './storage'
/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class MultiLanguage {
    constructor(public storage:Storage) {
    }

    getLabel(key:string) {
        let languageDict = this.storage.getAsJson("language");
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
        return key;
    }

    getLanguageList() {
        return [{"languageKey": "en", "DisplayText": "English"}];
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

    changeSelectedLanguage(languageKey:string) {
        this.storage.set("selectedLanguage", languageKey);
    }

    reloadLanguageKeys() {
        let languageDict = [];
        languageDict.push({
                "key": "deneme",
                "languageKey": "en",
                "value": "label olarak ne yazaca??"
            },
            {
                "key": "NavigationBar.Title",
                "languageKey": "en",
                "value": "Menu"
            },
            {
                "key": "NavigationBar.HomePage.Link",
                "languageKey": "en",
                "value": "Home Page"
            },
            {
                "key": "HomePage.Title",
                "languageKey": "en",
                "value": "Home Page"
            });
        //TODO call api reload
        this.storage.set("language", languageDict);

    }
}
