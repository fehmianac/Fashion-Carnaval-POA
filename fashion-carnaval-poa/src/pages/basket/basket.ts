import { ProductDetailPage } from '../product/product-detail';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { OrderCompletedPage } from '../order/order-completed'
import { BasketService } from '../../services/basket-service'
import { CompanyService } from '../../services/company-service'
import { BrandServices } from '../../services/brand-service'
import { UpdateProductInBasket } from './update-product'
import { HomePage } from '../home/home'
import { CustomerFormPage } from '../customer/customer-form'

@Component({
    selector: 'basket',
    templateUrl: 'basket.html'
})


export class BasketPage extends BasePage {

    basketData = null;
    today = null;
    totalQuantity = 0;
    endDate = null;
    currentCustomer = {};
    pet: string = "customerDetail";
    isBasketEmpty = false;

    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public basketService: BasketService, public companyService: CompanyService, public brandService: BrandServices) {
        super(multiLanguage, globalVariables);

    }

    ionViewWillEnter() {
        this.basketData = this.basketService.getBasketData();
        this.isBasketEmpty = this.basketData.productList.length == 0;
        let currentBrand = this.brandService.getSelectedBrand(this.basketData.brandId);

        let date = new Date(currentBrand.ShipmentStartDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        this.today = year + '-' + month + '-' + day;
        if (this.basketData.shippingDateStart == "") {
            this.basketData.shippingDateStart = this.today;
        }

        let date1 = new Date(currentBrand.ShipmentEndDate);
        let year1 = date1.getFullYear()
        let month1 = date1.getMonth() + 1;
        let day1 = date1.getDate();
        this.endDate = year1 + '-' + month1 + '-' + day1;

        this.companyService.getCompanyById(this.basketData.customerId).subscribe(data => {
            this.currentCustomer = data;
        }, error => {

        });
    }
    getTotalQuantity() {
        return this.basketService.getBasketProductCount();
    }
    removeFromBasket(product) {
        let basketData = this.basketData;
        let basketService = this.basketService;
        let globalVariables = this.globalVariables;
        this.globalVariables.showConfirm(function (result) {
            if (result) {
                let index = basketData.productList.indexOf(product);
                basketData.productList.splice(index, 1);
                basketService.saveBasketData(basketData);
            }
        });
    }

    completeOrder() {
        if (this.basketData.shippingDateEnd == "") {
            this.globalVariables.showAlert("Basket.Validation.Error.shippingDateEnd.Title", "Basket.Validation.Error.shippingDateEnd.Description"); return;
        }
        this.basketService.saveBasketData(this.basketData);
        this.globalVariables.presentLoading();
        let call = this.basketService.basketToOrder(this.basketData);
        call.subscribe(data => {
            if (data.IsSuccess) {
                let orderKey = this.basketData.orderKey;
                this.basketService.clearBasket();
                let navCtrl = this.navCtrl;
                this.globalVariables.showAlert("BasketPage.BasketToOrder.Success.Title", "BasketPage.BasketToOrder.Success.Description").then(function () {

                    navCtrl.setRoot(OrderCompletedPage, { orderKey: orderKey, OrderNo: data.OrderNo })
                });
            } else {
                this.globalVariables.showAlert("BasketPage.BasketToOrder.Error.Title", "BasketPage.BasketToOrder.Error.Description");
            }
            this.globalVariables.dismissLoading();
        }, err => {
            this.globalVariables.showAlert("BasketPage.BasketToOrder.Error.Title", "BasketPage.BasketToOrder.Error.Description");
            this.globalVariables.dismissLoading();
        });
    }

    edit(product) {
        this.navCtrl.push(UpdateProductInBasket, { manufactureCode: product.manufactureCode, color: product.color });
    }

    clearBasket() {
        let basketService = this.basketService;
        let navCtrl = this.navCtrl;
        let globalVariables = this.globalVariables;
        this.globalVariables.showConfirm(function (result) {
            if (result) {
                basketService.clearBasket();
                globalVariables.showAlert("Basket.ClearData.PopUp.Title", "Basket.ClearData.PopUp.Description").then(function () {
                    navCtrl.setRoot(HomePage);

                });
            }
        });
    }

    getSizeValueLabel(product) {
        let result = "";

        if (product["size2"] == null) {
            return "STD: " + product["size1"];
        }
        if (product["size5"] == null) {
            let result = "";
            if (product["size1"] > 0)
                result += " Size I: " + product["size1"];

            if (product["size2"] > 0)
                result += " Size II: " + product["size2"];

            if (product["size3"] > 0)
                result += " Size III: " + product["size3"];

            if (product["size4"] > 0)
                result += " Size IV: " + product["size4"];

            return result;
        }

        for (let i = 1; i <= this.globalVariables.getMaxSizeCount(); i++) {
            let size = "size" + i;
            let value = product[size];
            if ((value != null && value != "")) {
                result += " Size " + (i - 1);
                result += ": ";
                result += value;
                if (i < 9) {
                    result += ", ";
                }
            }

        }
        return result;
    }

    getTotalPriceInBasket() {
        return this.basketService.getBasketPrice();
    }

    continueShopping() {
        this.navCtrl.setRoot(ProductDetailPage);
    }

    openCustomerForm(customerId) {
        this.navCtrl.push(CustomerFormPage, { customerId: customerId, fromBasket: true })
    }
}