import { signInWithEmailAndPassword, User, onAuthStateChanged } from 'firebase/auth'
import React from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import ContestNavigator from './components/ContestNavigator'
import { auth } from './services/firebaseServices'

type AppState = {
  loadingUser: boolean
  user?: User | null
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
      console.log(error)
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
    
    return (<div className="app">
      {visibleElement}
    </div>)
  }
}

export default App
