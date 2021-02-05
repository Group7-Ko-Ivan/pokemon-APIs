# Pokemon

<br>

## Show Pokemon Trading Card

---

Returns All Pokemon Trading Card List

* URL: `/card`

* Method: `GET`

* Request Params: `None`

* Request Body: `None`

* Success Response:

  * **Code**: `200`
  * **Content**:
    >`{"output": [
        "https://images.pokemontcg.io/pl1/1.png",
        "https://images.pokemontcg.io/det1/1.png"
        }`

<br>

* **Error Response**
  * **Code**: `500`
  * **Content**: `Internal Server Error`

<br>

## Show Card

---

Returns All Pokedex List

* URL: `/pokemon`

* Method: `GET`

* Request Params: `None`

* Request Body: `None`

* Success Response:

  * **Code**: `200`
  * **Content**:
    > `"images": {
        "small": "https://images.pokemontcg.io/pl1/1.png",
        "large": "https://images.pokemontcg.io/pl1/1_hires.png"
    }`

<br>

* **Error Response**
  * **Code**: `500`
  * **Content**: `Internal Server Error`

<br>

### Show Currency

---

Returns Currency List

* URL: `/currency`

* Method: `GET`

* Request Params: `None`

* Request Body: `None`

* Success Response:

  * **Code**: `200`
  * **Content**:
    > `"images": {
        "small": "https://images.pokemontcg.io/pl1/1.png",
        "large": "https://images.pokemontcg.io/pl1/1_hires.png"
    }`

<br>

* **Error Response**
  * **Code**: `500`
  * **Content**: `Internal Server Error`

<br>

# Users

## User Login

---

User Login

* URL: `/users/register`

* Method: `POST`

* Request Params: `None`

* Request Body: `{ email, password }`

* Success Response:

  * **Code**: `200`
  * **Content**:
    > `{ access_token: "BKHVKJDSKJHKHu.jhafslufBBJB"
    }`

<br>

* **Error Response**
  * **Code**: `400`
  * **Content**:
      > `{ errors: [ "Your email or password is incorrect" ] 
      }` <br/>
   
   OR 

  * **Code**: `500`
  * **Content**: 
    > `{ errors: [ "Internal server error" ] 
    }`

<br>

## Register User
---

Register User

* URL: `/users/register`

* Method: `POST`

* Request Params: `None`

* Request Body: `{ name, email, password }`

* Success Response:

  * **Code**: `201`
  * **Content**:
    > `{
    "success": "Registration success",
    "id": 1,
    "email": "ami@gmail.com" }`

<br>

* **Error Response**
  * **Code**: `400`
  * **Content**:
      > `{ errors: [ "Email is required",
     "Please enter your name", 
     "Please enter your password", 
     "Email has been used", 
     "Please enter a valid email" ]}` <br/>

   OR 

  * **Code**: `500`
  * **Content**:
    > `{ errors: [ "Internal server error" ] 
    }`
