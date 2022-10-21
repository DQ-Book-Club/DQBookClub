import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, User } from 'firebase/auth'
import React from 'react'
import './App.css'
import LoginForm from './components/LoginForm'

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.FIREBASE_APP_ID,
  measurementId: import.meta.env.FIREBASE_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);

type AppState = {
  count: number
  user?: User
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {count:1 }
  }

  countUp(){
    this.setState({count:this.state.count + 1})
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
    const visibleElement = !!this.state.user ? 
      <p>Hello logged in {this.state.user.email}!</p> :
      <LoginForm handleSubmit={(email, password) => this.loginIn(email, password)} />
    
    return (<div className="App">
      <h1>DQ Book Club</h1>
      <div className="card">
        <button onClick={() => this.countUp()}>
          count is {this.state.count}
        </button>
        {visibleElement}
      </div>
    </div>)
  }
}

export default App
