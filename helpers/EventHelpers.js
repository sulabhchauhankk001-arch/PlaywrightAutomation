const { param } = require('../test-data/EventPayload');
const Event = require('../api/EventAPI');
const Booking = require('../api/BookingAPI');


class EventPageHelper {

    constructor(request) {
        this.eventApi = new Event(request)
        this.bookingApi = new Booking(request)
    }

    async getLatestEventId(token, param) {
        const response = await this.eventApi.GetEvent(token, param);
        const body = await response.json();
        if (!body.data || body.data.length === 0) {
            console.log("No event Found")
            return null;
        }
        // return body.data[0].id;
        const latestEvent = body.data.find(event => ![1, 2, 3].includes(event.id));
        return latestEvent ? latestEvent.id : null;
    }
    async getBookingId(token) {
        const response = await this.bookingApi.GetBookigList(token);
        const body = await response.json();
        if (!body.data || body.data.length === 0) {
            console.log("No booking Found")
            return null;
        }
        return body.data[0].id;
    }
}

module.exports = EventPageHelper;