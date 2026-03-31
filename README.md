# Find My Apple

A secure wrapper around Apple's Find My service with biometric authentication, built with React + TypeScript + Capacitor for Android APK deployment.

## Features
- Face ID / Touch ID biometric authentication
- Secure navigation guard (blocks non-Apple domains)
- Interactive device map with live status
- Battery levels, coordinates, device actions
- Automated APK build via GitHub Actions

## Stack
- React 18 + TypeScript
- Vite
- Capacitor 6 (Android)
- Wouter (routing)
- GitHub Actions (CI/CD)

## Build APK
Every push to `main` triggers an automated APK build.
Download the latest APK from the [Releases](https://github.com/spacecityx/find-my-apple/releases) page.

## Development
```bash
npm install
npm run dev
```

## Manual APK Build
```bash
npm run build
npx cap sync android
cd android && ./gradlew assembleDebug
```

## License
MIT — free to use, fork, and distribute.