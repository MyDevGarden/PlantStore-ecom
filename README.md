# My PlantStore App
This is a sample application that demonstrates an E-commerce website using the MEAN stack. The application loads products a MongoDB database and displays them. Users can select to display products in a single category as well as can filter products according to category or price. Users can click on any product to get more information about the products and can see similar products . Users can select items and add them to their shopping cart. Using checkout button user can make payment by entering shipping details and can make payments using Razorpay payment screen 

---
## Features

1. Authentication 
2. Products Categories
3. Admin Dashboard
4. User Dashboard
5. Filter By Category and By Price
6. SearchBar
7. Interactive Cart
8. Chekout
9. Payment Options with Razorpay integration
---

## Tech Stack
### Frontend:

reactjs | react-router |  CSS | Bootstrap 

### Backend:

nodejs | expressjs | mongodb | jwt 

### Payment Gateway:

Razorpay

### Deployed On:

Render
---

### Live Demonstration
The E-commerce demo can be viewed online here.
>[Working Demo](https://ecommerce-plantstore.onrender.com)
---

## Istructions

### Getting Started 
1. To get started you can simply clone this ecommerce-demo repository and install the dependencies.

    Clone the ecommerce-demo repository using git:

    https://github.com/MyDevGarden/PlantStore-ecom

2. From Backend folder run ``npm install``
3. To run the application use ``npm run dev`` or ``npm start``

___

### For Payment getway integration 
1. #### create a Razorpay account by signing in
    (https://razorpay.com)

2. #### Get your own  'RAZORPAY_KEY_ID' and 'RAZORPAY_SECRET'
3. #### Create a .env file in your backend folder and paste all secret keys in it

### .env file for backend

PORT = 'Port you want to run your server'

MONGO_URL = 'Url for your mangodb atlus databse'

JWT_SECRET = 'your secret key to generate JWT token'

RAZORPAY_KEY_ID = 'your key'

RAZORPAY_SECRET = 'Your secret key'

### .env file for frontend

REACT_APP_API = 'url to your frontend port'

RAZORPAY_KEY_ID = 'your key'
___
### Special instuctions for testing payments
#### Test Card Nos for credit card payments
Test Card for Indian Payments

|Card Network	 |   Card Number     	|        CVV     	|    Expiry Date        |

|----------------|----------------------|-------------------|-----------------------|

|Mastercard      |	5267 3181 8797 5449	|       Random CVV	|    Any future date    |

|Visa	         |  4111 1111 1111 1111	|       Random CVV	|    Any future date    |

#### (use any future date for expiry)

#### Test UPI Ids for Upi payments
for successful payment - success@razorpay 

for Failed payment - failure@razorpay 

