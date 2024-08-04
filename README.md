# Invoice Manager
![image](https://github.com/user-attachments/assets/19d001ac-e111-4a04-9a16-1091ed177265)


Invoice Manager is a full-stack web application designed to manage invoices efficiently. This application allows users to create, view, update, and delete invoices. Each invoice includes details such as the invoice number, client information, itemized list of products/services, total amount, and due date. The project utilizes the Next.js, Nest.js, PostgreSQL, and Prisma stack.

## Features

- Create, view, update, and delete invoices
- Export invoices as PDF files
- Export balance sheet reports as Excel files
- Responsive design for desktop and mobile devices
- Secure authentication for user management

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Node.js
- **Database**: PostgreSQL
- **ORM**: Prisma

## Project Setup

### Prerequisites

- Node.js (v14 or above)
- PostgreSQL
- Git

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/abenooo/invoice-manager.git
    cd invoice-manager
    ```

2. **Install dependencies**

    ```bash
    cd frontend
    npm install

    cd ../backend
    npm install
    ```

3. **Setup PostgreSQL Database**

    - Ensure PostgreSQL is installed and running.
    - Create a new database, for example, `invoice_manager`.
    - Update the database connection string in the `.env` file in the backend directory.

    ```env
    DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/invoice_manager
    ```

4. **Run Database Migrations**

    ```bash
    cd backend
    npx prisma migrate dev --name init
    ```

### Running the Application

1. **Start the backend server**

    ```bash
    cd backend
    npm run start
    ```

2. **Start the frontend server**

    ```bash
    cd frontend
    npm run dev
    ```

### Accessing the Application

- The frontend can be accessed at `http://localhost:3000`
- The backend API can be accessed at `http://localhost:4000`

### Export Functionality

- PDF export: Navigate to an invoice detail page and click on the "Export as PDF" button.
- Excel export: Navigate to the invoices page and click on the "Export as Excel" button.

## Deployment
To deploy the application we will use Vercel
1. **Frontend Deployment**:

    - Push your frontend code to a repository.
    - Deploy using Vercel.

2. **Backend Deployment**:

    - Push your backend code to a repository.
    - Deploy using Heroku or any other preferred platform.
    - Ensure the PostgreSQL database is also set up on the cloud platform.

3. **Update Environment Variables**:

    - Ensure all environment variables are correctly set up on the deployment platform.

## Additional Information

- This project follows best practices for frontend and backend development.
- Input validation and error handling are implemented.
- Authentication is handled securely to manage user access.

## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.


## Contact

For any questions or suggestions, please contact [abenezerkifle000@gmail.com]
