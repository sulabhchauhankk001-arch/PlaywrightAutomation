const timestamp = Date.now();

const param = {
    category: 'Conference',
    city: 'Bangalore',
    search: 'summit',
    page: 1,
    limit: 10


};

const createEventPayload = {
    title: 'Tech Summit 2026',
    description: 'A premier technology conference.',
    category: 'Conference',
    venue: 'Bangalore International Centre',
    city: 'Bangalore',
    eventDate: '2026-06-15T09:00:00.000Z',
    price: 1500,
    totalSeats: 500,
    imageUrl: 'https://example.com/banner.jpg'
};
const createEventCurrentDate = {
    title: 'Tech Summit 2026 vivek',
    description: 'A premier technology conference',
    category: 'Conference',
    venue: 'Bangalore International Centre',
    city: 'Bangalore',
    eventDate: '2026-06-25T09:00:00.000Z',
    price: 1500,
    totalSeats: 500,
    imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800'
};
const EditEventPayload = {
    title: 'Tech Summit 2027f',
    description: 'A premier technology conference.',
    category: 'Conference',
    venue: 'Bangalore International Centre',
    city: 'Bangalore',
    eventDate: '2026-06-25T09:00:00.000Z',
    price: 1500,
    totalSeats: 500,
    imageUrl: 'https://example.com/banner.jpg'
};
const EditEventPayload1 = {
    title: `Tech Summit ${timestamp}`,
    description: `Description ${timestamp}`,
    category: "Workshop",
    venue: `Venue ${timestamp}`,
    city: `Delhi ${timestamp}`,
    eventDate: "2026-12-25T09:00:00.000Z",
    price: 2500,
    totalSeats: 1000,
    imageUrl: `https://example.com/${timestamp}.jpg`
};
module.exports = { param ,createEventPayload,createEventCurrentDate,EditEventPayload1}