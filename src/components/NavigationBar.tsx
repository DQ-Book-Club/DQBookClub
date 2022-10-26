import { getAuth, signOut } from "firebase/auth"
import { Component } from "react"
import LoginForm from "./LoginForm"
import LogoutButton from "./LogoutButton"

type NavigationBarProps = {
  login: (email: string, password: string) => void
}

type NavigationBarState = {
}

export default class NavigationBar extends Component<NavigationBarProps, NavigationBarState> {
    constructor(props: NavigationBarProps) {
      super(props)
    }

    isLoggedIn() {
      return getAuth().currentUser != null
    }

    render() {
        let authComponent;
        if (this.isLoggedIn()) {
          authComponent = <LogoutButton />
        } else {
          authComponent = <LoginForm handleSubmit={this.props.login} />
        }

        return (
          <nav>
              <a href="/">DQ Book Club</a>
              {authComponent}
           </nav>
        )
    }
}
