import {test,expect} from '@playwright/test'
import { ProductPage } from '../../pages/ProductPage'
import { Cartpage } from '../../pages/CartPage'
import { CheckoutOverviewpage } from '../../pages/CheckoutOverviewpage'
import { Checkoutpage } from '../../pages/Checkoutpage'
import { FinalPage } from '../../pages/finalpage'

test.describe('final page validation',async()=>{
    let productPage:ProductPage
    let cartPage:Cartpage
    let checkoutPage:Checkoutpage
    let checkoutOverviewPage:CheckoutOverviewpage
    let finalPage:FinalPage

    test.beforeEach(async({page})=>{
        productPage=new ProductPage(page)
        cartPage=new Cartpage(page)
        checkoutPage=new Checkoutpage(page)
        checkoutOverviewPage=new CheckoutOverviewpage(page)
        finalPage=new FinalPage(page)
        await productPage.goTo_ProductPage()
        await productPage.add_all_product_TOCart()
        await productPage.clickOnCart_Link()
        await productPage.clickOnCart_Link()
        await cartPage.clickOnCheckout_btn()
        await checkoutPage.FillCheckoutDetails()
        await checkoutPage.clickOnContinue_Btn()
        await checkoutOverviewPage.clickOnFinishBtn()
        

    })

    test('validate finish btton functionality',async({page})=>{
        const elements=await finalPage.getFinalPageElements()
        expect(elements.pageInfo).toBeVisible()
        expect(elements.succesmsg).toBeVisible()
        expect(elements.backHomeBtn).toBeVisible()
    })

    test('validate success msg',async({page})=>{
        const succcess_msg=await (await finalPage.getSuccessMsgText())
        expect(succcess_msg).toEqual('Thank you for your order!')
    })
    
    test('validate backHome button functionality',async({page})=>{
        await finalPage.clickOnBackHomeBtn()
        expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

    })



})