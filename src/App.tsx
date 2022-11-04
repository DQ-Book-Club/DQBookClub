import { signInWithEmailAndPassword, User, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import ContestNavigator from './components/ContestNavigator'
import { auth } from './services/firebaseServices'

function App() {
  const [loadingUser, setLoadingUser] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoadingUser(false)
      setUser(user)
    })
  }, [])

  async function login(email: string, password: string) {
    console.log(email, password)
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      setUser(user)
    } catch (error) {
      console.log(error)
    }
  }
  
  let visibleElement: JSX.Element;
  if (loadingUser) {
    visibleElement = <p>Loading...</p>
  } else if (user) {
    visibleElement = <ContestNavigator />
  } else {
    visibleElement = <LoginForm handleSubmit={login} />
  }
  
  return (
    <div className="app">
      {visibleElement}
    </div>
  )
}

export default App
