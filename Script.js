
var htmlBody = document.querySelector('body');

var redditInput = document.querySelector('#search-bar');
var postSection = document.querySelector('#results');

var searchSection = document.querySelector('#search-forms');



//Following code should happen on the button click event
//For now, I am using dummy data

var subredditName = "Adelaide";

if (subredditName) {
    getNewListings(subredditName);
    subredditName = "";
}


else {
    displayError("Please enter something to search.")
}

//########## This function is used to get the new 10 listings of the given subreddit##############

function getNewListings(subredditName) {
    var fetchUrl = "https://www.reddit.com/r/" + subredditName + "/new.json?limit=10";

    fetch(fetchUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayListings(data);
                    console.log(data);
                });
            }

            else if (response.status === 404) {
                displayError("This does not exist")
            }
        })
        .catch(function (error) {
            displayError(error + ". cannot connect to Reddit");
        });

}

// //########## This function is used to display the new listings ##############
function displayListings(listings) {
    if (listings.data.children.length === 0) {
        console.log("Nothing found to display for this search term.");
        return;
    } else {
        for (var i = 0; i < listings.data.children.length; i++) {
            listings.data.children[i].data.created = moment(listings.data.children[i].data.created_utc, 'X').format("dddd, MMMM Do YYYY, h:mm:ss a");
            createRedditPost(listings.data.children[i].data);

            //     var listingTitle = listings.data.children[i].data.title;
            //     var listingContent = listings.data.children[i].data.selftext;
            //     var listingAuthor = listings.data.children[i].data.author;
            //     var listingUrl = listings.data.children[i].data.url;
            //     var listingUpdated = moment(listings.data.children[i].data.created, "X").format("dddd, MMMM Do YYYY, h:mm:ss a")

            //     //var listingMedia= 

            //     console.log(listingTitle);
            //     console.log(listingContent);
            //     console.log(listingAuthor);
            //     console.log(listingUrl);
            //     console.log(listingUpdated);
            // }
        }
    }
};

//   //I did not find any media urls yet.

// Add reddit data to the DOM
function createRedditPost(data) {
    // create column container for reddit post
    var redditPostDiv = document.createElement('div');
    redditPostDiv.classList = "column is-half-tablet is-one-third-desktop";
    // create box for styling
    var redditPost = document.createElement('div');
    redditPost.classList = "box"
    // title of the post
    var redditTitle = document.createElement('h2');
    redditTitle.textContent = data.title.replace(/&amp;/g, '&'); //replace &amp; with &
    redditTitle.classList = "title is-4";
    // author and timestamp
    var redditInfo = document.createElement('p');
    redditInfo.textContent = "Posted by - " + data.author + ' - ' + data.created;
    redditInfo.classList = "subtitle is-6";
    // post url
    var redditLink = document.createElement('a');
    redditLink.textContent = data.permalink;
    redditLink.setAttribute('href', 'https://www.reddit.com' + data.permalink);
    redditLink.setAttribute('target', '_blank');


    // add divs to DOM
    redditPost.appendChild(redditTitle);
    redditPost.appendChild(redditInfo);
    redditPost.appendChild(redditLink);

    // if the post has selfText create element
    if (data.selftext) {
        var redditTextContent = document.createElement('p');
        redditTextContent.innerHTML = data.selftext.replace(/&amp;/g, '&');
        redditPost.appendChild(redditTextContent);
    }

    // if the post has an image create element
    if (data.preview) {
        // console.log("hello");
        var redditPreview = document.createElement('img');
        redditPreview.setAttribute('src', data.preview.images[0].source.url.replace(/&amp;/g, '&'));
        redditPreview.setAttribute('style', 'width: 80%');
        redditPost.appendChild(redditPreview);
    }

    redditPostDiv.appendChild(redditPost);
    postSection.appendChild(redditPostDiv);
};

//Added by Anthony- Function for the search Term to return the 10 most recent post's related to that term as an object
var searchTerm = "Adelaide";

if (searchTerm) {
    console.log(searchTerm);
    getNewSearchTerm(searchTerm);
    searchTerm = "";
}

else {
    displayError("Please enter something to search.")
}

//########## This function is used to get the new 10 listings of the given SEARCH TERM ##############
function getNewSearchTerm(searchTerm) {
    console.log(searchTerm);
    var requestUrl = "https://www.reddit.com/search.json?q=" + searchTerm + "&type=link&limit=10";
    fetch(requestUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayListings(data);
                    console.log(data);
                });
            }

            else if (response.status === 404) {
                displayError("This does not exist");
            }
        })
        .catch(function (error) {
            displayError("Cannot connect to Reddit");
        });

}

