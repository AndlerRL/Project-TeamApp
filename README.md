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
<strong>The rest of functionalities such as chat, tasks, dashboard(feed) and resources should be add soon.</strong>
<br>
<br>
<br>
<strong><small>Any advice or comments, just let me know :) I will update this to time to time.<br>
*If you do not have npm installed, you just can install Node.js if you like on your PC.</small></strong>
