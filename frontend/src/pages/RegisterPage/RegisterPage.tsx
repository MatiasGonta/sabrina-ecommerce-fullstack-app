import { ThemeContext } from "@/context";
import { useSignupMutation } from "@/hooks";
import { ApiError } from "@/models";
import { getError } from "@/utilities";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface RegisterPageInterface {}

const RegisterPage: React.FC<RegisterPageInterface> = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { userInfo, userSignin } = useContext(ThemeContext);

    const { mutateAsync: signup, isLoading } = useSignupMutation();

    const submitHandler = async (e: React.SyntheticEvent) =>  {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const data = await signup({ name, email, password });
            userSignin(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect);
        } catch(error) {
            alert(getError(error as ApiError));
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
                <label htmlFor="name">Name :</label>
                <input
                    type="text"
                    name="name"
                    required
                    onChange={(e)=> setName(e.target.value)}
                />
            </div>
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
                <label htmlFor="confirm-password">Confirm Password :</label>
                <input
                    type="password"
                    name="confirm-password"
                    required
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                />
            </div>
            <div>
                <button type="submit">Sign Up</button>
            </div>
            <div>
                Already have any account?{' '}
                <Link to={`/signin?redirect=${redirect}`}>Sign-in</Link>
            </div>
        </form>
    </div>
  )
}

export default RegisterPage