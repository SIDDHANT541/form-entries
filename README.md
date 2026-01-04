# Form Entries CRUD Application

A NestJS-based RESTful API for managing form entries with PostgreSQL database, TypeORM, validation, and pagination support.

## Features

- Full CRUD operations for form entries
- Input validation using class-validator
- Pagination and filtering support
- PostgreSQL database with TypeORM
- RESTful API endpoints
- Type-safe TypeScript implementation
- Auto-generated timestamps

## Database Schema

The application manages a `form_entries` table with the following columns:

| Column     | Type          | Description                          |
| ---------- | ------------- | ------------------------------------ |
| id         | integer       | Primary key (auto-generated)         |
| sno        | varchar(255)  | Serial number                        |
| make_no    | varchar(255)  | Make number                          |
| kw         | decimal(10,2) | Kilowatt value                       |
| location   | varchar(255)  | Location                             |
| model_no   | varchar(255)  | Model number                         |
| equipment  | varchar(255)  | Equipment name                       |
| created_at | timestamp     | Creation timestamp (auto-generated)  |
| updated_at | timestamp     | Last update timestamp (auto-updated) |

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

## Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

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

3. Create the PostgreSQL database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE form_entries_db;
```

4. The application will automatically create the `form_entries` table on startup (TypeORM synchronize is enabled for development).

## Running the Application

### Development mode (with hot-reload)

```bash
npm run start:dev
```

### Production mode

```bash
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## API Endpoints

### 1. Create Form Entry

**POST** `/form-entries`

Creates a new form entry.

**Request Body:**

```json
{
  "sno": "SN001",
  "make_no": "MK2024001",
  "kw": 150.5,
  "location": "Building A",
  "model_no": "MDL-X100",
  "equipment": "Generator"
}
```

**Response:** `201 Created`

```json
{
  "id": 1,
  "sno": "SN001",
  "make_no": "MK2024001",
  "kw": 150.5,
  "location": "Building A",
  "model_no": "MDL-X100",
  "equipment": "Generator",
  "created_at": "2026-01-04T10:30:00.000Z",
  "updated_at": "2026-01-04T10:30:00.000Z"
}
```

### 2. Get All Form Entries (with Pagination)

**GET** `/form-entries`

Retrieves all form entries with pagination and optional filtering.

**Query Parameters:**

- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Items per page
- `search` (optional) - Search in sno, make_no, or model_no
- `location` (optional) - Filter by location
- `equipment` (optional) - Filter by equipment

**Examples:**

```bash
# Get first page (10 items)
GET /form-entries

# Get page 2 with 20 items per page
GET /form-entries?page=2&limit=20

# Search for entries
GET /form-entries?search=SN001

# Filter by location
GET /form-entries?location=Building A

# Combine filters
GET /form-entries?location=Building A&equipment=Generator&page=1&limit=10
```

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": 1,
      "sno": "SN001",
      "make_no": "MK2024001",
      "kw": 150.5,
      "location": "Building A",
      "model_no": "MDL-X100",
      "equipment": "Generator",
      "created_at": "2026-01-04T10:30:00.000Z",
      "updated_at": "2026-01-04T10:30:00.000Z"
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

### 3. Get Single Form Entry

**GET** `/form-entries/:id`

Retrieves a single form entry by ID.

**Response:** `200 OK`

```json
{
  "id": 1,
  "sno": "SN001",
  "make_no": "MK2024001",
  "kw": 150.5,
  "location": "Building A",
  "model_no": "MDL-X100",
  "equipment": "Generator",
  "created_at": "2026-01-04T10:30:00.000Z",
  "updated_at": "2026-01-04T10:30:00.000Z"
}
```

**Error Response:** `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "Form entry with ID 999 not found",
  "error": "Not Found"
}
```

### 4. Update Form Entry

**PATCH** `/form-entries/:id`

Updates an existing form entry. All fields are optional.

**Request Body:**

```json
{
  "kw": 175.0,
  "location": "Building B"
}
```

**Response:** `200 OK`

```json
{
  "id": 1,
  "sno": "SN001",
  "make_no": "MK2024001",
  "kw": 175.0,
  "location": "Building B",
  "model_no": "MDL-X100",
  "equipment": "Generator",
  "created_at": "2026-01-04T10:30:00.000Z",
  "updated_at": "2026-01-04T11:00:00.000Z"
}
```

### 5. Delete Form Entry

**DELETE** `/form-entries/:id`

Deletes a form entry by ID.

**Response:** `204 No Content`

## Validation Rules

All fields are validated automatically:

- **sno**: Required, must be a non-empty string
- **make_no**: Required, must be a non-empty string
- **kw**: Required, must be a positive number
- **location**: Required, must be a non-empty string
- **model_no**: Required, must be a non-empty string
- **equipment**: Required, must be a non-empty string

Invalid requests will return a `400 Bad Request` with detailed error messages.

**Example Error Response:**

```json
{
  "statusCode": 400,
  "message": ["kw must be a positive number", "location should not be empty"],
  "error": "Bad Request"
}
```

## Testing with cURL

### Create a new entry

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

### Get all entries

```bash
curl http://localhost:3000/form-entries
```

### Get entry by ID

```bash
curl http://localhost:3000/form-entries/1
```

### Update entry

```bash
curl -X PATCH http://localhost:3000/form-entries/1 \
  -H "Content-Type: application/json" \
  -d '{
    "kw": 175.0
  }'
```

### Delete entry

```bash
curl -X DELETE http://localhost:3000/form-entries/1
```

## Project Structure

```
src/
├── app.module.ts                 # Main application module with TypeORM config
├── main.ts                       # Application entry point with validation
└── form-entries/
    ├── form-entries.module.ts    # Form entries feature module
    ├── form-entries.service.ts   # Business logic
    ├── form-entries.controller.ts # REST API endpoints
    ├── entities/
    │   └── form-entry.entity.ts  # TypeORM entity
    └── dto/
        ├── create-form-entry.dto.ts  # Create validation DTO
        ├── update-form-entry.dto.ts  # Update validation DTO
        └── query-form-entry.dto.ts   # Query/pagination DTO
```

## Technologies Used

- **NestJS** - Progressive Node.js framework
- **TypeORM** - ORM for TypeScript and JavaScript
- **PostgreSQL** - Relational database
- **class-validator** - Validation library
- **class-transformer** - Object transformation library
- **TypeScript** - Typed superset of JavaScript

## Development

### Run tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Lint and format

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Production Configuration

For production deployment:

1. Set `synchronize: false` in `app.module.ts` TypeORM configuration
2. Use database migrations instead of auto-sync
3. Set appropriate environment variables
4. Enable HTTPS
5. Configure proper CORS settings
6. Use a process manager like PM2

## License

This project is [MIT licensed](LICENSE).

## Author

Created with NestJS framework.
