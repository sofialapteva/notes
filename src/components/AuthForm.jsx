import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { authAction } from '../redux/actions/authAction'
const AuthForm = () => {
  const dispatch = useDispatch();
  const styles = {
    main: 'w-8/12 mx-auto shadow-lg h-screen py-32 text-center text-black',
    input: 'h-8 w-full border-2 border-green-500 block m-2 text-center text-black',
    button: 'h-8 w-full border-2 bg-green-400 border-green-500 text-black hover:bg-green-500 block m-2',
    form: 'mx-auto w-9/12',
    header: 'text-xl text-black font-bold p-2'
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (e.target.login.value === '' || e.target.login.value === '') {
      alert('Insert the login and the password');
      return
    }
    e.preventDefault()
    const req = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: e.target.login.value,
        password: e.target.password.value,
      })
    })
    e.target.login.value = '';
    e.target.password.value = '';
    const res = await req.json()
    dispatch(authAction(res.login))
  }

  return (
    <main className={styles.main}>
      <h2 className={styles.header} style={{ fontSize: '72px' }}>Evernote</h2>
      <h2 className={styles.header}>Remember everything</h2>
      <form className={styles.form} onSubmit={handleLogin}>
        <input type='text' name='login' className={styles.input} placeholder='Login' />
        <input type='password' name='password' className={styles.input} placeholder='Password' />

        <button type='submit' className={styles.button}>Log in</button>

      </form>
    </main>
  );
}

export default AuthForm;
