---
layout: single
title: "10.8 Mountain Lion Server: Open Directory"
date: 2012-07-25
categories:
    - "Tech Article"
tags:
    - Apple
    - Mt Lion
    - OSXS
---

The concepts for installing Open Directory is exactly the same as previous versions of OS X Server. Select whichever you want (Master or Replica) and walk through the assistant to get your ODM/ODR running. Screenshots of this process are below with quick comments. The glaring item is that the true functionality of Open Directory is now LDAP, Kerberos, and PasswordServer; and nothing more. Workgroup Manager used to store its values within the ODM’s Apple LDAP schema, but WGM does not exist anymore (that’s what you get for writing before things are released... [WGM does exist!][DL1567]). The transition to using Configuration Profiles is now complete from Apple’s point of view, which is just like the transition to do everything via Server.app.

[DL1567]: http://support.apple.com/kb/DL1567

Things that I need to test;

- Will Mt Lion clients honor MCX values that are configured by a ODM that is not running Mt Lion OS X Server?
- What happens to your MCX values if you upgrade from Lion OS X Server?
- are there any issues running MT Lion server with older versions of OS X Server (10.7, 10.6, 10.5)?

For that last bullet, it is always best practices to use the same version of OS X Server throughout your environment. The only exception would be if a server is bound to your Directory for Authentication only (thus not functioning as a ODM or ODR).

I’ll do my best to work on the first two bullets, PLUS AD integration for future posts.

The on thing that is missing from the GUI is a backup and Restore process.

Open Directory Master Setup
---
![1-mtl-ODM.png]({{ site.url }}/images/2012/07/1-mtl-ODM.png){: .align-center}
(Click the "On" button on the top right hand side. You should be used to this as everything uses this method to enable services.)

![2-mtl-ODM.png]({{ site.url }}/images/2012/07/2-mtl-ODM.png){: .align-center}
(Creating a ODM first.)

![3-mtl-ODM.png]({{ site.url }}/images/2012/07/3-mtl-ODM.png){: .align-center}
(The usual "diradmin" username and password.)

![4-mtl-ODM.png]({{ site.url }}/images/2012/07/4-mtl-ODM.png){: .align-center}
(This is for your SSL Certificates.)

![5-mtl-ODM.png]({{ site.url }}/images/2012/07/5-mtl-ODM.png){: .align-center}
(Verify information and click on the "Set Up" button.)

![6-mtl-ODM.png]({{ site.url }}/images/2012/07/6-mtl-ODM.png){: .align-center}
(Configuring your new ODM.)

![7-mtl-ODM.png]({{ site.url }}/images/2012/07/7-mtl-ODM.png){: .align-center}
(View of ODM server now complete.)

![8-mtl-ODM.png]({{ site.url }}/images/2012/07/8-mtl-ODM.png){: .align-center}
(Select your ODM Server, and click on the gear icon to set your Global Password Policy.)

![9-mtl-ODM.png]({{ site.url }}/images/2012/07/9-mtl-ODM.png){: .align-center}
(Locals are also available in Mt Lion OS X Server.)

![10-mtl-ODM.png]({{ site.url }}/images/2012/07/10-mtl-ODM.png){: .align-center}
(View of the default Locale configuration.)

Open Directory Replica Setup
---
![ODR 1]({{ site.url }}/images/2012/07/11-mtl-ODM.png){: .align-center}
(When you want to create a ODR, select the second option and click on "Next".)

![ODR 2]({{ site.url }}/images/2012/07/12-mtl-ODR.png){: .align-center}
(Provide the ODM’s FQDN, diradmin username and password, then click on "Next".)

![ODR 3]({{ site.url }}/images/2012/07/13-mtl-ODR.png){: .align-center}
(If you receive any error messages, my first guest is you have BAD DNS. In this case, I pointed my Ethernet Settings to a bad value of a DNS server.)

![ODR 4]({{ site.url }}/images/2012/07/14-mtl-ODR.png){: .align-center}
(Verify ODR settings and click on "Set Up" button.)

![ODR 5]({{ site.url }}/images/2012/07/15-mtl-ODM.png){: .align-center}
(View from the ODM Server, which now recognizes that and ODR is available.)
