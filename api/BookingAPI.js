class Booking {
    constructor(request) {
        this.request = request
    }
    async GetBookigList(token) {
        const response = await this.request.get('/api/bookings?page=1&limit=10', {
            headers: {
                accept: 'application/json',
                authorization: token
            }
        });
        return response;
    }
    async CreateBooking(token,BookingData){
        const response = await this.request.post('/api/bookings',{
             headers: {
                accept: 'application/json',
                authorization: token
            },
            data:BookingData
        });
        return response;
    }
    async CancelBooking(token,BookingId){
        const response = await this.request.delete(`/api/bookings/${BookingId}`,{
            headers: {
                accept: 'application/json',
                authorization: token
            }
        });
        return response;
    }
    async CancelAllBooking(token){
        const response = await this.request.delete('/api/bookings',{
            headers: {
                accept: 'application/json',
                authorization: token
            }
        });
        return response
    }
}

module.exports = Booking;