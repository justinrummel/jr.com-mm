---
title: 'Built-in Hidden Command Line Tools: Stroke and Airport'
author: Justin Rummel
layout: single
permalink: /built-in-hidden-command-line-tools-stroke-and-airport/
shorturl:
    - http://j.mp/pao6S0
tags:
    - Apple
    - CLI
    - Lion
    - OSX
header:
  image:
  credit:
  creditlink:
---
These tools are nothing new as they were available in Snow Leopard (and I believe Leopard, just can’t check), but they are fun little tools just in case you don’t have Apple’s Xcode [iTunes link][xCode] installed or [MacPorts][macPorts] available on your computer.

Port Scanning with *stroke*
---
So you want to perform a port scan, but you are missing the more powerful *nmap* command that can be installed via MacPorts or compiled from [insecure.org][insecure]. In order to use the command, open Terminal and cd to the **/Applications/Utilities/Network Utility.app/Contents/Resources/** directory, then type ./stoke

{% highlight bash %}
$ justinrummel@JRummel-MBP$ cd "/Applications/Utilities/Network Utility.app/Contents/Resources/"
$ justinrummel@JRummel-MBP:Resources$ ./stroke
2011-08-02 12:46:09.315 stroke[45023:707] stroke address startPort endPort
{% endhighlight %}

The help information for stoke is very short, mostly because this is a one trick pony. You can enter your address (IP or FQDN), a starting port number, and end port number, then off you go! A good port to start with is 20 and end somewhere around 10000. Yes you can go higher to 65535, but it will just take longer. So for example:

{% highlight bash %}
$ justinrummel@JRummel-MBP:Resources$ ./stroke 192.168.1.111 20 10000
Port Scanning host: 192.168.1.111

          Open TCP Port: 22 ssh
          Open TCP Port: 25 smtp
          Open TCP Port: 53 domain
          Open TCP Port: 80 http
          Open TCP Port: 88 kerberos
          Open TCP Port: 106 3com-tsmux
          Open TCP Port: 143 imap
          Open TCP Port: 311 asip-webadmin
          Open TCP Port: 389 ldap
          Open TCP Port: 443 https
          Open TCP Port: 464 kpasswd
          Open TCP Port: 587 submission
          Open TCP Port: 625 dec_dlm
          Open TCP Port: 749 kerberos-adm
          Open TCP Port: 993 imaps
          Open TCP Port: 2000 callbook
          Open TCP Port: 2336 appleugcontrol
          Open TCP Port: 3659 apple-sasl
          Open TCP Port: 4190 sieve
          Open TCP Port: 5204
          Open TCP Port: 5220
          Open TCP Port: 5268
          Open TCP Port: 5900 rfb
          Open TCP Port: 8088 radan-http
{% endhighlight %}

Things you can’t do for people who use nmap include fingerprinting, service information, comma separated for a select ports to scan vs. the whole spectrum. If you find a port number and are not sure what it’s used for, check the Apple kbase article [Well known TCP and UDP ports used by Apple software products][tcpUDP].

[tcpUDP]: http://support.apple.com/kb/ts1629

Wireless discovery with *airport*
---
The airport command is more powerful than stroke as you are able to use this for preferences setting, network scanning, or packet capturing! First lets find the command by cd to the **/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/** directory, then type ./airport

If you just typed that out... you’ll notice a long list of options for this command. More than I want to copy and paste for this post, and much more than stroke!

If you need to capture the available wireless networks that are at your current location, we’ll use the "-s" flag for scanning available Wi-Fi networks.

{% highlight bash %}
$ justinrummel@JRummel-MBP$ cd /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources
$ justinrummel@JRummel-MBP:Resources$ ./airport -s
		SSID    BSSID             RSSI  CHANNEL HT CC SECURITY (auth/unicast/group)
		hhonors 00:1a:a2:82:2d:90 -90 	4 		N  -- NONE
		hhonors 00:16:46:2c:41:40 -89 	11 		N  -- NONE
		hhonors 00:16:46:2c:43:00 -78 	6 		N  -- NONE
		hhonors 00:1a:a2:82:30:10 -59 	6 		N  -- NONE
		hhonors 00:16:46:2c:42:60 -83 	1 		N  -- NONE
		hhonors 00:16:46:2c:42:20 -63 	1 		N  -- NONE
		hhonors 00:1b:2a:95:52:70 -75 	11 		N  -- NONE
{% endhighlight %}

From my Hilton hotel, you can see there are 7 Access Points (AP) that are near my room, all with the SSID of "hhonors". We can also see that there is one bad AP that is running on channel 4. If you were not aware, enjoy this 802.11 101 lesson only use channels 1, 6, and 11 for "g" service ("n" has more channels and are higher numbers, but that discussion is for another post. So if I connect to the "hhonors" network, how do I know which AP I really connected to. My guess would be the one with RSSI value of -50 because that is the strongs single. Think of RSSI as golf; the lower the better.

If you need to see information about your current wireless network, you can use the "-I" flag.

{% highlight bash %}
$ justinrummel@JRummel-MBP:Resources$ ./airport -I
          agrCtlRSSI: -51
          agrExtRSSI: 0
         agrCtlNoise: -90
         agrExtNoise: 0
               state: running
             op mode: station
          lastTxRate: 54
             maxRate: 54
     lastAssocStatus: 0
         802.11 auth: open
           link auth: none
               BSSID: 0:1a:a2:82:30:10
                SSID: hhonors
                 MCS: -1
             channel: 6
{% endhighlight %}

Once connected to "hhonors", the "-I" flag gave me the BSSID of "0:1a:a2:82:30:10″ which matches the previous command results using the "-s" flag who’s RSSI of -50.

What else can you do with the airport command? How about this awesome list:

*   DisconnectOnLogout
*   Automatic Joining
*   Remembering Recent Networks
*   Requiring an Admin account to make changes

These options should look somewhat familiar as if you check out the System Preferences => Network => Wi-Fi you would see the same checkboxes. This gives you the option of changing your settings by SSH or a script later in time.

![Settings]({{ site.url }}/images/2011/08/Wi-Fi1.png)
Wi-Fi Network Settings

![Options]({{ site.url }}/images/2011/08/Wi-Fi2.png)
Wi-Fi Network Options

[xCode]: http://itunes.apple.com/us/app/xcode/id448457090?mt=12
[macPorts]: http://www.macports.org/install.php
[insecure]: http://nmap.org/download.html#source
