import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, User, onAuthStateChanged } from 'firebase/auth'
import React from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import { PhotoDrawer } from './components/PhotoDrawer'

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
      visibleElement = <PhotoDrawer />
    } else {
      visibleElement = <LoginForm handleSubmit={(email, password) => this.loginIn(email, password)} />
    }
    
    return (<div className="app">
      <h1>DQ Book Club</h1>
      {visibleElement}
    </div>)
  }
}

export default App
