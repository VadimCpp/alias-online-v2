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

## Automatic deployment

The website is being deployed automatically on `git push`. See file `.github/workflows/azure-deploy.yml` for more details.

For security reasons, you should store your Azure Storage connection string, storage account and container name as a secrets in your GitHub repository. To add this secret, go to your repository settings, then "Secrets," and create a new secrets with the corresponding names.

## Demo

![image](https://github.com/VadimCpp/alias-online-v2/assets/4641125/5a89ef7d-0a6f-4585-8a1c-357f238aa8cc)
