import { test, expect } from '@playwright/test'
import { write } from 'node:fs';
const ExcelJS = require('exceljs');


async function writeExcel(searchText, replaceText, change, filePath) {

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column + change.column);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {

    let output = { row: 0, column: 0 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;
}

test('Upload download excel validation', async ({ page }) => {

    await page.goto('http://www.rahulshettyacademy.com/upload-download-test/index.html');
    const dowloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await dowloadPromise;
    writeExcel("Mango", 350, {rowChange: 0, column: 2}, "C:\\Users\\isaac\\Downloads\\download.xlsx");
    await page.locator('#fileinput').setInputFiles("C:\\Users\\isaac\\Downloads\\download.xlsx");
    const desiredRow = page.getByRole('row').filter({ hasText: 'Mango' });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText('350');
})