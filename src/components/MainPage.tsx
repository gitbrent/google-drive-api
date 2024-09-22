// src/components/MainPage.tsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createFile } from '../services/googleApi';

const MainPage: React.FC = () => {
	const { isSignedIn, signIn, signOut } = useContext(AuthContext);

	const handleCreateFile = async () => {
		try {
			const response = await createFile('Sample.txt', 'Hello, Google Drive!');
			console.log('File Created:', response);
		} catch (error) {
			console.error('Error Creating File:', error);
		}
	};

	return (
		<section>
			{isSignedIn ? (
				<>
					<button
						type='button'
						className='btn btn-lg bg-success me-3'
						onClick={handleCreateFile}
					>
						Create File
					</button>
					<button type='button' className='btn btn-lg bg-danger' onClick={signOut}>Sign Out</button>
				</>
			) : (
				<button type='button' className='btn btn-lg bg-success' onClick={signIn}>Sign In with Google</button>
			)}
		</section>
	);
};

export default MainPage;
