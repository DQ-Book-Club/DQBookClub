import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useAuth } from "reactfire";

export default function Login() {
  const auth = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { redirectTo } = router.query
    
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push(typeof redirectTo === 'string' ? redirectTo : '/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div>
        <label htmlFor="email">Email</label>
        <input name="email" type="email" placeholder="ggtan@ggtan.ggtan" value={email} onChange={event => setEmail(event.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input name="password" type="password" value={password} onChange={event => setPassword(event.target.value)} />
      </div>
      <button>Login</button>
    </form>
  )
}
