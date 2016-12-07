import { BrandServices } from './brand-service';
import { ApplicationService } from './application-service'
import { CompanyService } from './company-service'
import { ProductService } from './product-service'
import { UserService } from './user-service'
import { BasketService } from './basket-service'

export {
    BrandServices,
    ApplicationService,
    CompanyService,
    ProductService,
    UserService,
    BasketService
};

export const Services: any[] = [
    BrandServices,
    ApplicationService,
    CompanyService,
    ProductService,
    UserService,
    BasketService
]
