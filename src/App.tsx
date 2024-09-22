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
			<h2>Google Drive API Testbed</h2>
			<section className='bg-primary-subtle p-4 my-4'>
				<h5 className="mb-0">LFG!</h5>
			</section>
			<h5>AuthProvider</h5>
			<section className='bg-success-subtle p-4 mt-4'>
				<AuthProvider>
					<MainPage />
				</AuthProvider>
			</section>
		</main>
	);
};

export default App;
