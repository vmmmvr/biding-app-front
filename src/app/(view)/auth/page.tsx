'use client';

import { useUserSignInMutation } from '@/services/user.service';
import { missingProperties } from '@/utils';
import { UserSignInSchema } from '@/validators/user.schema';
import { Button, Input } from '@material-tailwind/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function AuthPage() {
    const router = useRouter();

    const { mutateAsync: signin, data, isPending } = useUserSignInMutation()

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
        },
        validationSchema: UserSignInSchema,
        onSubmit: (values) => {
            signin(values);
        },
    });

    useEffect(() => {
        if (data) {
            const { name, email, id, uid } = data;
            localStorage.clear();
            localStorage.setItem("user", JSON.stringify({
                name, email, id, uid
            }));
            router.push("/");
        }
    }, [data, router])

    return (
        <div className='w-full flex justify-center h-full min-h-screen items-center px-5'>
            <form className='max-w-sm w-full flex flex-col items-center gap-4' onSubmit={formik.handleSubmit}>
                <div className='w-full'>
                    <Input
                        crossOrigin={undefined} label="Name"
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && formik.errors.name ? true : undefined}
                        size="lg"
                        className="w-full" {...missingProperties} />
                    <small className='text-red-500'>{formik.errors.name}</small>
                </div>

                <div className='w-full'>
                    <Input
                        crossOrigin={undefined} label="Email"
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email ? true : undefined}
                        size="lg"
                        className="w-full" {...missingProperties} />
                    <small className='text-red-500'>{formik.errors.email}</small>
                </div>
                <Button disabled={isPending}   {...missingProperties}
                    type="submit"
                    className="w-full bg-indigo-500  font-semibold py-4 px-4 rounded-md shadow-md"
                >
                    Sign In
                </Button>
            </form>

        </div>
    )
}
