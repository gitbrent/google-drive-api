/// <reference types="gapi.client.drive" />
import { gapi } from 'gapi-script';

export const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const DISCOVERY_DOCS = [
	'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
];

export const SCOPES = 'https://www.googleapis.com/auth/drive.file';

export const initClient = () => {
	return gapi.client
		.init({
			apiKey: API_KEY,
			clientId: CLIENT_ID,
			discoveryDocs: DISCOVERY_DOCS,
			scope: SCOPES,
		})
		.then(
			() => {
				console.log('GAPI client initialized.');
			},
			(error) => {
				console.error('Error initializing GAPI client:', error);
			}
		);
};

export const signIn = () => {
	return gapi.auth2.getAuthInstance().signIn();
};

export const signOut = () => {
	return gapi.auth2.getAuthInstance().signOut();
};
/*
const getCurrentScopes = () => {
	const authInstance = gapi.auth2.getAuthInstance();
	if (authInstance) {
		const currentUser = authInstance.currentUser.get();
		const scopes = currentUser.getGrantedScopes();
		console.log('Granted Scopes:', scopes);
	}
};
*/

export const createFile = async (name: string, content: string) => {
	// getCurrentScopes() // DEBUG: ensure scopes!

	try {
		const boundary = '-------314159265358979323846';
		const delimiter = `\r\n--${boundary}\r\n`;
		const closeDelimiter = `\r\n--${boundary}--`;

		const metadata = {
			name,
			mimeType: 'text/plain',
		};

		const multipartRequestBody =
			delimiter +
			'Content-Type: application/json\r\n\r\n' +
			JSON.stringify(metadata) +
			delimiter +
			'Content-Type: text/plain\r\n\r\n' +
			content +
			closeDelimiter;

		const response = await gapi.client.request({
			path: '/upload/drive/v3/files',
			method: 'POST',
			params: {
				uploadType: 'multipart',
			},
			headers: {
				'Content-Type': `multipart/related; boundary="${boundary}"`,
			},
			body: multipartRequestBody,
		});

		return response;
	} catch (error) {
		console.error('Error creating file:', error);
		throw error;
	}
};

// Additional API methods (e.g., readFile, updateFile, deleteFile)

export const listFiles = async (): Promise<gapi.client.drive.File[]> => {
	try {
		const response = await gapi.client.drive.files.list({
			pageSize: 100,
			fields: 'files(id, name, mimeType)',
		});

		const files = response.result.files;
		return files || [];
	} catch (error) {
		console.error('Error fetching files:', error);
		throw error;
	}
};
