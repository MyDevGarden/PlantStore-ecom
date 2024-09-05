# My PlantStore App
This is a sample application that demonstrates an E-commerce website using the MEAN stack. The application loads products a MongoDB database and displays them. Users can select to display products in a single category as well as can filter products according to category or price. Users can click on any product to get more information about the products and can see similar products . Users can select items and add them to their shopping cart

## Live Demonstration
The E-commerce demo can be viewed online here.

# Getting Started 
To get started you can simply clone this ecommerce-demo repository and install the dependencies.

Clone the ecommerce-demo repository using git:

git clone https://github.com/MyDevGarden/Ecommerce

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
## For frontend
### `cd client`
### `npm install`
### `npm start`
## For backend
### `cd backend`
### `npm install`
### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## For Payment getway integration 
### create a sandbox account by signing in
(https://sandbox.braintreegateway.com/login)

Get the 'Merchant Id', 'public key' and 'private key'
### Create a .env file in your backend folder and paste all secret keys in it

.env file
PORT = 'Port you want to run your server'
MONGO_URL = 'Url for your mangodb atlus databse'
JWT_SECRET = 'your secret key to generate JWT token'

BRAINTREE_PUBLIC_KEY = 'Your public key'
BRAINTREE_PRIVATE_KEY = 'your private key'
BRAINTREE_MERCHANT_ID = 'your merchant id'



### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
