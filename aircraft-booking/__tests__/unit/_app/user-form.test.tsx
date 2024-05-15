import FormComponent from '@/app/@form/user-form'
import { BUTTON_CONST, FORM_CONST } from '@/constants/form-constants'
import { COMMON_TOAST } from '@/constants/toast-constants'
import {
    ADDRESS_VALIDATION,
    EMAIL_VALIDATION,
    FIRST_NAME_VALIDATION,
    LAST_NAME_VALIDATION,
    PHONE_VALIDATION
} from '@/constants/validation-errors'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { invalidUserDetailsMock, mockUserDetails } from '../../__fixtures__/app/form'

describe('UserForm', () => {
    test('should render user form labels properly', () => {
        render(<FormComponent />)
        expect(screen.getByLabelText(FORM_CONST.FIRST_NAME_LABEL)).toBeInTheDocument()
        expect(screen.getByLabelText(FORM_CONST.LAST_NAME_LABEL)).toBeInTheDocument()
        expect(screen.getByLabelText(FORM_CONST.EMAIL_LABEL)).toBeInTheDocument()
        expect(screen.getByLabelText(FORM_CONST.PHONE_LABEL)).toBeInTheDocument()
        expect(screen.getByLabelText(FORM_CONST.ADDRESS_LABEL)).toBeInTheDocument()
    })

    test('should render user form placeholders properly', () => {
        render(<FormComponent />)
        expect(screen.getByPlaceholderText(FORM_CONST.FIRST_NAME_PLACEHOLDER)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(FORM_CONST.LAST_NAME_PLACEHOLDER)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(FORM_CONST.EMAIL_PLACEHOLDER)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(FORM_CONST.PHONE_PLACEHOLDER)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(FORM_CONST.ADDRESS_PLACEHOLDER)).toBeInTheDocument()
    })

    test('should render footer properly', () => {
        render(<FormComponent />)
        const SubmitButton = screen.getByRole('button', {
            name: BUTTON_CONST.SUBMIT_LABEL
        })
        expect(SubmitButton).toBeInTheDocument()
    })
})

describe('Form Validation', () => {
    test('should display error when field values are not provided', async () => {
        render(<FormComponent />)
        const SubmitButton = screen.getByRole('button', {
            name: BUTTON_CONST.SUBMIT_LABEL
        })
        fireEvent.click(SubmitButton)

        const firstNameError = await screen.findByText(FIRST_NAME_VALIDATION.FIRST_NAME_REQUIRED)
        const lastNameError = await screen.findByText(LAST_NAME_VALIDATION.LAST_NAME_REQUIRED)
        const emailNameError = await screen.findByText(EMAIL_VALIDATION.EMAIL_REQUIRED)
        const phoneError = await screen.findByText(PHONE_VALIDATION.PHONE_REQUIRED)
        const addressError = await screen.findByText(ADDRESS_VALIDATION.ADDRESS_REQUIRED)

        expect(firstNameError).toBeInTheDocument()
        expect(lastNameError).toBeInTheDocument()
        expect(emailNameError).toBeInTheDocument()
        expect(phoneError).toBeInTheDocument()
        expect(addressError).toBeInTheDocument()
    })

    test('should display error when invalid values are provided', async () => {
        render(<FormComponent />)

        const invalidMock = invalidUserDetailsMock

        fireEvent.change(screen.getByPlaceholderText(FORM_CONST.FIRST_NAME_PLACEHOLDER), {
            target: { value: invalidMock.invalidFirstName }
        })
        fireEvent.change(screen.getByPlaceholderText(FORM_CONST.LAST_NAME_PLACEHOLDER), {
            target: { value: invalidMock.invalidLastName }
        })
        fireEvent.change(screen.getByPlaceholderText(FORM_CONST.EMAIL_PLACEHOLDER), {
            target: { value: invalidMock.invalidEmail }
        })
        fireEvent.change(screen.getByPlaceholderText(FORM_CONST.PHONE_PLACEHOLDER), {
            target: { value: invalidMock.invalidPhone }
        })

        const SubmitButton = screen.getByRole('button', {
            name: BUTTON_CONST.SUBMIT_LABEL
        })
        fireEvent.click(SubmitButton)

        const firstNameError = await screen.findByText(FIRST_NAME_VALIDATION.INVALID_FIRST_NAME)
        const lastNameError = await screen.findByText(LAST_NAME_VALIDATION.INVALID_LAST_NAME)
        const emailNameError = await screen.findByText(EMAIL_VALIDATION.INVALID_EMAIL)
        const phoneError = await screen.findByText(PHONE_VALIDATION.INVALID_PHONE)

        expect(firstNameError).toBeInTheDocument()
        expect(lastNameError).toBeInTheDocument()
        expect(emailNameError).toBeInTheDocument()
        expect(phoneError).toBeInTheDocument()
    })

    test('should Submit form when Submit button is clicked with valid data', async () => {
        const mockData = mockUserDetails

        fireEvent.change(screen.getByPlaceholderText(FORM_CONST.FIRST_NAME_PLACEHOLDER), {
            target: { value: mockData.firstName }
        })
        fireEvent.change(screen.getByPlaceholderText(FORM_CONST.LAST_NAME_PLACEHOLDER), {
            target: { value: mockData.lastName }
        })
        fireEvent.change(screen.getByPlaceholderText(FORM_CONST.EMAIL_PLACEHOLDER), {
            target: { value: mockData.address }
        })
        fireEvent.change(screen.getByPlaceholderText(FORM_CONST.PHONE_PLACEHOLDER), {
            target: { value: mockData.phone }
        })
        fireEvent.change(screen.getByPlaceholderText(FORM_CONST.ADDRESS_PLACEHOLDER), {
            target: { value: mockData.address }
        })

        const selectBox = screen.getByRole('combobox')
        fireEvent.click(selectBox)

        const selectedCity = screen.getByRole('option', {
            name: mockData.city
        })

        fireEvent.click(selectedCity)

        fireEvent.change(screen.getByPlaceholderText(FORM_CONST.POSTAL_CODE_PLACEHOLDER), {
            target: { value: mockData.postalCode }
        })

        const SubmitButton = screen.getByRole('button', {
            name: BUTTON_CONST.SUBMIT_LABEL
        })
        fireEvent.click(SubmitButton)

        await waitFor(() => {
            expect(COMMON_TOAST.SUCCESS).toBeInTheDocument()
        })
    })
})
