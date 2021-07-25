# Project:-1 Interactive Front-End Application - News/Media Aggregator

This app allows the user to search for content from multiple News/Media website (Reddit and Guardian) and have the results dynamically update on the page. So that you can see all your favourite content with out opening multiple tabs or using complex google searches.

## Our Task

 Our Group Decided to make a project on Reddit, Subreddit and Guardian Search application. This application allow user to put their query for different media platform in only one application. With the use of this application anyone can search about the recent posts, news, and etc within one application rather than using different websites and wasting time. 

### User Story

AS A reader 
I  WANT to see the news from different news and media aggregator by simply using one application.
SO THAT I can update myself with recent news.
## Acceptance Criteria

GIVEN a new/media platform with form inputs 

### Form 1 : Reddit Search 
WHEN I search for any keyword in **Reddit** search form 
THEN I am able to input my query into input bar
THAT keyword also added to the search history on my local to access it if needed
WHEN I scroll down to the number of results options bar 
THEN I am able to select it from that dropdown option.
WHEN I submit my query using **Submit** button
THEN I am able to see the top results of my search keyword.
WHEN I submit my query using **Enter** button
THEN I am able to see the top results of my search keyword.
WHEN I entered any unknown search
THEN I am able to see the new webpage with error message rather then prompt or alert.

### Form 2 : Subreddit Search
WHEN I search for any keyword in **Subreddit** search form 
THEN I am able to input my query into input bar
THAT keyword also added to the search history on my local to access it if needed
WHEN I scroll down to the number of results options bar 
THEN I am able to select it from that dropdown option.
WHEN I submit my query using **Submit** button
THEN I am able to see the top results of my search keyword.
WHEN I submit my query using **Enter** button
THEN I am able to see the top results of my search keyword
WHEN I entered any unknown search
THEN I am able to see the new webpage with error message rather then prompt or alert.


### Form 3 : The Guardian Search
WHEN I search for any keyword in **Guardian** search form 
THEN I am able to input my query into input bar
THAT keyword also added to the search history on my local to access it if needed
WHEN I scroll down to the number of results options bar 
THEN I am able to select it from that dropdown option.
WHEN I submit my query using **Submit** button
THEN I am able to see the top results of my search keyword.
WHEN I submit my query using **Enter** button
THEN I am able to see the top results of my search keyword
WHEN I entered any unknown search
THEN I am able to see the new webpage with error message rather then prompt or alert.


## Usage

Enter your search terms into the corresponding form and click search! Results will populate below the forms. 

You can clear the results by clicking the 'Clear Search Results' Button. Your previous searches are saved as suggestions in each input.

The webpage can be viewed here: GITHUB URL

Here is a screengrab of the webpage:

![The website has a header containing a Title, navigation links and a weather widget. As well as 3 search forms for Reddit and The Guadrian](./Assets/IMG/Screengrab.png)

The following animation demonstrates the application functionality:

![The animation shows the functionality of using the search forms to dynamically get results from Reddit and The Guardian](./Assets/IMG/Animation.gif)

## Credits

To get the search results we use the Reddit API which can be found here: https://www.reddit.com/dev/api/ and the Guardian API which can be found here: https://open-platform.theguardian.com/

We used Bulma for our CSS framework which can be found here: https://bulma.io/ and Font-Awesome for some of Bulmas dependencies which can be found here: https://fontawesome.com/

We also used MomentJS to convert and format the date time data from the API calls, which can be found here: https://momentjs.com/
