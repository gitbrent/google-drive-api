// src/App.tsx
import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { AuthProvider } from './context/AuthContext';
import MainPage from './components/MainPage';
import { CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES } from './services/googleApi';

const App: React.FC = () => {
	const [gapiInitialized, setGapiInitialized] = useState<boolean>(false);

	useEffect(() => {
		const initClient = () => {
			gapi.client
				.init({
					apiKey: API_KEY,
					clientId: CLIENT_ID,
					discoveryDocs: DISCOVERY_DOCS,
					scope: SCOPES,
				})
				.then(
					() => {
						console.log('GAPI client initialized.');
						setGapiInitialized(true);
					},
					(error) => {
						console.error('Error initializing GAPI client:', error);
					}
				);
		};

		gapi.load('client:auth2', initClient);
	}, []);

	if (!gapiInitialized) {
		return <div>Loading...</div>; // You can replace this with a loader/spinner
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
