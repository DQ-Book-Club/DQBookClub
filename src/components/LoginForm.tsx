import React, {ChangeEvent, Component, FormEvent} from "react";

type LoginFormProps = {
  handleSubmit: (email: string, password: string) => void
}

type LoginFormState = {
  email?: string
  password?: string
}

export default class LoginForm extends Component<LoginFormProps, LoginFormState> {
  constructor(props: LoginFormProps) {
    super(props)
    this.state = {
      email: 'tomer.kimia@gmail.com',
      password: ''
    }
  }

  onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.handleSubmit(this.state.email!, this.state.password!)
  }

  changeEmail(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ email: event.target.value })
  }

  changePassword(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ password: event.target.value })
  }

  render() {
    return (
      <form onSubmit={(event) => this.onSubmit(event)}>
        <label htmlFor="email">Email</label>
        <input name="email" type="email" placeholder="ggtan@ggtan.ggtan" value={this.state.email} onChange={event => this.changeEmail(event)} />
        <label htmlFor="password">Password</label>
        <input name="password" type="password" value={this.state.password} onChange={event => this.changePassword(event)} />
        <button>Login</button>
      </form>
    )
  }
}