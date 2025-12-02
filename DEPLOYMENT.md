# Deployment Instructions

Your code is now ready for deployment! Here's what I've prepared:

## Files Created

### Backend
- ✅ `backend/requirements.txt` - Python dependencies including gunicorn, dj-database-url, whitenoise
- ✅ `backend/config/settings_prod.py` - Production Django settings
- ✅ `backend/build.sh` - Build script for Render

### Frontend
- ✅ `frontend/src/services/api.js` - Updated to use environment variable
- ✅ `frontend/.env.production` - Production environment template

## Next Steps

### 1. Generate Django Secret Key

Run this command to generate a secure secret key:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

**Copy the output** - you'll need it for Render environment variables.

### 2. Push to Git

If you haven't already, initialize a Git repository and push to GitHub:

```bash
git init
git add .
git commit -m "Prepare for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/battery_database.git
git push -u origin main
```

### 3. Deploy on Render

Follow the deployment guide (`deployment_guide.md`) with these specific values:

#### Postgres Database
- Name: `battery-db`
- Database: `battery_db`
- User: `battery_user`

#### Backend Web Service
- Name: `battery-backend`
- Build Command: `./backend/build.sh`
- Start Command: `cd backend && gunicorn config.wsgi:application`
- Environment Variables:
  - `DATABASE_URL`: (Copy from Postgres database)
  - `DJANGO_SETTINGS_MODULE`: `config.settings_prod`
  - `SECRET_KEY`: (Paste the secret key you generated)
  - `PYTHON_VERSION`: `3.14.0`
  - `FRONTEND_URL`: `https://YOUR-FRONTEND-NAME.onrender.com`

#### Frontend Static Site
- Name: `battery-frontend`
- Build Command: `cd frontend && npm install && npm run build`
- Publish Directory: `frontend/dist`
- Environment Variables:
  - `VITE_API_URL`: `https://YOUR-BACKEND-NAME.onrender.com/api/`

### 4. After Deployment

1. **Update CORS**: After you get your frontend URL, update `settings_prod.py`:
   ```python
   CORS_ALLOWED_ORIGINS = [
       'https://your-actual-frontend-url.onrender.com',
   ]
   ```
   Then commit and push to trigger redeployment.

2. **Create Admin User**: In Render backend shell:
   ```bash
   python backend/manage.py createsuperuser
   ```

3. **Test**: Visit your frontend URL and test all features!

## Important Notes

- ⚠️ The `build.sh` file needs to be executable. Render handles this automatically.
- ⚠️ Free tier services spin down after 15 minutes of inactivity
- ⚠️ First request after spin-down takes ~30 seconds
- ✅ HTTPS is automatic on Render
- ✅ Automatic deployments on git push

## Troubleshooting

If backend fails to start:
1. Check Render logs
2. Verify all environment variables are set
3. Ensure DATABASE_URL is correct
4. Check that migrations ran successfully

If frontend can't connect:
1. Verify `VITE_API_URL` is set correctly
2. Check CORS settings in Django
3. Look at browser console for errors

## Ready to Deploy!

You're all set! Follow the deployment guide and you'll have your app live in about 15-20 minutes.
