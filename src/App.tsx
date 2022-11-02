import { signInWithEmailAndPassword, User, onAuthStateChanged, AuthError } from 'firebase/auth'
import React from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import ContestNavigator from './components/ContestNavigator'
import { auth } from './services/firebaseServices'

type AppState = {
  loadingUser: boolean
  user?: User | null
  error?: string
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props)
    this.state = { loadingUser: true }
  }


  componentDidMount(): void {
    onAuthStateChanged(auth, (user) => {
      this.setState({ user, loadingUser: false })
    })
  }

  async loginIn(email: string, password: string) {
    console.log(email, password)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      this.setState({user: userCredential.user })
    } catch (error) {
      let authError = error as AuthError
      console.log(error)
      this.setState({error: "Please make sure E-Mail and Password are spelled correctly."})
    }
  }
  
  render() {
    let visibleElement: JSX.Element;
    if (this.state.loadingUser) {
      visibleElement = <p>Loading...</p>
    } else if (this.state.user) {
      visibleElement = <ContestNavigator />
    } else {
      visibleElement = <LoginForm handleSubmit={(email, password) => this.loginIn(email, password)} />
    }

    // https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
    let errorMessage: JSX.Element;
    
    
    
    
    return (<div className="app">
      {visibleElement}
       {this.state.error && <p className='error'>
            {this.state.error}
        </p>}
    </div>)
  }
}

export default App
