# Annotation App

## User apis
#### 1. POST  - /api/user/ - Create User - require userId, email, password
#### 2. POST  - /api/user/auth - For User authenication - require userId, password
 
## Admin apis
#### 1. GET - /api/admin - Get all the images
#### 2. Get - /api/admin/export/:format - Export image data format can be either csv or json

## Image apis
#### 1. POST - /api/image - Upload image and create entry in db along with the image labels - require admin token (admin login) , image
#### 2. POST - /api/image/approve - Only Admin can approve images - require image objectId as id
#### 3. POST - /api/images/reject - Only Admin can reject images - require image objectId as id

Default Admin credentials: 
userId: admin
password: admin

Normal User credentials:
userId: diwakar
password: 123456

# Postman Collection JSON (can be imported for testing)
{
	"info": {
		"_postman_id": "ee046594-b63e-40ba-8248-be3dead2a4b9",
		"name": "annotationAppApis",
		"schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json",
		"_exporter_id": "21387923"
	},
	"item": [
		{
			"name": "create user",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "urlencoded",
					"urlencoded": [
						{
							"key": "userId",
							"value": "",
							"type": "text"
						},
						{
							"key": "password",
							"value": "",
							"type": "text"
						},
						{
							"key": "email",
							"value": "",
							"type": "text"
						}
					]
				},
				"url": "http://localhost:3000/api/user"
			},
			"response": []
		},
		{
			"name": "auth user",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "urlencoded",
					"urlencoded": [
						{
							"key": "userId",
							"value": "",
							"type": "text"
						},
						{
							"key": "password",
							"value": "",
							"type": "text"
						},
						{
							"key": "email",
							"value": "admin@gmail.com",
							"type": "text",
							"disabled": true
						}
					]
				},
				"url": "http://localhost:3000/api/user/auth"
			},
			"response": []
		},
		{
			"name": "export Data (Temp for everyone)",
			"request": {
				"method": "GET",
				"header": [],
				"url": "http://localhost:3000/api/admin/export/json"
			},
			"response": []
		},
		{
			"name": "get images (Only for admin)",
			"request": {
				"method": "GET",
				"header": [],
				"url": "http://localhost:3000/api/image/"
			},
			"response": []
		},
		{
			"name": "upload image",
			"protocolProfileBehavior": {
				"disableCookies": false
			},
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "image",
							"type": "file",
							"src": "/home/tinku/Downloads/setller.jpeg"
						}
					]
				},
				"url": "http://localhost:3000/api/image"
			},
			"response": []
		},
		{
			"name": "approve image (Only for admin)",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "urlencoded",
					"urlencoded": [
						{
							"key": "id",
							"value": "6630d4532c346e84f12c7a46",
							"type": "text"
						}
					]
				},
				"url": "http://localhost:3000/api/image/approve"
			},
			"response": []
		},
		{
			"name": "reject image (Only for admin)",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "urlencoded",
					"urlencoded": [
						{
							"key": "id",
							"value": "",
							"type": "text"
						}
					]
				},
				"url": "http://localhost:3000/api/image/reject"
			},
			"response": []
		}
	]
}