import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingSpinner } from "@/components";
import { ThemeContext } from "@/context";
import { useSigninMutation } from "@/hooks";
import { ApiError } from "@/models";
import { getError, setLocalStorage } from "@/utilities";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import '@/styles/components/_Form.scss';

interface LoginPageInterface {}

const LoginPage: React.FC<LoginPageInterface> = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { userInfo, userSignin } = useContext(ThemeContext);

    const { mutateAsync: signin, isLoading } = useSigninMutation();

    const submitHandler = async (e: React.SyntheticEvent) =>  {
        e.preventDefault();
        try {
            const data = await signin({ email, password });
            userSignin(data);
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
        <main>
            <article className="form-container">
                <section>
                    <Helmet>
                        <title>Iniciar Sesión - F y M Indumentaria</title>
                    </Helmet>
                    <h1>Iniciar Sesión</h1>
                    <form onSubmit={submitHandler}>
                        <div className="group">      
                            <input
                                type="email"
                                name="email"
                                value={email}
                                required
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="group">      
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                required
                                onChange={(e)=> setPassword(e.target.value)}
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
                        <div className="from-submit">
                            <button
                                type="submit"
                                disabled={isLoading}
                            >
                                Iniciar sesión
                            </button>
                            {
                                isLoading && <LoadingSpinner type='flex' />
                            }
                            <div>
                                <span>¿No tenés cuenta?</span>{' '}
                                <Link to={`/signup?redirect=${redirect}`}>Crear cuenta</Link>
                            </div>
                        </div>
                    </form>
                </section>
            </article>
        </main>
    )
}

export default LoginPage