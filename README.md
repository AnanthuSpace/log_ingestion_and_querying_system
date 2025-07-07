# Log Monitoring App

A simple log monitoring application built with a Node.js + Express backend and React frontend. The backend serves log data stored in a JSON file and exposes APIs to fetch logs and log statistics. The frontend displays logs and their summary statistics with a clean UI.


## Features

- Fetch and display logs from the backend
- Show log statistics (total logs, errors, warnings, info, debug)
- CORS-enabled backend configured via environment variables
- Simple JSON file-based log storage (no database)
- Clean UI using React, Tailwind CSS, and Lucide icons


## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Git (optional)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/log-monitoring-app.git
   cd log-monitoring-app

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
  

3. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install


## Running the Project

### Backend

1. Create a `.env` file inside the `backend` directory with the following variables:

   ```env
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

   > **Note:** Set `FRONTEND_URL` to your frontend application's URL. It must exactly match the frontend origin to avoid CORS issues.

2. Start the backend server:

   ```bash
   npm run start
   ```

   The backend will be accessible at `http://localhost:5000`.

### Frontend

1. Inside the `frontend` directory, create a `.env` file if needed (depending on your setup).

2. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will be accessible at `http://localhost:5173` (or your configured port).


## API Endpoints

* `GET /logs` — Fetch all logs, optionally filtered by query parameters
* `POST /logs` — Add a new log entry
* `GET /logs/stats` — Retrieve summary statistics of logs (counts by level)


## Environment Variables

| Variable       | Description                                                                                                                                        | Example                 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `PORT`         | Backend server port                                                                                                                                | `5000`                  |
| `FRONTEND_URL` | Allowed frontend URL for CORS configuration. Should be set to the URL where your frontend is served (e.g., `http://localhost:5173` for local dev). | `http://localhost:5173` |

> **Important:** The `FRONTEND_URL` must exactly match the origin of your frontend application to avoid CORS errors. Adjust it based on your deployment or development environment.


## Project Structure

```
backend/
  ├── controllers/
  ├── routes/
  ├── data/
  │    └── logs.json      # Log data stored here
  ├── app.js              # Express app setup
  ├── server.js           # Server startup script
  ├── .env                # Backend environment variables
frontend/
  ├── src/
  ├── public/
  ├── components/
  ├── pages/
  ├── service/            # API service methods using axios
  ├── App.tsx             
  ├── .env                # Frontend environment variables
README.md
```


## Technologies Used

* **Backend:** Node.js, Express, CORS, dotenv
* **Frontend:** React, TypeScript, Tailwind CSS, Lucide React icons, Axios
* **Data Storage:** JSON file (no database)


## Troubleshooting

* **CORS Errors:** Make sure the `FRONTEND_URL` in your backend `.env` matches exactly the origin where your frontend is served (including port, protocol, and no trailing slash).
* **500 Internal Server Errors:** Check backend logs and ensure the JSON file for logs is correctly formatted and accessible.
* **Network Errors:** Confirm both backend and frontend servers are running and reachable.



## Contribution

Feel free to fork the repo and submit pull requests for bug fixes or improvements!


## License

This project is licensed under the MIT License.


## Author

Ananthu Mohan


```

Just copy all of the above text and paste it into your `README.md` on GitHub — it’s ready to go! Let me know if you want me to help with anything else.
```
