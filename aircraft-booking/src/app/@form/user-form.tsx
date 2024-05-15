'use client'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { BUTTON_CONST, FORM_CONST } from '@/constants/form-constants'
import { COMMON_TOAST } from '@/constants/toast-constants'
import { userFormSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

export type UserTypeForm = z.infer<typeof userFormSchema>
const FormComponent = () => {
    const addUserDefaultValues: UserTypeForm = {
        email: '',
        firstName: ``,
        lastName: ``,
        address: '',
        phone: '',
        boarding: '',
        destination: ''
    }

    const form = useForm<UserTypeForm>({
        defaultValues: addUserDefaultValues,
        resolver: zodResolver(userFormSchema)
    })

    const { toast } = useToast()

    const {
        formState: { errors }
    } = form

    const onSubmit: SubmitHandler<UserTypeForm> = () => {
        try {
            toast({
                description: COMMON_TOAST.SUCCESS
            })
        } catch (error) {
            toast({
                description: COMMON_TOAST.FAILURE
            })
        }
    }

    return (
        <div className="w-full p-10 bg-blue-500/30 ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="">{FORM_CONST.FIRST_NAME_LABEL}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={FORM_CONST.FIRST_NAME_PLACEHOLDER}
                                        {...field}
                                        error={errors.firstName}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="">{FORM_CONST.LAST_NAME_LABEL}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={FORM_CONST.LAST_NAME_PLACEHOLDER}
                                        {...field}
                                        error={errors.lastName}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="">{FORM_CONST.EMAIL_LABEL}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={FORM_CONST.EMAIL_PLACEHOLDER}
                                        {...field}
                                        error={errors.lastName}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="">{FORM_CONST.ADDRESS_LABEL}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={FORM_CONST.ADDRESS_PLACEHOLDER}
                                        {...field}
                                        error={errors.lastName}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="">{FORM_CONST.PHONE_LABEL}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={FORM_CONST.PHONE_PLACEHOLDER}
                                        {...field}
                                        error={errors.phone}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant="default" className="mt-5 text-center" type="submit">
                        {BUTTON_CONST.SUBMIT_LABEL}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default FormComponent
