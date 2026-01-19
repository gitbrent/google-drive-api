// src/services/googleApi.ts
import { gapi } from 'gapi-script'

export const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
export const DISCOVERY_DOCS = ['https://content.googleapis.com/discovery/v1/apis/drive/v3/rest']

export const initGapiClient = async () => {
	// 1. Initialize the client with ONLY the API key first
	await gapi.client.init({
		apiKey: API_KEY,
	})

	// 2. Load the Drive API (v3) explicitly
	// This is more robust than passing discoveryDocs to init()
	try {
		await gapi.client.load('drive', 'v3')
		console.log('GAPI: Drive API v3 loaded')
	} catch (error) {
		console.error('Error loading Drive API. Check your API Key permissions.', error)
		throw error
	}
}

// IMPORTANT: Before making calls, ensure GAPI has the latest token from GIS
// gapi.client.setToken({ access_token: getAccessToken() });

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

export const createFile = async (name: string, content: string) => {
	try {
		const boundary = 'foo_bar_baz'
		const delimiter = '\r\n--' + boundary + '\r\n'
		const close_delim = '\r\n--' + boundary + '--'

		const contentType = 'text/plain'
		const metadata = {
			name: name,
			mimeType: contentType,
		}

		const multipartRequestBody =
			delimiter +
			'Content-Type: application/json\r\n\r\n' +
			JSON.stringify(metadata) +
			delimiter +
			'Content-Type: ' +
			contentType +
			'\r\n\r\n' +
			content +
			close_delim

		const response = await gapi.client.request({
			path: '/upload/drive/v3/files',
			method: 'POST',
			params: { uploadType: 'multipart' },
			headers: {
				'Content-Type': 'multipart/related; boundary="' + boundary + '"',
			},
			body: multipartRequestBody,
		})

		return response.result
	} catch (error) {
		console.error('Error creating file:', error)
		throw new Error('Failed to create file in Google Drive.')
	}
}
