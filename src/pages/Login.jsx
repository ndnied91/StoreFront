import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { FormInput, SubmitBtn } from '../components/index';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { loginUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';

const url = '/auth/local';

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.post(url, data);

      store.dispatch(loginUser(response.data));
      toast.success('Login success!');
      return redirect('/');
    } catch (error) {
      const errorMessage = `User ${error?.response?.data?.error?.message}`;
      toast.error(errorMessage);
      return null;
    }
  };
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    const data = {
      identifier: 'james@gmail.com',
      password: 'secret',
    };

    try {
      const response = await customFetch.post(url, data);
      dispatch(loginUser(response.data));
      toast.success('welcome guest user');

      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('error :( ');
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold"> Login </h4>
        <FormInput
          label={'email'}
          type={'email'}
          name={'identifier'}
          defaultValue={'james@gmail.com'}
        />
        <FormInput
          label={'password'}
          type={'password'}
          name={'password'}
          defaultValue="secret"
        />

        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={loginAsGuestUser}
        >
          guest user
        </button>
        <p className="text-center">
          {' '}
          Not a member yet?
          <Link className="ml-2 link link-hover link-primary" to="/register">
            {' '}
            Register{' '}
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
