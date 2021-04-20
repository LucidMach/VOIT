[VOIT](https://voit-beta.herokuapp.com/)

# VOIT

VOIT or Voice Operated Internet Thing is an UI that lets you control any bot/thing (as in Internet of Things) through a voice based web interface.

## Why VOIT

In the modern world, every gadget has an UI,
With internet things becoming more and more common, there is a huge need for us to build UI for them.
Since every internet thing is already connected to the web, it's most efficient to create a web interface for them.
Now most internet thing's have an button intense web interface. Doesn't really make sense to use traditional web interfaces for internet robots.
It's more intuitive if the bot could be interacted with our voices.
We can implement that by either having a mic & skeaker inside the bot (or) a web interface on a smartphone/laptop to keep down costs.
Implementing it through a web interface is the tougher approach but it can be used to fulfil the other approach too since it is very flexible.
Hence VOIT would use a voice based web inteface to control any(thing)

## How Does VOIT Work

VOIT has 3 major components

1. Authentication
2. Command Extraction
3. IoT

</br>

### Authentication

For VOIT, Authentication playes a major role in ensuring that a registed user is actually controlling the internet thing.
For Authentication, We could use either

1. Voice Recognition
2. JWT Authentication

For now we're using JWT
JWT is a token based system, The server assigns to a user a token when he/she signs-in.
To access a restriced page, The user must send a request with the token in it's headers.
The server verifies the token (sees if the token is untampered) and gives the user access to the page.

#### Storing Passwords

When you sign-in the password is hashed using SHA256 before it is stored in an javascript object.
This object is then jsonified and then uploaded to the database(mongoDB Atlas)

#### Storing Tokens

The most effective way to store tokens is in cookies,
There are 2 main reason for storing JWTs in cookies

1. token's can be set to http only, implying that it can't be accessed by javascript code, this makes it XSS(cross-site scripting) attack proof
2. JWT are stored in JSON making them very compact

</br>

### Command Extraction

Obvios, we can use AI-ML/DL/RL to parse meaning out of sentences, but that utilises more computation.
So for VOIT we would utilising regEx to find predefined keywords in an sentence.

regEx finds given patterns in a string, when it finds a match, it check's the object(dictionary) keys for the match and returns the key's value as a response

</br>

### IoT

VOIT runs on an nodejs server. It has 2 types of clients:

1. Web Client(browser)
2. Thing Client(ESP8266)

Server Routes for Interface Clients:

1. GET "/" : renders the home page
2. GET "/signin" : renders the sign-in page with option for login/signup
3. POST "/login" : sends the login data to the server and returns a JSON file that's tells the status of login
4. POST "/signup" : sends the signup data to the server where it hashes it before sending it to the database(mongoDB atlas)
5. GET "/mic" : renders the mic page
6. POST "/command" : sends the commands extracted from text extracted from speech to the server

Server Routes for Thing Clients:

1. GET "/command" : recieves a JSON file every X seconds containing the latest command that the server has recieved
