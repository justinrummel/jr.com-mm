---
title: "How APNS works with MDMs that manage OSX and iOS"
layout: single
date: 2013-07-18 16:21
tags:
    - Apple
    - Casper Suite
    - APNS
---
## Overview

Classic Environment

<figure>
<a href="{{ site.url }}/images/2013/07/18/apns-2.png"><img src="{{ site.url }}/images/2013/07/18/apns-2_480.png" alt="" title="" /></a>
</figure>

-	"Work" location where your MDM (CasperSuite JSS in this example), and other internal servers may exist.
-	"Home" location because people take their equipment home and still do work from the comforts of their couch.

## APNS Workflow

This is where the magic happens!

You as the OS X and/or iOS Administrator want your devices to do *something*.  It may be install a Configuration Profile to "lock down", OR provide a feature such as Email configuration, Wi-Fi Access, or something else... but you want it down NOW!  You login to your MDM management page/console, select what devices you want to perform some action.  At that point, your MDM does the following:

-	Communicate to Apple's Push Notification Servers (APNS) over ports 2195, and 2196 to "FIND MY DEVICES".

<figure>
<a href="{{ site.url }}/images/2013/07/18/apns-3.png"><img src="{{ site.url }}/images/2013/07/18/apns-3_480.png" alt="" title="" /></a>
</figure>

-	Your devices are already connected to APNS once they turn on, they have Internet connection, AND port 5223 is not blocked.  When your device does connect to Apple's APNS network, it gets a token.

<figure>
<a href="{{ site.url }}/images/2013/07/18/apns-4.png"><img src="{{ site.url }}/images/2013/07/18/apns-4_480.png" alt="" title="" /></a>
</figure>

-	It's this token that allows Apple's APNS network to find and talk to your devices through your firewall. They key element is when APNS push commands are sent, the only bits of information in the payload from Apple is **"HEY *Device*!  Talk to your MDM"** and nothing else.  That is where APNS stops being the middle man and lets a secure communication take over between your devices and MDM only.

<figure>
<a href="{{ site.url }}/images/2013/07/18/apns-5.png"><img src="{{ site.url }}/images/2013/07/18/apns-5_480.png" alt="" title="" /></a>
</figure>

-	Once the devices received that command, they will then talk to your MDM over their designated port for the next set of commands you wish to execute from the MDM.  In my example commands are sent over port 8443 as this is the port for the Casper Suite (but it may be 443 for other MDM's such as Profile Manager).

<figure>
<a href="{{ site.url }}/images/2013/07/18/apns-6.png"><img src="{{ site.url }}/images/2013/07/18/apns-6_480.png" alt="" title="" /></a>
</figure>

-	Your devices then do whatever your MDM requests.

## Examples

Some examples that the JSS can do to help manage your OSX environment include:

-	Request to get Software Updates from your Internal SUS over port 8088

<figure>
<a href="{{ site.url }}/images/2013/07/18/apns-7.png"><img src="{{ site.url }}/images/2013/07/18/apns-7_480.png" alt="" title="" /></a>
</figure>

-	Install packages from an SMB (445) or AFP (548) FileShare

<figure>
<a href="{{ site.url }}/images/2013/07/18/apns-8.png"><img src="{{ site.url }}/images/2013/07/18/apns-8_480.png" alt="" title="" /></a>
</figure>

-	Install packages from an HTTP (80) or HTTPS (443) server.&nbsp;<sup id="fnr1-2013-07-18">[1]</sup>

<figure>
<a href="{{ site.url }}/images/2013/07/18/apns-9.png"><img src="{{ site.url }}/images/2013/07/18/apns-9_480.png" alt="" title="" /></a>
</figure>

-	Force NetBoot, but I'm not going into the port numbers for that as there are too many.

## Notes

<div class="footnotes">
<hr />
<ol>
	<li id="fn1-2013-07-18">
		<p>Be sure your Certificate on your HTTPS distribution point is signed by a third party OR that your internal ROOT CA is already installed on your client machines.&nbsp;<a href="#fnr1-2013-07-18" class="footnoteBackLink" title="Jump back to footnote 1 in the text.">&#8617;</a></p>
	</li>
</ol>
</div>

## Sources

-	[Apple's Developer Documentation on APNS][APNS]
-	[About push Notification; Advance Administration guide][push]
-	[Apple's list of Ports for APNS][ports]
-	[Apple's NetBoot troubleshooting][netboot]
-	[Well known TCP and UDP ports used by Apple][wellKnown]

[APNS]: http://developer.apple.com/library/mac/#documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/ApplePushService.html#//apple_ref/doc/uid/TP40008194-CH100-SW9 
[push]: https://help.apple.com/advancedserveradmin/mac/10.8/#apdBCCA9A8E-119C-4871-BB33-8C98264D9572 
[ports]: http://support.apple.com/kb/TS4264 
[netboot]: http://support.apple.com/kb/ts3678 
[wellKnown]: http://support.apple.com/kb/TS1629 

[1]: #fn1-2013-07-18
