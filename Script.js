var postSection = document.querySelector('#results');

//Following code should happen on the button click event
//For now, I am using dummy data
var searchTerm = "Adelaide";

if (searchTerm) {
    getNewListings(searchTerm);
    searchTerm = "";
}

else {
    window.alert("Please enter something to search.")
}

//########## This function is used to get the new 10 listings of the given subreddit##############
function getNewListings(searchTerm) {
    var fetchUrl = "https://www.reddit.com/r/" + searchTerm + "/new.json?limit=10";

    fetch(fetchUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayListings(data);
                    console.log(data);
                });
            }

            else if (response.status === 404) {
                Window.alert("This does not exist");
            }
        })
        .catch(function (error) {
            alert('Cannot connect to Reddit');
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

    // if the post has selfText create element
    if (data.selftext) {
        var redditTextContent = document.createElement('p');
        redditTextContent.innerHTML = data.selftext.replace(/&amp;/g, '&');
        redditPost.appendChild(redditTextContent);
    }
    // if the post has an iamge create element
    if (data.preview) {
        console.log("hello");
        var redditPreview = document.createElement('img');
        redditPreview.setAttribute('src', data.preview.images[0].source.url.replace(/&amp;/g, '&'));
        redditPreview.setAttribute('style', 'width: 80%');
        redditPost.appendChild(redditPreview);
    }

    // add divs to DOM
    redditPost.appendChild(redditTitle);
    redditPost.appendChild(redditInfo);
    redditPost.appendChild(redditLink);
    redditPostDiv.appendChild(redditPost);
    postSection.appendChild(redditPostDiv);

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