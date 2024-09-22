// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { gapi } from 'gapi-script';

interface AuthContextProps {
	isSignedIn: boolean;
	signIn: () => void;
	signOut: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
	isSignedIn: false,
	signIn: () => { },
	signOut: () => { },
});

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

	useEffect(() => {
		const auth = gapi.auth2.getAuthInstance();
		if (auth) {
			setIsSignedIn(auth.isSignedIn.get());
			auth.isSignedIn.listen(setIsSignedIn);
		}
	}, []);

	const signIn = () => {
		gapi.auth2.getAuthInstance().signIn();
	};

	const signOut = () => {
		gapi.auth2.getAuthInstance().signOut();
	};

	return (
		<AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};