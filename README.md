[![Netlify Status](https://api.netlify.com/api/v1/badges/6b63557a-ceaf-453b-ad64-0753a6ef37c4/deploy-status)](https://app.netlify.com/sites/dailypick/deploys)

<a href="https://ibb.co/rbPTsPJ"><img src="https://i.ibb.co/1sVh6Vx/daily-Pick-mockup.png" alt="daily-Pick-mockup" border="0" /></a>
<br/>

🔥 Live (Website): [https://dailypick.netlify.app/](https://dailypick.netlify.app/)
<br>
🔥 Live (Documentation site): [https://dailypick-doc.netlify.app/](https://dailypick-doc.netlify.app/)

### Getting Started 👨‍💻

#### 1. Download or Cloning ⬇️

First, download or clone the repository to your local machine. For cloning execute `git clone https://github.com/swimshahriar/dailyPick-grocery-shop.git`.

#### 2. Installing Packages 🗳

Then go to the **client** folder and also go to the **server** folder and execute `npm install` or `yarn install` and it will download the packages locally.

**Note: Make sure you have nodejs installed in your machine. If you want to run via yarn then you have to install yarn too.**

#### 3. Starting the development server 🏁

For starting the **client** or **server**, go to the client or server folder and execute `npm start` or `yarn start` and it will open the development server on the localhost.

#### 4. Running Tests 🏃🏻‍♂️

For testing go to the client folder and execute `npm test` or `yarn test` and it will start unit testing and will show the progress and result in the terminal.

#### 5. Genarating Documentaion 🏗

For generating source code documentation, go to the **server** folder and execute `npm run doc` or `yarn run doc` and it will generate the documentation website files in the **doc** folder.

### Environment Variables 📄

In the `./server/index.js` file, `MONGO_URL` is an environment variable. So, you need to add your MongoDB connection URL. <br/>

**Note: Without environment variable, the server will not start**
