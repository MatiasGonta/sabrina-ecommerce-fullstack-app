import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

type ErrorObject = {
  status: number;
  statusText: string;
  message: string;
}

export interface ErrorInterface {}

const Error: React.FC<ErrorInterface> = () => {
    const error: ErrorObject = useRouteError() as ErrorObject;

  return (
    <div id="error-page">
        <Helmet>
          <title>Error - SABRINA</title>
        </Helmet>
        <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="error" />
        <h1>Error</h1>
        <p>{error.statusText || error.message}</p>
        <Link to='/'>
          <button>Volver al inicio</button>
        </Link>
    </div>
  )
}

export default Error