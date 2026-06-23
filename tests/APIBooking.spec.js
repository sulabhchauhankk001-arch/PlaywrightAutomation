const { test, expect, request } = require('@playwright/test');
const AuthAPI = require('../api/AuthApI')
const { bothValid } = require('../test-data/loginPayload')
const Booking = require('../api/BookingAPI')
const { BookingData } = require('../test-data/BookingPayload');
const { param } = require('../test-data/EventPayload');
const EventPageHelper = require('../helpers/EventHelpers')

let token;
test.beforeAll(async ({ request }) => {
    const authAPI = new AuthAPI(request);
    const response = await authAPI.login(bothValid);
    const responseBody = await response.json();
    token = `Bearer ${responseBody.token}`
    console.log(token);
    console.log(token);
});

test("verify booking list", async ({ request }) => {
    const bookingList = new Booking(request);
    const response = await bookingList.GetBookigList(token);
    const dataResponse = await response.json();3
    console.log(JSON.stringify(dataResponse, null, 2));
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

});

test("verify the create booking of the event", async ({ request }) => {
    const eventHelper = new EventPageHelper(request)
    const latestEventId = await eventHelper.getLatestEventId(token, param)
    const bookinPayload = {
        ...BookingData,
        eventId: latestEventId
    };
    const booking = new Booking(request);
    const response = await booking.CreateBooking(token, bookinPayload)
    expect(response.status()).toBe(201);
    const responseData = await response.json();
    console.log(responseData);

    for(const key in bookinPayload){
        expect(responseData.data[key]).toEqual(bookinPayload[key])
    }
});

test("Verify delete the booking id",async({request})=>{
    const getBookingId = new EventPageHelper(request)
    const BookingId = await getBookingId.getBookingId(token)
    console.log(BookingId);
    const booking = new Booking(request);
    const response = await booking.CancelBooking(token,BookingId);
    const responseData = await response.json();
    console.log(responseData);

});

test("verify all booking cancel",async({request})=>{
    const cancelbooking = new Booking(request);
    const response = await cancelbooking.CancelAllBooking(token);
    const data = await response.json();
    console.log(data);
});