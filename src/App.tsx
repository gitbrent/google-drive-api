import React from 'react'
import { AuthProvider } from './context/AuthProvider'
import MainPage from './components/MainPage'

const App: React.FC = () => {
	return (
		<main className="container my-5">
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
	)
}

export default App
