import { expect, Locator, Page } from "@playwright/test";
import { productNames } from "../utils/testdata/products";
export class ProductPage {
    page: Page
    menu_btn: Locator
    About_link: Locator
    Logout_link: Locator
    Product_name: Locator
    product_descreption: Locator
    product_price:Locator
    add_To_cart_btn: Locator
    cart_Link:Locator
    checkout_btn:Locator
    firstname_input:Locator
    lastname_input:Locator
    postalCode_input:Locator
    continue_btn:Locator
    finish_btn:Locator
    filter_dropdown:Locator
    product:any
    btn_root_locator:Locator
    constructor(page: Page) {
        this.page = page
        this.menu_btn = page.locator('#react-burger-menu-btn')
        this.About_link = page.locator('#about_sidebar_link')
        this.Logout_link = page.locator('#logout_sidebar_link')
        this.Product_name = page.locator('.inventory_item_name ')
        this.product_descreption = page.locator('.inventory_item_desc')
        this.product_price=page.locator('.inventory_item_price')
        this.add_To_cart_btn = page.locator('.btn_inventory')
        this.cart_Link=page.locator('.shopping_cart_link')
        this.checkout_btn=page.getByText('Checkout')
        this.firstname_input=page.getByPlaceholder('First Name')
        this.lastname_input=page.getByPlaceholder('Last Name')
        this.postalCode_input=page.getByPlaceholder('Zip/Postal Code')
        this.continue_btn=page.locator('#continue')
        this.finish_btn=page.locator('#finish')
        this. filter_dropdown=page.locator('.product_sort_container')
        this. product=`${process.env.product}`
        this.btn_root_locator=page.locator('.pricebar')
        
    }
    
    async goTo_ProductPage() {
        await this.page.goto('https://www.saucedemo.com/inventory.html')

    }

    async open_aboutPage() {
        await this.menu_btn.click()
        await this.About_link.click()
    }

    async Click_OnLogout() {
        await this.menu_btn.click()
        await this.Logout_link.click()
    }

    async Validate_allproductsDisplayed() {
        const productnames = await this.Product_name.allTextContents()
        const productDescreption = await this.product_descreption.allTextContents()
        const Cart_btn_count = await this.add_To_cart_btn.count()
        // console.log(productnames)
        //prodcts are rendered or not
        if (productnames.length === 0) {
            throw new Error('product not displayed')
        };
        // verify all products are rendered or some of are remaining
        if ((productnames.length !== productDescreption.length) || (productDescreption.length !== Cart_btn_count)) { 
            throw new Error('all products are not rendered or mismatch between product details') };
    }
    async Happy_path_flow() {
        const productnames:string[] = await this.Product_name.allTextContents()
        const productDescreption = await this.product_descreption.allTextContents()
        const Cart_btn_count = await this.add_To_cart_btn.count()
        console.log(productnames)
        console.log(this.product)
        // const btn_root_locator=this.page.locator('.pricebar')

        for(let i=0;i<=productnames.length-1;i++){
            if(productnames[i].toLowerCase().trim() === this.product.toLowerCase().trim() ){
                 await this.btn_root_locator.nth(i).locator('//button[text()="Add to cart"]').click()
            }
        }
        await expect(this.page.locator('//button[text()="Remove"]')).toBeVisible()
        await this.cart_Link.click()
        expect( this.page.locator('#item_3_title_link')).toContainText(this.product)
        await this.checkout_btn.click()
        expect (this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
        await this.firstname_input.fill('Priyanka')
        await this.lastname_input.fill('Shil')
        await this.postalCode_input.fill('743127')
        await this.continue_btn.click()
        await this.finish_btn.click()
        expect(this.page.locator('h2')).toHaveText('Thank you for your order!')
         

    

    }
    async add_all_product_TOCart(){
        const productnames:string[] = await this.Product_name.allTextContents()
        const productDescreption = await this.product_descreption.allTextContents()
        const Cart_btn_count = await this.add_To_cart_btn.count()
        // const btn_root_locator=this.page.locator('.pricebar')
        for(let i=0;i<=productnames.length-1;i++){
            await this.btn_root_locator.nth(i).locator('//button[text()="Add to cart"]').click()

        }
        
    }
    async add_single_product_toCart(){
        
        const productnames:string[] = await this.Product_name.allTextContents()
        const productDescreption = await this.product_descreption.allTextContents()
        const Cart_btn_count = await this.add_To_cart_btn.count()
        
        console.log(this.product)
        // const btn_root_locator=this.page.locator('.pricebar')

        for(let i=0;i<=productnames.length-1;i++){
            if(productnames[i].toLowerCase().trim() === this.product.toLowerCase().trim() ){
                 await this.btn_root_locator.nth(i).locator('//button[text()="Add to cart"]').click()
            }
        }
        

    }
    async filter_Product_BY_ATOZ(){
        await this.filter_dropdown.selectOption({value:'az'})
        const productnames:string[] = await this.Product_name.allTextContents()
        const sortedProductnames=[...productnames].sort()
        expect (productnames).toEqual(sortedProductnames)
    

    }

    async filter_Product_By_ZTOA(){
        await this.filter_dropdown.selectOption({value:'za'})
        const productnames:string[] = await this.Product_name.allTextContents()
        const descending_productNames=[...productnames].sort().reverse()
        expect(descending_productNames).toEqual(productnames)

    }
    async filter_Product_By_LowTOHigh(){
        await this.filter_dropdown.selectOption({value:'lohi'})
        const product_prices=await this.product_price.allTextContents()
        const price=product_prices.map((price)=>parseFloat(price.replace('$',"")))
        console.log(price)
        //descending price
        const Low_high=[...price].sort((a,b)=>a-b)
        console.log(Low_high)
        expect(price).toEqual(Low_high)


    }

    async filter_Product_By_HighTOLow(){
        await this.filter_dropdown.selectOption({value:'hilo'})
        const product_prices=await this.product_price.allTextContents()
        const price=product_prices.map(price=> parseFloat(price.replace('$','')))
        console.log(price)
        const high_low_price=[...price].sort((a,b)=>a-b).reverse()
        console.log(high_low_price)
        expect(price).toEqual(high_low_price)
        

    }

    async clickOnCart_Link(){
        await this.cart_Link.click()
    }

    async getfirstProduct_Details(){
        const name=await this.Product_name.first().textContent()
        const descreption=await this.product_descreption.first().textContent()
        const price=await this.product_price.first().textContent()
        return{
            name:name?.trim(),
            descreption:descreption?.trim(),
            price:price?.trim()
        }

    }
    async getAllProducts_Details(){
        const AllNames=await this.Product_name.allTextContents()
        const AllDescreption= await this.product_descreption.allTextContents()
        const AllPrice=await this.product_price.allTextContents()
        const AllProducts=AllNames.map((_,i)=>({
            name:AllNames[i].trim(),
            descreption:AllDescreption[i].trim(),
            price:AllPrice[i].trim()
        }))
            return AllProducts

        

    }
    async getSpecificProduct_Deatails(){
        const AllNames=await this.Product_name.allTextContents()
        const AllDescreption= await this.product_descreption.allTextContents()
        const AllPrice=await this.product_price.allTextContents()
        const AllProducts=await AllNames.map((_,i)=>({
            name:AllNames[i].trim(), 
           descreption:AllDescreption[i].trim(),
            price:AllPrice[i].trim()
        }))
            return await AllProducts.filter(p => this.product.includes(p.name))

    }

    

}

