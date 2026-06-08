import {test,expect} from '@playwright/test'
import { ProductPage } from '../../pages/ProductPage'
import { Cartpage } from '../../pages/CartPage'
import { Checkoutpage } from '../../pages/Checkoutpage'
import { checkoutpage_locators } from '../../Locators/checkoutpage_locators'

test.describe('validation checkoutpage copy',async()=>{
    let productPage:ProductPage
    let cartPage:Cartpage
    let checkoutPage:Checkoutpage
    test.beforeEach (async ({page})=>{
        productPage=new ProductPage(page)
        cartPage=new Cartpage(page)
        checkoutPage=new Checkoutpage(page)
        await productPage.goTo_ProductPage()
        await productPage.add_single_product_toCart()
        await productPage.clickOnCart_Link()
        

    })
    test('validate checkout page elements copy',async({page})=>{
        await cartPage.clickOnCheckout_btn()
        expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
        const elements=await checkoutPage.getCheckoutelements()
        expect(elements.cancelBtn).toBeVisible()
    })
})