//########## This function is used to display the new listings ##############
function displaySTListings(listings) {
    if (listings.data.children.length === 0) {
        console.log("Nothing found to display for this search term.");
        return;
    }

    else {
        for (var i = 0; i < listings.data.children.length; i++) {
            var listingTitle = listings.data.children[i].data.title;
            var listingContent = listings.data.children[i].data.selftext;
            var listingAuthor = listings.data.children[i].data.author;
            var listingUrl = listings.data.children[i].data.url;
            var listingUpdated = moment(listings.data.children[i].data.created, "X").format("dddd, MMMM Do YYYY, h:mm:ss a")


            console.log(listingTitle);
            console.log(listingContent);
            console.log(listingAuthor);
            console.log(listingUrl);
            console.log(listingUpdated);

        }
    }
};

// add function to all search forms
function addCollapseListener() {
    var collapseBtns = document.querySelectorAll('.collapse-btn');

    for (var i = 0; i < collapseBtns.length; i++) {
        collapseBtns[i].addEventListener('click', function (e) {
            collapseForm(e);
        });
    };
};

// function to collapse forms
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

//============== This function does not provide facility to work on the browser for free API KEYS=============
// ########## This function fetch data from NEWS api  related to headlines ########
// Can incorperate changes to ask the user to select the country and category
// Country selection can be from a list ========>current selection is AU
// Category selection can be corperated to make the function versatile 
// Categories given business entertainment general health science sports technology ===> current selection is HEALTH

var countrySelected = "au";
var categorySelected = "health";
var newsApiKey = "3f73e3712c734a048328f3b81657a073";

function getHeadlinesbyNewsAPI(countrySelected, categorySelected) {
    var fetchUrl = "https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=3f73e3712c734a048328f3b81657a073";

    fetch(fetchUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    //displayHeadlines(data);
                    console.log(data);
                });
            }

            else if (response.status === 404) {
                displayError("This does not exist");
            }
        })
        .catch(function (error) {
            displayError(error);
        });
};

// ######### This function is used to display the headlines fetched from NEWSApi###################
function displayHeadlines(headlines) {

}
//======================================================================================================
https://content.guardianapis.com/search?q=adelaide&query-fields=body&order-by=newest&format=json&api-key=dbc57ace-ea2e-44d4-a7fc-15eef74c24ad


// ######### This function fetches data using guardian API and provides lates news related to a given term.
var guardianKey = "dbc57ace-ea2e-44d4-a7fc-15eef74c24ad";
var searchT = "Adelaide" // This is the user input
function searchByGuardian(searchTerm) {
    if (searchTerm === "") {
        displayError("Please enter something to search");
        return;
    }

    // This function is tailored to get the latest updates/news related to a given term.
    var fetchUrl = "https://content.guardianapis.com/search?q=" + searchTerm + "&query-fields=body&order-by=newest&format=json&api-key=" + guardianKey;

    fetch(fetchUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayLatestNews(data);
                    console.log(data);
                });
            }

            else if (response.status === 404) {
                displayError("This does not exist");
            }
        })
        .catch(function (error) {
            displayError(error);
        });

}

searchByGuardian(searchT);

function displayLatestNews(data) {
    if (data.response.results.length === 0) {
        console.log("Nothing found to display for this search term.");
        return;
    }

    else {
        for (var i = 0; i < data.response.results.length; i++) {
            var postTitle = data.response.results[i].webTitle;
            var postUrl = data.response.results[i].webUrl;
            var postDate = moment(data.response.results[i].webPublicationDate).format("dddd, MMMM Do YYYY, h:mm:ss a");
            var apiUrl = data.response.results[i].apiUrl;

            console.log(postTitle);
            console.log(postUrl);
            console.log(postDate);
            console.log(apiUrl);

            // This object does not contain any media urls

        }
    }
}


function displayError(error) {
    console.log(error);
    var errorMessageDiv = document.createElement('div');
    errorMessageDiv.classList = "notification is-danger";
    errorMessageDiv.textContent = "Woops something went wrong! Error Message: " + error;

    searchSection.prepend(errorMessageDiv);

    setTimeout(() => {
        errorMessageDiv.remove();
    }, 3000);

}

// createRedditPost(dummyData);

//for the Raddit search submit button


var searchRedditButton = document.querySelector("#reddit-search-button");
var subredditSearchButton = document.getElementById('subreddit-search-form');
var clearSearchButton = document.getElementById('clear-results');

searchRedditButton.addEventListener('click', function (event) {

    event.preventDefault();

    var searchTerm = document.getElementById("searchTerm").value;
    console.log(searchTerm);
});

//for the Subraddit search submit button

subredditSearchButton.addEventListener('click', function (event) {

    event.preventDefault()

    var subredditName = document.getElementById("SubredditName").value
    console.log(subredditName)
});

clearSearchButton.addEventListener('click', function () {
    postSection.innerHTML = "";
});
