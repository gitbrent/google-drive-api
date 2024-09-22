// src/App.tsx
import React, { useEffect } from 'react'
import { gapi } from 'gapi-script'
import { initClient } from './services/googleApi'
import { AuthProvider } from './context/AuthContext'
import MainPage from './components/MainPage'

const App: React.FC = () => {
	useEffect(() => {
		const start = () => {
			gapi.load('client:auth2', initClient);
		};
		gapi.load('client:auth2', start);
	}, []);

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
