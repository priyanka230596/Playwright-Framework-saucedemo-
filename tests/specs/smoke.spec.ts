import { test, expect } from '@playwright/test'
// import { basepage } from '../../pages/basepage'
import { ProductPage } from '../../pages/ProductPage'

test.describe('validate product page copysmoke',()=>{
    let productPage:ProductPage
    test.beforeEach(({page})=>{
        productPage=new ProductPage(page)


    })

//click on about page 
test('verify aboutpage link copysmoke', async ({ page }) => {
    await productPage.goTo_ProductPage()
    await productPage.open_aboutPage()
    expect(page.locator('//button[text()="Try it free"]')).toBeVisible()
})
})

