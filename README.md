# Healthcare Symptoms Chatbot

A simple AI-powered healthcare assistant built with **React** and **Express.js** , using Google’s **Gemini API** to analyze symptoms and suggest possible conditions, severity, and next steps.

## Project Structure

```
healthcare_symptoms_chatbot/
│
├── backend/
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js
    │   ├── ChatBubble.js
    │   ├── index.js
    │   ├── landing.js
    │   ├── MainApp.js
    │   ├── landing.css
    │   └── styles.css
    └── package.json
```

## Setup Instructions

```bash
git clone https://github.com/<your-username>/healthcare_symptoms_chatbot.git
cd healthcare_symptoms_chatbot
```

## Backend Setup

```bash
cd backend
npm install
```

Create a file named **`.env`** in the backend folder and add:

```
GEMINI_API_KEY=YOUR_API_KEY_HERE
PORT=5000
```

Start the backend server:

```bash
npm start
```

✅ Backend should now run at: [http://localhost:5000](http://localhost:5000/)

---

## Frontend Setup

In another terminal window:

```bash
cd ../frontend
npm install
npm start
```

✅ Frontend should open at [http://localhost:3000](http://localhost:3000/)

## How It Works

- The **Landing Page** (`landing.js`) introduces the app and has a “Get Started” button.
- Clicking the button navigates to the **Chat Page** (`App.js`), where users can describe symptoms.
- The backend uses **Gemini API** to analyze the text and respond with:
  - Possible conditions
  - Severity
  - Next steps
  - Doctor visit suggestions
- All communication is handled through the `/api/symptom-check` endpoint.

## Tech Stack

##### Frontend:

- React (React Router for navigation)
- Axios (for API calls)
- CSS for styling

##### Backend:

- Node.js + Express
- Axios for API requests
- dotenv for environment variables
- Google Gemini API

## Example Usage

1. Run both frontend and backend.
2. Visit `http://localhost:3000`.
3. Click **“Get Started”** .
4. Type something like:
   ```
   I have a sore throat and mild fever.
   ```
5. The chatbot will reply with possible conditions and advice.
