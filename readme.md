# E-commerce Storefront Application

This project implements a full-stack e-commerce web application, providing a user-friendly interface for browsing and purchasing products.  It features user authentication, a shopping cart, order management, and an intuitive product catalog.


<img width="1720" alt="Screenshot 2024-12-19 at 8 03 15 AM" src="https://github.com/user-attachments/assets/2357bd7b-3177-453f-958c-f9eb7e7f6e7b" />

## Client-Side (React)

The client-side is built using React, providing a dynamic and responsive user experience.  Key features and components include:

* **Routing (react-router-dom):** Enables navigation between different pages (home, product listing, product details, shopping cart, login/registration, orders, etc.).
* **State Management (Context API, useState):**  Manages application state, including user authentication, shopping cart contents, and UI interactions.  The `CartContext` provides global access to cart data and related functions.
* **Data Fetching (axios, TanStack React Query):**  `axios` handles HTTP requests to the backend API.  React Query simplifies data fetching, caching, and updates with features like `useQuery`.
* **UI Components:** Reusable components for forms (`InputContainer`, `LoginForm`, `RegistrationForm`), product displays (`ProductDescription`, `ProductPurchasePanel`, `ProductListPage`, `ProductDetailPage`), shopping cart management (`ShoppingCartPage`), order viewing (`OrdersPage`, `OrderDetailsPage`), and more.
* **Styling:**  CSS styles the application for an appealing visual presentation.

## Server-Side (Node.js, Express.js)

The server-side utilizes Node.js with Express.js to create a RESTful API that handles data management and communication with the client. Key aspects include:

* **API Endpoints:**  Provides endpoints for user authentication (login/register), product information retrieval, category browsing, shopping cart management, and order processing.
* **Database Interaction:** Interacts with a database (e.g., PostgreSQL) to store and retrieve product data, user information, and order details.  The specific database used needs to be documented in the server-side setup instructions.
* **Authentication:**  Implements user authentication and authorization to protect sensitive data and operations. Uses JWT (JSON Web Tokens) for secure authentication.
* **Data Validation:**  Validates user inputs and requests on the server-side to ensure data integrity and security.

## Features

* **Product Browsing:** Users can browse products by category or view product details, including descriptions, images, prices, and stock availability.
* **Shopping Cart:**  Users can add products to their cart, update quantities, and remove items.
* **User Authentication:** Users can create accounts and log in securely.
* **Order Management:**  Users can place orders and view their order history, including order details and total prices.


## Getting Started

* **Prerequisites:** Node.js, npm, PostgreSQL.
* **Installation:**  `
    ```
    cd client
    npm install

    cd server
    npm install
    ```
* **Running the Application:**  
    ```
    cd client 
    npm run dev
    ```
    ```
    cd server
    npm run dev
    ```

## Technologies Used

* **Front-end:** React, React Router, Axios, TanStack React Query, Iconify
* **Back-end:** Node.js, Express.js, Passport.js, bcrypt.js, JWT
* **Database:**  PostgreSQL
* **Styling:** CSS


## Future Improvements

* **Enhanced Search Functionality:** Implement more robust search capabilities.
* **Payment Integration:** Integrate a payment gateway for processing transactions.
* **Admin Panel:** Develop a comprehensive admin panel for managing products and users.
* **Improved UI/UX:**  Refine the user interface and experience.
