# **Colors and Sounds**

A web application designed to demonstrate how colour and sound can intermingle.  The application currently allows users to select from a small collection of paintings (or receive a random painting) from the Rijks Museum API.  The API call also fetches 6 or 7 of the most of prominent colours for each painting.  The colours are displayed along with their hex value above each painting.  This colour data is then converted into sound using Tone.js and a simple scaling algorithm.  The user is able to filter this data to customize the musical sequence using a variety of scales and tempo markings.  While “music” is being played, the play/shuffle button randomly transposes the pitches up or down one octave.

## **Tech Used**
*	React.js
*	Tone.js
*	REST API

## **Features**
*	Fetches painting and colour data from the Rijks Museum API https://www.rijksmuseum.nl/en/research/conduct-research/data
*	Allows the user to select from a variety of common musical scales which act as a filter for the paintings most used colours
*	Allows the user to select from a range of tempos (50bpm -> 350bpm)
*	User is provided with a random register configuration for each colour upon selecting the play/shuffle button for a second time

## **Setup Instructions**
To clone this repository, you will need node and npm installed globally on your machine.
## **Installation:**
*	npm install
## **To Run Test Suite:**
*	npm test
## **To Start Server:**
*	npm start
## **To Visit App:**
*	localhost:3000/
