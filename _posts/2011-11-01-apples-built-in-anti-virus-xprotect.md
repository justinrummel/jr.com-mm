---
layout: single
title: "Apple's Built-in Anti-Virus: XProtect"
date: 2011-11-01
categories:
    - "Tech Article"
tags:
    - Apple
    - Lion
    - CLI
    - XProtect
---

Today, [Intego announced of a new trojan designed for the Mac][DevilRobber] dubbed "DevilRobber".

You can read Intego's site (or many other sites posting about this trojan), but I wanted to remind everyone that there is a built-in anti-virus software within updated versions of Snow Leopard (version 10.6.7 with Security Update 2011-003 OR greater) and Lion called XProtect.

Xprotect is enabled by going to System Preferences => Security => General tab and check the "Automatically update safe downloads list". If you ever want to update your list, just uncheck / recheck the option.

![XProtect]({{ site.url }}/images/2011/11/XProtect.png)

(Notice, my settings may look different from yours as I have FileVault enabled along with other MCX settings. The safe downloads list is what's important for this article.)

However, let's get a little more information from Xprotect.

If we run to following command "today" (11/1/2011 @ 11am Eastern), we get the following results:

``` bash
$ /usr/libexec/PlistBuddy -c "print LastModification" /System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/XProtect.meta.plist
	Tue, 11 Oct 2011 16:20:51 GMT
```

This tells us that our anti-virus dictionary file has not been updated since Oct 11th of 2011. In order to update your dictionary, you can use the above check / recheck method or:

``` bash
$ /usr/libexec/XProtectUpdater
```

You will notice that as of right now the XPotect meta file timestamp has not change. I assume Apple will soon update this file to protect Mac users from DevilRobber, or any other future trojan/virus that gets created. We're just dependent on Apple to update their dictionary just the same as Intego / Sophos / etc users are dependent on their paid software to update their dictionary file. Once the file is updated, you should get a similar result for MacDefender.

``` bash
$ cat /System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/XProtect.plist | grep MacDefender
```

### Update
XProtect.plist file has been updated as of Nov 1st, 2011, and if you grep for "Devil" you will get a response of "OSX.DevilRobber.A". Pretty quick (and automatically done) as the announcement was on Nov 1st.

[DevilRobber]: http://blog.intego.com/new-malware-devilrobber-grabs-files-and-bitcoins-performs-bitcoin-mining-and-more/
