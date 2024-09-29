import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { AuthProvider } from './context/AuthContext';
import MainPage from './components/MainPage';
import { initClient } from './googleApiModule';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

const App: React.FC = () => {
	const [gapiInitialized, setGapiInitialized] = useState<boolean>(false);

	useEffect(() => {
		const start = () => {
			initClient({
				apiKey: API_KEY,
				clientId: CLIENT_ID,
				discoveryDocs: DISCOVERY_DOCS,
				scope: SCOPES,
			}).then(() => {
				setGapiInitialized(true);
			});
		};
		gapi.load('client:auth2', start);
	}, []);

	if (!gapiInitialized) {
		return <div>Loading...</div>;
	}

	return (
		<main>
			<h1>Google Drive API</h1>

			<div className="card text-bg-success my-5">
				<div className="card-body">
					<h5 className="card-title">Demo Portal</h5>
					<p className="card-text">Modern implementation of Google Drive API v3 using React &amp; TypeScript.</p>
				</div>
			</div>

			<div className="card my-5">
				<div className="card-header text-bg-primary">
					<h5 className="mb-0">Drive API Component</h5>
				</div>
				<div className="card-body bg-primary-subtle p-4">
					<AuthProvider>
						<MainPage />
					</AuthProvider>
				</div>
			</div>
		</main>
	);
};

export default App;
