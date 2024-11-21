import { json, redirect } from 'react-router-dom'
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;


export async function action ({ request }) {
  const searchParam = new URL(request.url).searchParams;
  const mode = searchParam.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup'){
    throw json({message: 'Unsupported Mode'}, {status: 422});
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData),
  })

  if (response.status === 422 || response.status === 401){
    return response;
  }

  if (!response.ok){
    throw json({ message: 'Could not authenticate user' }, { status: 500 })
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token);

  return redirect('/')
}


//The action here will be triggered whenever the used <AuthForm> is submitted, because it is 
// on the same route as this <AuthForm> is on.

//Now we need to access the data that was submitted in the form (here, Username & password) to
// authenticate the use. And that we can access by using {request} Object, that's the part of the 
// package that we get as parameter in this action function, that is executed by react router. 