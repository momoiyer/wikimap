# 
# PROJECT TITLE - Treasure Map (wiki map)

## PROJECT DESCRIPTION
A responsive web app that allows users to collaboratively create maps which list multiple "points". For example: "Best Places to Eat Around Town" or "Locations of Movie Scenes".

## TEAM MEMBERS
**Khin Mo Mo Zin, Katherine Nishimura**

# TECH STACK #

## Languages, Frameworks & Database ##

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)
![HTML5](https://camo.githubusercontent.com/819068798393631dfa06d6ba12a235382f6f009675d30a527a6be7f6ba73558b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f48544d4c352532302d2532334533344632362e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465)
![CSS](https://camo.githubusercontent.com/82a27b02a3817d130c2c07c5c611bd0efeb852786b829db07cd4b42aa021407f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4353532532302d2532333135373242362e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d63737333266c6f676f436f6c6f723d7768697465)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## API & External Libraries ##
<div style="display: flex; margin-bottom:15px">
  <img src="documentation/md-geoapify.jpg" height="28" width=108 alt="GeoApify" style="padding-right: 4px">
  <img src="documentation/md-leaflet.jpg" height="28" width=140 alt="Leaflet"  style="padding-right: 4px">
</div>


## Others
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)

# PROJECT OVERVIEW #

## Home Page 
### Home page after user logged in showing the map near user's location ###
![Home Page](documentation/home.jpg)

## Map Detail Page 
### Clicking on individual map will take you to map detail page where you can see Point added to current map ###
![Map Detail Page](documentation/mapDetails.jpg)

## Map Detail Page - Edit Map Details
### User can edit current map info like name and description of the map ###
![Map Detail Page - Edit Map](documentation/editMap.jpg)

## Map Detail Page - Add contributor 
### Map owner can add other existing users to be the contributor of the map, that mean they can add in points to the map too ###
![Map Detail Page - Add contributor](documentation/manageContributor.jpg)

## Map Detail Page - Add new point
### User can add new point to current map by click anywhere on the map, that will populate the fields with deatils information of selected location ###
![Map Detail Page - Add new point](documentation/addPoint.jpg)

## User Profile
### User can view the maps they created, favourited or been shared by another user as a contributor ###
![User Profile](documentation/profile.jpg)

## Favourite Map Page
### User can view all the map they marked as favourite ###
![Favourite Map Page](documentation/favourite.jpg)

## Share/Contributed Map Page
### User can view all the map taht has been shared by another user as a contributor and add points in it ###
![Share/Contributed Map Page](documentation/sharedMap.jpg)

## Create New Map
### User can create a new map and add points later from detail page ###
![Create New Map](documentation/createMap.jpg)

# PROJECT SETUP #

## DB SETUP
```
psql
CREATE DATABASE midterm;
```

## PROJECT SETUP
```
cd wikimap
npm install
npm rebuild node-sass
npm run db:reset
npm run local
```

Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
