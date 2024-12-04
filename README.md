# Book Tracker
Created an app based on my need to track books that I borrowed in our local library. This app sends notifications to my email 2 days before any book is due to be returned. Implemented lazy loading for efficient rendering of components and photos.  

# Screen captures 
![index page](https://res.cloudinary.com/dw1q3coyf/image/upload/c_pad,w_250/v1733321753/Screenshot_20241128-101713_nvaupf.png) ![index page](https://res.cloudinary.com/dw1q3coyf/image/upload/c_pad,b_gen_fill,w_250/v1733322189/Screenshot_20241204-152051_akktjd.png) ![index page](https://res.cloudinary.com/dw1q3coyf/image/upload/c_pad,w_250/v1733322190/Screenshot_20241204-152108_pjfasx.png)

## Prerequisites
* A machine that has nodeJs
* An account in [MongoDb Atlas](https://account.mongodb.com/account/login)
* A cloudinary account

## Key Features  


➡️ Borrowed Books Management: Track books, due dates, and return status.  
➡️ Automated Status Updates: Automatically flags overdue books based on the current date.  
➡️ Cloud Integration: Upload book cover images directly to Cloudinary.  

## Built with the MERN stack (MongoDB, Express, React, Node.js).    

➡️ Implement lazy loading for efficient rendering of components.  
➡️ Use custom hooks for streamlined database interactions.  
➡️ Automate status changes based on time-sensitive data.  
➡️ Sending of notification to user's email.  
➡️ Uploading of photos using Cloudinary.  
➡️ Authentication/authorization using PassportJs.  


## Getting the app running locally
* `git clone` this repo `https://github.com/chubibobibo/BookTrackIt/tree/deploy`
* Navigate to the root of the server and client folder then `npm install` to install dependencies
* create a `.env` file in the root of server folder
 ```js
MONGO_SECRET=<"provide your secret key">  
MONGO_ATLAS=<"your mongo atlas network access">

SESSION_NAME=<"provide your session name">
SESSION_SECRET=<"provide your secret key for session">

CLOUD_NAME=<"provide your cloudinary newtwork access">
CLOUD_API_KEY=<"provide your cloudinary api key">
CLOUD_API_SECRET=<"provide your cloudinary secret key">

DEV_ENV='development'
```


* run the application using `npm run dev`

