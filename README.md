# Google Drive API Integration using React + TypeScript

This project is a React application built with Vite and TypeScript, integrating with the Google Drive API to read and write files.

## Table of Contents

- [Google Drive API Integration using React + TypeScript](#google-drive-api-integration-using-react--typescript)
	- [Table of Contents](#table-of-contents)
	- [Introduction](#introduction)
	- [Prerequisites](#prerequisites)
	- [Getting Started](#getting-started)
		- [1. Clone the Repository](#1-clone-the-repository)
		- [2. Install Dependencies](#2-install-dependencies)
		- [3. Set Up Google API Credentials](#3-set-up-google-api-credentials)
			- [a. Create a New Project](#a-create-a-new-project)
			- [b. Enable the Google Drive API](#b-enable-the-google-drive-api)
			- [c. Configure the OAuth Consent Screen](#c-configure-the-oauth-consent-screen)
			- [d. Create OAuth 2.0 Client ID](#d-create-oauth-20-client-id)
			- [e. Obtain an API Key (Optional)](#e-obtain-an-api-key-optional)
		- [4. Create the `.env` File](#4-create-the-env-file)
		- [5. Run the Application](#5-run-the-application)
	- [Project Structure](#project-structure)
	- [Available Scripts](#available-scripts)
	- [Additional Configuration](#additional-configuration)
		- [Adding Bootstrap](#adding-bootstrap)
			- [1. Install Bootstrap and React Bootstrap](#1-install-bootstrap-and-react-bootstrap)
			- [2. Import Bootstrap CSS](#2-import-bootstrap-css)
			- [3. Use Bootstrap Components](#3-use-bootstrap-components)
	- [Expanding the ESLint Configuration](#expanding-the-eslint-configuration)
	- [License](#license)
	- [Troubleshooting and Tips](#troubleshooting-and-tips)

---

## Introduction

This application demonstrates how to integrate the Google Drive API into a React application built with Vite and TypeScript. It allows users to authenticate with Google, create files, and list files in their Google Drive.

## Screencaps
<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/d7de12e5-396c-4c3a-bb6e-4a2145f8dcc0" alt="Screenshot 1" width="400"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/c18a35d2-4a86-4519-a85a-64214212d106" alt="Screenshot 2" width="400"/>
    </td>
  </tr>
</table>

---

## Prerequisites

- **Node.js**: Version 14 or higher
- **npm**: Version 6 or higher
- **Google Account**: Required for setting up Google API credentials

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/gitbrent/google-drive-api.git
cd google-drive-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Google API Credentials

To use the Google Drive API, you need to set up a project in the Google Cloud Console and obtain OAuth 2.0 credentials.

#### a. Create a New Project

1. **Go to** the [Google Cloud Console](https://console.developers.google.com/).
2. **Sign in** with your Google account if you haven't already.
3. **Click** on the project dropdown at the top of the page and select **New Project**.
4. **Enter** a project name (e.g., `My React Drive App`) and **click** **Create**.

#### b. Enable the Google Drive API

1. **Navigate to** **APIs & Services > Library** in the left sidebar.
2. **Search for** **Google Drive API** in the search bar.
3. **Click** on **Google Drive API** from the search results.
4. **Click** on the **Enable** button.

#### c. Configure the OAuth Consent Screen

1. **Go to** **APIs & Services > OAuth consent screen**.
2. **Select** **External** for the user type and **click** **Create**.
3. **Fill out** the required fields:
   - **App Name**: Your application's name.
   - **User Support Email**: Your email address.
   - **Developer Contact Information**: Your email address.
4. **Click** **Save and Continue**.
5. **Scopes**: Click **Add or Remove Scopes**.
   - **Add** the following scope:
     - `https://www.googleapis.com/auth/drive.file`
6. **Click** **Update** and then **Save and Continue** through the remaining steps.
7. **Back on the OAuth consent screen**, make sure to **Publish** the app if required.

#### d. Create OAuth 2.0 Client ID

1. **Navigate to** **APIs & Services > Credentials**.
2. **Click** on **Create Credentials** and select **OAuth client ID**.
3. **Choose** **Web Application** as the application type.
4. **Enter** a name for the client (e.g., `React App Client`).
5. **Under** **Authorized JavaScript Origins**, **add**:
   - `http://localhost:5173` (adjust the port if your development server runs on a different port)
6. **Leave** **Authorized Redirect URIs** empty (unless specifically needed).
7. **Click** **Create**.
8. **Copy** the **Client ID** and **Client Secret**.

#### e. Obtain an API Key (Optional)

If your application requires an API key:

1. **In** **APIs & Services > Credentials**, **click** on **Create Credentials** and select **API key**.
2. **Copy** the generated **API Key**.

### 4. Create the `.env` File

Create a `.env` file in the root directory of your project to store environment variables.

```bash
touch .env
```

Add the following environment variables to your `.env` file:

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_GOOGLE_API_KEY=your-google-api-key
```

- **Replace** `your-google-client-id` with the **Client ID** obtained from the Google Cloud Console.
- **Replace** `your-google-api-key` with the **API Key** if you obtained one. If not using an API key, you can omit this line or leave it empty.

**Important**: Ensure that the `.env` file is included in your `.gitignore` file to prevent sensitive information from being committed to version control.

### 5. Run the Application

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to view the application.

---

## Project Structure

```
your-project/
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── index.html
└── src/
    ├── index.tsx
    ├── App.tsx
    ├── services/
    │   └── googleApi.ts
    ├── context/
    │   └── AuthContext.tsx
    ├── components/
    │   └── MainPage.tsx
    ├── types/
    │   └── DriveFile.ts
    ├── styles/
    │   └── (optional CSS/SCSS files)
    └── assets/
        └── (optional images or static assets)
```

- **`src/index.tsx`**: Entry point of the React application.
- **`src/App.tsx`**: Root component that initializes the Google API client and wraps the application with `AuthProvider`.
- **`src/services/googleApi.ts`**: Contains functions to initialize the Google API client and interact with Google Drive (e.g., `initClient`, `signIn`, `createFile`, `listFiles`).
- **`src/context/AuthContext.tsx`**: Implements React Context for managing authentication state across the app.
- **`src/components/MainPage.tsx`**: Main component where users interact with the app, including signing in/out and performing file operations.
- **`src/types/DriveFile.ts`**: TypeScript interfaces and types for Google Drive file objects and API responses.
- **`src/styles/`**: Directory for styling files (CSS/SCSS).
- **`src/assets/`**: Directory for static assets like images or fonts.

---

## Available Scripts

In the project directory, you can run:

- **`npm run dev`**: Runs the app in development mode with hot module replacement.
- **`npm run build`**: Builds the app for production.
- **`npm run preview`**: Serves the production build locally for preview.
- **`npm run lint`**: Lints the codebase using ESLint (if configured).
- **`npm run format`**: Formats the codebase using Prettier (if configured).

---

## Additional Configuration

### Adding Bootstrap

This project uses Bootstrap for styling components.

#### 1. Install Bootstrap and React Bootstrap

```bash
npm install bootstrap react-bootstrap
```

#### 2. Import Bootstrap CSS

In your `src/index.tsx` file, import the Bootstrap CSS:

```tsx
// src/index.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

#### 3. Use Bootstrap Components

You can now use Bootstrap components in your React application:

```tsx
// Example usage in a component
import React from 'react';
import { Button } from 'react-bootstrap';

const ExampleComponent: React.FC = () => {
  return <Button variant="primary">Click Me</Button>;
};

export default ExampleComponent;
```

---

## Expanding the ESLint Configuration

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- **Configure the top-level `parserOptions` property** like this:

  ```js
  // eslint.config.js
  export default {
    parserOptions: {
      project: ['./tsconfig.json'],
      tsconfigRootDir: __dirname,
    },
    // ...other configurations
  };
  ```

- **Replace** `eslint:recommended` with `plugin:@typescript-eslint/recommended` or `plugin:@typescript-eslint/recommended-requiring-type-checking` in your ESLint configuration.
- **Install `eslint-plugin-react`** and update the config:

  ```bash
  npm install --save-dev eslint-plugin-react
  ```

  ```js
  // eslint.config.js
  module.exports = {
    // ...other configurations
    plugins: ['react'],
    extends: [
      // ...other extends
      'plugin:react/recommended',
    ],
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
  ```

- **Optionally**, add `eslint-config-prettier` to disable ESLint rules that might conflict with Prettier:

  ```bash
  npm install --save-dev eslint-config-prettier
  ```

  ```js
  // eslint.config.js
  module.exports = {
    // ...other configurations
    extends: [
      // ...other extends
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'prettier',
    ],
  };
  ```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Troubleshooting and Tips

- **Environment Variables**: Remember to restart your development server after changing environment variables.
- **OAuth Consent Screen**: If you encounter an "Unverified App" warning, you may need to publish your app or add test users in the OAuth consent screen settings.
- **API Quotas**: Monitor your API usage in the Google Cloud Console to ensure you stay within free tier limits.
- **Multiple Google Accounts**: If you're signed into multiple Google accounts, ensure you're granting permissions with the correct account.
- **CORS Issues**: Ensure that your `Authorized JavaScript origins` in the Google Cloud Console match the origin from which your app is served.

---

If you have any questions or need further assistance, feel free to open an issue or contact the maintainer.
