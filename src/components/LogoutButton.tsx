import { getAuth, signOut } from "firebase/auth";
import { Component } from "react";

type LoginButtonProps = {
}

type LoginButtonState = {
}

export default class LoginButton extends Component<LoginButtonProps, LoginButtonState> {
    constructor(props: LoginButtonProps) {
      super(props)
    }

    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        console.log(error)
      });
    }

    render() {
      return (
        <button onClick={this.logout}>Logout</button>
      )
    }
}
