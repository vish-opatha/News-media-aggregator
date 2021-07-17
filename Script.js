var htmlBody = document.querySelector('body');
var redditInput =document.querySelector('#search-bar');
var searchRedditBtn =document.querySelector("#search-sub-reddit");


//Following code should happen on the button click event
//For now, I am using dummy data
var searchTerm="Adelaide";

if (searchTerm) 
{
    getNewListings(searchTerm);
    searchTerm="";
} 

else 
{
    window.alert("Please enter something to search.")
}

//########## This function is used to get the new 10 listings of the given subreddit##############
function getNewListings(searchTerm)
{
    var fetchUrl="https://www.reddit.com/r/"+searchTerm+"/new.json?limit=10";
       
    fetch(fetchUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayListings(data);
                    console.log(data);
                });
            } 
            
            else if(response.status===404){
                Window.alert("This does not exist");
            }
            })
                .catch(function (error) {
                    alert('Cannot connect to Reddit');
            });          
            
}

//########## This function is used to display the new listings ##############
function displayListings (listings) 
{
    if (listings.data.children.length === 0) 
    {
      console.log("Nothing found to display for this search term.");
      return;
    }
    
    else
    {
        for (var i = 0; i < listings.data.children.length; i++) 
        {
            var listingTitle =listings.data.children[i].data.title;
            var listingContent = listings.data.children[i].data.selftext;
            var listingAuthor = listings.data.children[i].data.author;
            var listingUrl =listings.data.children[i].data.url;
            var listingUpdated=moment(listings.data.children[i].data.created,"X").format("dddd, MMMM Do YYYY, h:mm:ss a")
           
            //var listingMedia= 
           
            console.log(listingTitle);
            console.log(listingContent); 
            console.log(listingAuthor);
            console.log(listingUrl);
            console.log(listingUpdated);
    }
    }   
  };


// dummyData = {
//     title: "Test title",
//     content: "I am test text-content",
//     author: "I am the test author",
//     url: "www.reddit.com/r/test/test",
//     mediaurls: ['https://preview.redd.it/09u6hmoj25b71.jpg?width=3024&format=pjpg&auto=webp&s=dc8bd26c15cb3049955c439b758eb9fd09e33b20'],
//     created: '9am'
// };

// function createRedditPost(data) {
//     var redditPost = document.createElement('div');
//     var redditTitle = document.createElement('h2');
//     redditTitle.textContent = data.title;
//     var redditInfo = document.createElement('p');
//     redditInfo.textContent = data.author + ' ' + data.url + ' ' + data.created;
//     redditPost.appendChild(redditTitle);
//     redditPost.appendChild(redditInfo);
//     if (data.content) {
//         var redditTextContent = document.createElement('p');
//         redditTextContent.textContent = data.content;
//         redditPost.appendChild(redditTextContent);
//     }
//     if (data.mediaurls) {
//         var redditImg = document.createElement('img');
//         redditImg.setAttribute('src', data.mediaurls[0]);
//         redditImg.setAttribute('style', 'width: 500px;');
//         redditPost.appendChild(redditImg);
//     }
//     htmlBody.appendChild(redditPost);
// };

// createRedditPost(dummyData);