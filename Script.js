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
                    //console.log(data);
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
           
           
           
            //console.log(listingTitle);
            //console.log(listingContent); 
            //console.log(listingAuthor);
            //console.log(listingUrl);
            //console.log(listingUpdated);
    }
    }   
  };

 


function addCollapseListener() {
    var collapseBtns = document.querySelectorAll('.collapse-btn');

    for (var i = 0; i < collapseBtns.length; i++) {
        collapseBtns[i].addEventListener('click', function (e) {
            collapseForm(e);
        });
    };
};

function collapseForm(e) {
    var searchForm = e.target.closest('section');
    // get the icon element
    var collapseIcon = e.currentTarget.children[0].children[0];

    if (searchForm.dataset.visible === 'visible') {
        collapseIcon.classList.add('fa-angle-down')
        collapseIcon.classList.remove('fa-angle-up')
        searchForm.dataset.visible = 'hidden';
        searchForm.children[1].setAttribute('style', 'display:none');
        searchForm.children[2].setAttribute('style', 'display:none');
    } else {
        collapseIcon.classList.add('fa-angle-up')
        collapseIcon.classList.remove('fa-angle-down')
        searchForm.dataset.visible = 'visible';
        searchForm.children[1].setAttribute('style', '');
        searchForm.children[2].setAttribute('style', '');
    }
}

addCollapseListener();

dummyData = {
    title: "Test title",
    content: "I am test text-content",
    author: "I am the test author",
    url: "www.reddit.com/r/test/test",
    mediaurls: ['https://preview.redd.it/09u6hmoj25b71.jpg?width=3024&format=pjpg&auto=webp&s=dc8bd26c15cb3049955c439b758eb9fd09e33b20'],
    created: '9am'
};

function createRedditPost(data) {
    var redditPost = document.createElement('div');
    var redditTitle = document.createElement('h2');
    redditTitle.textContent = data.title;
    var redditInfo = document.createElement('p');
    redditInfo.textContent = data.author + ' ' + data.url + ' ' + data.created;
    redditPost.appendChild(redditTitle);
    redditPost.appendChild(redditInfo);
    if (data.content) {
        var redditTextContent = document.createElement('p');
        redditTextContent.textContent = data.content;
        redditPost.appendChild(redditTextContent);
    }
    if (data.mediaurls) {
        var redditImg = document.createElement('img');
        redditImg.setAttribute('src', data.mediaurls[0]);
        redditImg.setAttribute('style', 'width: 500px;');
        redditPost.appendChild(redditImg);
    }
    htmlBody.appendChild(redditPost);
};

//============== This function does not provide facility to work on the browser for free API KEYS=============
// ########## This function fetch data from NEWS api  related to headlines ########
// Can incorperate changes to ask the user to select the country and category
// Country selection can be from a list ========>current selection is AU
// Category selection can be corperated to make the function versatile 
// Categories given business entertainment general health science sports technology ===> current selection is HEALTH

var countrySelected="au";
var categorySelected="health";
var newsApiKey="3f73e3712c734a048328f3b81657a073";

function getHeadlinesbyNewsAPI(countrySelected,categorySelected)
{
    var fetchUrl = "https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=3f73e3712c734a048328f3b81657a073";
    
    fetch(fetchUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                //displayHeadlines(data);
                console.log(data);
            });
        } 
        
        else if(response.status===404){
            Window.alert("This does not exist");
        }
        })
            .catch(function (error) {
                alert(error);
        });               
};

// ######### This function is used to display the headlines fetched from NEWSApi###################
function displayHeadlines(headlines)
{

}
//======================================================================================================
https://content.guardianapis.com/search?q=adelaide&query-fields=body&order-by=newest&format=json&api-key=dbc57ace-ea2e-44d4-a7fc-15eef74c24ad


// ######### This function fetches data using guardian API and provides lates news related to a given term.
var guardianKey = "dbc57ace-ea2e-44d4-a7fc-15eef74c24ad";
var searchT="Adelaide" // This is the user input
function searchByGuardian(searchTerm)
{
    if(searchTerm==="")
    {
        window.alert("Please enter something to search");
        return;
    }

    // This function is tailored to get the latest updates/news related to a given term.
    var fetchUrl = "https://content.guardianapis.com/search?q="+searchTerm+"&query-fields=body&order-by=newest&format=json&api-key="+guardianKey;

    fetch(fetchUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayLatestNews(data);
                console.log(data);
            });
        } 
        
        else if(response.status===404){
            Window.alert("This does not exist");
        }
        })
            .catch(function (error) {
                alert(error);
        });    

}

searchByGuardian(searchT);

function displayLatestNews(data)
{
    if (data.response.results.length === 0) 
    {
      console.log("Nothing found to display for this search term.");
      return;
    }
    
    else
    {
        for (var i = 0; i < data.response.results.length; i++) 
        {
            var postTitle = data.response.results[i].webTitle;
            var postUrl = data.response.results[i].webUrl;
            var postDate=moment(data.response.results[i].webPublicationDate).format("dddd, MMMM Do YYYY, h:mm:ss a");
            var apiUrl=data.response.results[i].apiUrl;
            
            console.log(postTitle);
            console.log(postUrl); 
            console.log(postDate);
            console.log(apiUrl);
    
            // This object does not contain any media urls

    }
    }   
}
