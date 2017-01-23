import { StartWithSignature } from 'rxjs/operator/startWith';
import { UpdateProductInBasket } from '../basket/update-product';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { BasketPage } from '../basket/basket'
import { ProductService } from '../../services/product-service'
import { BasketService } from '../../services/basket-service'
@Component({
    selector: 'product-detail',
    templateUrl: 'product-detail.html'
})


export class ProductDetailPage extends BasePage {

    pet = "puppies";
    isShowProductDetail = false;
    productSearchKey = "";
    productModel = { ColorData: [], Fabric1: "", Fabric2: "", Fabric3: "" };
    basketCount = 0;
    sizeArray = [];
    height = 0;
    imgHeight = -300;
    searchText = "";

    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public productService: ProductService, public basketService: BasketService) {
        super(multiLanguage, globalVariables);
        this.basketCount = this.basketService.getBasketProductCount();
        this.sizeArray = [];
        this.height = window.screen.height;
        this.imgHeight = this.imgHeight + window.screen.height;
    }

    getColorDataFromText(colorText: string, product) {
        let colorDataPattern = {
            text: colorText,
            color: colorText,
            price: product.Price,
            currency: product.Currency,
            size1: 0,
            size2: 0,
            size3: 0,
            size4: 0,
            size5: 0,
            size6: 0,
            size7: 0,
            size8: 0,
            size9: 0
        };

        for (let i = 1; i <= this.globalVariables.getMaxSizeCount(); i++) {
            let size = "Size" + i;
            let sizeSmall = "size" + i;
            if (product[size] != null && product[size] != "") {
                colorDataPattern[sizeSmall] = 0;
                if (this.sizeArray.length < i && this.sizeArray.indexOf(i) == -1) {

                    this.sizeArray.push(i);
                }
            } else {
                colorDataPattern[sizeSmall] = null;
            }
        }
        return colorDataPattern;
    }
    searchProduct(event: any) {
        let searchKey = event.target.value;
        if (searchKey != null && searchKey.length >= 3) {
            this.globalVariables.presentLoading();
            this.globalVariables.presentLoading();
            
            this.productService.searchProduct(searchKey).subscribe(data => {
                this.pet = "puppies";
                this.isShowProductDetail = true;
                let colorData = [];
                this.sizeArray = [];
                //TODO color mapping 
                if (data.ColorText1 != undefined && data.ColorText1 != "") {
                    let colorDataItem = this.getColorDataFromText(data.ColorText1, data);
                    colorData.push(colorDataItem);
                }
                if (data.ColorText2 != undefined && data.ColorText2 != "") {
                    let colorDataItem = this.getColorDataFromText(data.ColorText2, data);
                    colorData.push(colorDataItem);
                }
                if (data.ColorText3 != undefined && data.ColorText3 != "") {
                    let colorDataItem = this.getColorDataFromText(data.ColorText3, data);
                    colorData.push(colorDataItem);
                }
                if (data.ColorText4 != undefined && data.ColorText4 != "") {
                    let colorDataItem = this.getColorDataFromText(data.ColorText4, data);
                    colorData.push(colorDataItem);
                }
                if (data.ColorText5 != undefined && data.ColorText5 != "") {
                    let colorDataItem = this.getColorDataFromText(data.ColorText5, data);
                    colorData.push(colorDataItem);
                }
                if (data.ColorText6 != undefined && data.ColorText6 != "") {
                    let colorDataItem = this.getColorDataFromText(data.ColorText6, data);
                    colorData.push(colorDataItem);
                }
                if (data.ColorText7 != undefined && data.ColorText7 != "") {
                    let colorDataItem = this.getColorDataFromText(data.ColorText7, data);
                    colorData.push(colorDataItem);
                }
                this.productModel = data;
                this.productModel.ColorData = colorData;

                let fabricPatternPercent = "Fabric{0}_Percent{1}";
                let fabricPatternModel = "Fabric{0}_Model{1}";
                let fabricPattern = "Fabric{0}";
                for (let i = 1; i <= 3; i++) {
                    let fabric = fabricPattern.replace("{0}", i.toString());
                    for (let j = 1; j <= 4; j++) {
                        let fabricPercent = fabricPatternPercent.replace("{0}", i.toString()).replace("{1}", j.toString());
                        let fabricModel = fabricPatternModel.replace("{0}", i.toString()).replace("{1}", j.toString());
                        let value = data[fabricPercent];
                        if (value > 0) {
                            if (j == 1) {
                                this.productModel[fabric] = value + "% " + data[fabricModel];
                            } else {
                                this.productModel[fabric] += "," + value + "% " + data[fabricModel];
                            }
                        }
                    }
                }
                this.globalVariables.dismissLoading();
            },
                err => {
                    this.globalVariables.dismissLoading();
                });
        } else {
            this.productModel = { ColorData: [], Fabric1: "", Fabric2: "", Fabric3: "" };
            this.isShowProductDetail = false;
        }
    }

    changedValue(event, colorData, index) {
        let size = "size" + index;
        if (event != "") {
            colorData[size] = parseInt(event);
        } else {
            colorData[size] = 0;
        }

    }
    gotoBasket() {
        this.navCtrl.push(BasketPage);
    }

    addToBasket() {
        //TODO Validation
        //TODO convertProductData
        this.basketService.addToBasket(this.productModel);
        this.basketCount = this.basketService.getBasketProductCount();
        this.globalVariables.showAlert(this.getLabel("Popup.AddToBasket.Title"), this.getLabel("Popup.AddToBasket.Description"));
        this.productModel = { ColorData: [], Fabric1: "", Fabric2: "", Fabric3: "" };
        this.isShowProductDetail = false;
        this.searchText = "";
    }

    getSizeValue(colorData, index) {
        if (index == null)
            return 0;
        if (colorData == null)
            return 0;
        return colorData["size" + index];
    }

    getSizeLabel(index) {
        if (this.sizeArray.length == 4) {
            switch (index) {
                case 2: return "Size I";
                case 3: return "Size II";
                case 4: return "Size III";
                case 5: return "Size IV";
            }
        }
        if (this.sizeArray.length == 1) {
            return "STD";
        }
        return "Size " + (index - 1);
    }

    getPriceLabel(productModel) {
        if (productModel.Currency == "$") {
            return "$" + productModel.Price;
        }

        return productModel.Price + "" + productModel.Currency;
    }

    getColorCode(name) {
        return this.globalVariables.getColorCode(name);
    }
}