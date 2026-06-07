import { test, expect } from '@playwright/test'
// import { basepage } from '../../pages/basepage'
import { ProductPage } from '../../pages/ProductPage'

test.describe('validate product page',()=>{
    let productPage:ProductPage
    test.beforeEach(({page})=>{
        productPage=new ProductPage(page)


    })

//click on about page 
test('verify aboutpage link', async ({ page }) => {
    await productPage.goTo_ProductPage()
    await productPage.open_aboutPage()
    expect(page.locator('//button[text()="Try it free"]')).toBeVisible()
})


//click on Logout link
test('Verify logout btn', async ({ page }) => {
    await productPage.goTo_ProductPage()
    await productPage.Click_OnLogout()
    expect(page.locator('#login-button')).toBeVisible()
})

test('validate all products are displayed',{tag:["@smoke"]}, async ({ page }) => {
    await productPage.goTo_ProductPage()
    await productPage.Validate_allproductsDisplayed()
    await productPage.Happy_path_flow()

})
test('validate all products cards are sorted a-z', async ({ page }) => {
    await productPage.goTo_ProductPage()
    await productPage.filter_Product_BY_ATOZ()

})

test('validate all products cards are sorted z-a', async ({ page }) => {
    await productPage.goTo_ProductPage()
    await productPage.filter_Product_By_ZTOA()

})
test('validate all products are sorted with high to low price', async ({ page }) => {
    await productPage.goTo_ProductPage()
    await productPage.filter_Product_By_HighTOLow()

})

test('validate all products are sorted with Low to High price', async ({ page }) => {
   
    await productPage.goTo_ProductPage()
    await productPage.filter_Product_By_LowTOHigh()

})
})
