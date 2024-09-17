import RegisterForm from '../components/RegisterForm';

const RegisterPage = ({ setToken }) => {
    return (
        <div>
            <h1>Register</h1>
            <RegisterForm setToken={setToken} />
        </div>
    );
};

export default RegisterPage;