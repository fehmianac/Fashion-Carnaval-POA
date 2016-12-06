import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'
import { BasketPage } from '../basket/basket'
import { ProductService } from '../../services/product-service'

@Component({
    selector: 'product-detail',
    templateUrl: 'product-detail.html'
})


export class ProductDetailPage extends BasePage {

    pet = "puppies";
    isShowProductDetail = false;
    productSearchKey = "";
    productModel = { ColorData: [], Fabric1: "", Fabric2: "", Fabric3: "" };
    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables, public productService: ProductService) {
        super(multiLanguage, globalVariables);
    }

    getColorDataFromText(colorText: string) {
        let basketData = {
            productList: [{
                manifactureCode: "",
                color: "",
                size1: 0,
                size2: 0,
                size3: 0,
                size4: 0,
                size5: 0,
                size6: 0,
                size7: 0,
                size8: 0,
                size9: 0
            }],
            orderKey: "",
            shippingDateStart: "2016-12-06 12:00",
            shippingDateEnd: "",
            customerNote: "",
            adminNote: "",
            status: 0,
            userId: 23,
            customerId: 1,
            createdDate: "",
            lastModifedDate: "",
        };

        let colorDataPattern = {
            text: colorText,
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
        return colorDataPattern;
    }
    searchProduct(event: any) {
        let searchKey = event.target.value;
        if (searchKey.length >= 3) {
            this.productService.searchProduct(searchKey).subscribe(data => {
                this.isShowProductDetail = true;
                let colorData = [];
                //TODO color mapping 
                if (data.ColorText1 != undefined && data.ColorText1 != "") {
                    let colorDataItem = this.getColorDataFromText(data.ColorText1);
                    colorData.push(colorDataItem);
                }
                if (data.ColorText2 != undefined && data.ColorText2 != "") {
                    let colorDataItem = this.getColorDataFromText(data.ColorText2);
                    colorData.push(colorDataItem);
                }
                if (data.ColorText3 != undefined && data.ColorText3 != "") {
                    let colorDataItem = this.getColorDataFromText(data.ColorText3);
                    colorData.push(colorDataItem);
                }
                if (data.ColorText4 != undefined && data.ColorText4 != "") {
                    let colorDataItem = this.getColorDataFromText(data.ColorText4);
                    colorData.push(colorDataItem);
                }
                if (data.ColorText5 != undefined && data.ColorText5 != "") {
                    let colorDataItem = this.getColorDataFromText(data.ColorText5);
                    colorData.push(colorDataItem);
                }
                if (data.ColorText6 != undefined && data.ColorText6 != "") {
                    let colorDataItem = this.getColorDataFromText(data.ColorText6);
                    colorData.push(colorDataItem);
                }
                if (data.ColorText7 != undefined && data.ColorText7 != "") {
                    let colorDataItem = this.getColorDataFromText(data.ColorText7);
                    colorData.push(colorDataItem);
                }
                let fabricPatternPercent = "Fabric{0}_Percent{1}";
                let fabricPatternModel = "Fabric{0}-_Model{1}";
                let fabricPattern = "Fabric{0}";
                for (let i = 1; i <= 3; i++) {
                    debugger;
                    let fabricPercent = fabricPatternPercent.replace("{0}", i.toString());
                    let fabricModel = fabricPatternModel.replace("{0}", i.toString());
                    let fabric = fabricPattern.replace("{0}", i.toString());
                    for (let j = 1; j <= 4; j++) {
                        fabricPercent = fabricPatternPercent.replace("{1}", j.toString());
                        fabricModel = fabricPatternModel.replace("{1}", j.toString());
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
                this.productModel = data;
                this.productModel.ColorData = colorData;
            });
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
        debugger;
    }
}