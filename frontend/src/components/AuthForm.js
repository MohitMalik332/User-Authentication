
import { Form, Link, useSearchParams, useActionData, useNavigation } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation(); //this hook gives us a nevigation object.

  const [searchParams, setSearchParams] = useSearchParams(); //these values are given by useSeachParam.
  //But here we need only searchParam

  const isLogin = searchParams.get('mode') === 'login';

  const isSubmitting = navigation.state === 'submitting';
  

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {data && data.errors && <ul> 
            {Object.values(data.errors).map(
              err => <li key={err}>{err}</li>)
            }
          </ul>
        }
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button> 
        </div>
      </Form>
    </>
  );
}

export default AuthForm;


//React router gives us a hook that makes it easy to get access to the currently set query paramerer.
// and that hook is " useSearchParams ".

//This useSearchParams hook returns an Array.

//The data.errors provides us an object. and we can get its values by using built in function,
// 'Object.values'