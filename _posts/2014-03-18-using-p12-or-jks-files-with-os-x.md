---
layout: single
title: "Using .p12 or JKS files with OS X"
date: 2014-03-18 15:10
categories:
    - "Tech Article"
tags:
    - Apple
    - Casper Suite
    - OSXS
    - CrashPlan
    - Certificates
---

My test CrashPlan PROe (CPPe, a.k.a "Black") environment has been troubled with this [VMware Fusion bug][vmware] where linking a shared folder has some issues with read/write.  The result was anytime a client (Mac or Windows) running CrashPlan PROe had to restart, CrashPlan PROe Server would go into a deep prune session that would last for days (more info in the logs, but you get the idea).  Not very reassuring when dealing with backups.

It took some time, but with the help of Code42 support the best recommended route was to remove my VMware Fusion VMs from the equation and run direct on my VM host, a couple of 2010 MacMini Servers.  The process was pretty easy by:

- Prep the CPPe database
- Do a database dump
- Find/replace some settings (done by Code42 support)
- Install CPPe Server on host
- ```launchclt unload /Library/LaunchDaemons/com.crashplan.proserver.plist```
- place converted db in /Library/Application\ Support/CrashPlan/PROServer/db/
- ```launchclt load /Library/LaunchDaemons/com.crashplan.proserver.plist```

Certificates
---

So WHY is this titled referencing .p12 and .jks files?  I originally used [this script to generate JKS files][SSLJKS] in Ubuntu Server.  This allowed me to create the JKS, import the RootCA, IntermediateCA, CSR, and then finally copy the signed cert to a single file that was then imported into CPPe's management console.  When migrating to OS X, I had already had a signed certificate for the server (web services)... so starting from the beginning wasn't an option.

Exporting from the System Keychain has been an issue since the 10.5 days.  You *think* the file is exported properly with both the public and private key... but it was always missing the private key for some reason.

The solution is to enable root on your server.  You can enable root by launching Directory Utility ( /System/Library/CoreServices/Directory\ Utility.app ) or by following [Apple's kbase][ht1528].

Login as root, find and select **BOTH** the public and private certificate in Keychain Access and export to a .p12.  This process will ask you to use a password to make sure things are secure as you are **EXPORTING THE PRIVATE KEY**.

Once you have the .p12, this simple one-line will convert the .p12 to a .jks so you can import into CPPe's management console.

{% highlight bash %}
keytool -importkeystore -destkeystore NEW-SERVER.jks -deststorepass Pass#word -srckeystore certificate-export.p12 -srcstoretype PKCS12 -srcstorepass Pass#word
{% endhighlight %}

As a best practice, I usually create .jks, .p12, or even .cer files with the server's FQDN to make things easy to read in the future.  Hope this helps someone from pulling out their hair.

[vmware]: https://communities.vmware.com/message/2276614
[SSLJKS]: https://github.com/justinrummel/Random-Scripts/blob/master/General/Ubuntu-SSLCert-jks.sh
[ht1528]: http://support.apple.com/kb/ht1528
