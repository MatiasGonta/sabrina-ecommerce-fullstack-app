import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { userSignin } from '@/redux/states/userInfo.state';
import { setLocalStorage } from "@/utilities";
import { useVerifyUserMutation } from "@/hooks";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Routes } from '@/models';
import '@/styles/pages/VerifyAccount/VerifyAccount.scss';

interface VerifyAccountInterface { }

const VerifyAccount: React.FC<VerifyAccountInterface> = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const emailToken = queryParams.get('emailToken');

    const { mutateAsync: verifyUser, isLoading } = useVerifyUserMutation();

    const handleVerify = async () => {
        if (emailToken) {
            try {
                const { newUser, verify } = await verifyUser({ token: emailToken });

                if (verify && newUser) {
                    dispatch(userSignin(newUser));
                    setLocalStorage('userInfo', newUser);
                    setTimeout(() => {
                        navigate(Routes.HOME);
                    }, 3000);
                }

            } catch (error) {
                console.log('error al verificar el usuario: ', error)
            }
        }
    }

    useEffect(() => {
        handleVerify();
    }, [])

    return (
        <main className="main--verify">
            <Helmet>
                <title>Verificación de usuario</title>
            </Helmet>
            <section>
                <article>
                    <div className="verify-user-wrapper">
                        {
                            !emailToken || isLoading
                                ? (
                                    <>
                                        <h2>VERIFICANDO LA CUENTA<span className="verify-animated-dots"></span></h2>
                                        <div className="verify-progress">
                                            <div className="verify-progress__bar">
                                                <div className="verify-progress__bar-value"></div>
                                            </div>
                                        </div>
                                    </>
                                )
                                : (
                                    <>
                                        <TaskAltIcon className="verify-icon" sx={{ fontSize: 125 }} />
                                        <h2>USUARIO VERIFICADO CORRECTAMENTE</h2>
                                        <span>Redireccionando<span className="verify-animated-dots"></span></span>
                                    </>
                                )
                        }
                    </div>
                </article>
            </section>
        </main>
    );
}

export default VerifyAccount;