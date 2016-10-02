---
layout: single
title: "It's (Log)^2, it's big, it's heavy, it's wood [Mac OSX Server Edition]"
date: 2013-03-11 15:52
categories:
    - "Tech Article"
tags:
    - Apple
    - Mt Lion
    - OSXS
    - Logs
---
## AFP

### Log files ###

*	/Library/Logs/AppleFileService/AppleFileServiceAccess.log
*	/Library/Logs/AppleFileService/AppleFileServiceError.log

What?!  You don't have these logs?  You might need to turn them on as by default they are disabled.

{% highlight bash %}
sudo serveradmin settings afp:activityLog = yes
{% endhighlight %}

This will enable logging for the following items, and rotate the logs on a weekly basis:

*	logLogin
*	logLogout
*	logCreateDir
*	logCreateFile
*	logOpenFork
*	logDelete

## DNS

### Log files ###

*	/Library/Logs/named.log

The file contains everything you would want to know regarding your DNS environment, such as reloading of configurations, zones, shutting down, and transferring to any DNS slaves. You will not see these log messages on a slave DNS server, so you must have access to the master.  Notice, you will not see WHAT DNS record was created below (it was delete.rummel.co). 

{% highlight Apache Log %}
11-Mar-2013 14:52:41.751 reloading configuration succeeded
11-Mar-2013 14:52:41.752 reloading zones succeeded
11-Mar-2013 15:27:02.757 shutting down
11-Mar-2013 15:27:02.757 stopping command channel on 127.0.0.1#54
11-Mar-2013 15:27:02.757 no longer listening on 127.0.0.1#53
11-Mar-2013 15:27:02.757 no longer listening on 192.168.1.121#53
11-Mar-2013 15:27:02.761 exiting
11-Mar-2013 15:27:02.860 zone 0.0.127.in-addr.arpa/IN/com.apple.ServerAdmin.DNS.public: loaded serial 1997022700
11-Mar-2013 15:27:02.861 zone 1.168.192.in-addr.arpa/IN/com.apple.ServerAdmin.DNS.public: loaded serial 2013031101
11-Mar-2013 15:27:02.862 zone rummel.co/IN/com.apple.ServerAdmin.DNS.public: loaded serial 2013031101
11-Mar-2013 15:27:02.862 zone localhost/IN/com.apple.ServerAdmin.DNS.public: loaded serial 42
11-Mar-2013 15:27:02.862 zone justinrummel.net/IN/com.apple.ServerAdmin.DNS.public: loaded serial 2013031101
11-Mar-2013 15:27:02.862 managed-keys-zone ./IN/com.apple.ServerAdmin.DNS.public: loaded serial 0
11-Mar-2013 15:27:02.863 running
11-Mar-2013 15:27:02.863 zone 1.168.192.in-addr.arpa/IN/com.apple.ServerAdmin.DNS.public: sending notifies (serial 2013031101)
11-Mar-2013 15:27:02.863 zone rummel.co/IN/com.apple.ServerAdmin.DNS.public: sending notifies (serial 2013031101)
11-Mar-2013 15:27:02.863 zone justinrummel.net/IN/com.apple.ServerAdmin.DNS.public: sending notifies (serial 2013031101)
11-Mar-2013 15:27:02.881 client 192.168.1.122#51602: view com.apple.ServerAdmin.DNS.public: transfer of '1.168.192.in-addr.arpa/IN': AXFR-style IXFR started
11-Mar-2013 15:27:02.881 client 192.168.1.122#51602: view com.apple.ServerAdmin.DNS.public: transfer of '1.168.192.in-addr.arpa/IN': AXFR-style IXFR ended
11-Mar-2013 15:27:03.369 client 192.168.1.122#63695: view com.apple.ServerAdmin.DNS.public: received notify for zone '1.168.192.in-addr.arpa'
11-Mar-2013 15:27:03.373 client 192.168.1.122#51603: view com.apple.ServerAdmin.DNS.public: transfer of 'rummel.co/IN': AXFR-style IXFR started
11-Mar-2013 15:27:03.374 client 192.168.1.122#51603: view com.apple.ServerAdmin.DNS.public: transfer of 'rummel.co/IN': AXFR-style IXFR ended
11-Mar-2013 15:27:03.374 client 192.168.1.122#51604: view com.apple.ServerAdmin.DNS.public: transfer of 'justinrummel.net/IN': AXFR-style IXFR started
11-Mar-2013 15:27:03.374 client 192.168.1.122#51604: view com.apple.ServerAdmin.DNS.public: transfer of 'justinrummel.net/IN': AXFR-style IXFR ended
11-Mar-2013 15:27:03.375 client 192.168.1.122#64866: view com.apple.ServerAdmin.DNS.public: received notify for zone 'rummel.co'
11-Mar-2013 15:27:03.875 client 192.168.1.122#56747: view com.apple.ServerAdmin.DNS.public: received notify for zone 'justinrummel.net'
{% endhighlight %}

## Installer

### Log files ###

*	/var/log/install.log

![PKG Icon]({{ site.url }}/images/2013/03/11/PKG_128.png)
{: .align-right}
Did you just double click a ".pkg" file (or something that looks like a stick of butter in a box)?  The actions of that installation are recorded here.  You could also install items by using the ```installer``` command (a scripting FYI). 

## Open Directory

### Log files ###

*	/Library/Logs/slapconfig.log 

	*Setting up and configuring Open Directory services*

