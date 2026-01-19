// src/components/MainPage.tsx
import React, { useContext, useEffect, useState } from 'react'
import { createFile, listFiles } from '../services/googleApi'
import { AuthContext } from '../context/AuthContext.ts'

const MainPage: React.FC = () => {
	const { isSignedIn, signIn, signOut } = useContext(AuthContext)
	const [files, setFiles] = useState<gapi.client.drive.File[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (isSignedIn) {
			fetchFiles()
		} else {
			setFiles([])
		}
	}, [isSignedIn])

	const fetchFiles = async () => {
		setLoading(true)
		setError(null)
		try {
			const apiFiles = await listFiles()
			// Optionally filter out files without an ID
			const filesWithId = apiFiles.filter(file => file.id)
			setFiles(filesWithId)
		} catch (error) {
			console.error('Error fetching files:', error)
			setError('Failed to fetch files. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	const handleCreateFile = async () => {
		setError(null)
		try {
			const response = await createFile(`Sample_${new Date().toISOString()}.txt`, 'Hello, Google Drive!')
			console.log('File Created:', response)
			fetchFiles()
		} catch (error) {
			console.error('Error Creating File:', error)
			setError('Failed to create file. Please try again.')
		}
	}

	return (
		<section>
			{isSignedIn ? (
				<section>
					<div className="mb-4">
						<button type="button" className="btn btn-lg bg-success me-3" onClick={handleCreateFile}>
							Create File
						</button>
						<button type="button" className="btn btn-lg bg-danger" onClick={signOut}>
							Sign Out
						</button>
					</div>
					{error && (
						<div className="alert alert-danger" role="alert">
							{error}
							<button
								type="button"
								className="btn-close"
								onClick={() => setError(null)}
								aria-label="Close"
								style={{ float: 'right' }}></button>
						</div>
					)}
					<div>
						<h5>Your Files</h5>
						{loading ? (
							<div className="alert alert-primary">Loading files...</div>
						) : files.length > 0 ? (
							<ul>
								{files.map(file => {
									// Since we filtered out files without an ID, file.id should exist
									const fileId = file.id!
									const fileName = file.name || 'Unnamed File'
									const fileType = file.mimeType || 'Unknown Type'

									return (
										<li key={fileId}>
											{fileName} ({fileType})
										</li>
									)
								})}
							</ul>
						) : (
							<div className="alert alert-warning">No files found.</div>
						)}
					</div>
				</section>
			) : (
				<button type="button" className="btn btn-lg bg-success" onClick={signIn}>
					Sign In with Google
				</button>
			)}
		</section>
	)
}

export default MainPage
