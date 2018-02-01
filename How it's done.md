# How it's done

hciContactsManager is composed by composed by two simple part:

1. A minimal Android application that simply sends and receives data to the server
2. A web application (website) that is the real Contacts Manager

In addition there is a (free) server, located in hcicontactsmanager2017.altervista.org.
You can find a (empty) copy of the database used in the folder \"_server\", with also all the needed php files.

## Human Computer Interaction Concepts

The website core is built following the Model-View-Controller pattern, in Javascript (and jQuery).
There are three principal files js implementing the MVC in the project:
1. The file "Model.js" is the Model and manages the data (the contacts)
2. The file "index.html" is the View and simply shows the data to the user
3. The file "Controller.js" is the Controller and takes the data from the model and gives them to the View

### Others files ###
There are other files used only for building the interface.
- In the folder css there are the style files. 
..* *bulma.css* (https://bulma.io/) is used for the contacts table, making it responsible
..* *animate.css* (https://daneden.github.io/animate.css/) is used for the animation
- In the folder js/Utility there are some little javascript utility, used for a better interaction:
..jBox.js (https://stephanwagner.me/jBox) is used for the tooltips and modal windows
..jquery-confirm.js (https://craftpip.github.io/jquery-confirm/) is used for the alert boxes
..sonic.js (https://github.com/padolsey/sonic.js) is for the loader
..Cookies.js (https://github.com/js-cookie/js-cookie) for a simpler use of cookies
All libraries are open source
