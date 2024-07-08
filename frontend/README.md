# OrthoBien-Etre-Frontend

## Installation

1. Accédez au répertoire frontend du projet :

```bash
    cd .\frontend\
```

2. Installer les dépendances

```bash
   npm install
```

    - Dépoendances:
        - @paypal/react-paypal-js: ^8.1.3,
        - @testing-library/jest-dom: ^5.17.0,
        - @testing-library/react: ^13.4.0,
        - @testing-library/user-event: ^13.5.0,
        - axios: ^1.5.1,
        - bootstrap: ^5.3.2,
        - jwt-decode: ^4.0.0,
        - localforage: ^1.10.0,
        - match-sorter: ^6.3.1,
        - react: ^18.2.0,
        - react-bootstrap: ^2.9.0,
        - react-bootstrap-icons: ^1.10.3,
        - react-bootstrap-validation: ^0.1.11,
        - react-dom: ^18.2.0,
        - react-hook-form: ^7.48.2,
        - react-icons: ^4.11.0,
        - react-router-dom: ^6.16.0,
        - react-scripts: ^5.0.1,
        - react-toastify: ^9.1.3,
        - sort-by: ^0.0.2,
        - web-vitals: ^2.1.4

3. Démarrer le serveur

```bash
    npm start
```

4. Accédez à l'application dans votre navigateur : http://localhost:3000

## Déploiement

Pour déployer l'application en production, utilisez la commande:

```bash
    npm run build
```

## Configuration

1. Copiez le fichier `.env.example` et renommez-le en `.env`.

## Structure du Projet

    `/public`: Contient les fichiers statiques.
    `/src`: Contient le code source de l'application.
        `/components`: Composants précis réutilisables.
        `/layout`: Composants apparaissants sur chaque page de l'application.
        `/pages`: Composants représantants chaque page.
        `/utils`: Éléments autres.
