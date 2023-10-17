import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSignupMutation } from "@/hooks";
import { ApiError, TypeWithKey } from "@/models";
import { getError, handleFormInputChange } from "@/utilities";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import '@/styles/pages/AuthenticatedPages/AuthenticatedPages.scss';
interface RegisterPageInterface { }

const RegisterPage: React.FC<RegisterPageInterface> = () => {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    //Form inputs values
    const [formData, setFormData] = useState<TypeWithKey<string>>({ name: '', email: '', password: '', confirmPassword: '' });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { mutateAsync: signup } = useSignupMutation();

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
        <main className="authenticated-main">
            <article>
                <section>
                    <Helmet>
                        <title>Registro de usuario - SABRINA</title>
                    </Helmet>
                    <div className="form-container">
                        <h3>Crear Cuenta</h3>
                        <form onSubmit={submitHandler}>
                            <div className="group">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    pattern=".{4,25}"
                                    title="El nombre debe tener entre 4 y 25 caracteres"
                                    className={formData.name !== '' ? 'active' : ''}
                                    required
                                    onChange={(e) => handleFormInputChange(e, formData, setFormData)}
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="group">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    className={formData.email !== '' ? 'active' : ''}
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
                            <div className="group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
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
                                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                            </div>
                            <div className="form-submit">
                                <button type="submit">Crear Cuenta</button>
                                <div>
                                    ¿Ya tenés una cuenta?{' '}
                                    <Link to={`/signin?redirect=${redirect}`}>Iniciá sesión</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </article>
        </main>
    )
}

export default RegisterPage