import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MultiLanguage } from '../../providers/multi-language'
import { GlobalVariables } from '../../providers/global-variables'
import { BasePage } from '../base-page'

@Component({
    selector: 'product-detail',
    templateUrl: 'product-detail.html'
})


export class ProductDetailPage extends BasePage {

    pet = "puppies";
    isShowProductDetail = false;
    productSearchKey = "";
    constructor(public navCtrl: NavController, public multiLanguage: MultiLanguage, public globalVariables: GlobalVariables) {
        super(multiLanguage, globalVariables);
    }



    searchProduct(event: any) {
        if(event.target.value == "fehmi"){
            this.isShowProductDetail = true;
        }else{
            this.isShowProductDetail = false;
        }
    }
}