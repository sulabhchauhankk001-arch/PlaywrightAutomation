const { test, expect, request } = require('@playwright/test');
const AuthAPI = require('../api/AuthAPI');
const { validUser, invalidUser, blankEmail, blankPassword, UserNotFound } = require('../test-data/loginPayload.js')

let authAPI;
test.beforeEach(async ({ request }) => {
    authAPI = new AuthAPI(request)
})


test("verify login the API", async ({ request }) => {
    const authAPI = new AuthAPI(request);
    const response = await authAPI.login(loginPayload);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.token).toBeTruthy();
    const token = `Bearer ${responseBody.token}`
    console.log(token);

});

test.only("verify valid detail", async ({ request }) => {

    const response = await authAPI.login(validUser);
    expect(response.status()).toBe(200);
    const data = await response.json();
    const token = `Bearer ${data.token}`;
    console.log(token);

});

test.only("verify invalid detail", async ({ request }) => {

    const response = await authAPI.login(invalidUser);
    expect(response.status()).toBe(400);
    const data = await response.json();

});

test.only("verify blank email detail", async ({ request }) => {

    const response = await authAPI.login(blankEmail);
    expect(response.status()).toBe(400);
    const data = await response.json();

});
test.only("verify blank password detail", async ({ request }) => {

    const response = await authAPI.login(blankPassword);
    expect(response.status()).toBe(400);
    const data = await response.json();

});

test.only("verify user not found", async ({ request }) => {

    const response = await authAPI.login(UserNotFound);
    expect(response.status()).toBe(400);
    const data = await response.json();

});









