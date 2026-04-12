import {test, expect} from '@playwright/test';

 const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
    const USER_EMAIL = 'hello@abc.com';
    const USER_PASSWORD = '123456Abc.';

async function login(page){
    //Login to app
        await page.goto(BASE_URL);
        await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);
        await page.getByLabel('Password').fill(USER_PASSWORD);
        await page.locator('#login-btn').click();
        await expect(page.getByText('Browse Events →')).toBeVisible();
    }

test('Refund Eligible Check', async ({page}) => {
    
    //Login to app
    await login(page);

    //Navigate to Events
    await page.locator('#nav-events').click();

    //Find the first event and click on book now
    await page.locator('[data-testid="event-card"]').first().locator('#book-now-btn').click();

    //Fill booking details and confirm booking
    await page.getByLabel('Full Name').fill('John Doe');
    await page.locator('#customer-email').fill('hello@abc.com');
    await page.getByPlaceholder('+91 98765 43210').fill('1234567890');
    await page.locator('.confirm-booking-btn').click();

    await page.getByRole('button', {name: 'View My Bookings'}).click();
    await expect(page).toHaveURL(/\/bookings/);

    await page.getByRole('button', {name: 'View Details'}).first().click();
    await expect(page.getByText('Booking Information')).toBeVisible();

    const confirmationNumber = await page.locator('span.font-mono.font-bold').textContent();
    const confirmationInitial = confirmationNumber.split('-')[0].trim();

    const evetTitle = await page.locator('h1.text-2xl.font-bold').textContent();
    const evetTitleInitial = evetTitle.trim()[0];

    console.log('Initial Confirmation: ' + confirmationInitial);
    console.log('Initial Event Title: ' + evetTitleInitial);

    expect(confirmationInitial).toBe(evetTitleInitial);

    await page.getByTestId('check-refund-btn').click();
    await expect(page.locator('#refund-spinner')).toBeVisible();
    await expect(page.locator('#refund-spinner')).not.toBeVisible( {timeout: 6000} );

    await expect(page.locator('#refund-result')).toBeVisible();
    await expect(page.locator('#refund-result')).toContainText('Eligible for refund');
    await expect(page.locator('#refund-result')).toContainText('Single-ticket bookings qualify for a full refund.');
})


test.only('Refund NOT Eligible Check', async ({page}) => {

    //Login to app
    await login(page);

    //Navigate to Events
    await page.locator('#nav-events').click();

    //Find the first event and click on book now
    await page.locator('[data-testid="event-card"]').first().locator('#book-now-btn').click();

    //Fill booking details and confirm booking
    await page.getByRole('button', {name: '+'}).click();
    await page.getByRole('button', {name: '+'}).click();
    await page.getByLabel('Full Name').fill('John Doe');
    await page.locator('#customer-email').fill('hello@abc.com');
    await page.getByPlaceholder('+91 98765 43210').fill('1234567890');
    await page.locator('.confirm-booking-btn').click();

    await page.getByRole('button', {name: 'View My Bookings'}).click();
    await expect(page).toHaveURL(/\/bookings/);

    await page.getByRole('button', {name: 'View Details'}).first().click();
    await expect(page.getByText('Booking Information')).toBeVisible();

    const confirmationNumber = await page.locator('span.font-mono.font-bold').textContent();
    const confirmationInitial = confirmationNumber.split('-')[0].trim();

    const evetTitle = await page.locator('h1.text-2xl.font-bold').textContent();
    const evetTitleInitial = evetTitle.trim()[0];

    console.log('Initial Confirmation: ' + confirmationInitial);
    console.log('Initial Event Title: ' + evetTitleInitial);

    expect(confirmationInitial).toBe(evetTitleInitial);

    await page.getByTestId('check-refund-btn').click();
    await expect(page.locator('#refund-spinner')).toBeVisible();
    await expect(page.locator('#refund-spinner')).not.toBeVisible( {timeout: 6000} );

    await expect(page.locator('#refund-result')).toBeVisible();
    await expect(page.locator('#refund-result')).toContainText('Not eligible for refund');
    await expect(page.locator('#refund-result')).toContainText('Group bookings (3 tickets) are non-refundable.');

    await page.pause();
})