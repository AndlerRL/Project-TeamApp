# Proyect-TeamApp

<h2>It's a WebApp develop with MEAN implementations. If you want to run it, just do the command (npm installed already)*:</h2>
<h3><stronger>supervisor -e html.js server.js</stronger></h3>

<h2>Updates<br>
[v0.02]</h2>
+ Since this is a WebApp with the MEAN implementations, I added at this time some AngularJS scripts, also the structure is slighly different; it has been modulated for better maintenance and understandable.<br>
+ Fixed a bug that happened at the time an user wanted to sign out (navbar top-right side).<br>
+ Added a better logo.<br>
+ Appereance has been modified.<br>
+ Added some files.<br>
- Deleted the prev index.html file and moved to another route, since I implemented the UI.router and Swig.<br>
- Changes has been done at server.js file, due require to meets UI.router needs.<br>
<br>
<h2>[v0.06]</h2>
This update has only the require main templates for the website and other changes:<br>
+ Added chat.html file as a template.<br>
+ Added resources.html file as a template.<br>
+ Added tasks.html file as a template.<br>
+ Added dashboard.html file as a template.<br>
+ Code has been added at indexCtrl.js file in order to render.<br>
+ Code has been added at app.js file in order to create routes within templates.<br>
+ An especification has been added at express.js file.
Future interactions and dinamics will be added soon.<br>
<br>
<h2>[v0.08]</h2>
This update is the addition of models for each part of the website, witch are:<br>
+ Add chat, resources, timeline and tasks module to the App.<br>
+ Add the Mongoose.js module in order to read information and save it.<br>
<br>
<h2>[v0.21]</h2>
Passport.js has arrive!<br>
I added multiple documents in order to use passport.js and are the next one:<br>
+ Added authentication management with express-session.<br>
+ Added social login with Twitter and local with mongodb and redis.<br>
+ Added logout functionabilities.<br>
+ Data Base & server has now recognition of a user still login or not, can now differenciate witch user logout or not, so users can now be able to maintain their session.<br>
+ Some aditional css and js files has been add such as angular-toastr.js/.css; has now async.js and angular-animate.js<br>
<br>
<h2>[v0.6]</h2>
Task, Dashboard and Resources implemented!<br>
Now website has the ability to:<br>
+ Have each user a To Do List, were users can add a task, put it pending and then, when they complete it, the changes shall appear on the dashboard (feed).<br>
+ Users can share documents each others on the Resources site (where also users can see the received and sent items within it) and will be reflected on the dashboard. <br>
+ The dashboard(feed) is on real-time, so each user that is available (logged) on the site, it will be reflected in real-time the changes and user's activity.<br>
<br>
<h2>[v0.9]</h2>
Global and Private Chat has arrived!<br>
Nos website counts with a chat group and other implementations like:<br>
+ Now user have the ability to chat each other when another user is online on the chat section.<br>
+ When you are on the General Chat, user can click the username in order to go to the private section with that specific user.<br>
+ Proper chat filters has been added.<br>
+ Facebook login has been added properly!<br>
+ On the registry section, now user can choose their own avatar. Later on some additional user customizations shall be implemented.<br>
- Some issues has been detected while adding this section, due to inconsistence and version issues with some modules, it has some problems in order to have a true consistance on the chat section--Later on will be fixed.<br>
- Timeline (dashboard) has some issues at the time to reflect resources and tasks due some compabilities issues. Later on will be fixed.<br>
- Resources has no longer the ability to save files within the website, due some compabilities issues, as I figured it out... Later on will be fixed... <br>
<strong>As I mentioned above, there is some issues with some parts on the Webapp, but i'm sure taht it will be fixed as soon as I can. This is my very first WebApp using stack MEAN and just encountered some problems with compabilities and I believe that it could be due the versions and the mixed versions that maybe is causing troubles on the app... You can check the bower field and let me know what you think! I appreciate any help :) A LOT</strong>
<br>
<br>
<br>
<strong><small>Any advice or comments, just let me know :) I will update this to time to time.<br>
*If you do not have npm installed, you just can install Node.js if you like on your PC.</small></strong>
