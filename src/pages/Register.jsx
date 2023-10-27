import {
  Form,
  Link,
  Navigate,
  useActionData,
  redirect,
} from 'react-router-dom';
import { FormInput, SubmitBtn } from '../components';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/user/userSlice';

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const url = 'auth/local/register';
      const req = await customFetch.post(url, data);
      const user = {
        username: req.data.user.username,
        email: req.data.user.email,
      };

      store.dispatch(loginUser({ user, token: req.data.jwt }));

      //dispatch event to login user
      toast.success('account created!');
      return redirect('/');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        'please double check your credentials';

      toast.error(errorMessage);
    }

    return null;
  };

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>

        <FormInput
          type={'text'}
          label={'username'}
          name={'username'}
          defaultValue={'jonjon1231'}
        />

        <FormInput
          type={'email'}
          label={'email'}
          name={'email'}
          defaultValue={'jonjon1231@test.com'}
        />

        <FormInput
          type={'password'}
          label={'password'}
          name={'password'}
          defaultValue={'secret'}
        />

        <div className="mt-4">
          <SubmitBtn text={'register'} />
        </div>

        <p className="text-center">
          Already a member?
          <Link
            className="ml-2 link link-hover link-primary capitalize"
            to="/login"
          >
            {' '}
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
