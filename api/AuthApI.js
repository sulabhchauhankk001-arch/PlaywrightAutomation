class AuthAPI {
    constructor(request) {
        this.request = request;
    }
    async login(loginPayload) {
        const Response = await this.request.post('/api/auth/login', {
            Headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data:loginPayload
        });
        return Response;
    }
}

module.exports = AuthAPI;