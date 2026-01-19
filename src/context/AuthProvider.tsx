// src/context/AuthProvider.tsx
import React, { useState, useEffect, ReactNode } from 'react'
import { gapi } from 'gapi-script' // Still needed for gapi.client.setToken
import { AuthContext } from './AuthContext.ts'
import { initGIS, signIn as gisSignIn, signOut as gisSignOut } from '../services/auth'
import { initGapiClient } from '../services/googleApi'

interface AuthProviderProps {
	children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
	const [isInitialized, setIsInitialized] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const waitForGoogleLibraries = () => {
			return new Promise<void>((resolve, reject) => {
				let attempts = 0
				const maxAttempts = 50 // Wait up to 5 seconds

				const checkLibraries = () => {
					attempts++

					// Check if both gapi and google.accounts are available
					if (typeof gapi !== 'undefined' && typeof google !== 'undefined' && google.accounts) {
						resolve()
					} else if (attempts >= maxAttempts) {
						reject(new Error('Google libraries failed to load. Please check your internet connection and refresh the page.'))
					} else {
						setTimeout(checkLibraries, 100)
					}
				}

				checkLibraries()
			})
		}

		const initializeGoogleLibraries = async () => {
			try {
				// Wait for Google libraries to be available
				await waitForGoogleLibraries()

				// 1. Initialize the GAPI Client (for Drive API calls)
				// We do NOT pass clientId or scopes here anymore.
				await new Promise<void>(resolve => gapi.load('client', resolve))
				await initGapiClient()

				// 2. Initialize the GIS Client (for Login/Auth)
				// We pass a callback that runs whenever a user successfully logs in.
				initGIS(tokenResponse => {
					if (tokenResponse && tokenResponse.access_token) {
						// CRITICAL: Hand the token from GIS over to GAPI
						gapi.client.setToken({ access_token: tokenResponse.access_token })
						setIsSignedIn(true)
					}
				})

				setIsInitialized(true)
				setError(null)
			} catch (error) {
				console.error('Error initializing Google libraries:', error)
				const errorMessage = error instanceof Error ? error.message : 'Failed to initialize Google Services. Please refresh the page and try again.'
				setError(errorMessage)
				setIsInitialized(false)
			}
		}

		initializeGoogleLibraries()
	}, [])

	const signIn = () => {
		// This calls the function in auth.ts which triggers tokenClient.requestAccessToken()
		gisSignIn()
	}

	const signOut = () => {
		// Clear the token from GAPI and update state
		gapi.client.setToken(null)
		setIsSignedIn(false)

		// Optional: Revoke the token via GIS if you want a "hard" logout
		gisSignOut()
	}

	if (error) {
		return (
			<div style={{ padding: '20px', textAlign: 'center' }}>
				<div style={{
					backgroundColor: '#f8d7da',
					color: '#721c24',
					padding: '15px',
					borderRadius: '5px',
					marginBottom: '15px',
					border: '1px solid #f5c6cb'
				}}>
					<h3>⚠️ Initialization Error</h3>
					<p>{error}</p>
				</div>
				<button
					onClick={() => window.location.reload()}
					style={{
						padding: '10px 20px',
						backgroundColor: '#007bff',
						color: 'white',
						border: 'none',
						borderRadius: '5px',
						cursor: 'pointer',
						fontSize: '16px'
					}}
				>
					Reload Page
				</button>
			</div>
		)
	}

	if (!isInitialized) {
		return (
			<div style={{ padding: '20px', textAlign: 'center' }}>
				<div>Initializing Google Services...</div>
				<div style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
					This may take a few seconds
				</div>
			</div>
		)
	}

	return <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>{children}</AuthContext.Provider>
}
