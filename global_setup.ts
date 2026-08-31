// setup for single user and testdata is taken from .json file
import {chromium, FullConfig } from '@playwright/test'
import testdata from './utils/testdata/testdata.json'
let logindata=JSON.parse(JSON.stringify(testdata))
console.log(logindata)

async function globalSetup(config:FullConfig): Promise<void> {
    
    const browser= await chromium.launch()
    const context=await browser.newContext()
    const page=await context.newPage()
    await page.goto(`${process.env.base_url}`)
    // console.log(`${process.env.base_url}`)
    await page.getByPlaceholder('Username').fill(logindata.username)
    await page.getByPlaceholder('Password').fill(logindata.Password)
    await page.locator('#login-button').click()
    await page.context().storageState({path:'user.json'})
    await browser.close()
    // expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
//    const webcontext= await browser.newContext({storageState:"user.json"})
    

}
export default globalSetup;


// //multi user login 
// import {chromium, FullConfig } from '@playwright/test'
// async function globalSetup(config:FullConfig):Promise<void>{

//     const browser= await chromium.launch()
//     const users={
//         admin:{
//             username:process.env.admin_username!,
//             password:process.env.admin_password!
//         },
//         client:{
//             username:process.env.client_username!,
//             password:process.env.client_password!
//         }
//     }
//     for(const[role,user] of Object.entries(users) ){
//         const context=await browser.newContext()
//     const page=await context.newPage()
//     await page.goto(`${process.env.base_url}`)
//     // console.log(`${process.env.base_url}`)
//     await page.getByPlaceholder('Username').fill(user.username)
//     await page.getByPlaceholder('Password').fill(user.password)
//     await page.locator('#login-button').click()
//     await context.storageState({path:`./storageState/${role}.json`})
//     await context.close()
   
//     }
//      await browser.close()
    
    

// }
// export default globalSetup;