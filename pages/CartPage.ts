import { Page } from "@playwright/test";
import { cartpage_locators } from "../Locators/cartpage_locators";
export class Cartpage {
    page: Page
    product: any
    constructor(page: Page) {
        this.page = page
        this.product = `${process.env.product}`

    }
    async Click_On_ContinueShopping() {
        await this.page.locator(cartpage_locators.continueShoppingBtn).click()

    }
    async getCartPageElements() {
        return {
            cartTitle: this.page.locator(cartpage_locators.cartTitle),
            shoppingcart: this.page.locator(cartpage_locators.continueShoppingBtn),
            checkoutBtn: this.page.locator(cartpage_locators.checkout_btn)
        }
    }


    async getCartProducts() {
        const Allnames = await this.page.locator(cartpage_locators.productnames).allTextContents()
        const Alldescreption = await this.page.locator(cartpage_locators.product_descreption).allTextContents()
        const Allprice = await this.page.locator(cartpage_locators.product_price).allTextContents()
        const Allproducts = Allnames.map((_, i) => ({
            name: Allnames[i].trim(),
            descreption: Alldescreption[i].trim(),
            price: Allprice[i].trim()


        }))
        return Allproducts;
    }

    async remove_firstproduct() {

        await this.page.locator(cartpage_locators.remove_btn).first().click()


    }

    async remove_specific_Cartproduct() {
        const Allnames = await this.page.locator(cartpage_locators.productnames).allTextContents()
        const Alldescreption = await this.page.locator(cartpage_locators.product_descreption).allTextContents()
        const Allprice = await this.page.locator(cartpage_locators.product_price).allTextContents()
        for (let i = 0; i <= Allnames.length - 1; i++) {
            if (Allnames[i].includes(this.product)) {
                await this.page.locator(cartpage_locators.remove_btn).nth(i).click()

            }
        }
    }
    async clickOnCheckout_btn(){
        await this.page.locator(cartpage_locators.checkout_btn).click()
    }
}