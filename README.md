
#  [Projet Web : Restaury](https://restaury.tk/)
![Restaury](https://i.ibb.co/bJs6STh/logo.png)

## Démo
Bonjour,

Le site internet restaury est disponible via ce lien:
[https://restaury.tk/](https://restaury.tk/)

Une capture d'écrans de l'interface principale du site internet restaury :

![](https://i.ibb.co/2dsJj9W/Capture.png)
![](https://i.ibb.co/w0YD0db/Capture.png)


## Fonctionnalités développé
**Details :**

 - [x] La page d'index
	 - [x] Une barre de recherche (nom de restaurant)
	 - [x] Une liste des restaurants
	 - [x] La pagination
 - [x] La page du restaurant 
	 - [x] Les informations de base (nom, addresse ...)
	 - [x] La géolocalisation (avec la carte)
	 - [x] La carte avec les plats
	 - [x] Les menu avec les plats
	 - [x] Les évaluations des clients
 - [x] **Optionnel 1 - Effectuer des commandes** : en mode utilisateur, on pourra passer une commande : choisir un ou plusieurs menus, et des plats à la carte... la liste des plats ou menus sera ajouté à la commande, qui sera en temps réel mise à jour et affichée à l'écran avec le prix total.

 - [x] **Optionnel 2 - Avoir le mode Admin**  : proposer mode admin (sans authentification pour cette année) pour créer des cartes, des menus, ajouter/modifier des plats. On doit pouvoir supprimer un élément de la commande une fois choisi (on a le droit de se tromper).

## Les données
 1. Un premiere dataset généré depuis json-generator.com
 2. Deuxieme dataset patché avec des données d'un dataset de restaurants réel trouvé sur [https://www.data.gouv.fr/fr/datasets/liste-des-restaurants-de-nice-geolocalises/](https://www.data.gouv.fr/fr/datasets/liste-des-restaurants-de-nice-geolocalises/)

## Les Ressources

- Theme Admin : [Vuetify Material Dashboard](https://www.creative-tim.com/product/vuetify-material-dashboard) ([Doc](https://demos.creative-tim.com/vuetify-material-dashboard/documentation/#vuetify))

- Plugins
	- vue-router
	- vuex
	- vuetify
	- axios
- Librairies
	- lodash
	- moment