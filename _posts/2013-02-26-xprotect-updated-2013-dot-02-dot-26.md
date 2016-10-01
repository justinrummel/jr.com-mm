---
title: "XProtect updated - 2013.02.26"
layout: single
date: 2013-02-26 11:54
tags:
    - Apple
    - Mt Lion
    - XProtect
---
On Feb 19, 2013 11:48 PM Topher Kessler releases his article for CNET that [New Mac malware opens secure reverse shell][8301-13727_7-57570100-263] is out, "but has not yet been determined to be much of a threat".  His article properly sources [Intego's][intego] original article on the matter. In short it uses a modified implementation of openssl to establish a secure connection to a remote server thus creating a [botnet][botnet] or Command and Control (C&C) environment.

Things like this is why Apple updates XProtect and they should update it often (not to mention vulnerable plugins like Java or Flash).  I've [written about XProtect before]({{ site.url }}/apples-built-in-anti-virus-xprotect/) and how it works back in 2011.  Just letting you know that in the mist of Mac SysAdmin pains of XProtect (such as disabling Java or Flash overnight) it can also work FOR you.  There have been a couple of GitHub projects that are trying to help Mac SysAdmins in managing XProtect which can be found at:

*	[XProtect Packager][timsutton] by Tim Sutton
*	[DisableXProtectUpdater][DisableXProtectUpdater] by Greg Neagle
*	[Managing Java browser plug-in settings][rtrouton] by Rich Trouton
*	[Everything you'll wish you didn't know about disabling Java 7 updates][macops] by Tim Sutton

I'm not recommending one or the other, I'm just giving some quick links.  One item I will point out is that I do keep track of XProtect for my personal system via a quick and dirty LaunchDaemon that watches the XProtect.plist file, and when it changes it copies that version to /Users/Shared/XProtect/ folder, this way I can always do a diff between the last two files to see what has changed.

You can clone a copy of XProtectWatch for your personal needs by going to [https://github.com/justinrummel/XProtectWatch](https://github.com/justinrummel/XProtectWatch).

A final option is to utilize changedection.com and simply 'watch' for Apple's clientConfiguration.plist file to be updated.  I've established one for version 3 of clientConfiguration [here][clientconfiguration3_log].

To see the diff for today's Xprotect update here are the resulting diff gist's:

{% gist 5040051 %}

{% gist 5040046 %}

[8301-13727_7-57570100-263]: http://reviews.cnet.com/8301-13727_7-57570100-263/new-mac-malware-opens-secure-reverse-shell
[intego]: http://www.intego.com/mac-security-blog/pint-sized-backdoor-for-os-x-discovered/
[botnet]: http://en.wikipedia.org/wiki/Botnet
[timsutton]: https://github.com/timsutton/XProtectPackager
[DisableXProtectUpdater]: http://managingosx.wordpress.com/2013/01/31/disabled-java-plugins-xprotect-updater/
[rtrouton]: http://derflounder.wordpress.com/2013/02/24/managing-java-browser-plug-in-settings-for-apples-xprotect-malware-protection/
[macops]: http://macops.ca/everything-youll-wish-you-didnt-know-about-disabling-java-7-updates/
[clientconfiguration3_log]: https://www.changedetection.com/log/apple/configuration/clientconfiguration3_log.html
