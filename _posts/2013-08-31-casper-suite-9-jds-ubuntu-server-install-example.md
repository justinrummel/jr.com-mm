---
layout: single
title: "Casper Suite 9: JDS Ubuntu Server Install Example"
date: 2013-08-31 14:32
categories:
    - "Tech Article"
tags:
    - Casper Suite
    - JDS
    - Ubuntu Server
header:
    image: /assets/images/2015/01/20/casper-suite-cropped.jpg     # Twitter (use 'overlay_image')
    overlay_image: /assets/images/2015/01/20/casper-suite-cropped.jpg       # Article header at 2048x768
    overlay_filter: 0.15
    teaser: /assets/images/2015/01/20/casper-suite-cropped-Twitter.jpg    # Shrink image to 575 width
    caption: "Photo credit: [**JAMF Software**](https://www.jamfsoftware.com/products/)"
---

In the last article [Casper Suite 9: Cloud and JDS Distribution Points]({{ site.url }}/casper-suite-9-cloud-and-jds-distribution-points) I gave you information about things to take into consideration before installing a JAMF Distribution Server (JDS) into your Casper Suite 9 environment.  In this article I'll take you through an example install of a JDS in Ubuntu.

JAMF Distribution Server (JDS) Install
---

I'm going to measure my success in this example by the brevity of the article.  So here it goes!

#### Step 1; Get an install of Ubuntu

I am using Ubuntu Server 12.04 LTS as it's one of the items identified that is supported for a JDS.  You can install the JDS on:

- Ubuntu 10.04 LTS Server
- Ubuntu 12.04 LTS Server
- Red Hat Enterprise Linux (RHEL) 6 &nbsp;[^1]
- OS X Server with Server.app 2.2 &nbsp;[^2]

First thing I did is [Download Ubuntu Server 12.04 LTS AMD64 ISO][ubuntu12.04] file.  With the "Server" edition there is no GUI, so I hope you are ready for some Command Line navigation.

I then used the ISO to create a new VM, and YES Fusion could make this easy for me, but I like going through the steps of the installer so I can set the hostname and configure other detailed options that are prompted for me (such as installing SSH at the end).

#### Step 2; Run the script

Once your VM is running (with proper networking, DNS, hostname), copy JAMF's JDS Linux install script file to your server and run!

{% gist 6399704 %}

There you go!  I did this twice (JDS1 and JDS2) and now my JSS reports both distribution points.

<figure>
<a href="{{ site.url }}/assets/images/2013/08/31/JDS.png"><img src="{{ site.url }}/assets/images/2013/08/31/JDS_480.png" alt="JDS installed on JSS screenshot" title="JDS installed on JSS screenshot" /></a>
</figure>


Summary
---

The output gist log has some very interesting output items and shows you how much JAMF is working for you to make things easy.

- Validating JDS is being installed on a supported OS
- Validating JDS space requirements
- Validating JDS component paths (as listed on JAMF's kb [Components Installed on JDS Instances][339])
- Install Apache if needed
- Install OpenSSL if needed
- Installing PHP and enabling the mod for Apache
- Apache rewrite rules and other .conf items

Hidden from the display output, the script is also doing:

- Utilizing machine based SSL certificates for Secure JSS/Client to JDS communication
- Installing the ``` jamfds ``` binary

If you really want to go digging, once your run the script and are prompted for your JDS name... STOP.  Search in the same directory and you'll find a new directory called "base".  Inside that is all the scripts that are embedded into JAMF's ".run" file.

Footnotes
---

[^1]: Red Hat Linux (RHL) Support is something new for JAMF.
[^2]: There is an interesting Discussion on JAMF Nation as the [Admin Guide states Lion and Server 2.2, but Server 2.2 is not available for Lion](https://jamfnation.jamfsoftware.com/discussion.html?id=8111).

[ubuntu12.04]: https://www.ubuntu.com/download/server
[339]: https://jamfnation.jamfsoftware.com/article.html?id=339
