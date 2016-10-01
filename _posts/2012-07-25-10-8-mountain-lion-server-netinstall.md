---
title: '10.8 Mountain Lion Server: NetInstall'
layout: single
tags:
    - Apple
    - Mt Lion
    - OSXS
---
Overview
---
From a pure functional standpoint, I don’t see any major difference between what is available in prior versions of OS X Server in terms of NetBoot service to the Mt Lion version; other than it is now "NetInstall".

There are some minor changes such any mention to support OS9 has been removed, and you cannot set the log level via the GUI. If you really need to increase the log level for NetInstall, run the following command:

{% highlight bash %}
$ sudo serveradmin settings netboot:logging_level = HIGH
{% endhighlight %}

NetInstall Configuration Settings
---
From the first Image you can see we have the options to select an interface to provide our NetInstall service. This will always be an Ethernet unless you enjoy a slow painful death of being attacked by a [swarm of bees][HT1865]. You can also filter by Mac Address on the primary page (machine model filtering is possible, just not on the first tab).

[HT1865]: https://web.archive.org/web/20140105015852/http://support.apple.com/kb/HT1865

![NetInstall 1]({{ site.url }}/images/2012/07/1-mtl-netinstall.png)
And finally, you can assign if you are storing Images, Client Data (for diskless operations), or both.

![NetInstall 2]({{ site.url }}/images/2012/07/2-mtl-netinstall.png)
On the Images tab, you will be able to see your NetBoot/NetInstall/*.nbi listed (once you copy to the usual /Library/NetBoot/NetBootSP0 folder). From there select the name of your image and click on the gear icon to "Edit Image Settings".

![NetInstall 3]({{ site.url }}/images/2012/07/3-mtl-netinstall.png)
From there you can select the protocol (NFS or HTTP), filter Machine Model Access, adjust the image index, and finally if you want this *.nbi to be provided in diskless mode.

![NetInstall 4]({{ site.url }}/images/2012/07/4-mtl-netinstall.png)

![NetInstall 5]({{ site.url }}/images/2012/07/5-mtl-netinstall.png)
