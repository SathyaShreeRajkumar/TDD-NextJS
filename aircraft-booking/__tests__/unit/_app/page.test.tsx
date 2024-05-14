import Page from '@/app/page'
import { COMMON_CONST } from '@/constants/app-constants'
import { render, screen } from '@testing-library/react'

describe('HomePage', () => {
    test('should render tittle properly', () => {
        render(<Page />)
        const header = screen.getByText(COMMON_CONST.APP_TITLE)
        expect(header).toBeDefined()
    })
})
