import { test, expect } from '@playwright/test'
// import { basepage } from '../../pages/basepage'
import { ProductPage } from '../../pages/ProductPage'
import { Cartpage } from '../../pages/CartPage'
import { productNames } from '../../utils/testdata/products'
test.describe('cart page validation', () => {
    let productPage: ProductPage
    let cartPage: Cartpage

    test.beforeEach(({ page }) => {
        productPage = new ProductPage(page)
        cartPage = new Cartpage(page)
    })



    test('validate cart page url and ui page', async ({ page }) => {
        await productPage.goTo_ProductPage()
        await productPage.add_single_product_toCart()
        await expect(page.locator('//button[text()="Remove"]')).toBeVisible()
        await productPage.clickOnCart_Link()
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
        const UI = cartPage.getCartPageElements()
        expect((await UI).cartTitle).toBeVisible()
        expect((await UI).checkoutBtn).toBeVisible()
        expect((await UI).shoppingcart).toBeVisible()


    })

    test('validate continue shopping functionality', async ({ page }) => {
        await productPage.goTo_ProductPage()
        await productPage.add_single_product_toCart()
        await expect(page.locator('//button[text()="Remove"]')).toBeVisible()
        await productPage.clickOnCart_Link()
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
        const UI = cartPage.getCartPageElements()
        await cartPage.Click_On_ContinueShopping()
        expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

    })
    test('validate specific product in cart page', async ({ page }) => {
        await productPage.goTo_ProductPage()
        const specificproduct = await productPage.getSpecificProduct_Deatails()
        console.log('product page:', specificproduct)

        await productPage.add_single_product_toCart()
        await productPage.clickOnCart_Link()
        await page.waitForTimeout(5000)
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
        const cartaproduct = await cartPage.getCartProducts()
        console.log('cartpage product:', cartaproduct)
        expect(cartaproduct[0]).toEqual(specificproduct[0])




    })
    test('validate all products in cart page', async ({ page }) => {
        await productPage.goTo_ProductPage()
        const allProducts = await productPage.getAllProducts_Details()

        await productPage.add_all_product_TOCart()
        await productPage.clickOnCart_Link()
        await page.waitForTimeout(5000)
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')

        const cartaproduct = await cartPage.getCartProducts()
        expect(cartaproduct).toEqual(allProducts)


    })
    test('validate remove product in cart page', async ({ page }) => {
        await productPage.goTo_ProductPage()
        await productPage.add_all_product_TOCart()

        await productPage.clickOnCart_Link()
        const initial_count = await cartPage.getCartProducts()
        //validation for telling that there will be minimum at least one product should be  added in cart
        expect(initial_count.length).toBeGreaterThan(0)
        await cartPage.remove_firstproduct()

        const updated_count = await cartPage.getCartProducts()
        expect(updated_count.length).toEqual(initial_count.length - 1)
    })

    test('validate remove soecific product from cart', async ({ page }) => {
        await productPage.goTo_ProductPage()
        await productPage.add_all_product_TOCart()
        await productPage.clickOnCart_Link()
        const initial_count = await cartPage.getCartProducts()
        expect(initial_count.length).toBeGreaterThan(0)
        await cartPage.remove_specific_Cartproduct()
        const updated_cart=await cartPage.getCartProducts()
        expect(initial_count.length-1).toEqual(updated_cart.length)

    })


})