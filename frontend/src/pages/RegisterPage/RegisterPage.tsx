import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from '@/redux/store';
import { userSignin } from '@/redux/states/userInfo.state';
import { useSignupMutation } from "@/hooks";
import { ApiError } from "@/models";
import { getError, setLocalStorage } from "@/utilities";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { LoadingSpinner } from "@/components";
import '@/styles/components/_Form.scss';

interface RegisterPageInterface {}

const RegisterPage: React.FC<RegisterPageInterface> = () => {
    const userInfo = useSelector((store: AppStore) => store.userInfo);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const { mutateAsync: signup, isLoading } = useSignupMutation();

    const submitHandler = async (e: React.SyntheticEvent) =>  {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Las contraseñas no son iguales');
            return;
        }

        try {
            const data = await signup({ name, email, password });
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
    <main>
        <article className="form-container">
            <section>
                <Helmet>
                    <title>Crear Cuenta - F y M Indumentaria</title>
                </Helmet>
                <h1>Crear Cuenta</h1>
                <form onSubmit={submitHandler}>
                    <div className="group">
                        <input
                            type="name"
                            name="name"
                            value={name}
                            pattern=".{4,25}"
                            title="El nombre debe tener entre 4 y 25 caracteres"
                            className={name !== '' ? 'active' : ''}
                            required
                            onChange={(e)=> setName(e.target.value)}
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="group">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            className={email !== '' ? 'active' : ''}
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
                    <div className="group">      
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirm-password"
                            value={confirmPassword}
                            required
                            onChange={(e)=> setConfirmPassword(e.target.value)}
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
                        <label htmlFor="confirm-password">Confirmar Contraseña</label>
                    </div>
                    <div className="from-submit">
                        <button type="submit">Crear Cuenta</button>
                        {
                            isLoading && <LoadingSpinner type='flex' />
                        }
                        <div>
                            ¿Ya tenés una cuenta?{' '}
                            <Link to={`/signin?redirect=${redirect}`}>Iniciá sesión</Link>
                        </div>
                    </div>
                </form>
            </section>
        </article>
    </main>
  )
}

export default RegisterPage