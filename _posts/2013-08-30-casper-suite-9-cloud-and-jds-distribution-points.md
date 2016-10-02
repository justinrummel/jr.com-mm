---
layout: single
title: "Casper Suite 9: Cloud and JDS Distribution Points"
date: 2013-08-30 17:30
categories:
    - "Tech Article"
tags:
    - Casper Suite
    - JDS
---
The Casper Suite has been able to provide installation packages to Managed OS X clients by AFP, SMB, and/or HTTP(s) for a long time, but now JAMF Software has introduced two new methods to provide packages: JAMF Distribution Server (JDS) and Cloud Distribution Point (CDP).  Both of these DP installation methods make deploying web based package distribution **EXTREMELY** easy and quick to stand up in a test or production environment vs. needing to configure multiple services in a Windows or OS X Server setting.


Cloud Distribution Points (CDP)
---

Cloud Distribution Points are easy to describe as they utilize a Cloud hosting provider to store your DMG or PKG to install on your client machines no matter where they are located.  JDS servers are ideal for locations that have security restrictions on port forwarding through a firewall, who don't want to have non-rack-mountable Mac Mini Server in their DMZ, or a physically diverse workforce where it doesn't make sense to host installation packages in-house.  There are a couple of limitations and requirements for a CDP as follows:

- You can only have one CDP in your environment.  This makes sense as you are trying to get something available outside of your internal network.  You need to pick a cloud hosting provider that can support the bandwidth requirements for the number of devices you are trying to support.  At this time you have three choices
    * Rackspace
    * Amazon Web Services (S3 and CloudFront)
    * Akamai

All communication between your JSS, your CDP, and your clients will be over HTTPS (port 443) to ensure a proper secure environment.

- You can only store Packages, in-house iOS apps, and in-house eBooks (no scripts).  Scripts can now be stored in the "jamfsoftware" database so you don't really need to have them as a flat file to download.
- CDP can be the Master Distribution Point, or you can selectively sync items to your cloud storage.


JAMF Distribution Server (JDS)
---

A JDS is something very new.  From the Admin guide JAMF Software describes a JDS as "instance is a distribution point that is managed by the JAMF Software Server (JSS), similar to a computer or mobile device".  A JDS is a completely separate server that you install on OS X Server (10.6 or greater) or Linux (Ubuntu 10.04 LTS, 12.04LTS, and Red Hat). Some items to note are:

- JDS can be installed multiple times.  In this respect it is like a traditional Distribution Point vs. the one install of a CDP.
- The first install is your root install.  This is important!  All additional JDS will be "fed" from the root JDS as the primary source of packages (you can change which server is the *ROOT* at a later time if you wish).
- If you have multiple JDS servers installed, [you can select the parent/child relationship to help manage which files are synced][330].
- This is being done with WebDAV and SSL Certificates.  So you want to make sure you know what your are doing with your environment.  Either start buying from a third-party vendor (Network Solutions, Verisign, StartSSL) OR make sure you know how to install your internal ROOT CA and Intermediate CA into your JDS Server.&nbsp;[^1]

A JDS has a complete copy of items to be installed within it's local repository, therefore it doesn't make sense to have a traditional Distribution Point a JDS installed on the same server, so pick one: JDS or traditional Distribution Point.  You find the file locations of a JDS on JAMF's kbase [Components Installed on JDS Instances][339].

When moving your scripts and packages to your new JDS, there are some special characters that can't be used in the file name: ```/ : ? < > \ * | ” [ ]```.  All scripts are now stored within the jamfsoftware MySQL database vs. a flat ".sh/.py/.perl/.rb" file.  There are also a couple of "gotchas" when using the JDS as listed in JAMF's kbase:

- You must use the script editor in the JSS to make changes to the contents of scripts.
- You are no longer able to use scripts in the AppleScript format.
- You are no longer able to deploy non-flat PKGs using Casper Imaging v8.5 or earlier, or Casper Remote v8.x.
---<cite>[Migrating Packages and Scripts](https://jamfnation.jamfsoftware.com/article.html?id=327)</cite>


Sources
---

- Casper Admin Guide PDF within the Casper Suite 9 DMG
- linked JAMF kbase articles


Footnotes
---

[^1]: I haven't got a chance to test out an internal CA yet, but it sounds fun!  This may be a future article.

[339]: https://jamfnation.jamfsoftware.com/article.html?id=339
[327]: https://jamfnation.jamfsoftware.com/article.html?id=327
[330]: https://jamfnation.jamfsoftware.com/article.html?id=330