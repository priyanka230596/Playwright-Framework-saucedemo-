// import {chromium, expect, test as setup } from '@playwright/test'
// import testdata from '../../utils/testdata/testdata.json'
// let logindata=JSON.parse(JSON.stringify(testdata))
// console.log(logindata)
// setup('login once',async({})=>{
//     const browser= await chromium.launch()
//     const context=await browser.newContext()
//     const page=await context.newPage()
//     await page.goto(`${process.env.base_url}`)
//     // console.log(`${process.env.base_url}`)
//     await page.getByPlaceholder('Username').fill(logindata.username)
//     await page.getByPlaceholder('Password').fill(logindata.Password)
//     await page.locator('#login-button').click()
//     await page.context().storageState({path:'tests/storageState/user.json'})
//     // expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
//    const webcontext= await browser.newContext({storageState:"user.json"})
    
// })