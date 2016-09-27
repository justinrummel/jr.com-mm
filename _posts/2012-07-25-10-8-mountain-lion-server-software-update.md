---
title: '10.8 Mountain Lion Server: Software Update'
author: Justin Rummel
layout: single
permalink: /10-8-mountain-lion-server-software-update/
shorturl:
    - http://j.mp/MGHsiP
tags:
    - Apple
    - Mt Lion
    - OSXS
header:
  image:
  credit:
  creditlink:
---
Overview
---
In the beginning of Mt Lion, there was a large scare that Apple was going to remove the current process of Software Updates (where in an enterprise environment has control of which update is made available to clients) and force people to use the Mac App Store for software updates. Well fear not, Apple has move Software Updates over from Server Admin to Server.app.

Functionality
---
I don’t see any difference in Software Update between Lion and Mt Lion in terms of functionality. You have the option to "download all and enable" or "manually select" which update is available to clients. Apple wants to make things easy for you so it defaults to an automatic roll, and if that is the case you don’t really care what update are available (just as long as they are downloaded and available) so the list of updates are on hidden on the second tab to keep things neat. 

![1-mtl-SUS]({{ site.url}}/images/2012/07/1-mtl-SUS.png)

Software Update specifics
---
To view all the updates that your server has, simply click on the Updates tab at the top and you will see a list which is similar to earlier version of Software Update. The difference is there is no description pane at the bottom. If you want to know what the description is for a particular update package, simple hit the enter key and it will display the update info.

![2-mtl-SUS]({{ site.url}}/images/2012/07/2-mtl-SUS.png)

I do like Mt Lion’s version of Software Update because Apple has finally made it obvious hot to re-check Apple’s servers to see if there is an update (vs. that tiny little button in Server Admin).

![3-mtl-SUS]({{ site.url }}/images/2012/07/3-mtl-SUS.png)

File Location
---
Just like all the other services, Software Update has moved it’s data to the **/Library/Server** folder. Inside there you can drill down to "**Software Updates**" and find the usual "**Config**" and "**Data**" folder, which are used for Software Updates. One thing you cannot do in Mt Lion’s version of Software update is relocate the storage path. I would assume a simple symlink to a second drive would work just fine in this instance prior to starting the Software Update service.
