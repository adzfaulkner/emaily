# emaily api

## Introduction

This is the result of the undergoing of the Udemy course:

https://www.udemy.com/node-with-react-fullstack-web-development

## Prerequisites

* Install Docker
* Signed up for a google account

## Installation

1. Run `docker-compose up`
2. Make a copy of `config/keys.example.js` to `config/keys.js` and modify as necessary.
3. Sign up for a Google API account. Copy and paste the ID and secret into the `config/keys.js` file.
4. Define the mongo db URI in the `config/keys.js` file. Should be in the following format:
`mongodb://{username}:{password}@emaily-mongo:27017/emaily-dev`
5. Define a jwt secret in the `config/keys.example.js`. Create a random string.
6. Create a stripe payments account and define the publishable/secret keys in the `config/keys.example.js`
7. Create a SendGrid account and define the key in the `config/keys.example.js` file. 

## Todo

1. Google auth prevents this being a fully stateless API as the setting of the cookie with the jwt token should be the responsibility of the client. Refactoring is required.