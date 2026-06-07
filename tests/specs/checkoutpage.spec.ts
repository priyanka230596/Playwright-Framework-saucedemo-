import {test,expect} from '@playwright/test'
import { ProductPage } from '../../pages/ProductPage'
import { Cartpage } from '../../pages/CartPage'
import { Checkoutpage } from '../../pages/Checkoutpage'
import { checkoutpage_locators } from '../../Locators/checkoutpage_locators'

test.describe('validation checkoutpage',async()=>{
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
    test('validate checkout page elements',async({page})=>{
        await cartPage.clickOnCheckout_btn()
        expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
        const elements=await checkoutPage.getCheckoutelements()
        expect(elements.cancelBtn).toBeVisible()
    })
    test('validate cancel button functionality',async({page})=>{
        await cartPage.clickOnCheckout_btn()
        expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
        const elements=await checkoutPage.getCheckoutelements()
        expect(elements.cancelBtn).toBeVisible()
        await checkoutPage.clickOnCancel_Btn()
        const title=page.locator(checkoutpage_locators.pageInfo)
        expect(title).toContainText('Your Cart')

    })
    test('validate continue button',async({page})=>{
        await cartPage.clickOnCheckout_btn()
        expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
        await checkoutPage.FillCheckoutDetails()
        await checkoutPage.clickOnContinue_Btn()
        const checkout_overviewText=await page.locator(checkoutpage_locators.checkout_overview).innerText()
        expect(checkout_overviewText.trim()).toEqual('Checkout: Overview')

    })

    test('validate the error message when clicking on continue button with no data',async({page})=>{
        await cartPage.clickOnCheckout_btn()
        expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
        await checkoutPage.clickOnContinue_Btn()
        const error=await checkoutPage.getErrorMsg()
        expect(error.trim()).toEqual('Error: First Name is required')

    })
})