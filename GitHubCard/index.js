import axios from "axios";

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>

*/

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3 (line 34).
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

/* dom access */
const cards = document.querySelector('.cards') 

const followersArray = ['toxtli', 'audiowaves','cusspvz', 'dalinhuang99', 'alma4rebi', 'tetondan' ];
followersArray.forEach( user =>  doGitCall(user))

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

function onGitDataSuccess({data, status } ){
  console.log('onSucessAxios', status)
  /* render the card component */
  cards.appendChild(cardComponent(data)) 
}

function onGitDataFail({response, message } ){
  console.log('onFailAxios', response)
}

function doGitCall(user){
  /* get external data  */ //tetondan
  axios.get(`https://api.github.com/users/${user}`) 
  .then( res =>   onGitDataSuccess(res)  )
  .catch(err =>   onGitDataFail(err) )
}

  

 /* create structure : DOM */

function cardComponent(userInfo) {
 
  const template = [
    {el:'div', attr:'card' },
      {el:'img', parent:'card', url:userInfo.avatar_url },
      {el:'div', attr:'card-info', parent:'card' },
        {el:'h3', attr:'name', parent:'card-info',txt:userInfo.name},
        {el:'p', attr:'username', parent:'card-info',txt:userInfo.login},
        {el:'p', parent:'card-info', txt:`Location: ${userInfo.location}`},
        {el:'p', parent:'card-info', txt:`Profile: `},
          {el:'a', parent:'card-info', txt:userInfo.html_url, url:userInfo.html_url }, 
        {el:'p', parent:'card-info', txt:`Followers: ${userInfo.followers}`},
        {el:'p', parent:'card-info', txt:`Followers: ${userInfo.following}`},
        {el:'p', parent:'card-info', txt:`Bio: ${userInfo.bio}`}
    ]

    const newDOM = function (el){ return document.createElement(el) } // shorthand
    const markup = function(body){
      const container = newDOM('div') //main wrapper
      let tag = null
      body.forEach( ({el, attr, parent, url, txt}) => {
        tag = newDOM(el)
        if(attr){ tag.classList.add(attr) } 
        if(url){ tag.src = url } 
        if(txt){ tag.innerText = txt  } 
        const selector = parent ? container.querySelector(`.${parent}`) : container
        selector.appendChild(tag)
      })
    return container
  }

  return  markup(template) 
}