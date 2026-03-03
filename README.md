# Projet Vieux Grimoire – API de gestion de livres

## Contexte

Le projet **Vieux Grimoire** consiste à développer une API sécurisée permettant la gestion d’une plateforme de notation de livres.

Ce projet a été réalisé dans le cadre de la formation Développeur Web chez OpenClassrooms.

La maison d’édition fictive « Le Vieux Grimoire » souhaite proposer un site où les utilisateurs peuvent consulter des livres, publier leurs propres ouvrages et attribuer des notes. L’enjeu principal est de concevoir une API robuste, sécurisée et conforme aux bonnes pratiques backend, tout en assurant la protection des données utilisateurs.

---

## Objectifs

- Développer une API REST complète en Node.js
- Mettre en place un système d’authentification sécurisé (inscription / connexion)
- Implémenter la gestion CRUD des livres (création, lecture, modification, suppression)
- Gérer l’upload et l’optimisation des images
- Assurer la protection des routes via un middleware d’authentification
- Implémenter un système de notation avec calcul automatique de la moyenne
- Respecter les normes de sécurité (hachage des mots de passe, protection des données)

---

## Stack technique

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Multer (gestion des images)
- Sharp (optimisation d’images)
- bcrypt (hachage des mots de passe)
- Git & GitHub

---

## Compétences développées

- Conception et structuration d’une API REST
- Mise en place d’un serveur Express et gestion des routes
- Implémentation d’un système d’authentification avec JWT
- Sécurisation des données utilisateurs (bcrypt, variables d’environnement)
- Manipulation d’une base de données NoSQL avec MongoDB
- Gestion des middlewares personnalisés
- Traitement et optimisation d’images côté serveur
- Respect des bonnes pratiques de sécurité (OWASP, validation des données)

---

## Résultats et impact

- API REST entièrement fonctionnelle et sécurisée
- Authentification utilisateur opérationnelle
- Gestion complète des livres et des notations
- Stockage des images optimisé pour de meilleures performances
- Base de données structurée et scalable

---

## Perspectives d'amélioration

- Mise en place de tests unitaires et tests d’intégration (Jest / Supertest)
- Implémentation d’une documentation API (Swagger)
- Déploiement sur un service cloud (Render, Heroku, etc.)
- Ajout d’une limitation de requêtes (rate limiting) pour renforcer la sécurité
