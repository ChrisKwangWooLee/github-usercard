/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

axios.get('https://api.github.com/users/ChrisKwangWooLee')

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/


/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

.then(response => {
  // console.log(response);
  // const cards = document.querySelector('.cards');
  // cards.appendChild(createCard(response));
  console.log(response);
  createFollowersCard(response);
})
.catch(err => {
  console.log(`Error: `, err);
})

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = ['misskellymore', 'richardmachado', 'nicbongo', 'tetondan', 'dustinmyers', 
// 'justsml', 'luishrd', 'bigknell'];

// followersArray.forEach(nameStr => {
//   axios.get(`https://api.github.com/users/${nameStr}`)
//   .then(response => {
//     console.log(response);
//     const cards = document.querySelector('.cards');
//     cards.appendChild(createCard(response));
//   })
//   .catch(err => {
//     console.log('Error from forEach: ', err);
//   })
// })

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <div class= 'card-img-info'>
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
  <div class = 'calendar'></div>
  <div class='button-container'>
    <p class='open-button btn-on'>	\u25BC</p>
    <p class='close-button'>Close</p>
  </div>
</div>

*/

function createCard(dataObj) {
  // create element
  const newCard = document.createElement('div'),
        newImg = document.createElement('img'),
        newCardInfo = document.createElement('div'),
        newName = document.createElement('h3'),
        newUserName = document.createElement('p'),
        newLocation = document.createElement('p'),
        newProfile = document.createElement('p'),
        newUserAddress = document.createElement('a'),
        newFollowers = document.createElement('p'),
        newFollowing = document.createElement('p'),
        newBio = document.createElement('p'),
        // Stretch
        cardImgInfo = document.createElement('div'),
        newCalendar = document.createElement('div'),
        buttonContainer = document.createElement('div'),
        openButton = document.createElement('p'),
        closeButton = document.createElement('p');

  // fetch calendar (stretch)
  const calendar = new GitHubCalendar(".calendar", dataObj.data.login);
  
  calendar
  .then(response => {
    console.dir('THIS: ', response);
  })
  


  // add class
  newCard.classList.add('card');
  newCardInfo.classList.add('card-info');
  newName.classList.add('name');
  newUserName.classList.add('username');
  cardImgInfo.classList.add('card-img-info');
  newCalendar.classList.add('calendar');


  // Stretch
  buttonContainer.classList.add('button-container');
  openButton.classList.add('open-button');
  openButton.classList.add('btn-on');
  closeButton.classList.add('close-button');

  // add src and content
  newImg.src = dataObj.data.avatar_url;
  newName.textContent = dataObj.data.name;
  newUserName.textContent = dataObj.data.login;
  newLocation.textContent = `Location: ${dataObj.data.location}`;
  newProfile.textContent = `Profile: `;
  newUserAddress.href = dataObj.data.url;
  newUserAddress.textContent = dataObj.data.url;
  newFollowers.textContent = `Followers: ${dataObj.data.followers}`;
  newFollowing.textContent = `Following: ${dataObj.data.following}`;
  newBio.textContent = `Bio: ${dataObj.data.bio}`;
  // Stretch
  openButton.textContent = `\u25BD`;
  closeButton.textContent = '\u25B3';

  // append
  newProfile.appendChild(newUserAddress);
  newCardInfo.appendChild(newName);
  newCardInfo.appendChild(newUserName);
  newCardInfo.appendChild(newLocation);
  newCardInfo.appendChild(newProfile);
  newCardInfo.appendChild(newFollowers);
  newCardInfo.appendChild(newFollowing);
  newCardInfo.appendChild(newBio);
  cardImgInfo.appendChild(newImg);
  cardImgInfo.appendChild(newCardInfo);
  // Stretch
  buttonContainer.appendChild(openButton);
  buttonContainer.appendChild(closeButton);
  newCard.appendChild(cardImgInfo);
  newCard.appendChild(newCalendar);
  newCard.appendChild(buttonContainer);

  // Add event listener
  openButton.addEventListener('click', event => {
    console.log('open button clicked', event.target);
    event.stopPropagation();
    
    closeButton.classList.toggle('btn-on');
    event.target.classList.toggle('btn-on');
    newCalendar.classList.toggle('cal-on');
  });

  closeButton.addEventListener('click', event => {
    console.log('close button clicked', event.target);

    openButton.classList.toggle('btn-on');
    event.target.classList.toggle('btn-on');
    newCalendar.classList.toggle('cal-on');
  })

  return newCard;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

// Stretch
/*
Instead of manually creating a list of followers, do it programmatically. 
Create a function that requests the followers data from the API after it has 
received your data and create a card for each of your followers. Hint: you can chain promises.
*/

function createFollowersCard(dataObj) {
  console.log(dataObj.data.followers_url);
  
  axios.get(dataObj.data.followers_url)
  .then(response => {
    console.log(response);
    response.data.forEach( followerObj => {
      axios.get(`https://api.github.com/users/${followerObj.login}`)
      .then(response => {
        console.log(`STRETCH - followers: ${response}`);
        const cards = document.querySelector('.cards');
        cards.appendChild(createCard(response));
      })
      .catch(err => {
        console.log(`STRETCH - ERROR: `, err);
      })
    })
  })
};