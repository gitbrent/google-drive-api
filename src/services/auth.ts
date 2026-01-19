/**
 * @file Google Identity Services authentication module
 * @description Provides authentication functionality using Google Identity Services (GIS).
 * We use the global google object for Auth instead of 'gapi-script'.
 * You might need to install @types/google.accounts
 */

export const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
export const SCOPES = 'https://www.googleapis.com/auth/drive.file'

let tokenClient: google.accounts.oauth2.TokenClient
let accessToken: string | null = null

/**
 * Initializes Google Identity Services with token client
 * @function initGIS
 * @param {Function} callbackTc - Callback function to handle token response
 * @returns {void}
 * @throws {Error} When Google Identity Services is not available
 */
export const initGIS = (callbackTc: (nR: google.accounts.oauth2.TokenResponse) => void) => {
	try {
		if (!google || !google.accounts || !google.accounts.oauth2) {
			throw new Error('Google Identity Services not available')
		}

		tokenClient = google.accounts.oauth2.initTokenClient({
			client_id: CLIENT_ID,
			scope: SCOPES,
			callback: response => {
				if (response.error) {
					console.error('Token client error:', response.error)
					return
				}
				if (response.access_token) {
					accessToken = response.access_token
				}
				callbackTc(response)
			},
		})
	} catch (error) {
		console.error('Failed to initialize Google Identity Services:', error)
		throw error
	}
}

/**
 * Initiates sign-in process
 * @function signIn
 * @returns {void}
 */
export const signIn = () => {
	// GIS triggers the popup
	if (tokenClient) tokenClient.requestAccessToken()
}

/**
 * Initiates sign-in process with consent prompt
 * @function signInWithConsent
 * @returns {void}
 */
export const signInWithConsent = () => {
	if (tokenClient) tokenClient.requestAccessToken({ prompt: 'consent' })
}

/**
 * Signs out the user and revokes the access token
 * @function signOut
 * @returns {void}
 */
export const signOut = () => {
	if (accessToken) {
		google.accounts.oauth2.revoke(accessToken, () => {
			console.log('Access token revoked')
		})
		accessToken = null
	}
}

/**
 * Retrieves the current access token
 * @function getAccessToken
 * @returns {string|null} The current access token or null if not authenticated
 */
export const getAccessToken = () => accessToken
