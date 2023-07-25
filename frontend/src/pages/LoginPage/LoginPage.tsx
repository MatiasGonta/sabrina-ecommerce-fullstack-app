import { LoadingSpinner } from "@/components";
import { ThemeContext } from "@/context";
import { useSigninMutation } from "@/hooks";
import { ApiError } from "@/models";
import { getError, setLocalStorage } from "@/utilities";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

interface LoginPageInterface {}

const LoginPage: React.FC<LoginPageInterface> = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        <div className="small-container">
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <h1>Sign In</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        name="email"
                        required
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password :</label>
                    <input
                        type="password"
                        name="password"
                        required
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                    >
                        Sign In
                    </button>
                    {
                        isLoading && <LoadingSpinner />
                    }
                </div>
                <div>
                    New customer?{' '}
                    <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                </div>
            </form>
        </div>
  )
}

export default LoginPage