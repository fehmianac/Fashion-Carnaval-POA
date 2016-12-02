import { Injectable } from '@angular/core';
import { Storage } from './storage'
/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class MultiLanguage {
    constructor(public storage: Storage) {
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
        return key;
    }

    getLanguageList() {
        let result = this.storage.getAsJson("language");
        return result;
        //return [{ "languageKey": "en", "DisplayText": "English" }, { "languageKey": "tr", "DisplayText": "Turkish" }];
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
            },
            {
                "key": "HomePage.Description",
                "languageKey": "en",
                "value": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
            },
            {
                "key": "HomePage.CurrentUser.TextBox",
                "languageKey": "en",
                "value": "User Name"
            },
            {
                "key": "HomePage.CompanyName",
                "languageKey": "en",
                "value": "Fashion"
            },
            {
                "key": "HomePage.CompanySubTitle",
                "languageKey": "en",
                "value": "Fashion Carnaval POA"
            },
            {
                "key": "NavigationBar.LastOrder.Link",
                "languageKey": "en",
                "value": "Order List"
            },
            {
                "key": "NavigationBar.Setting.Link",
                "languageKey": "en",
                "value": "App Settings"
            },
            {
                "key": "SettingPage.Title",
                "languageKey": "en",
                "value": "App Settings"
            },
            {
                "key": "Setting.CurrentUser.Title",
                "languageKey": "en",
                "value": "Your username in application"
            },
            {
                "key": "Setting.CurrentLanguage.Title",
                "languageKey": "en",
                "value": "Language Of Application"
            },
            {
                "key": "Setting.CurrentLanguage.Title",
                "languageKey": "en",
                "value": "Selected Language"
            },
            {
                "key": "Setting.CurrentLanguage.Label",
                "languageKey": "en",
                "value": "Selected Language"
            },
            {
                "key": "Setting.SaveSettingButton.Label",
                "languageKey": "en",
                "value": "Selected Language"
            },
            {
                "key": "OrderDetail.Title",
                "languageKey": "en",
                "value": "Order Detail"
            },
            {
                "key": "NavigationBar.Basket.Link",
                "languageKey": "en",
                "value": "Shoping Cart"
            },
            {
                "key": "CustomerList.Title",
                "languageKey": "en",
                "value": "List Of Customer"
            },
            {
                "key": "Common.EditButton.Label",
                "languageKey": "en",
                "value": "Edit"
            }
        );

        //Common.EditButton.Label
        //TODO call api reload
        this.storage.set("localization", languageDict);

    }
}
