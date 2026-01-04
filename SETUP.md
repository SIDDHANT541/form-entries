# Quick Setup Guide

Follow these steps to get your Form Entries API up and running:

## 1. Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

## 2. Configure Environment Variables

Create a `.env` file in the root directory with the following content:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=form_entries_db

# Application Configuration
PORT=3000
```

Adjust the values according to your PostgreSQL setup.

## 3. Setup PostgreSQL Database

Connect to your PostgreSQL server and create the database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE form_entries_db;

# Exit PostgreSQL
\q
```

## 4. Start the Application

Run in development mode (with hot-reload):

```bash
npm run start:dev
```

You should see:
```
Application is running on: http://localhost:3000
```

## 5. Test the API

### Create your first entry:

```bash
curl -X POST http://localhost:3000/form-entries \
  -H "Content-Type: application/json" \
  -d '{
    "sno": "SN001",
    "make_no": "MK2024001",
    "kw": 150.5,
    "location": "Building A",
    "model_no": "MDL-X100",
    "equipment": "Generator"
  }'
```

### Get all entries:

```bash
curl http://localhost:3000/form-entries
```

## 6. Explore the API

Visit the following endpoints:
- `POST /form-entries` - Create new entry
- `GET /form-entries` - Get all entries (with pagination)
- `GET /form-entries/:id` - Get specific entry
- `PATCH /form-entries/:id` - Update entry
- `DELETE /form-entries/:id` - Delete entry

For more detailed documentation, see [README.md](README.md).

## Troubleshooting

### Database Connection Issues

If you get a database connection error:
1. Ensure PostgreSQL is running: `pg_ctl status`
2. Verify the database exists: `psql -U postgres -l`
3. Check your `.env` file credentials match your PostgreSQL setup

### Port Already in Use

If port 3000 is already in use, change the `PORT` in your `.env` file.

### TypeORM Sync Issues

The application uses `synchronize: true` in development, which auto-creates tables. For production, set this to `false` and use migrations.

## Next Steps

- Review the [README.md](README.md) for complete API documentation
- Explore pagination and filtering options
- Customize validation rules in the DTOs
- Add authentication if needed
- Set up database migrations for production

