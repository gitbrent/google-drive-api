/**
 * @file Google Drive API service module
 * @description Provides utility functions to interact with Google Drive API
 * including initializing the GAPI client, listing files, and creating files.
 */

export const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']

/**
 * Initializes the Google API client
 * @async
 * @function initGapiClient
 * @returns {Promise<void>}
 */
export const initGapiClient = async () => {
	await gapi.client.init({
		apiKey: API_KEY,
		discoveryDocs: DISCOVERY_DOCS,
	})
}

// IMPORTANT: Before making calls, ensure GAPI has the latest token from GIS
// gapi.client.setToken({ access_token: getAccessToken() });

/**
 * Lists files from Google Drive
 * @async
 * @function listFiles
 * @returns {Promise<gapi.client.drive.File[]>} Array of files from Google Drive
 * @throws {Error} When file retrieval fails
 */
export const listFiles = async (): Promise<gapi.client.drive.File[]> => {
	try {
		const response = await gapi.client.drive.files.list({
			pageSize: 10,
			fields: 'nextPageToken, files(id, name, mimeType)',
		})
		return response.result.files || []
	} catch (error) {
		console.error('Error listing files:', error)
		throw new Error('Failed to retrieve files from Google Drive.')
	}
}

/**
 * Creates a new file in Google Drive
 * @async
 * @function createFile
 * @param {string} name - The name of the file to create
 * @param {string} content - The content of the file
 * @returns {Promise<any>} The created file object from Google Drive API response
 * @throws {Error} When file creation fails
 */
export const createFile = async (name: string, content: string) => {
	try {
		const boundary = 'foo_bar_baz'
		const delimiter = `\r\n--${boundary}\r\n`
		const close_delim = `\r\n--${boundary}--`

		const contentType = 'text/plain'
		const metadata = {
			name: name,
			mimeType: contentType,
		}

		const multipartRequestBody =
			`${delimiter}Content-Type: application/json\r\n\r\n` +
			JSON.stringify(metadata) +
			`${delimiter}Content-Type: ${contentType}\r\n\r\n` +
			content +
			close_delim

		const response = await gapi.client.request({
			path: '/upload/drive/v3/files',
			method: 'POST',
			params: { uploadType: 'multipart' },
			headers: {
				'Content-Type': `multipart/related; boundary="${boundary}"`,
			},
			body: multipartRequestBody,
		})

		return response.result
	} catch (error) {
		console.error('Error creating file:', error)
		throw new Error('Failed to create file in Google Drive.')
	}
}
