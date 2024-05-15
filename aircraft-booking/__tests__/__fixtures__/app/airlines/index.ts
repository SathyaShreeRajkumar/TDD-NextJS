import { FlightDetails } from '@/types/flight-details-type'
import { faker } from '@faker-js/faker'

export const mockFlightDetails: FlightDetails = {
    flightNumber: String(faker.number.int()),
    airline: faker.lorem.words(2),
    boarding: faker.location.city(),
    departureDateTime: String(faker.date.recent()),
    destination: faker.location.city(),
    arrivalDateTime: String(faker.date.recent()),
    price: faker.number.float(),
    seatsAvailable: faker.number.int()
}