*	/Library/Logs/PasswordService/ApplePasswordServer.Service.log 

	*Successes and failures authenticating with local network users*

*	/Library/Logs/PasswordService/ApplePasswordServer.Error.log 

	*Errors in the Password Service*

*	/var/log/slapd.log 

	*LDAP services*

*	/var/log/opendirectoryd.log 

	*Core Open Directory functionality*

There is so much going on in terms of Open Directory it's hard to begin, as it deals with:

1.	LDAP (OpenLDAP specifically)
2.	Password (Password Service)
3.	Kerberos (now Heimdal vs. MIT Kerberos)

You can read about Open Directory on Apple's man page [opnedirectoryd][opendirectoryd] ([man opendirectoryd](x-man-page://8/opendirectoryd)), or reference the [error codes][oderror] in Apple's developer section.  There are some key troubleshooting steps I usually perform when trying to debug authentication issues:

1.	```ping -c 4 ODM.IP.address``` (it should work)
2.	```host ODM.IP.address``` (it should report back your server's fully qualified domain name)
3.	```host ODM.domain.tld``` (it should report back only one IP address)
4.	```open afp://ODM.domain.tld``` (you should get an authentication prompt)
5.	```dscl /Search -read /Users/*username* NFSHomeDirectory``` (should return "/Network/Servers/server.domain.tld/Volumes/path/to/*username*")
6.	```dscl /Search -read /Users/*username* HomeDirectory``` (should return "\<home_dir\>\<url\>afp://server.domain.tld/Users\</url\>\<path\>*username*\</path\>\</home_dir\>")
7.	```ntpq -p; ntpdc -c loopinfo``` (do this on the client and server to verify NTP settings are using the same server)
8.	```kinit *username*@ODM.SERVER.TLD``` (this should be your Kerberos realm so the FQDN is in all caps)
9.	```klist -a``` (Verify TGT and Auth time)

Remember, you can always increase the log level of Open Directory by following Apple's kbase article and issue:

{% highlight bash %}
# debug
odutil set log debug

# return to default
odutil set log default
{% endhighlight %}

<quote OS X Server: Changing opendirectoryd logging levels http://support.apple.com/kb/HT4696>
*	The logging level will persist through restarts.
*	Other logging levels are also available: "alert", "critical", "error", "warning", "notice", and "info".
*	For more information please refer to the manual pages for the odutil utility (such as "[man odutil](x-man-page://1/odutil)").
*	Generally, debug logging should only be used to troubleshoot Open Directory service-related issues because debug logging can generate large amounts of log messages. If you need more detailed information about Open Directory events but do not wish to use "debug", consider using "info" instead.
</quote>

## System

### Log files ###

*	/var/log/system.log

Apple decided to stop utilizing the security.log file for 'interesting' items, and now just creates noise in system.log.  Grep for the following items:

*	```grep sudo /var/log/system.log```	

	*Anyone using the 'sudo' command for elevated privileges*

*	```grep backup /var/log/system.log``` 

	*Time Machine 'backup' for the server to a secondary drive (not the Time Machine backup service)*

*	```grep kernel /var/log/system.log``` 

	*Kernel messages (such as sandboxd lookup errors)*

*	```grep bootp /var/log/system.log``` 

	*NetBoot and DHCP notices*

*	```grep kdc /var/log/system.log```

	*Kerberos log messages for individuals who authenticate for services*


## Web Services

### Log files ###

**General Apache Info**

*	/var/log/apache2/access_log 

	*You may see these two files symlinked in Console.app under /Library/Logs/ => "WebServer"*

*	/var/log/apache2/error_log

**WebDAV**

*	/Library/Logs/AppleFileService/AppleFileServerError.log
*	/Library/Logs/WebDAVSharing.log

**CalDAV**

*	/var/log/caldavd/access.log

**Profile Manager**

*	/Library/Logs/ProfileManager/devicemgrd.log
*	/Library/Logs/ProfileManager/profilemanager.log
*	/Library/Logs/PostgreSQL/PostgreSQL.log
*	/Library/Logs/PostgreSQL/PostgreSQL_server_Services.log 

	*If you have ever had to "redo" some of your work and Postgress, you needed to ```sudo serveradmin start postgres_server``` to get things done.  There is a log for that.*

## VPN

### Log files ###

*	/var/log/ppp/vpnd.log

Who just logged into your network?  Look for "authorized for access":

{% highlight bash %}
grep "authorized for access" /var/log/ppp/vpnd.log
{% endhighlight %}

## Sources

*	[AFP Logging][afplog] by Charles Edge
*	[Server Essentials 10.8][osxs10.8] By [Arek Dreyer][dreyer], [Ben Greisler][greisler]
*	[Post Title][log] by Ren and Stimpy

[opendirectoryd]: https://developer.apple.com/library/mac/#documentation/Darwin/Reference/ManPages/man8/opendirectoryd.8.html 
[oderror]: https://developer.apple.com/library/mac/#documentation/Networking/Reference/OpenDirectoryErrors/Reference/reference.html#//apple_ref/doc/uid/TP40008797
[afplog]: http://krypted.com/mac-os-x/missing-server-app-settings-for-afp/ 
[osxs10.8]: http://www.peachpit.com/store/apple-pro-training-series-os-x-server-essentials-using-9780321887337 
[dreyer]: http://www.arekdreyer.com 
[greisler]: http://www.kadimac.com 
[log]: http://nicktoons.nick.com/videos/clip/stimpys-big-day-log-song-1.html 