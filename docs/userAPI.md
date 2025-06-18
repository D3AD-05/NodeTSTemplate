# User API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently no authentication required (TODO: Implement authentication)

## Endpoints

### 1. Get All Users

- **Method**: GET
- **Endpoint**: `/users`
- **Description**: Retrieve all users' usernames

#### Response

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [{ "userName": "john_doe" }, { "userName": "jane_smith" }]
}
```

### 2. Create User

- **Method**: POST
- **Endpoint**: `/users`
- **Description**: Create a new user

#### Request Body

```json
{
  "userName": "string",
  "password": "string" // minimum 6 characters
}
```

#### Response

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "string",
    "userName": "string",
    "created_at": "timestamp"
  }
}
```

### 3. Update User

- **Method**: PUT
- **Endpoint**: `/users/:id`
- **Description**: Update an existing user

#### Request Body

```json
{
  "userName": "string", // optional
  "password": "string" // optional, minimum 6 characters
}
```

#### Response

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "string",
    "userName": "string",
    "updated_at": "timestamp"
  }
}
```

### 4. Delete User

- **Method**: DELETE
- **Endpoint**: `/users/:id`
- **Description**: Delete a user

#### Response

```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "id": "string"
  }
}
```

## Error Responses

### Common Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error description"
}
```

### Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error

## Notes

- All requests must include `Content-Type: application/json` header
- All responses are in JSON format
- Timestamps are in ISO 8601 format
