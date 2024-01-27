import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from '@/redux/store';
import { userSignin } from '@/redux/states/userInfo.state';
import { useSigninMutation } from "@/hooks";
import { ApiError, Routes } from "@/models";
import { getError, setLocalStorage } from "@/utilities";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Form, FormField } from '@/components/ui';
import '@/styles/pages/AuthenticatedPages/AuthenticatedPages.scss';

type LoginData = {
    email: string,
    password: string
}

interface LoginPageInterface {}

const LoginPage: React.FC<LoginPageInterface> = () => {
    const userInfo = useSelector((store: AppStore) => store.userInfo);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : Routes.HOME;

    //Form inputs values
    const [formData, setFormData] = useState<LoginData>({ email: '', password: '' });

    const handleLoginFormData = (key: keyof LoginData, value: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: value
        }));
    }

    const { mutateAsync: signin, isLoading } = useSigninMutation();

    const submitHandler = async (e: React.SyntheticEvent) =>  {
        e.preventDefault();
        try {
            const { email, password } = formData;
            const data = await toast.promise(signin({ email, password }), {
                pending: {
                    render() {
                        return 'Registrando tu cuenta... Por favor, espera un momento.'
                    },
                }
            }, {
                autoClose: 6000
            });
            dispatch(userSignin(data));
            setLocalStorage('userInfo', data);
            navigate(redirect);
        } catch(error) {
            toast.error(getError(error as ApiError));
        }
    }

    useEffect(() => {
      if (userInfo) {
        navigate(redirect);
      }
    }, [navigate, redirect, userInfo]);
    

    return (
        <main className="main--authenticated">
            <section className="authenticated-wrapper">
                <article>
                    <Helmet>
                        <title>Iniciar Sesión - SABRINA</title>
                    </Helmet>
                        <Form
                            formTitle="Iniciar Sesión"
                            buttonText="Iniciar sesión"
                            buttonProps={{ disabled: isLoading }}
                            onSubmit={submitHandler}
                        >
                            <FormField
                                label="Correo electrónico"
                                type="email"
                                name="email"
                                defaultValue={formData.email}
                                customClass={formData.email !== '' ? 'form-field__input--active' : ''}
                                required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLoginFormData('email', e.target.value)}
                            />
                            <FormField
                                label="Contraseña"
                                type="password"
                                name="password"
                                defaultValue={formData.password}
                                required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLoginFormData('password', e.target.value)}
                            />
                        </Form>

                        <nav className="authenticated-wrapper__navigation">
                            <div>
                                <Link to={Routes.RESTORE_PASSWORD}>¿Olvidaste tu contraseña?</Link>
                            </div>
                            <div>
                                <span>¿No tenés cuenta?</span>{' '}
                                <Link to={Routes.SIGNUP}>Crear cuenta</Link>
                            </div>
                        </nav>
                </article>
            </section>
        </main>
    )
}

export default LoginPage