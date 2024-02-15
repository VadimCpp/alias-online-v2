# Firebase Guide

## Introduction

This guide will help you configure your application for a production or development environment in Firebase.

## Prerequisites

- [Firebase CLI](https://firebase.google.com/docs/cli)
- Firebase account

## Table of contents

1. Check if you have Firebase CLI installed
2. Login to Firebase
3. Create a new project
4. Add Firebase to your app
5. Enable Authentication
6. Enable Firestore
7. Update Security Rules
8. Create rooms collection
9. Authorize domain

## 1. Check if you have Firebase CLI installed

Check if you have Firebase CLI installed, run the following command:

```bash
firebase --version
```

If you don't have Firebase CLI installed, follow the instructions on the [official website](https://firebase.google.com/docs/cli).

## 2. Login to Firebase

To login to Firebase, run the following command:

```bash
firebase login
```

If you don't have a Firebase account, you can create a new one on the [official website](https://firebase.google.com/).

## 3. Create a new project

Do the following steps:

- To Firebase Console https://console.firebase.google.com/ and create a new project;
- Choose a proper name for the project. E.g. "alias-online";
- Disable Google Analytics for the project.

List all projects using console:

```bash	
firebase projects:list
```

Ensure the project was created.

## 4. Add Firebase to your app

Do the following steps:

- Choose "Add Firebase to your web app";
- Do not enanble Firebase Hosting;
- Update the file `src/firebase.js` with web app's Firebase configuration.

## 5. Enable Authentication

Do the following steps:

- Go to "Authentication" section in Firebase Console;
- Enable "Google" provider sign-in method.

## 6. Enable Firestore

Do the following steps:

- Go to "Firestore" section in Firebase Console;
- Create a new Firestore database;
- Choose suitable location;
- Choose "Start in production mode" for the database.

## 7. Update Security Rules

Update the security rules for Firestore database:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /rooms/{roomId} {
      allow read, write: if request.auth != null;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## 8. Create rooms collection

Create a new collection "rooms" in Firestore database.
Create a blank document in the collection: "norsk-room".
Set the following fields for the document:
- uid: "norsk-room".

## 9. Authorize domain

Go to "Authentication" section in Firebase Console and add your domain to "Authorized domains".

Add the following Azure domain to the list:
```
https://aliasstorageacc.z1.web.core.windows.net/
```

NOTE! The domain should be updated with the actual domain of your website. See the [Azure Guide](azure-guide.md) for more information.

## Conclusion

In this guide, you have learned how to configure your application for a production or development environment in Firebase. You have created a new project, added Firebase to your app, enabled Authentication and Firestore, updated security rules, created a new collection in Firestore, and authorized your domain.
