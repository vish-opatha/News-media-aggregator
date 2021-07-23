
var htmlBody = document.querySelector('body');


var postSection = document.querySelector('#results');

var searchSection = document.querySelector('#search-forms');



//Following code should happen on the button click event
//For now, I am using dummy data

// var subredditName = "Adelaide";

// if (subredditName) {
//     getNewListings(subredditName);
//     subredditName = "";
// }


// else {
//     displayError("Please enter something to search.")
// }

//########## This function is used to get the new 10 listings of the given subreddit##############

function getNewListings(subredditName) {
    var fetchUrl = "https://www.reddit.com/r/" + subredditName + "/new.json?limit=10";

    fetch(fetchUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayListings(data);
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
        displayError("Nothing found to display for this search term.")
        return;
    } else {
        for (var i = 0; i < listings.data.children.length; i++) {
            listings.data.children[i].data.created = moment(listings.data.children[i].data.created_utc, 'X').format("dddd, MMMM Do YYYY, h:mm:ss a");
            createRedditPost(listings.data.children[i].data);

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
        var redditPreview = document.createElement('img');
        redditPreview.setAttribute('src', data.preview.images[0].source.url.replace(/&amp;/g, '&'));
        redditPreview.setAttribute('style', 'width: 80%');
        redditPost.appendChild(redditPreview);
    }

    redditPostDiv.appendChild(redditPost);
    postSection.appendChild(redditPostDiv);
};

//########## This function is used to get the new 10 listings of the given SEARCH TERM ##############
function getNewSearchTerm(searchTerm) {
    var requestUrl = "https://www.reddit.com/search.json?q=" + searchTerm + "&type=link&limit=10";
    fetch(requestUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayListings(data);
                });
            }

            else if (response.status === 404) {
                displayError("This does not exist");
            }
        })
        .catch(function (error) {
            displayError("Cannot connect to Reddit");
        });

};

