# Battery Database

A full-stack web application for managing battery data with user authentication.

## Tech Stack

- **Frontend**: React + Vite + Material UI
- **Backend**: Django + Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)

## Features

- User registration and authentication
- Admin user management
- Material UI with electric blue theme (#02a8ff)
- Responsive design
- Role-based access control

## Local Development

### Prerequisites

- Python 3.14+
- Node.js 18+
- PostgreSQL 18+

### Backend Setup

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions.

## Test Credentials

- **Admin**: username: `admin`, password: `admin123`
- **Test User**: username: `testuser`, password: `password123`

## License

MIT