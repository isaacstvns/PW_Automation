import{test, expect} from '@playwright/test';


test('calendar Validation', async ({page})=>{
    
    const month = '6';
    const date = '15';
    const year = '2027';


    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');

    await page.locator('.react-date-picker__calendar-button__icon').click();

    await page.locator('.react-calendar__navigation__label__labelText').click();

    await page.locator('.react-calendar__navigation__label__labelText').click();

    await page.getByText(year).click();

    await page.locator('.react-calendar__year-view__months__month').nth(Number(month-1)).click();

    await page.locator('.react-calendar__month-view__days__day').filter({hasText: date}).click();


    const inputs = await page.locator('.react-date-picker__inputGroup__input');
    await expect(inputs.nth(0)).toHaveValue(month);
    await expect(inputs.nth(1)).toHaveValue(date);
    await expect(inputs.nth(2)).toHaveValue(year);

})