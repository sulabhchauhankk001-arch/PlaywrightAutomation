class Event {
    constructor(request) {
        this.request = request
    }
    async authMe(token) {
        const Response = await this.request.get('/api/auth/me', {
            headers: {
                accept: 'application/json',
                authorization: token
            }
        });
        return Response;
    }
    async GetEvent(token, param) {
        const response = await this.request.get('/api/events/', {
            headers: {
                accept: 'application/json',
                authorization: token
            },
            // params: param

        });
        return response;

    }
    async createEvent(token, createEventPayload) {
        const Response = await this.request.post('/api/events', {
            headers: {
                accept: 'application/json',
                authorization: token

            },
            data: createEventPayload
        });
        return Response;
    }
    async GetEventById(token, eventId) {
        const Response = await this.request.get(`/api/events/${eventId}`, {
            headers: {
                accept: 'application/json',
                authorization: token
            }
        });
        return Response;

    }
    async EditEvent(token, EditEventPayload, eventId) {
        const response = await this.request.put(`/api/events/${eventId}`, {
            headers: {
                accept: 'application/json',
                authorization: token
            },
            data: EditEventPayload
        });
        return response;
    }
    async DeleteEvent(token,eventId) {
        const response = await this.request.delete(`/api/events/${eventId}`, {
            headers: {
                accept: 'application/json',
                authorization: token
            }
        });
        return response;
    }
}
module.exports = Event;