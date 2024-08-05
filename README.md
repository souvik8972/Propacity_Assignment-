# Folder Management System
![Folder Management System Banner](https://i.imgur.com/Qdmeen8.png)
![Folder Management System Banner](https://i.imgur.com/2wLRigm.png)

![Folder Management System Banner](https://i.imgur.com/2XeZVE8.png)



## Project Overview

The Folder Management System is designed to allow users to efficiently manage their files and folders within a web-based interface. The application supports the creation of folders and subfolders, file uploads to AWS S3, and displays the contents of folders in a user-friendly manner.

## Features

- **Folder Creation**: Users can create new folders and subfolders.
- **File Upload**: Upload files to folders, with integration to AWS S3.
- **Folder Navigation**: Navigate through folders and view their contents.
- **File Management**: View and manage files within folders.
- **User Authentication**: Secure login and authentication using JWT and bcrypt.
- **Responsive Design**: A responsive UI built with React and Tailwind CSS.
- **Animations**: Smooth animations using Framer Motion.

## Technologies Used

- **Front-End**:
  - React
  - Redux Toolkit
  - Tailwind CSS
  - Framer Motion
  - Axios
  - React Icons

- **Back-End**:
  - Node.js
  - Express
  - PostgreSQL
  - Sequelize
  - AWS SDK
  - Multer
  - JWT
  - bcrypt

## Installation

### Prerequisites

- Node.js
- PostgreSQL

### Clone the Repository

```bash
git clone https://github.com/souvik8972/Propacity_Assignment-.git

```

### Set Up the Back-End

1. **Install Dependencies**

   ```bash
   cd backend
   npm install
   ```

2.**Set Up Environment Variables**

   Create a `.env` file in the `backend` directory with the following content:

   ```dotenv
   1.PORT=3000

   2.Database Configuration
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=DB_PASSWORD
   DB_NAME=file_management
   DB_PORT=5432

   3.JWT Configuration
   JWT_SECRET=your_jwt_secret

   4.AWS Configuration
   AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID
   AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY
   AWS_REGION=ap-south-1
   AWS_S3_BUCKET_NAME=AWS_S3_BUCKET_NAME
   ```



3. **Start the Server**

   ```bash
   npm start
   ```

### Set Up the Front-End

1. **Install Dependencies**

   ```bash
   cd frontend
   npm install
   ```

2. **Start the Development Server**

   ```bash
   npm start
   ```

## Usage

1. **Create a New Account or Log In**

   Navigate to the login page and use your credentials to log in or create a new account.

2. **Manage Files and Folders**

   Use the application interface to create folders, upload files, and navigate through folders.



## Front-End Components

- **`FolderView`**: Displays the contents of a folder.
- **`CreateFolderModal`**: Modal for creating a new folder.
- **`UploadFileModal`**: Modal for uploading files.
- **`Layout`**: Includes the sidebar and main content area.

## File Upload

Files are uploaded to AWS S3 using the AWS SDK and `multer`. Ensure that the AWS credentials and bucket details are correctly configured in the environment variables.

## Authentication

Authentication is handled using JWT for secure login and bcrypt for password hashing. Ensure that the `JWT_SECRET` environment variable is set.


