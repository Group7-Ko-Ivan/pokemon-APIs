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

* URL: `/register`

* Method: `POST`

* Request Params: `None`

* Request Body: `{ email, password }`

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

## Register User
---

Register User

* URL: `/register`

* Method: `POST`

* Request Params: `None`

* Request Body: `{ email, password }`

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
