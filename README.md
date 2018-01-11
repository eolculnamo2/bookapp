https://www.figma.com/file/BJmGyx749TgiSU3zVXEo5xZe/Recommended-By-%E2%80%93-App-Screens-v0.1?node-id=1%3A231

^work up

Data models:

Book:
title: String,
author: String,
year: String,
read: Boolean,
categories: Array,
tags: Array,
recommendBy: String,
amazonURL: String,
audibleURL: String,
rating: Number


User:
username
password
books
authority

To Do:
Base Function=>
1) Finish user authentication/Successfully save user to db. GOOD (Will create frontend when design received)
2) Set up API response (Goal for 01/11)
3) Create component ready to handle search and add books and relevant form data. (finish by End of Day 11/14)
4) Map selected books according to filters on SideMenu.(Finish by End of Day 11/16)
Clean Up =>
1) Make mobile responsive
2) Ensure all icons are correct
3) Check proportions against wireframes(margins, font sizes, height,width)
4) Error pages, alerts, i.e. bad login etc.
FINALIZED
Afterwork =>
1) Add additional user stories
2) Make necessary changes
3) Write thank you message


MISCELLANEOUS NOTES:
LOGIN WILL BE SEPARATE SCREEN
Add search icon magnifying glass,
Find correct downward arrow/carrot for unread&read see jquery link below  ui-icon-carat-1-s
https://api.jqueryui.com/1.12/theming/icons/
 <span className = "down-arrow">
                &#8744;
                    </span> 

I am looking to build a simple web app to help me keep track of books I want and have read.


The single page app will allow me to:

- Use a search field to lookup any book by name (via Amazon books API)
- Save the book to the database
- Add the book to multiple categories, add tags and a ‘recommended by’ field
- View saved books
- Mark a book as read and give it a star rating
- Filter saved books by category, tag and/or ‘recommended by’ field
- Filter saved books by text string (search)
- Click a link to view or search for the book on Amazon and Audible

Additional notes about the app: 

- The application is a single screen plus a real-time search in a pop-up
- It will only have one user (me)
- I have design mockups that show most of the functionality required. I can provide upon request
- Should be responsive design

