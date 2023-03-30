import { updateEmail, updatePassword } from 'firebase/auth'
import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
const AuthContext = React.createContext()



export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, pasword) {

      return auth.createUserWithEmailAndPassword(email, pasword)
    }   

    function login(email, password) {
      return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
     return auth.signOut()
    }

    function resetPassword(email) {
      return auth.sendPasswordResetEmail(email)
    }

    function emailChange(email) {
      return updateEmail(currentUser, email)
    }
  
    function passwordChange(password) {
      return updatePassword(currentUser, password)
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user)
          setLoading(false)
            
        })
             return unsubscribe
        }, [])
    

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        emailChange,
        passwordChange
    }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
