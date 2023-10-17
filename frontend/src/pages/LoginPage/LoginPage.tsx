import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from '@/redux/store';
import { userSignin } from '@/redux/states/userInfo.state';
import { useSigninMutation } from "@/hooks";
import { ApiError, TypeWithKey } from "@/models";
import { getError, handleFormInputChange, setLocalStorage } from "@/utilities";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import '@/styles/pages/AuthenticatedPages/AuthenticatedPages.scss';

interface LoginPageInterface {}

const LoginPage: React.FC<LoginPageInterface> = () => {
    const userInfo = useSelector((store: AppStore) => store.userInfo);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    //Form inputs values
    const [formData, setFormData] = useState<TypeWithKey<string>>({ email: '', password: '' });

    const [showPassword, setShowPassword] = useState<boolean>(false);

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
        <main className="authenticated-main">
            <article>
                <section>
                    <Helmet>
                        <title>Iniciar Sesión - SABRINA</title>
                    </Helmet>
                    <div className="form-container">
                        <h3>Iniciar Sesión</h3>
                        <form onSubmit={submitHandler}>
                            <div className="group">      
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    required
                                    onChange={(e) => handleFormInputChange(e, formData, setFormData)}
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label htmlFor="email">Correo electrónico</label>
                            </div>
                            <div className="group">      
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    required
                                    onChange={(e) => handleFormInputChange(e, formData, setFormData)}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword
                                        ? <VisibilityIcon sx={{ fontSize: 25 }} />
                                        : <VisibilityOffIcon sx={{ fontSize: 25 }} />
                                    }
                                </button>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label htmlFor="password">Contraseña</label>
                            </div>
                            <div className="form-submit">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    Iniciar sesión
                                </button>
                                <div>
                                    <Link to={`/restore-password`}>¿Olvidaste tu contraseña?</Link>
                                </div>
                                <div>
                                    <span>¿No tenés cuenta?</span>{' '}
                                    <Link to={`/signup`}>Crear cuenta</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </article>
        </main>
    )
}

export default LoginPage