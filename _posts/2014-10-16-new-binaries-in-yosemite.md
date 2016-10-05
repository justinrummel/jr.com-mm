---
layout: single
title: "New binaries in Yosemite"
date: 2014-10-16 09:30
description: "Find the new (or removed) binary commands now that Yosemite is released!"
categories:
    - "Tech Article"
tags:
    - Apple
    - Yosemite
    - OSX
    - CLI
header:
    image: 2014/10/16/Hero-with-Clouds-Header.jpg     # Twitter (use 'overlay_image')
    overlay_image: 2014/10/16/Hero-with-Clouds-Header.jpg       # Article header at 2048x768
    overlay_filter: 0.15
    teaser: 2014/10/16/Hero-with-Clouds-Header-Twitter.jpg    # Shrink image to 575 width
    caption: "Photo credit: [**Apple, Inc**](http://www.apple.com)"
---

Every year I like to dig a little around some default paths to see what new binaries will be available to assist in deployment or troubleshooting.  I use a simple easy script that generates a list of all the binaries in /bin, /sbin, /usr/bin, /usr/sbin, and /usr/libexec from one OS (usually 10.x.4) to a recent beta build of the upcoming OS (in this case Yosemite).

New Binaries
---

#### /bin
Nothing has changed inside the /bin folder

#### /sbin
Nothing was added, what should not be surprising is what was removed, specifically ipfw and ip6fw.  If you do a ```man ipfw``` on your Mavericks machine Apple warned you that this was going away with:

<q>
This utility is DEPRECATED. Please use pfctl(8) instead
</q> ---<cite>ipfw man page</cite>

#### /usr/bin
There are a lot of updated binaries that had endings of ".12" which were removed and ".18" were added.  Don't really know what those are.  There are some new items with AVB (which was actually added in 10.9.5), but was is really interesting is all the "diagnose" items.  If you think Apple has a QA problem, they are trying to fix it with all of these diagnose binaries such as:

{% highlight bash %}
avbdiagnose     # Audio Visual diagnose
csdiagnose      # CoreStorage  diagnose
csgather        # CoreStorage metadata for diagnosis
ostraceutil     # OS
taskinfo        # Prints current processes
thermals        # I have no idea what "thermals" is doing.
{% endhighlight %}

#### /usr/libexec
A lot of new "*d" daemon processes that do not have man files or output help files when executed, but PlistBuddy is still there!

#### /usr/sbin
Here are new commands that I can see being used by macadmins:

**discoveryutil** - running sudo discoveryutil --help doesn't give you much, but there it shows a --debug option that states "interact w/discoveryd".  Hmm.. what is discoveryd? [The man page](x-man-page://8/discoveryd) states:

<q>
The discoveryd daemon is responsible for unicast DNS resolution, multicast DNS resolution, and Service Discovery on the system.  It performs queries, registrations, and provides answers on behalf of other clients through the DNS Service Discovery API as documented in dns_sd.h
</q> ---<cite>man discoveryd</cite>

We have DNS debugging! More info in man discoveryd such as logging level (None, Basic, Intermediate, Detailed, VeryDetailed, Everything, or a number) or the class (Events, Sockets, Bonjour, Network).

Some of the fun commands for discoveryutil are:

{% highlight bash %}
sudo discoveryutil help                 # prints all discoveryutil options
sudo discoveryutil configresolvers      # gives DNS servers for each interface and search domain
sudo discoveryutil mdnsflushcache       # everyones favorite network "fix"
sudo discoveryutil mdnsbrowses          # gives all the _service._tcp.domain.tld broadcasts (like appletv).  use grep "MDNS Browses" to limit the lines
sudo discoveryutil mdnsregistrations    # current machine's MDNS broadcast
sudo discoveryutil loglevel             # Default is "Basic", can see above for levels
sudo discoveryutil configinterfaces     # Current IP configurations for each interface.  something like a reformatted ipconfig or ifconfig
{% endhighlight %}

**dnctl** - this command forces your machine to work on a poor network for testing.  [The man page](x-man-page://8/dnctl) gives you a checklist (things to think about), variable flag options, and some examples.

**firmwarepasswd** - I'm guessing this will now be the default for setting your firmware password on devices and ```setregproptool``` will no longer be used.  Update your scripts!

**sysadminctl** - New command line tool to manipulate local users.  You can add, delete, password update, reset passwords for local accounts. Unfortunately there is no man page.  I haven't tested this fully to see how it handles directory accounts (AD or OD).

**unsetpassword** - set password to blank, needing a new pass.  From the help page:

> Performs the following actions on the current user's record and then shuts down the system:
 1. Sets the password to blank.
 2. Marks the record as requiring a new password.
 You must run this while logged in as an admin, non-root user and quit all running apps before running this tool.

Source script
---

{% highlight bash %}
#!/bin/bash
# descriptions
# This script looks in /bin, /sbin, /usr/bin, /usr/sbin, and /usr/libexec
# and generates a text file with all the unix binaries that are available.

# variables
os=`sw_vers -productVersion`

# functions
me=`whoami`
cd /Users/"${me}"/Desktop
for i in /bin /sbin /usr/bin /usr/sbin /usr/libexec; do
    fname=`echo $i | sed 's/\//-/g'`
    [ -d "$i" ] && { ls $i > "${os}${fname}".txt; }
done

exit 0
{% endhighlight %}