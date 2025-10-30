# Car Rental App - Peer-to-Peer Car Sharing Platform

A modern peer-to-peer car rental platform built with React, Vite, Tailwind CSS, and Firebase. This application allows users in Turkey to rent cars directly from individual car owners, not from rental companies.

## Features

- Multi-language support (Turkish, English, Russian, Arabic)
- Modern, responsive UI built with Tailwind CSS
- Firebase integration for backend services
- Fast development with Vite
- Easy deployment to Firebase Hosting

## Tech Stack

- **Frontend**: React 19 with JSX
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Internationalization**: i18next & react-i18next
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Hosting**: Firebase Hosting

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure Firebase:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use an existing one
   - Enable Authentication, Firestore, and Storage
   - Copy your Firebase configuration
   - Update `src/firebase.js` with your Firebase credentials

3. Update Firebase project ID:
   - Edit `.firebaserc` and replace `your-project-id` with your actual Firebase project ID

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Firebase Deployment

### First Time Setup

1. Install Firebase CLI globally:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
npm run firebase:login
```

3. Initialize Firebase (if needed):
```bash
npm run firebase:init
```

### Deploy to Firebase

Deploy your app to Firebase Hosting:

```bash
npm run deploy
```

This command will:
1. Build the production version of your app
2. Deploy it to Firebase Hosting

Your app will be available at: `https://your-project-id.web.app`

## Project Structure

```
car-rental-app/
├── src/
│   ├── components/         # React components
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── locales/           # Translation files
│   │   ├── tr/           # Turkish
│   │   ├── en/           # English
│   │   ├── ru/           # Russian
│   │   └── ar/           # Arabic
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Entry point
│   ├── i18n.js           # i18n configuration
│   ├── firebase.js       # Firebase configuration
│   └── index.css         # Global styles
├── public/               # Static assets
├── firebase.json         # Firebase configuration
├── .firebaserc          # Firebase project settings
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run deploy` - Build and deploy to Firebase
- `npm run firebase:login` - Login to Firebase CLI
- `npm run firebase:init` - Initialize Firebase project

## Language Support

The app supports four languages:
- **Turkish (TR)** - Default language
- **English (EN)**
- **Russian (RU)**
- **Arabic (AR)**

Users can switch languages using the language selector in the top-right corner.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is private and proprietary.

## Support

For support, please contact the development team.
