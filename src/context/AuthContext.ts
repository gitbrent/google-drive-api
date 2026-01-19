/**
 * @file Authentication Context
 * @description Defines the authentication context and types for managing authentication state
 * across the application.
 */

import { createContext } from 'react'

/**
 * Authentication context properties
 * @interface AuthContextProps
 * @property {boolean} isSignedIn - Whether the user is currently signed in
 * @property {Function} signIn - Function to initiate sign-in
 * @property {Function} signOut - Function to sign out the user
 */
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
