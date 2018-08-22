# Udacity Front End Web Development Project 8: Neighborhood Map

## Description

This small app allows user to explore locations of largest museums in Chicago, IL, USA. User can filter through a list of museums by typing in 'Filter Locations' search box. List and map will automatically update to reflect closest match. In order to find out more about a selected location user can click on a map marker and a pop up window will appear at the bottom of window to display additional information.

## Launching the App
- Clone this repository to your local machine using `git clone https://github.com/DovydasJanulaitis/neighborhood-map-p8.git` command
- Navigate to the cloned folder
- Run `npm install` command to install all necessary dependencies
- Run `npm start` to run the local server
- The app will launch in your default browser on `localhost:3000`

## Production

Run `npm build`. This will build the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance.

By default, it also includes a service worker so that your app loads from local cache on future visits.

## Dependencies
- Project uses React framework
- This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)
- Project uses [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial)
- Project is powered by [Wikipedia](https://www.wikipedia.org) with `fetch-jsonp`
