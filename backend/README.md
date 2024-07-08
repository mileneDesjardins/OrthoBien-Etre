# OrthoBien-Etre-Backend

## Installation

1. Accédez au répertoire frontend du projet :

```bash
    cd .\backend\
```

2. Installer les dépendances

```bash
   npm install
```

    - Dépendances:
        - @babel/plugin-proposal-private-property-in-object: ^7.21.11,
        - nodemon: ^3.0.1

3. Démarrer le serveur

```bash
    npm run start
```

4. Accédez à l'application dans votre navigateur : http://localhost:3300

## Déploiement

Pour déployer l'application en production, utilisez la commande:

```bash
    npm run build
```

## Configuration

1. Copiez le fichier `.env.example` et renommez-le en `.env`.

## Structure du Projet
    `index.js`: Application backend
    `/models` : Contient les modèles de la base de données.
    `/routes` : Contient les routes qui font la connection backend et frontend.

### Les routes
    - Admin: 
    - AjoutProduit: Gestion des ajout de produit par l'administrateur (Post)
    - Avis: Gestion des commentaires et notes des utilisateurs (Post)
    - Cart: Gestion du panier (Post, Get, Put)
    - Category: Retourne les categories (Get)
    - Connexion: Gestion de la connexion et de l'utilisateur et de l'admin (Post)
    - DeleteProduit: Effacer un produit par l'administrateur (Delete)
    - ModifierProduit: Modifier un produit (Post, Put)
    - Order: Gestion des commande (Post, Get)
    - Product: Gestion des produit (Post, Get)
    - Users: Gestion des utilisateurs (Post, Get, Put)




        

