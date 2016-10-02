---
layout: single
title: "Updated XProtectWatch now with terminal-notifier"
date: 2013-03-22 20:42
categories:
    - "Tech Article"
tags:
    - Apple
    - Mt Lion
    - XProtect
---

### XProtectWatch 1.1.0 (now with terminal-notifier support)
![XProtectWatch]({{ site.url }}/images/2013/03/22/XProtectWatch-Notification.png){: .align-right}
I have updated [XProtectWatch][XProtectWatch] to now utilize [terminal-notifier][terminal-notifier] "a command-line tool to send Mac OS X User Notifications, which are available in Mac OS X 10.8".  To install terminal-notifier is pretty simple, as I have also created a ```terminal-notifier.sh``` script that you can run that will download the latest [terminal-notifier zip file][dl] from github.com, unzip, and move to your /Applications folder (where my script expect terminal-notifier to exist).

### rollBack (hack)
In addition to using terminal-notifier, I've also created a ```rollBack.sh``` script.  As noted in XProtectWatch's [README.md][readme], **THIS IS A HACK SCRIPT**.  I'm really just searching for the last two files within the XProtectWatch Shared folder, removing them, then taking the 2nd to last version and copying them back into the system.  They will then be updated the next time ```sudo /usr/libexec/XProtectUpdater``` runs, which will then trigger the ```watchProtect.sh``` script to run.  I created mostly for myself to test the terminal-notification function without having to wait for Apple to update their files.

### LaunchAgent shuffle
Lastly, if you had downloaded these scripts before, be sure to take note that I had to move the /Library/LaunchDeamon to ~/Library/LaunchAgent in order for terminal-notifier to work.  The reason is notification that were triggered by a system process didn't forward to the current user, therefore, a user's account had to load the plist file.

what does it take for all these updates?  ```git clone https://github.com/justinrummel/XProtectWatch.git```

[XProtectWatch]: https://github.com/justinrummel/XProtectWatch
[terminal-notifier]: https://github.com/alloy/terminal-notifier
[dl]: https://github.com/alloy/terminal-notifier/downloads
[readme]: https://github.com/justinrummel/XProtectWatch/blob/master/README.md
