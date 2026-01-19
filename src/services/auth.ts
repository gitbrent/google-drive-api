// src/services/auth.ts
// We no longer import 'gapi-script' for Auth, we use the global google object
// You might need to install @types/google.accounts

export const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
export const SCOPES = 'https://www.googleapis.com/auth/drive.file'

let tokenClient: google.accounts.oauth2.TokenClient
let accessToken: string | null = null

export const initGIS = (callbackTc: (nR: google.accounts.oauth2.TokenResponse) => void) => {
	try {
		if (!google || !google.accounts || !google.accounts.oauth2) {
			throw new Error('Google Identity Services not available');
		}

		tokenClient = google.accounts.oauth2.initTokenClient({
			client_id: CLIENT_ID, // Used here!
			scope: SCOPES,
			callback: (response) => {
				if (response.error) {
					console.error('Token client error:', response.error);
					return;
				}
				if (response.access_token) {
					accessToken = response.access_token
				}
				callbackTc(response)
			},
		})
	} catch (error) {
		console.error('Failed to initialize Google Identity Services:', error);
		throw error;
	}
}
export const signIn = () => {
	// GIS triggers the popup
	if (tokenClient) tokenClient.requestAccessToken()
}

export const signInWithConsent = () => {
	if (tokenClient) tokenClient.requestAccessToken({ prompt: 'consent' })
}

export const signOut = () => {
	if (accessToken) {
		google.accounts.oauth2.revoke(accessToken, () => {
			console.log('Access token revoked')
		})
		accessToken = null
	}
}

export const getAccessToken = () => accessToken
