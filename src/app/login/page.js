'use client'
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    try {
      await signIn('credentials', { email, password, callbackUrl: '/' });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoginInProgress(false);
    }
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Login
      </h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          disabled={loginInProgress}
          onChange={ev => setEmail(ev.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          disabled={loginInProgress}
          onChange={ev => setPassword(ev.target.value)}
        />
        <button disabled={loginInProgress} type="submit">
          {loginInProgress ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </section>
  );
}
