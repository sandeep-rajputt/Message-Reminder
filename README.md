# Message Reminder

Message Reminder is a WhatsApp bot that sends scheduled reminders to users at specific times. The bot helps users stay on top of important tasks by sending reminders via WhatsApp based on their preferred schedule—daily, weekly, or monthly.

## Getting Started

To get started with the Message Reminder bot, follow these steps to clone, configure, and run the backend.

### 1. Clone the Repository

First, clone the repository by running the following command in your terminal:

```bash
git clone https://github.com/sandeep-rajputt/Message-Reminder.git
```

### 2. Backend Setup

Navigate to the `backend` folder and set up the environment variables. Create a `.env` file in the `backend` directory with the following content:

```bash
# .env file

# Port to run the backend server on
PORT=YOURPORT

# MongoDB connection string
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

# Admin phone number for sending messages (must start with 91, do not include '+')
ADMIN_NUMBER=91_NUMBER

# JWT Secret for authentication
JWT_SECRET=ANY_RANDOM_COMBINATION

# Frontend URL for CORS configuration
FRONTEND_URL=YOUR_FRONTEND_URL
```

### 3. Install Backend Dependencies

Navigate to the `backend` directory and install the required dependencies:

```bash
cd backend
npm install
```

> [!NOTE]
> You may see some `npm warn deprecated...` messages during installation, and it might take some time. These warnings are safe to ignore.

### 4. Run the Backend

Once installation is complete, start the backend server:

```bash
npm run dev
```

> [!IMPORTANT]
> A QR code will appear in the terminal. Use WhatsApp to scan the QR code from any phone number (not the `ADMIN_NUMBER`). If you're unable to scan it immediately, wait a few seconds for a new QR code to generate and try again.
