
# OrthoBien-Etre
  

## Description

  

OrthoBien-Etre est une application e-commerce avec le MERN stack (MongoDB, Express.js, React, Node.js).

Elle permet une expérience utilisateur client intuitive pour parcourir les produits, effectuer des achats et gérer le panier. Elle permet aussi une expérience utilisateur en tant qu'administrateur pour gérer le stock disponible à la vente.

L'hébergement du frontend se fait avec Cloudfare, le backend avec Render et la base de données avec MongoDB.

  

# Installation

1. Clonez le dépôt :

```bash

git  clone  https://github.com/INM5001-A23/OrthoBien-Etre.git

```

  

2. Accédez au répertoire du projet :

```bash

cd  nom-du-projet

```

3. Lire les READMEs du frontend et du backend pour la suite


## Fonctionnalités

  

- Affichage des produits phares, les diverses catégories de produits et les promotions en cours.

- Affichage des produits disponibles, répartis en catégories.

- Barre de recherche accessible dans la barre de navigation permettant de trouver rapidement des produits.

- Tri des produits selon différents filtres et/ou critères (prix ascendant/descendant, produits en promotion).

- Affichage des produits avec une description approfondie, la possibilité d'ajouter le produit au panier et de faire un achat rapide.

- Gestion du panier, ajuster la quantité des produits ajouter, en supprimer, voir le total à payer et passer à la procédure de paiement de façon sécurisée.

- L’utilisateur client peut s'inscrire et se connecter pour suivre ses commandes et accéder à ses informations.

- Accès à une interface simplifiée pour que l'administrateur puisse ajouter, supprimer ou modifier des produits (par exemple, appliquer une promotion) dans la base de données/catalogue de produits.

- Page de contact dans laquelle il y a une section pour que les clients puissent contacter l'équipe du site pour des questions ou des retours.


## Captures d'écran

### Page accueil

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/b556214b-310e-438b-8171-95fd7e9404ed)

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/70a2fa15-b20f-40d2-90c0-4c3bdc71eba2)


### Barre de recherche

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/bdd1ce6f-dfa9-4b80-a13b-7cb11b85caef)


### Page catalogue

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/92157578-bdc7-4452-b36d-2b9a99784f0b)

### Page produit

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/e4f94492-340b-4273-b2d4-480799e76da2)

### Section commentaires client de la page produit

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/5dc024ba-0294-4ffa-88a8-9fbebb9a240b)

### Section création d'une évaluation client de la page produit avec utilisateur enregistré

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/3d4e831b-7eae-4595-88af-e89470eaef33)


### Page connexion

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/acf09e3a-dcb1-48f4-9a12-2103ac4e8e8d)


### Page inscription

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/288eebac-e474-4a07-87bc-1fc165ab97b1)


### Page panier

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/9e08e002-c381-42a6-ad4b-e8f60e10c80a)
  

### Page livraison

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/a81f6b9c-ef2a-4b0b-99a3-06fae5bd7f6b)


### Page récapitulatif de la commande

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/1b239934-4a52-4055-9f43-ad4d1ae2927e)

### Page confirmation de la commande

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/5954b892-0230-4099-9a1e-dab49a5ed58e)


### Page compte - profil
![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/2840739e-acda-4f46-845b-70dc694ebf0a)

### Page compte - historique des commandes

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/c4c8f21a-bccf-433e-8be1-9dc517ee8fa0)


### Page administrateur

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/9385f350-fb35-4ad3-8685-f90f6179172e)

### Page administrateur - Modification d'un produit

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/3f41c9b0-7c25-4938-83c2-54415d3ddbeb)

### Page administrateur - Ajout d'un produit

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/41c5aa9b-f17c-4719-9fb1-3adbf9e06765)

### Page administrateur - Suppression d'un produit

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/f521bf63-b5e7-458a-a555-20d687ccd931)


### Page F.A.Q.

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/f7149783-9dd8-4bb7-9a91-a75e2d9264bc)
  

### Page contact

![image](https://github.com/INM5001-A23/OrthoBien-Etre/assets/106025922/875614a3-d84e-4aed-9858-08878a774366)



### N.B.
- L'ajout d'un grand nombre de photos peut causer une instabilité au niveau des requêtes HTTP dans le backend dû à une limitation du forfait gratuit de MongoDB que nous utilisons.


## Auteurs

- [Desjardins, Milène]

- [Dramé, Souadou]

- [Exumé, Daisy]

- [Exumé, Dany]

- [Tatari, Nawal]
