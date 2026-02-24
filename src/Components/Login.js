import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import useToken from './useToken';

export default function Login({ setToken }) {

    async function loginUser(credentials) {
        return fetch(process.env.REACT_APP_BACKEND_URL+"/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => response.text())
    }

    const handleLogin = async event => {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;

        const token = await loginUser([
              username,
              password
        ]);

        console.log(token)
        setToken(token);
    }

    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit = {handleLogin}>
                <div className = "container">
                    <div className="row">
                        <div className="col-sm">
                            <p>Username</p>
                            <input name="username" type="text" className = "form-control col-sm"/>
                        </div>
                        <div className="col-sm">
                            <p>Password</p>
                            <input name="password" type="password" className = "form-control col-sm"/>
                        </div>
                        <button type="submit" className = "btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}