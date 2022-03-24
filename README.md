# Vacay Buddy

<img src="images/vacayBuddy0.png" alt="vacayBuddyScreenshot" width="800"/>

## Overview:

Vacay Buddy is a website that helps users plan their vacation by providing all relevant information for multiple hotels, restaurants, and excursions in the city that they plan on visiting. Once the user inputs their information, they can simply click the "add" button next to what they are interested in and it will be stored in the database with a reservation ID for that specific vacation. All of the user's choices and vacation details are stored in a database so they can look up their vacation with the reservation ID to read and/or make changes to the trip anytime they need to.

## Technologies used:

- Javascript
- Node.js
- Express.js
- Sequelize ORM
- PostreSQL
- ES6 Template Engine
- CSS

#### API:

- [Yelp Fusion API](https://www.yelp.com/developers/documentation/v3)

## Database schema (with dummy data):

<img src="images/databaseDiagram1.png" alt="databaseDiagram" width="400"/>

## Screenshots:

### Home Page:

<img src="images/vacayBuddy1.png" alt="vacayBuddyScreenshot" width="650"/>
<img src="images/vacayBuddy2.png" alt="vacayBuddyScreenshot" width="650"/>

- Creates a vacation in the database with a unique reservation ID:
  <img src="images/vacayCreateVacay.png" alt="vacayBuddyScreenshot" width=""/>

#### Displays user vacation information and gives options to choose from:

<img src="images/vacayBuddy3.png" alt="vacayBuddyScreenshot" width="650"/>

- Gathers hotel, restaurants, and excursions data from Yelp API based on the chosen destination

#### Select a hotel:

<img src="images/vacayBuddy4.png" alt="vacayBuddyScreenshot" width="650"/>

- Creates a hotel in the database with the unique reservation ID:
  <img src="images/vacayCreateHotel.png" alt="vacayBuddyScreenshot" width=""/>

#### Select restaurant(s):

<img src="images/vacayBuddy5.png" alt="vacayBuddyScreenshot" width="650"/>
<img src="images/vacayBuddy6.png" alt="vacayBuddyScreenshot" width="650"/>

- Creates restaurants in the database with the unique reservation ID:
  <img src="images/vacayCreateRests.png" alt="vacayBuddyScreenshot" width=""/>

#### Select excursion(s):

<img src="images/vacayBuddy7.png" alt="vacayBuddyScreenshot" width="650"/>
<img src="images/vacayBuddy8.png" alt="vacayBuddyScreenshot" width="650"/>

- Creates excursions in the database with the unique reservation ID:
  <img src="images/vacayCreateExc.png" alt="vacayBuddyScreenshot" width=""/>

## See vacation page:

#### Input reservation ID:

<img src="images/vacayBuddy9.png" alt="vacayBuddyScreenshot" width="650"/>

#### Vacation details displayed:

<img src="images/vacayBuddy10.png" alt="vacayBuddyScreenshot" width="650"/>
<img src="images/vacayBuddy11.png" alt="vacayBuddyScreenshot" width="650"/>

- Uses unique reservation ID to find and display hotel, restaurants, and excursions attached to the vacation in the database:
  <img src="images/vacayDisplay.png" alt="vacayBuddyScreenshot" width=""/>

#### Delete from chosen hotel, restaurants, or excursions:

<img src="images/vacayBuddy12.png" alt="vacayBuddyScreenshot" width="650"/>
<img src="images/vacayBuddy13.png" alt="vacayBuddyScreenshot" width="650"/>

- Deletes from the chosen hotel, restaurants, or excursions in the database:
  <img src="images/vacayDelete.png" alt="vacayBuddyScreenshot" width=""/>

## Read about our project:

- To read more about our project check out [this blog post](https://dev.to/jareichert/what-nessie-and-a-full-stack-engineer-have-in-common-4n3f)!

#### Built by @ciaracloud and @JAReichert
