---
layout: single
title: "Migrate OSX 10.6 Wiki to 10.8 with lost Directory"
date: 2013-02-16 13:12
categories:
    - "Tech Article"
tags:
    - Apple
    - Mt Lion
    - Wiki
    - OSXS
header:
    image: /assets/images/mt-lion-OG-Header.jpg			    # Twitter (use 'overlay_image')
    overlay_image: /assets/images/mt-lion-OG-Header.jpg		# Article header at 2048x768
    overlay_filter: 0.15
    teaser: /assets/images/mt-lion-OG-Header-Twitter.jpg 		# Shrink image to 575 width
    caption: "Photo credit: [**Apple, Inc**](http://www.apple.com)"
---

This title is very specific and may not be everyone's exact scenario, however, there was plenty of beneficial items in my latest exercise with Wiki data on OS X; specifically taking old 10.6 Wiki data and putting it on a new server in which the Directory information was lost.

Overview
---

I happened to have Wiki data from a 10.6.8 server that was saved by a simple backup routine instead of using Time Machine backups.	 "No Time Machine backup?" you ask.	This was because this was 10.6 Server! Remember, Time Machine couldn't stop Open Directory, so back then backups were "on the ODM, use this 'export' script", and "rsync or use some other backup tool to save your data".  In 10.6 the Wiki data was saved in /Library/Collaboration so it made backup of the data very simple.

The environment that I stepped into was:

> Now that 10.8 is available (and our Xserve is no longer supported because it was made prior to 2009) lets move that data to a new server, and because the only thing we need is the /Library/Collaboration folder just save that data to an storage array and scrap the server...	we don't need that anymore.
> <cite>Anonymous, famous last words</cite>

So there are two things to remember when migrating Wiki data:

1.	The Directory is critical (and even more so w/ Mt Lion)
2.	If you are doing a migration that needs to "upgrade" data, be sure to have a system that can still run the old OS.

What do I have to work with for this migration task?  File backup of /Library/Collaboration with the original Directory system lost targeted for a machine that cannot run 10.6 to update.  Not a problem, right.  [Apple's kbase article][HT5585] on how to migrate Wiki data from a 10.6 server to Mt Lion should work...  right?  Not really.  Depending on how you have your Wiki setup and it's permissions (who owns the data vs.	who has read and/or write capabilities) some of the Wiki groups will not come over.

Final Workflow
---

What I have done several times is migrate 10.6 Wiki to a new 10.6 Wiki server because I can always strip the permissions data by doing the following steps.

### 10.6 Server Wiki to 10.6 server ###
{% highlight bash %}
# Wiki Migrate https://discussions.apple.com/message/10479747#10479747 Source Article
sudo serveradmin stop web
sudo mv /tmp/Collaboration/Groups/ /Library/Collaboration/Groups/
sudo chown -R 94:94 /Library/Collaboration/Groups/
sudo rm /Library/Collaboration/dataVersion.plist
sudo rm /Library/Collaboration/globalIndex.db
sudo rm /Library/Application Support/Apple/WikiServer/directoryIndex.db
sudo serveradmin start web
{% endhighlight %}

The end result is a working 10.6 Wiki server.  So what about the new hardware that cannot run 10.6.8 Server...  VMware to the rescue!  You can install 10.6.8 Server in VMware Fusion as it's a Server OS (thus is compliant to Apple's EULA).  *Now* we can upgrade to 10.8 and move the Wiki content from the VM to the real server by following [Apple's kbase article][HT5585].  You would think that wouldn't you.

Let's review what we have and where we will go:

1.	You have a VM w/ 10.6.8 Server running Wiki (which includes Open Directory Service for Authentication).
2.	Downloaded and install OS X Mountain Lion
3.	Software Updates for Mt Lion
4.	Download and install Server.app for OS X

End result is a full functioning Wiki service... that is running on your local VM.  Now I could just install VMWare on the new hardware and just be done, but Fusion is not really production worthy for this environment so that was not an option.  When I tried to migrate the data following [Apple's kbase article][HT5585] the end result was several Wiki groups that could not be administered.  What happened?  The "Directory Admin" that was running in your VM has a different UUID than the "Directory Admin" running on your new Mac hardware that may either:

1.	Be running as an ODM
2.	May be joined to a ODM via Directory Utility.

Final solution?  Thank goodness Apple updated their [Kerberos][kerb] to [Heimdal][h5l] (as discussed last year at [MacTech]({{ site.url }}/mactech-conference-2011/) and [MacIT]({{ site.url }}/it851-how-lion-has-changed-mac-os-x-services-features-capabilities/)), because I can now connect to multiple Directories!  I joined my VM of 10.8.2 running Server.app v2.2.1 to the future Directory system (AD or OD), adjusted the Wiki settings for each group, then followed Apple's kbase step by step which can be shortly described as:

1.	export wiki postgres db with the ```pg_dump``` command.
2.	copy /Library/Server/Wiki/FileData from the old server to the new server
3.	change permissions on the new Server for FileData ```sudo chown -R _teamsserver:_teamsserver``` & ```sudo chmod -R +a "www allow search"```
4.	On the new server ```dropdb``` the existing db (thus losing ALL content previously there), ```createdb``` to have a bare but ready db and then ```pg_restore``` your info from your collab.pgdump.

Lessons Learned
---

Wiki uses authentication, but simple usernames and passwords are not the limit to how Wiki is tied to the directory system.	 Wiki is now using UUID's to identify who has read/write/owner of Wiki data.  You know, this one:

{% highlight bash %}
# dscl command to find the GeneratedUID of diradmin
sadmin@osxs1 ~> dscl /Search -read /Users/diradmin GeneratedUID
GeneratedUID: 27D18844-70C6-4BDD-BE3A-5B26A6FDEA1B

# not my real UUID.	 Generated via command 'uuidgen'
{% endhighlight %}

[kerb]: http://en.wikipedia.org/wiki/Kerberos_(protocol)
[h5l]: http://www.h5l.org
[HT5585]: http://support.apple.com/kb/HT5585
