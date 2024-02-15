# React + Redux + TypeScript + Vite + TailwindCSS + Azure + Firebase

> Visit the webpage: https://aliasonlinestorageacc.z1.web.core.windows.net/

Technology stack:

- react (react-router, Redux Toolkit with React)
- vite
- typescript
- TailwindCSS (headlessui, heroicons)
- Azure
- firebase (Cloud Firestore)

## Getting Starting

To start development, execute the following commands:

```bash
git clone https://github.com/VadimCpp/alias-online-v2.git
cd alias-online-v2
npm i
npm run dev
```

## Deployment

First time deployment takes some time. There are three general steps:

- prepare the images for the production
- set up and configure the Azure storage account
- set up Firebase Cloud Firestore

### Prepare the images for the production

Please download small size images 400x400 from the Google Drive:
https://drive.google.com/drive/u/1/folders/1lG3uV00T6dLdzMMW9iYUJIWrvuWYI4pb

Put the images into the `public/prod_images` folder.

NOTE! The images were generated with Midjorney AI. The images are not perfect, but they are good enough for the demo.

You might want to use your own images or get get image of the original size 1024x1024 and resize it to 400x400. In that case please check out `scripts/make_small_images.ps1` script. It uses ImageMagick to resize the images.

### Set up and configure the Azure storage account

Please follow the instructions in the `docs/azure-guide.md` file.

### Set up Firebase Cloud Firestore

Please follow the instructions in the `docs/firebase-guide.md` file.

## Dictionary demo

New image set empowered with Midjorney AI:

![Skjermbilde 2023-10-13 235949](https://github.com/VadimCpp/alias-online-v2/assets/4641125/7ee78b69-a953-44e8-9c6e-b4791ff73c5b)

Old school emoji:

![image](https://github.com/VadimCpp/alias-online-v2/assets/4641125/5a89ef7d-0a6f-4585-8a1c-357f238aa8cc)
