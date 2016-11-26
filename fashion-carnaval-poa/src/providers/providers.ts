import { Api } from './api';
import { Storage } from './storage'
import { MultiLanguage } from './multi-language'
import { GlobalVariables } from './global-variables'

export {
    Api,
    Storage,
    MultiLanguage,
    GlobalVariables

};

export const Providers: any[] = [
    Api,
    Storage,
    MultiLanguage,
    GlobalVariables
]
