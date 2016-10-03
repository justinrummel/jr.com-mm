---
layout: single
title: "Debug APNS issues for JAMF Software's Casper Suite"
date: 2013-07-19 15:04
categories:
    - "Tech Article"
tags:
    - Apple
    - APNS
    - Casper Suite
---

Hopefully you had time to review my last article on how [Apple's Push Notification System (APNS) works when managing OS X and iOS devices]({{ site.url }}/how-apns-works-with-mdms-that-manage-osx-and-ios/).  It's not required reading to comprehend, but it does provide an an overview on how complicated APNS is AND the beauty in its architecture to make everything happen in an instant!  What I now want to discuss is not when APNS works, but when it doesn't "What are the common things I check when APNS is not working".  Most of these debugging steps are for the initial setup of your APNS environment, if this were working "fine" but now nothing works... there may be something else at hand.

Network APNS issues
---

First and foremost, when APNS doesn't work I'm blaming your network.  Are you allowing the proper ports out of your environment; specifically ports 2195, 2196, and 5223?  You can do some testing for 2195 and 2196 be trying using the '[nc][nc]' command ```gateway.push.apple.com``` and ```feedback.push.apple.com``` over port 2195 and 2196 respectively, and this needs to happen FROM your MDM (JSS specifically regarding the Casper Suite).  Below are successfully examples using the nc command:

{% highlight bash %}bash
# nc test for APNS
justinrummel@JRummel-MBPr ~> /usr/bin/nc -z -4 -w 10 gateway.push.apple.com 2195
Connection to gateway.push.apple.com 2195 port [tcp/*] succeeded!
justinrummel@JRummel-MBPr ~> /usr/bin/nc -z -4 -w 10 feedback.push.apple.com 2196
Connection to feedback.push.apple.com 2196 port [tcp/*] succeeded!
{% endhighlight %}

The second item is your devices connecting to APNS network over 5223.  This is the network element that would allow your devices (OS X or iOS), to talk to Apple.

{% highlight bash %}bash
# nc test for Push client initialization server
justinrummel@JRummel-MBPr ~>  /usr/bin/nc -z -4 -w 10 init-p01st.push.apple.com 80
Connection to init-p01st.push.apple.com 80 port [tcp/http] succeeded!
{% endhighlight %}

When running these test be sure to perform them their perspective network segments.  Most networks are NOT flat except inside your house/home.  Server networks may have tighter requirements than WiFi networks for your iPads.  Remember, all three of these sessions are being established from the inside to the outside world.  Most firewalls are setup to allow this type of network communication as most people are worried about people getting in, not going out of the network environment.  Lastly, if your network administrator starts thinking *WE HAVE A GIANT DOOR FOR THINGS TO GO OUT ON THREE PORTS! OMG!*, request that these ports are only valid for the 17.x.x.x Class A network.  [Apple owns the whole class A block][TS4264].

DNS issues
---

It goes without saying that DNS needs to work from the Server and your clients.  I have been in some situations where the ONLY DNS available in the server room is for the internal domain, this way virus cannot find the "command central" and spread their diseased infested "ones and zeros" throughout the servers ([this is a lie, but whatever][dnsLIE]).  With no DNS, PUSH commands will never be sent.  May need to move your MDM to a DMZ.

Certificate issues
---

Along with DNS, there may be certificate issues.  With Certificates you MUST use the Fully Qualified Domain Name (FQDN).  Sorry... I know "server1" is much easier than "server1.domain.tld", but that doesn't work when you need certificates to validate.  USE the FQDN.  In fact, ALWAYS use FQDN in any setting on the JSS with the exception for NetBoot server, and that is a requirement because the bless command is looking for an IP address.

Tokens
---

Lastly I want to bring up a strange issue that I discovered some time ago when testing OS X 10.8 and the Casper Suite by creating multiple Virtual Machines with VM Ware Fusion.  I hope this was an issue because I created 10 VMs on my MacBook Pro Retina, Mid 2012 and started enrolling them into my test JSS.  With the help of JAMF Support we discovered at some point my VM's were not getting a token from Apple.  The way I found this was by searching inside the MySQL database.&nbsp;[^1]

{% highlight bash %}bash
# searching for tokens in MySQL
sadmin@auto:~$ sudo mysql -u root -p
[sudo] password for sadmin:
Enter password:

mysql> use jamfsoftware;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> select computer_name, computer_id, apn_token from computers;
+----------------------+-------------+-------------------------------------------------------------------------+
| computer_name        | computer_id | apn_token                                                               |
+----------------------+-------------+-------------------------------------------------------------------------+
| osxs1                |           2 | at3cspak ts6mneko ob5gosst sag2poow nug1tyda lee4bluu aro3ogty hep5erbj |
| osxs2                |           3 | ax8cucai zag8splr te6pijig en0pykvi hy9avkha yi7ergrb nem5splo of5efkis |
| mo                   |           4 | jaz5jori sw7rhtic qu7mesgi mug4paia el6boosu pol8lecd av2pieok sv6ursqg |
| nemo                 |          15 | mi7iaknr tom7idoo log5hyad upl1agrr ol0olsib lea3hitb gyp8tenr sk6lamjo |
| Lion                 |          13 |                                                                         |
| Composer             |          16 |                                                                         |
+----------------------+-------------+-------------------------------------------------------------------------+
6 rows in set (0.00 sec)

mysql>
{% endhighlight %}

You can see there are two computers that I enrolled into my JSS, however, they never received an APNS token.  The end result is these computers will never receive any PUSH commands because Apple has no way of finding the devices.  My initial clue that something was wrong was after the two computers were successfully enrolled, I looked for them to assign a Configuration Profile.  They were missing in the "Individual Computers" list.  It must be a MySQL command that requires the apn_token be return in order to populate the list.

Sources
---

- [nc MAN page][nc]
- [Apple's TS4264 kbase article][TS4264]
- [That'll never work–we don't allow port 53 out][dnsLIE]
- [Random number Generator][rand]

Footnotes
---

[^1]: No these are not my real APNS tokens!  You think I would publish that... on the INTERNET!?  Randomly generated by [rand]

[nc]: https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/nc.1.html
[TS4264]: http://support.apple.com/kb/TS4264
[dnsLIE]: http://blog.strategiccyber.com/2013/06/20/thatll-never-work-we-dont-allow-port-53-out/
[rand]: http://www.randpass.com/advanced.html
