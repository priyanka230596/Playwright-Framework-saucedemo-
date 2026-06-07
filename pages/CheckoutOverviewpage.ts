import {Page} from '@playwright/test'
import { checkoutOverview_locators } from '../Locators/checkoutOverview_locators'

export class CheckoutOverviewpage{
    page:Page
    constructor(page:Page){
        this.page= page

    }
    async getCheckout_overview_element(){
        return {
            pageInfo: this.page.locator(checkoutOverview_locators.pageInfo),
            cancelBtn:this.page.locator(checkoutOverview_locators.cancelBtn),
            finishBtn:this.page.locator(checkoutOverview_locators.finishBtn),

        }
    }

    async getOverviewProducts(){
        const Allnames=await this.page.locator(checkoutOverview_locators.productnames).allTextContents()
        const Alldescreption=await this.page.locator(checkoutOverview_locators.product_descreption).allTextContents()
        const AllPrice=await this.page.locator(checkoutOverview_locators.product_price).allTextContents()
        const Allproducts=Allnames.map((_,i)=>({
            names:Allnames[i].trim(),
            descreption:Alldescreption[i].trim(),
            price:AllPrice[i].trim()

        }))
        return Allproducts;
            
        

    }

    async ItemTotal(){
        const text=await this.page.locator(checkoutOverview_locators.item_total).innerText()
        return parseFloat(text.replace('Item total: $',"").trim())
    }

    async getTax(){
        const tax=await this.page.locator(checkoutOverview_locators.tax).innerText()
        return parseFloat(tax.replace('Tax: $',"").trim())
    }

    async getTotal(){
        const total=await this.page.locator(checkoutOverview_locators.total).innerText()
        return parseFloat(total.replace('Total: $',"").trim())
    }

    async clickOnCancelBtn(){
        await this.page.locator(checkoutOverview_locators.cancelBtn).click()
    }

    async clickOnFinishBtn(){
        await this.page.locator(checkoutOverview_locators.finishBtn).click()
    }
}