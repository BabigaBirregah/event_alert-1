EventAlert
========================

## I. Présentation du service
EventAlert est une application web de reporting. L’objectif est de centraliser les problèmes survenus lors d’événements, d’avoir de l’information en temps réel afin de réagir ou de répondre aux besoins des participants et d’exploiter ces données pour améliorer les événements. Développé en Node.js [Node.js](https://nodejs.org/en/), il permet d'apporter en plus une multitude de fonctionnalités.

### Fonctionnalités de l'application : Diagramme des cas d'utilisation
![](http://img15.hostingpics.net/pics/427139Dcu.png)
![](http://img15.hostingpics.net/pics/971831Dcunotification.png)

### Contexte du projet
Lors de grandes manifestations, marathons, concerts, matchs, etc.., les organisateurs ont souvent des problèmes qui se passent lors de leurs événements sans forcément le savoir. Les participants n’ont pas toujours la possibilité de donner leurs avis ou d’alerter un incident.

## II. Guide d'installation
Vous souhaitez cloner le projet, l'installer et y apporter toutes les modifications que vous désirez, suivez attentivement les instructions contenues dans ce guide pour effectuer l’installation de EventAlert dans les meilleures conditions.

Avant de commencer, rassurez vous d'avoir cloner ce repository. Si ce n'est pas encore fait, executez la commande suivante dans le Terminal
``` linux
$ git clone git@github.com:jeanmichelly/EventAlert.git
``` 

### Prérequis

Ce tutoriel suppose que : 
- Vous avez les droits d'accès administrateur sur votre machine.
- Vous avez réalisé un fork du projet.

``` linux
1.	Télécharger et installer Node.JS
2.	Installer Sails.JS
      a.	Dans l’invite de commande, aller à la racine du projet avec la commande « cd »
      b.	Taper dans l’invite de commande : <sudo> npm –g install sails 
3.	Taper dans l'invite de commande : npm install 
    Installe tous les modules cités dans le fichier package.json -> « dependencies » qui se trouve à la racine du projet.
4.	Télécharger et installer Wampserver
5.	Ouvrir phpmyadmin
6.	Cliquer sur « New »
7.	Dans « database name » taper « event_alert »
8.	Cliquer sur la base de données créée
9.	Cliquer sur « Import » et « choisir un fichier »
10.	Sélectionner le fichier se situant dans le projet téléchargé sur Github :  event_alert/bdd/event_alert_empty.sql
    Importe le modèle de données (Entités, attributs,..)
11.	Taper dans l’invite de commande : sails lift 
    Lance le projet accessible à l’adresse localhost :1337
      a.	Si des modules ne sont pas correctement installés alors taper dans l’inviter de commande : npm install <nom_module>
            Sur Windows, si cela ne marche toujours pas il faut alors : 
              i.	Installer le kit de développement .NET Framework 2.0 SDK
             ii.	Installer Microsoft Visual Studio 2005
            iii.	Ajouter l’emplacement du composant au chemin d’accès système, s’il est installé ailleurs.
             iv.	Retour à l’étape 12.
``` 

## III. Guide d'utilisation

Ce petit guide va vous permettre de vous
familiariser avec toutes les fonctionnalités de la plateforme. 

***NB:*** Il suffit de cliquer pour être redirigé vers le guide d'utilisation concerné

 - [L'accueil](https://github.com/jeanmichelly/event_alert/wiki/L'accueil)
 - [Organisateur](https://github.com/jeanmichelly/event_alert/wiki/Organisateur)
 - [Citoyen](https://github.com/jeanmichelly/event_alert/wiki/Citoyen)
 - [Admin](https://github.com/jeanmichelly/event_alert/wiki/Admin)
 - [Messagerie interne](https://github.com/jeanmichelly/event_alert/wiki/Messagerie-interne)
