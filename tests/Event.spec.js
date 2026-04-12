import { test, expect } from '@playwright/test';
import { time } from 'node:console';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com/login';
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

test('Event Validation', async ({ page }) => {
  
    
    await login(page);

    //Navigate to Manage events
    await page.getByRole('button', { name: 'Admin'}).click();
    await page.locator('.absolute a').first().click(); 

    //Create an Event
    const evetDate = Date.now();
    console.log('Event Date: ' + evetDate);
    await page.locator('#event-title-input').fill('Test Event ' + evetDate);
    await page.getByPlaceholder('Describe the event…').fill('This is a test event created by Playwright automation script');
    await page.getByLabel('City').fill('Chicago');
    await page.getByLabel('Venue').fill('in Some Place');
    await page.getByLabel('Event Date & Time').fill('2027-12-31T23:59');
    await page.getByLabel('Price ($)').fill('100');
    await page.getByLabel('Total Seats').fill('50');
    await page.locator('#add-event-btn').click();
    await expect(page.getByText('Event created!')).toBeVisible();


    //Find the event card and capture seats
    await page.locator('#nav-events').click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="event-card"]').filter({hasText: 'Test Event ' + evetDate})).toBeVisible();
    const seatBeforeBooking = await page.locator('[data-testid="event-card"]')
                                .filter({hasText: 'Test Event ' + evetDate}).getByText('seats available').textContent()
    
    await console.log('Seats before booking: ' + seatBeforeBooking);

    await page.locator('[data-testid="event-card"]')
                                .filter({hasText: 'Test Event ' + evetDate}).locator('#book-now-btn').click();
    
    await expect(page.locator('#ticket-count')).toHaveText('1');

    await page.getByLabel('Full Name').fill('John Doe');
    await page.locator('#customer-email').fill('hello@abc.com');
    await page.getByPlaceholder('+91 98765 43210').fill('1234567890');
    await page.locator('.confirm-booking-btn').click();

    await page.locator('.booking-ref').waitFor();
    await expect(page.locator('.booking-ref')).toBeVisible();
    const bookingRef = await page.locator('.booking-ref').textContent()
    console.log('Booking reference: ' + bookingRef);


    await page.getByRole('button', {name: 'View My Bookings'}).click();
    await expect(page).toHaveURL(/\/bookings/);

    await expect(page.locator('#booking-card').first()).toBeVisible();
    await expect(page.locator('#booking-card').filter({hasText: bookingRef})).toBeVisible();
    await expect(page.locator('#booking-card').filter({hasText: bookingRef}).locator('h3')).toHaveText('Test Event ' + evetDate);


    await page.locator('#nav-events').click();
    await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="event-card"]').filter({hasText: 'Test Event ' + evetDate})).toBeVisible();

    await page.waitForTimeout(1000); // waits 2 seconds

    const seatAfterBooking = await page.locator('[data-testid="event-card"]')
                                .filter({hasText: 'Test Event ' + evetDate}).getByText('seats available').textContent()
    
    console.log('Seats after booking: ' + seatAfterBooking);
    
    const seatsAfter = parseInt(seatAfterBooking);
    const seatsBefore = parseInt(seatBeforeBooking);
    expect(seatsAfter).toBe(seatsBefore - 1);

});