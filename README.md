# Google Drive API Integration using React + TypeScript

This project is a React application built with Vite and TypeScript, integrating with the Google Drive API to read and write files.

## Table of Contents

- [Google Drive API Integration using React + TypeScript](#google-drive-api-integration-using-react--typescript)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Screencaps](#screencaps)
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
  - [index.html Script Configuration](#indexhtml-script-configuration)
  - [Project Structure](#project-structure)
  - [Available Scripts](#available-scripts)
  - [Additional Configuration](#additional-configuration)
    - [Environment Variables](#environment-variables)
    - [Using Bootstrap (Optional)](#using-bootstrap-optional)
  - [Expanding the ESLint Configuration](#expanding-the-eslint-configuration)
  - [License](#license)
  - [Troubleshooting and Tips](#troubleshooting-and-tips)
    - [Google Identity Services \& API Scripts](#google-identity-services--api-scripts)
    - [General Troubleshooting](#general-troubleshooting)

---

## Introduction

This application demonstrates how to integrate the Google Drive API into a React application built with Vite and TypeScript. It allows users to authenticate with Google, create files, and list files in their Google Drive.

**Authentication Method**: This project uses the **Google Identity Services (GIS)** library for OAuth 2.0 authentication (upgraded from the legacy Google API client library). The required scripts are loaded in the `index.html` file and must be included in any project implementing this authentication/service pattern.

## Screencaps

![Screenshot 1](https://github.com/user-attachments/assets/d7de12e5-396c-4c3a-bb6e-4a2145f8dcc0)
![Screenshot 2](https://github.com/user-attachments/assets/c18a35d2-4a86-4519-a85a-64214212d106)

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

**Important**: This project uses **Google Identity Services (GIS)** for authentication. Before setting up credentials, ensure that both the GIS and Google API scripts are included in your project's `index.html` file (see [index.html Script Configuration](#indexhtml-script-configuration) below).

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

## index.html Script Configuration

**Critical Step**: This project requires two external Google scripts to be included in your `index.html` file. These scripts must be present for authentication and API operations to function correctly.

In the `<head>` section of your `index.html`, include:

```html
<!-- Google Identity Services (GIS) - Required for OAuth 2.0 Authentication -->
<script src="https://accounts.google.com/gsi/client" async defer></script>

<!-- Google API Client Library - Required for Google Drive API Operations -->
<script src="https://apis.google.com/js/api.js" async defer></script>
```

**Important**: If you're implementing this authentication/service pattern in another project, you **must** include these exact script tags in your project's `index.html` file. Without these scripts, authentication will fail and API operations will not work.

---

## Project Structure

```
your-project/
├── .env
├── .gitignore
├── index.html                 ⚠️  Contains GIS and GAPI scripts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── (optional static assets)
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── services/
    │   ├── auth.ts            (GIS authentication logic)
    │   └── googleApi.ts       (Google Drive API operations)
    ├── context/
    │   ├── AuthContext.ts     (Authentication state type definitions)
    │   └── AuthProvider.tsx   (Authentication state management)
    ├── components/
    │   └── MainPage.tsx
    ├── types/
    │   └── DriveFile.ts
    ├── assets/
    └── styles/
```

- **`index.html`**: ⚠️ **Critical** - Contains the required Google Identity Services and Google API scripts. Any project using this authentication pattern must include these scripts.
- **`src/main.tsx`**: Entry point of the React application.
- **`src/App.tsx`**: Root component that initializes authentication and wraps the application with `AuthProvider`.
- **`src/services/auth.ts`**: Contains GIS authentication logic and user sign-in/sign-out functions.
- **`src/services/googleApi.ts`**: Contains functions to initialize the Google API client and interact with Google Drive (e.g., `loadGoogleAPIs`, `createFile`, `listFiles`).
- **`src/context/AuthContext.ts`**: Defines TypeScript types for authentication state.
- **`src/context/AuthProvider.tsx`**: Implements React Context for managing authentication state across the app.
- **`src/components/MainPage.tsx`**: Main component where users interact with the app, including signing in/out and performing file operations.
- **`src/types/DriveFile.ts`**: TypeScript interfaces and types for Google Drive file objects and API responses.
- **`src/styles/`**: Directory for styling files (CSS).
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

### Environment Variables

Make sure your `.env` file is properly configured with your Google credentials:

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_GOOGLE_API_KEY=your-google-api-key
```

Restart your development server after updating environment variables for changes to take effect.

### Using Bootstrap (Optional)

This project includes Bootstrap for styling components. Bootstrap CSS is already installed as a dependency.

To use Bootstrap in your application, import the Bootstrap CSS in your `src/main.tsx` file:

```tsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

You can then use Bootstrap utility classes and components directly in your JSX.

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

### Google Identity Services & API Scripts

- **Scripts Not Loading**: If authentication fails or the Google API is unavailable, verify that both scripts in `index.html` are properly loaded. Check browser console for CORS or network errors.
- **Script Loading Order**: Ensure the GIS script (`https://accounts.google.com/gsi/client`) is loaded before attempting to use `window.google.accounts.id`.
- **Replication Required**: When implementing this pattern in a new project, **you must include both scripts in your `index.html` file**. Simply copying the service files is not sufficient.

### General Troubleshooting

- **Environment Variables**: Remember to restart your development server after changing environment variables.
- **OAuth Consent Screen**: If you encounter an "Unverified App" warning, you may need to publish your app or add test users in the OAuth consent screen settings.
- **API Quotas**: Monitor your API usage in the Google Cloud Console to ensure you stay within free tier limits.
- **Multiple Google Accounts**: If you're signed into multiple Google accounts, ensure you're granting permissions with the correct account.
- **CORS Issues**: Ensure that your `Authorized JavaScript origins` in the Google Cloud Console match the origin from which your app is served (e.g., `http://localhost:5173` for local development).

---

If you have any questions or need further assistance, feel free to open an issue or contact the maintainer.
