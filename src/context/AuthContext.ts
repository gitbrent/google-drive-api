// src/context/AuthContext.ts
import { createContext } from 'react'

export interface AuthContextProps {
	isSignedIn: boolean
	signIn: () => void
	signOut: () => void
}

export const AuthContext = createContext<AuthContextProps>({
	isSignedIn: false,
	signIn: () => {},
	signOut: () => {},
})
