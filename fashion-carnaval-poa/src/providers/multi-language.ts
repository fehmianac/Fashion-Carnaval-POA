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
        let languageDict = [
            {
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
            },
            {
                "key": "ProductDetail.AddToBasket",
                "languageKey": "en",
                "value": "Add To Basket"
            },
            {
                "key": "Common.DeleteButton.Label",
                "languageKey": "en",
                "value": "Delete"
            },
            {
                "key": "Common.DetailButton.Label",
                "languageKey": "en",
                "value": "Detail"
            },
            {
                "key": "Basket.CompleteOrder",
                "languageKey": "en",
                "value": "Complete Order"
            },
            {
                "key": "Basket.ClearBasker",
                "languageKey": "en",
                "value": "Clear Order"
            },
            {
                "key": "OrderDetail.Segment.CustomerDetail",
                "languageKey": "en",
                "value": "Customer Info"
            },
            {
                "key": "OrderDetail.Segment.OrderInfo",
                "languageKey": "en",
                "value": "Order Info"
            },
            {
                "key": "OrderDetail.Segment.ProductList",
                "languageKey": "en",
                "value": "Product List"
            },
            {
                "key": "Common.LoadingLabel",
                "languageKey": "en",
                "value": "Loading"
            },
            {
                "key": "OrderStatus.Waiting",
                "languageKey": "en",
                "value": "Waiting"
            },
            {
                "key": "OrderStatus.Approved",
                "languageKey": "en",
                "value": "Approved"
            },
            {
                "key": "OrderStatus.Canceled",
                "languageKey": "en",
                "value": "Canceled"
            },
            {
                "key": "LastOrder.Title",
                "languageKey": "en",
                "value": "Order List"
            },
            {
                "key": "BasketPage.ShippingDateStart",
                "languageKey": "en",
                "value": "Shipping Date Start"
            },
            {
                "key": "BasketPage.ShippingDateEnd",
                "languageKey": "en",
                "value": "Shipping Date Start"
            },
            {
                "key": "BasketPage.CustomerNote",
                "languageKey": "en",
                "value": "Customer Note"
            },
            {
                "key": "BasketPage.AdminNote",
                "languageKey": "en",
                "value": "Admin Note"
            },
            {
                "key": "OrderDetail.UpdateOrder",
                "languageKey": "en",
                "value": "Update Order"
            },
            {
                "key": "Common.Alert.Error.Title",
                "languageKey": "en",
                "value": "Error!!!"
            },
            {
                "key": "Common.Alert.Error.Description",
                "languageKey": "en",
                "value": "Error. Please try later."
            },
            {
                "key": "Basket.Title",
                "languageKey": "en",
                "value": "Shoping Cart"
            },
            {
                "key": "Basket.Segment.CustomerDetail",
                "languageKey": "en",
                "value": "Customer Detail"
            },
            {
                "key": "ProductDetail.Segment.BasketInfo",
                "languageKey": "en",
                "value": "Basker Info"
            },
            {
                "key": "ProductDetail.Segment.ProductList",
                "languageKey": "en",
                "value": "Product List"
            },
            {
                "key": "CustomerList.No.Result",
                "languageKey": "en",
                "value": "There is no customer"
            },
            {
                "key": "CustomerForm.Title",
                "languageKey": "en",
                "value": "Customer Form"
            },
            {
                "key": "CustomerForm.Item.Name",
                "languageKey": "en",
                "value": "Name"
            },
            {
                "key": "CustomerForm.Item.Email",
                "languageKey": "en",
                "value": "Email"
            },
            {
                "key": "CustomerForm.Item.CC",
                "languageKey": "en",
                "value": "CC"
            },
            {
                "key": "CustomerForm.Item.Phone",
                "languageKey": "en",
                "value": "Phone"
            },
            {
                "key": "CustomerForm.Item.Fax",
                "languageKey": "en",
                "value": "Fax"
            },
            {
                "key": "CustomerForm.Item.Addresse",
                "languageKey": "en",
                "value": "Addresse"
            },
            {
                "key": "CustomerForm.Item.City",
                "languageKey": "en",
                "value": "City"
            },
            {
                "key": "CustomerForm.Item.State",
                "languageKey": "en",
                "value": "State"
            },
            {
                "key": "CustomerForm.Item.ZipCode",
                "languageKey": "en",
                "value": "ZipCode"
            },
            {
                "key": "CustomerForm.Item.BillToDetail",
                "languageKey": "en",
                "value": "Bill To Detail"
            },
            {
                "key": "CustomerForm.Item.SpecialWants",
                "languageKey": "en",
                "value": "Special Wants"
            },
            {
                "key": "CustomerForm.Item.Notes",
                "languageKey": "en",
                "value": "Notes"
            },
            {
                "key": "CustomerForm.SaveButton",
                "languageKey": "en",
                "value": "Save"
            },
            {
                "key": "ProductDetail.No.Result",
                "languageKey": "en",
                "value": "Product Not Found"
            },
            {
                "key": "ProductDetail.Title",
                "languageKey": "en",
                "value": "Product Detail"
            },
            {
                "key": "ProductDetail.Segment.Detail",
                "languageKey": "en",
                "value": "Detail"
            },
            {
                "key": "ProductDetail.Segment.SizeList",
                "languageKey": "en",
                "value": "Size List"
            },
            {
                "key": "ProductDetail.Group.Label",
                "languageKey": "en",
                "value": "Group"
            },
            {
                "key": "ProductDetail.Code.Label",
                "languageKey": "en",
                "value": "Code"
            },
            {
                "key": "ProductDetail.Price.Label",
                "languageKey": "en",
                "value": "Price"
            },
            {
                "key": "ProductDetail.Fabric1.Label",
                "languageKey": "en",
                "value": "Fabric 1"
            },
            {
                "key": "ProductDetail.Fabric2.Label",
                "languageKey": "en",
                "value": "Fabric 2"
            },
            {
                "key": "ProductDetail.Fabric3.Label",
                "languageKey": "en",
                "value": "Fabric 3"
            },
            {
                "key": "ProductDetail.Colors.Label",
                "languageKey": "en",
                "value": "Colors"
            }
        ];
        this.storage.set("localization", languageDict);

    }
}
