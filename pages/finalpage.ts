import { Page } from "@playwright/test";
import { finalpage_locators } from "../Locators/finalpage_locators";
export class FinalPage{
    page:Page
    constructor(page:Page){
        this.page=page

    }

    async getFinalPageElements(){
        return {
            pageInfo:this.page.locator(finalpage_locators.pageInfo),
            succesmsg:this.page.locator(finalpage_locators.successMsg),
            backHomeBtn:this.page.locator(finalpage_locators.backhomeBtn)
        }
    }
    async getSuccessMsgText(){
       const text= (await this.page.locator(finalpage_locators.successMsg).innerText()).trim()
       return text
    }
    async clickOnBackHomeBtn(){
        await this.page.locator(finalpage_locators.backhomeBtn).click()
    }

}