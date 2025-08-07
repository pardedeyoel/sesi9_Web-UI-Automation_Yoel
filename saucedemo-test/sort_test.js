const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe('Automation test sort produk A-Z setelah login saucedemo menggunakan chrome', function () {
    let driver;
    this.timeout(30000);

    it('Sort produk A-Z setelah login saucedemo', async function () {
        Options = new chrome.Options();
        Options.addArguments('--incognito'); //option ke chrome supaya gak ada popup passwordnya
        driver = await new Builder().forBrowser('chrome').build();

        await driver.get('https://www.saucedemo.com');

        //isi kredential login
        let inputUsername = await driver.findElement(By.xpath('//*[@data-test="username"]'));
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'));
        let buttonLogin = await driver.findElement(By.xpath('//*[@data-test="login-button"]'));
        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click();

        // assert: text dalam element benar
        let textAppLogo = await driver.findElement(By.className('app_logo'))
        let logotext = await textAppLogo.getText()
        assert.strictEqual(logotext, 'Swag Labs')


        //assert untuk cek apakah sudah berhasil login menggunakan url
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'https://www.saucedemo.com/inventory.html');


        // //assert dropdown sort A-Z
        let sortDropdown = await driver.findElement(By.className('product_sort_container'));
        await sortDropdown.click();
       await driver.sleep(1700);


        //cek apakah sudah sort A-Z
        let option = await driver.findElement(By.xpath('//option[text()="Name (A to Z)"]'));
        await option.click();

        
       // await driver.sleep(1700);
        await driver.quit();
        
    });
})