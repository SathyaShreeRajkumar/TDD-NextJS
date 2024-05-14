import {
    ADDRESS_VALIDATION,
    EMAIL_VALIDATION,
    FIRST_NAME_VALIDATION,
    LAST_NAME_VALIDATION,
    PHONE_VALIDATION
} from '@/constants/validation-errors'
import { z } from 'zod'

const firstNameSchema = z.object({
    firstName: z
        .string()
        .trim()
        .refine((value) => value !== '', {
            message: FIRST_NAME_VALIDATION.FIRST_NAME_REQUIRED
        })
        .refine((value) => /^[a-zA-Z\s]+$/.test(value), {
            message: FIRST_NAME_VALIDATION.INVALID_FIRST_NAME
        })
})

const lastNameSchema = z.object({
    lastName: z
        .string()
        .trim()
        .refine((value) => value !== '', {
            message: LAST_NAME_VALIDATION.LAST_NAME_REQUIRED
        })
        .refine((value) => /^[a-zA-Z\s]+$/.test(value), {
            message: LAST_NAME_VALIDATION.INVALID_LAST_NAME
        })
})

const emailSchema = z.object({
    email: z
        .string()
        .refine((value) => value !== '', {
            message: EMAIL_VALIDATION.EMAIL_REQUIRED
        })
        .refine((value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value), {
            message: EMAIL_VALIDATION.INVALID_EMAIL
        })
})

const phoneSchema = z.object({
    phone: z
        .string()
        .refine((value) => value !== '', {
            message: PHONE_VALIDATION.PHONE_REQUIRED
        })
        .refine((value) => /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/.test(value), {
            message: PHONE_VALIDATION.INVALID_PHONE
        })
})

const addressSchema = z.object({
    address: z.string().refine((value) => value !== '', {
        message: ADDRESS_VALIDATION.ADDRESS_REQUIRED
    })
})

const boardingSchema = z.object({
    boarding: z.string().refine((value) => value !== '', {
        message: ADDRESS_VALIDATION.ADDRESS_REQUIRED
    })
})

const destinationSchema = z.object({
    destination: z.string().refine((value) => value !== '', {
        message: ADDRESS_VALIDATION.ADDRESS_REQUIRED
    })
})

export const userFormSchema = firstNameSchema
    .and(lastNameSchema)
    .and(emailSchema)
    .and(phoneSchema)
    .and(addressSchema)
    .and(boardingSchema)
    .and(destinationSchema)
