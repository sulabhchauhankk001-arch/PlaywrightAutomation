const { test, expect, request } = require('@playwright/test');
const AuthAPI = require('../api/AuthAPI');
const { validUser, bothValid } = require('../test-data/loginPayload.js')
const Event = require('../api/EventAPI')
const { param, createEventPayload, createEventCurrentDate, EditEventPayload1 } = require('../test-data/EventPayload')
const EventPageHelper = require('../helpers/EventHelpers')

let token;
test.beforeAll(async ({ request }) => {
    const authAPI = new AuthAPI(request);
    const response = await authAPI.login(bothValid);

    const responseBody = await response.json();

    token = `Bearer ${responseBody.token}`

    console.log(token);
});

test("verify token", async ({ request }) => {
    const authme = new Event(request);
    const response1 = await authme.authMe(token);
    expect(response1.status()).toBe(200);
    const data = await response1.json();
    console.log(data);


});


test("verify create event with old date", async ({ request }) => {
    const Createevent = new Event(request);
    const response = await Createevent.createEvent(token, createEventPayload);
    expect(response.status()).toBe(400);
    const data = await response.json();
    console.log(data);

});

test("verify create event with today date", async ({ request }) => {
    const Createevent = new Event(request);
    const response = await Createevent.createEvent(token, createEventCurrentDate);
    expect(response.status()).toBe(201);
    const data = await response.json();
    console.log(data);
    // expect(data.success).toBe(false);
    // expect(data.error).toBe('Validation failed');
    // expect(data.details[0].message).toBe('Title is required');

});

test("get event list", async ({ request }) => {
    const eventDetail = new Event(request);
    const response = await eventDetail.GetEvent(token, param);
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data)
    const id = data.data.map(e => e.id)
    console.log("event id :-", id);

});

const scenarios = [
    {
        name: 'Title blank',
        field: 'title',
        value: '',
        expectedMessage: 'Title is required'
    },
    {
        name: 'City blank',
        field: 'city',
        value: '',
        expectedMessage: 'City is required'
    },
    {
        name: 'Venue blank',
        field: 'venue',
        value: '',
        expectedMessage: 'Venue is required'
    }
];

scenarios.forEach((scenario) => {

    test(scenario.name, async ({ request }) => {

        const eventAPI = new Event(request);

        const payload = {
            ...createEventCurrentDate,
            [scenario.field]: scenario.value
        };

        const response = await eventAPI.createEvent(
            token,
            payload
        );

        const data = await response.json();

        expect(response.status()).toBe(400);

        expect(data.details[0].message)
            .toBe(scenario.expectedMessage);

    });

});


test("verify event search ID ", async ({ request }) => {
    const getEvent = new EventPageHelper(request);
    const latestEventId = await getEvent.getLatestEventId(token, param);
    console.log("latest id ", latestEventId);
    const searchEvent = new Event(request)
    const getEventById = await searchEvent.GetEventById(token, latestEventId);
    const data = await getEventById.json();
    console.log(data);

});


test("verify event is edit... ", async ({ request }) => {
    const getEvent = new EventPageHelper(request);
    const latestEventId = await getEvent.getLatestEventId(token, param);
    const editEvent = new Event(request);
    const EditEvent = await editEvent.EditEvent(token, EditEventPayload1, latestEventId);
    const dataResponse = await EditEvent.json();
    console.log(dataResponse);
    expect(dataResponse.success).toBeTruthy();

for (const key in EditEventPayload1) {
    const actualValue =
        key === 'price'
            ? Number(dataResponse.data[key])
            : dataResponse.data[key];

    expect(actualValue).toEqual(EditEventPayload1[key]);
}

});

test("verify delete the event by ID",async({request})=>{
    const helper = new EventPageHelper(request);
    const EventId = await helper.getLatestEventId(token, param);
    console.log("Event ID :-",EventId)
    const deleteEvent = new Event(request);
    const response = await deleteEvent.DeleteEvent(token,EventId);
    const data = await response.json();
    console.log(data);

});
