import AirlinePage from '@/app/@airlines/page'
import { render, screen } from '@testing-library/react'
import { mockFlightDetails } from '../../__fixtures__/app/airlines'
import { CARD_CONST } from '@/constants/app-constants'

describe('Airlines Page', () => {
    test('should render Airlines Page properly', async () => {
        const mockData = mockFlightDetails
        render(<AirlinePage />)
        expect(screen.findByText(mockData.airline)).toBeDefined()

        expect(screen.findByText(mockData.boarding)).toBeDefined()
        expect(screen.findByText(mockData.destination)).toBeDefined()
        expect(screen.findByText(mockData.departureDateTime)).toBeDefined()
        expect(screen.findByText(mockData.arrivalDateTime)).toBeDefined()
        expect(screen.findByText(mockData.price)).toBeDefined()
        expect(screen.findByText(mockData.seatsAvailable)).toBeDefined()
    })

    test('should render button properly', async () => {
        render(<AirlinePage />)

        const SubmitButton = screen.getAllByRole('button', {
            name: CARD_CONST.BOOK_NOW
        })

        expect(SubmitButton).toBeDefined()
    })
})
