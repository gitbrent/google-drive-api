// src/components/MainPage.tsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createFile, listFiles } from '../services/googleApi';

const MainPage: React.FC = () => {
	const { isSignedIn, signIn, signOut } = useContext(AuthContext);
	const [files, setFiles] = useState<gapi.client.drive.File[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (isSignedIn) {
			fetchFiles();
		} else {
			setFiles([]);
		}
	}, [isSignedIn]);

	const fetchFiles = async () => {
		setLoading(true);
		try {
			const apiFiles = await listFiles();
			// Optionally filter out files without an ID
			const filesWithId = apiFiles.filter((file) => file.id);
			setFiles(filesWithId);
		} catch (error) {
			console.error('Error fetching files:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleCreateFile = async () => {
		try {
			const response = await createFile(`Sample_${new Date().toISOString()}.txt`, 'Hello, Google Drive!');
			console.log('File Created:', response);
		} catch (error) {
			console.error('Error Creating File:', error);
		}
	};

	return (
		<section>
			{isSignedIn ? (
				<section>
					<div className='mb-4'>
						<button type='button' className='btn btn-lg bg-success me-3' onClick={handleCreateFile}>Create File</button>
						<button type='button' className='btn btn-lg bg-danger' onClick={signOut}>Sign Out</button>
					</div>
					<div>
						<h5>Your Files</h5>
						{loading ? (
							<p>Loading files...</p>
						) : files.length > 0 ? (
							<ul>
								{files.map((file) => {
									// Since we filtered out files without an ID, file.id should exist
									const fileId = file.id!;
									const fileName = file.name || 'Unnamed File';
									const fileType = file.mimeType || 'Unknown Type';

									return (
										<li key={fileId}>
											{fileName} ({fileType})
										</li>
									);
								})}
							</ul>
						) : (
							<p>No files found.</p>
						)}
					</div>
				</section>
			) : (
				<button type='button' className='btn btn-lg bg-success' onClick={signIn}>Sign In with Google</button>
			)}
		</section>
	);
};

export default MainPage;
