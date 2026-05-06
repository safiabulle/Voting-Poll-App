import { useState } from 'react'
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";


const Register = () => {
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div
      className="rounded-2xl p-5 sm:p-6"
      style={{
        background: 'var(--card-bg)',
        border: '1.5px solid var(--border)',
      }}
    >
      <div className="mb-4">
        <h3
          className="font-display font-bold text-lg"
          style={{ color: 'var(--ink)' }}
        >
          {isRegistering ? 'Create an account' : 'Sign in to vote'}
        </h3>
        <p className="text-sm mt-1" style={{ color: '#6b6860' }}>
          Firebase Auth keeps voting limited to signed-in users.
        </p>
      </div>

      {error && (
        <p className="mb-4 text-sm font-medium" style={{ color: '#b91c1c' }}>
          {error}
        </p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="email"
            style={{ color: 'var(--ink)' }}
          >
            Email
          </label>
          <input
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              border: '1.5px solid var(--border)',
              background: '#ffffff',
              color: 'var(--ink)',
            }}
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="password"
            style={{ color: 'var(--ink)' }}
          >
            Password
          </label>
          <input
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              border: '1.5px solid var(--border)',
              background: '#ffffff',
              color: 'var(--ink)',
            }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer hover:opacity-90 active:scale-95"
            type="submit"
            style={{ background: 'var(--teal)', color: '#ffffff' }}
          >
            {isRegistering ? 'Register' : 'Sign in'}
          </button>

          <button
            className="text-sm font-medium cursor-pointer hover:opacity-80"
            type="button"
            onClick={() => {
              setError('')
              setIsRegistering((current) => !current)
            }}
            style={{ color: 'var(--coral)' }}
          >
            {isRegistering
              ? 'Already have an account? Sign in'
              : 'Need an account? Register'}
          </button>
        </div>
      </form>

    </div>
  )
}

export default Register
