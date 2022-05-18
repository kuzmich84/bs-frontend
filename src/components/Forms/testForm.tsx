import React from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import InputTheme from '../UI/Input/InputTheme'
import {Input} from '@chakra-ui/react'

const TestForm = () => {
    // form validation rules 
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match'),

    })

    // get functions to build form with useForm() hook
    const {register, handleSubmit, reset, formState} = useForm({
        mode: 'onBlur',
        resolver: yupResolver(validationSchema),
    })
    const {errors} = formState

    function onSubmit(data: any) {
        // display form data on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4))
        return false
    }

    return (
        <div className="card m-3">
            <h5 className="card-header">React Hook Form - Password and Confirm Password Match Validation</h5>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Password</label>
                            <Input id="password" placeholder="password" type="password" {...register('password')} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>Confirm Password</label>
                            <Input id="confirm_password" placeholder="confirm password"
                                   type="password" {...register('confirmPassword')} />
                            <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-1">Register</button>
                        <button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TestForm