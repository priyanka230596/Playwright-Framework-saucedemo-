import { Page } from "@playwright/test";
import { checkoutpage_locators } from "../Locators/checkoutpage_locators";
import checkout_testdata from '../utils/testdata/testdata.json'
let checkout_filldata=JSON.parse(JSON.stringify(checkout_testdata))

export class Checkoutpage{
    page:Page
    constructor(page:Page){
        this.page=page
    }
    async getCheckoutelements(){
        return{
            pageInfo:this.page.locator(checkoutpage_locators.pageInfo),
            cancelBtn: this.page.locator(checkoutpage_locators.cancelBtn),
            continueBtn: this.page.locator(checkoutpage_locators.continueBtn)

        }
    }

    async FillCheckoutDetails(){
        await this.page.locator(checkoutpage_locators.firstname).fill(checkout_filldata.firstname)
        await this.page.locator(checkoutpage_locators.lastname).fill(checkout_filldata.Lastname)
        await this.page.locator(checkoutpage_locators.postalcode).fill(checkout_filldata.postalcode)
        
    }
    async clickOnCancel_Btn(){
        await this.page.locator(checkoutpage_locators.cancelBtn).click()
    }

    async clickOnContinue_Btn(){
        await this.page.locator(checkoutpage_locators.continueBtn).click()
    }

    async getErrorMsg(){
        return await this.page.locator(checkoutpage_locators.errormsg).innerText()
    }
}