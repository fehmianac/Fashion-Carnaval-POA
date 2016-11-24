import { Injectable } from '@angular/core';

/**
 * Storage is generic handler offline data.
 */
@Injectable()
export class Storage {
    get(key:string) {
        var itemInLocalStrage = localStorage.getItem(key);
        if (itemInLocalStrage == null) {
            return null;
        }
        return itemInLocalStrage;
    }
    getAsJson(key:string) {
        var itemInLocalStrage = localStorage.getItem(key);
        if (itemInLocalStrage == null) {
            return null;
        }
        return JSON.parse(itemInLocalStrage);
    }
    set(key:string, value:any) {

        localStorage.setItem(key, JSON.stringify(value));
    }

    delete(key:string) {
        localStorage.removeItem(key);
    }
}
