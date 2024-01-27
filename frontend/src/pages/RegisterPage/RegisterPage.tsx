import { useSignupMutation } from "@/hooks";
import { ApiError, Routes } from "@/models";
import { getError } from "@/utilities";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { Form, FormField } from '@/components/ui';
import '@/styles/pages/AuthenticatedPages/AuthenticatedPages.scss';

type RegisterData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface RegisterPageInterface { }

const RegisterPage: React.FC<RegisterPageInterface> = () => {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : Routes.HOME;

    //Form inputs values
    const [formData, setFormData] = useState<RegisterData>({ name: '', email: '', password: '', confirmPassword: '' });

    const handleRegisterFormData = (prop: keyof RegisterData, value: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [prop]: value
        }));
    }

    const { mutateAsync: signup, isLoading } = useSignupMutation();

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Las contraseñas no son iguales');
            return;
        }

        try {
            const { name, email, password } = formData;
            await toast.promise(signup({ name, email, password }), {
                pending: {
                    render() {
                        return 'Registrando tu cuenta... Por favor, espera un momento.'
                    },
                },
                success: {
                    render({ data }) {
                        return data?.message
                    }
                }
            }, {
                autoClose: 6000
            });
        } catch (error) {
            toast.error(getError(error as ApiError));
        }
    }

    return (
        <main className="main--authenticated">
            <section className="authenticated-wrapper">
                <article>
                    <Helmet>
                        <title>Registro de usuario - SABRINA</title>
                    </Helmet>
                    <Form
                        formTitle="Crear Cuenta"
                        buttonText="Crear Cuenta"
                        buttonProps={{ disabled: isLoading }}
                        onSubmit={submitHandler}
                    >
                        <FormField
                            label="Nombre"
                            type="text"
                            name="name"
                            defaultValue={formData.name}
                            pattern=".{4,25}"
                            title="El nombre debe tener entre 4 y 25 caracteres"
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRegisterFormData('name', e.target.value)}
                        />
                        <FormField
                            label="Correo electrónico"
                            type="email"
                            name="email"
                            defaultValue={formData.email}
                            customClass={formData.email !== '' ? 'form-field__input--active' : ''}
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRegisterFormData('email', e.target.value)}
                        />
                        <FormField
                            label="Contraseña"
                            type="password"
                            name="password"
                            defaultValue={formData.password}
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRegisterFormData('password', e.target.value)}
                        />
                        <FormField
                            label="Confirmar Contraseña"
                            type="password"
                            name="confirmPassword"
                            defaultValue={formData.confirmPassword}
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRegisterFormData('confirmPassword', e.target.value)}
                        />
                    </Form>
                    <nav className="authenticated-wrapper__navigation">
                        <div>
                            ¿Ya tenés una cuenta?{' '}
                            <Link to={`${Routes.SIGNIN}?redirect=${redirect}`}>Iniciá sesión</Link>
                        </div>
                    </nav>
                </article>
            </section>
        </main>
    )
}

export default RegisterPage