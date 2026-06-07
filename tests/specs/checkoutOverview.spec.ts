import {test,expect} from  '@playwright/test'
import { checkoutOverview_locators } from '../../Locators/checkoutOverview_locators'
import { CheckoutOverviewpage } from '../../pages/CheckoutOverviewpage'
import { ProductPage } from '../../pages/ProductPage'
import { Cartpage } from '../../pages/CartPage'
import { Checkoutpage } from '../../pages/Checkoutpage'
test.describe('checkoutOverview validation',async()=>{
    let productPage: ProductPage;
    let cartPage:Cartpage;
    let checkoutPage:Checkoutpage;
    let checkoutOverviewPage: CheckoutOverviewpage;

    test.beforeEach(async({page})=>{
        productPage=new ProductPage(page)
        cartPage=new Cartpage(page)
        checkoutPage=new Checkoutpage(page)
        checkoutOverviewPage=new CheckoutOverviewpage(page)
        await productPage.goTo_ProductPage()
        await productPage.add_all_product_TOCart()
        await productPage.clickOnCart_Link()
        await productPage.clickOnCart_Link()
        await cartPage.clickOnCheckout_btn()
        await checkoutPage.FillCheckoutDetails()
        await checkoutPage.clickOnContinue_Btn()


    })
    test('validate checkoutoverview page UI and URL',async({page})=>{
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        const element=await checkoutOverviewPage.getCheckout_overview_element()
        expect(element.pageInfo).toBeVisible()
        expect(element.cancelBtn).toBeVisible()
        expect(element.finishBtn).toBeVisible()
    

    })

    test('valdate cancel button functionality',async({page})=>{
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
        await checkoutOverviewPage.clickOnCancelBtn()
        expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    })
    test('validate total item calculation',async({page})=>{
        const Product_overview=await checkoutOverviewPage.getOverviewProducts() 
        const calculated_total=Product_overview.reduce((sum,{price})=>sum+ parseFloat(price.replace('$',"")),0)

        const UITotalItem=await checkoutOverviewPage.ItemTotal()
        expect (calculated_total).toBe(UITotalItem)

    })
    test('validate final total itemtotal+tax',async({page})=>{
       const itemtotal=await checkoutOverviewPage.ItemTotal()
       const tax=await checkoutOverviewPage.getTax()
       const final_total=await checkoutOverviewPage.getTotal()
       const expectedfinal_total=itemtotal+tax
       expect(final_total).toEqual(expectedfinal_total)


    })
})