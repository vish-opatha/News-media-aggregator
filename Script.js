var htmlBody = document.querySelector('body');


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

// createRedditPost(dummyData);