// add function to all search forms
function addCollapseListener() {
    var collapseBtns = document.querySelectorAll('.collapse-btn');

    for (var i = 0; i < collapseBtns.length; i++) {
        collapseBtns[i].parentNode.addEventListener('click', function (e) {
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

//searchByGuardian(searchT);

function displayLatestNews(data) {
    if (data.response.results.length === 0) {
        displayError("Nothing found to display for this search term.")
        return;
    } else {
        for (var i = 0; i < data.response.results.length; i++) {
            var postTitle = data.response.results[i].webTitle;
            var postUrl = data.response.results[i].webUrl;
            var postDate = moment(data.response.results[i].webPublicationDate).format("dddd, MMMM Do YYYY, h:mm:ss a");
            //var apiUrl = data.response.results[i].apiUrl;

            var guardianHeadlineDiv = document.createElement('div');
            guardianHeadlineDiv.classList = "column is-half-tablet is-one-third-desktop";

            var guardianHeadline = document.createElement('div');
            guardianHeadline.classList = "box";

            var guardianTitle = document.createElement('h2');
            guardianTitle.textContent = postTitle;
            guardianTitle.classList = "title is-4";

            var postDateStamp = document.createElement('p');
            postDateStamp.textContent = "Posted on - " + postDate;
            postDateStamp.classList = "subtitle is-6";

            var gaurdianLink = document.createElement('a');
            gaurdianLink.textContent = "View the page:";
            gaurdianLink.setAttribute('href', postUrl);
            gaurdianLink.setAttribute('target', '_blank');

            guardianHeadline.appendChild(guardianTitle);
            guardianHeadline.appendChild(postDateStamp);
            guardianHeadline.appendChild(gaurdianLink);

            guardianHeadlineDiv.appendChild(guardianHeadline);
            postSection.appendChild(guardianHeadlineDiv);
        }
    }
};

function displayError(error) {
    var errorMessageDiv = document.createElement('div');
    errorMessageDiv.classList = "notification is-danger";
    errorMessageDiv.textContent = "Woops something went wrong! Error Message: " + error;

    searchSection.prepend(errorMessageDiv);

    setTimeout(() => {
        errorMessageDiv.remove();
    }, 3000);
};

// createRedditPost(dummyData);

var guardianSearchButton = document.getElementById("guardian-search-form");
var searchRedditButton = document.querySelector("#reddit-search-button");
var subredditSearchButton = document.getElementById('subreddit-search-form');
var clearSearchButton = document.getElementById('clear-results');

var subRedditInput = document.querySelector('#SubredditName');
var guardianInput = document.querySelector('#gaurdian-search-term');


// variables to enable localStorage for Reddit Search term
var savedST;
var storedSearches;
var STDropDown = document.getElementById("search-term-history");

// gets search info from localStorage if it exists
function getSearches() {
    storedSearches = JSON.parse(localStorage.getItem("Search Term"));
    if (!storedSearches) {
        savedST = [];
    } else {
        savedST = storedSearches;
        STSavedSearches();
    }
};

function STSavedSearches() {
    var recentST = JSON.parse(localStorage.getItem("Search Term"));
    for (var i = 0; i < recentST.length; i++) {
        var recentDD = document.createElement("option");
        recentDD.setAttribute("value", recentST[i]);
        STDropDown.appendChild(recentDD);
        recentDD.innerHTML = recentST[i];
    }
};

getSearches();

//for the Reddit search submit button
searchRedditButton.addEventListener('click', function (event) {
    event.preventDefault();
    var redditInput = document.querySelector('#searchTerm');
    if (!savedST.includes(redditInput.value)) {
        savedST.push(redditInput.value);
        localStorage.setItem("Search Term", JSON.stringify(savedST));
        //Retrieve local storage and put data into drop down as a recent search//
        var recentST = JSON.parse(localStorage.getItem("Search Term"));
        var recentDD = document.createElement("option");
        recentDD.setAttribute("value", recentST[recentST.length - 1]);
        STDropDown.appendChild(recentDD);
        recentDD.innerHTML = recentST[recentST.length - 1];
    }
    getNewSearchTerm(redditInput.value);
    redditInput.value = "";
});

// variables to enable localStorage for Sub Reddit Name
var savedSR;
var storedSubRSearches;
// gets search info from localStorage if it exists
function getSubRSearches() {
    storedSubRSearches = JSON.parse(localStorage.getItem("Sub-Reddit Name"));
    if (!storedSubRSearches) {
        savedSR = [];
    } else {
        savedSR = storedSubRSearches;
        SRSavedSearches();
    }
};

var SRDropDown = document.getElementById("subreddit-name-history");
getSubRSearches();

// getNewSearchTerm(searchTerm);

//for the Subraddit search submit button

subredditSearchButton.addEventListener('click', function (event) {
    event.preventDefault()
    var subredditName = document.getElementById("SubredditName").value
    if (!savedSR.includes(subredditName)) {
        savedSR.push(SubredditName.value);
        //Retrieve local storage and put data into drop down as a recent search//
        localStorage.setItem("Sub-Reddit Name", JSON.stringify(savedSR));
        var recentSR = JSON.parse(localStorage.getItem("Sub-Reddit Name"));
        var recentDDSR = document.createElement("option");
        recentDDSR.setAttribute("value", recentSR[recentSR.length - 1]);
        SRDropDown.appendChild(recentDDSR);
        recentDDSR.innerHTML = recentSR[recentSR.length - 1];
    }
    getNewListings(subredditName);
    document.getElementById("SubredditName").value = "";
});

//looping over the aaray to get persist the data.
function SRSavedSearches() {
    var recentSR = JSON.parse(localStorage.getItem("Sub-Reddit Name"));
    for (var i = 0; i < recentSR.length; i++) {
        var recentDDSR = document.createElement("option");
        recentDDSR.setAttribute("value", recentSR[i]);
        SRDropDown.appendChild(recentDDSR);
        recentDDSR.innerHTML = recentSR[i];
    }
};

// variables to enable localStorage for The Guardian Search term
var savedGuard;
var storedGuardSearches;
// gets search info from localStorage if it exists
function getGuardSearches() {
    storedGuardSearches = JSON.parse(localStorage.getItem("Guardian Term"));
    if (!storedGuardSearches) {
        savedGuard = [];
    } else {
        savedGuard = storedGuardSearches;
        GuardSavedSearches();
    }
};

var guardDropDown = document.getElementById("guardian-name-history");
getGuardSearches();
//for the The Guardian search submit button

guardianSearchButton.addEventListener('click', function (event) {

    event.preventDefault();

    var theGuardianName = document.getElementById("guardian-term");
    if (!savedGuard.includes(theGuardianName.value)) {
        savedGuard.push(theGuardianName.value);
        localStorage.setItem("Guardian Term", JSON.stringify(savedGuard));
        //Retrieve local storage and put data into drop down as a recent search//
        var recentGuardST = JSON.parse(localStorage.getItem("Guardian Term"));
        var recentDDGuard = document.createElement("option");
        recentDDGuard.setAttribute("value", recentGuardST[recentGuardST.length - 1]);
        guardDropDown.appendChild(recentDDGuard);
        recentDDGuard.innerHTML = recentGuardST[recentGuardST.length - 1];
    };

    searchByGuardian(savedGuard);
    theGuardianName.value = "";


});

function GuardSavedSearches() {
    var recentGuard = JSON.parse(localStorage.getItem("Guardian Term"));
    for (var i = 0; i < recentGuard.length; i++) {
        var recentDD = document.createElement("option");
        recentDD.setAttribute("value", recentGuard[i]);
        guardDropDown.appendChild(recentDD);
        recentDD.innerHTML = recentGuard[i];
    }
};

clearSearchButton.addEventListener('click', function () {
    postSection.innerHTML = "";
});


//Retrieve local storage and put data into drop down as a recent search//
