# Azure Guide

## Introduction

This guide will help you deploy your application to a production environment in Azure.

## Prerequisites

- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- Azure account

## Table of contents

1. Check if you have Azure CLI installed
2. Login to Azure
3. Create a new resourge group
4. Create a new storage account for hosting the website
5. Deploy the website
6. Test all together

## 1. Check if you have Azure CLI installed

To check if you have Azure CLI installed, run the following command:

```bash
az --version
```

If you don't have Azure CLI installed, follow the instructions on the [official website](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).

## 2. Login to Azure

To check if a user is logged in with the Azure CLI, run the following command:

```bash
az account show
```

To login to Azure, run the following command:

```bash
az login
```

If you don't have an Azure account, you can create a new one on the [official website](https://azure.microsoft.com/en-us/free/).

## 3. Create a new resourge group

To list all resource groups, run the following command:

```bash
az group list --output table
```

To create a new resource group, run the following command:

```bash
az group create --name alias-online --location norwayeast
```

This command will create a new resource group with the name `alias-online` in the location `norwayeast`.

## 4. Create a new storage account for hosting the website

Create new storage account:

```bash
az storage account create --name aliasstorageacc --resource-group alias-online --location norwayeast --sku Standard_LRS 
```

This command will create a new storage account with the name `aliasstorageacc` in the resource group `alias-online` in the location `norwayeast` with the SKU `Standard_LRS`.

Enable Static Website Hosting:

```bash
az storage blob service-properties update --account-name aliasstorageacc --static-website --index-document index.html
```

List all containers in the storage account:

```bash
az storage container list --account-name aliasstorageacc --output table
```

Ensure that the `$web` container is created.

## 5. Deploy the website

Build the website:

```bash
npm run build
```

Upload the website to the container:

```bash
az storage blob upload-batch --destination '$web' --type block --pattern '**' --account-name 'aliasstorageacc' --source dist
```

Delete the website from the container:

```bash
az storage blob delete-batch --source '$web' --account-name 'aliasstorageacc'
```

## 6. Test all together

See the endpoint for the website:

```bash
az storage account show --name aliasstorageacc --query "primaryEndpoints.web" --output tsv
```

Open https://aliasstorageacc.z1.web.core.windows.net/ in your browser.

## Conclusion

In this guide, you have learned how to deploy your application to a production environment in Azure. You have created a new resource group, a new storage account for hosting the website, and deployed the website. You have also tested the website to ensure that it is working as expected.

## Next steps

Go to the [Firebase Guide](firebase-guide.md) to set up Firebase Cloud Firestore.
