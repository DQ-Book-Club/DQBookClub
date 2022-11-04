import {FormEvent, useState} from "react";

type LoginFormProps = {
  handleSubmit: (email: string, password: string) => void
}

export default function LoginForm(props: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    props.handleSubmit(email!, password!)
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