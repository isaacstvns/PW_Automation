const base  = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            "username": "hello@abc.com",
            "password": "Abc.123456",
            "productName": "ZARA COAT 3"
        }
    }
);