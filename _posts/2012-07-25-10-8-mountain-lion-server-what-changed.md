---
layout: single
title: "10.8 Mountain Lion Server: What Changed?"
date: 2012-07-25
categories:
    - "Tech Article"
tags:
    - Apple
    - Mt Lion
    - OSXS
---

I've posted several docs already on what I see as big changes from a Server Admin point of view which includes moving the rest of the supported applications from Server Admin to Server.app. With that now complete, Server Admin and Workgroup Manager (among all the other Server Admin Tools) have now been removed. In fact, if you update your Lion OS (Server or client) it will search for /Applications/Server folder and remove everything... just in case you didn't get the point from all the rumor sites.

So other items that have change?

Discovery
---

I did a quick `sudo serveradmin list` on both my Lion server install and a new Mt Lion server install to see what services were missing. Here is the final list:

### Still Available

``` text
accounts
addressbook
afp
bonjour
calendar
certs
config
devicemgr
dirserv
dns
filebrowser
info
jabber
mail
netboot
network
nfs
postgres
radius
sharing
signaler
smb
swupdate
vpn
web
wiki
```

### Removed

``` text
dhcp
ipfilter
notification
pcast
pcastlibrary
xgrid
xsan
```

### New

``` text
ftp
san
```

Reaction
---

Now I haven't dug into each service setting to see if there are new variable flags, so just because the first column is huge doesn't mean there are not updates... I am just looking for the BIG outliers of moving to Mt Lion. The items that hit me hard are the ones that are removed.

- ``` dhcp ``` – This came to me as a shock. DHCP is available as it is needed for VPN service. If the core element to provide DHCP is there, why not provide a preference pane? I can only guess that Apple believe that if you are a home user you are a) using an ISP provided router which does have DHCP or b) using an Airport base station to provide DHCP of which Mt Lion can control (if you are a business user Apple must think you have an appliance to do this for you). I am personally in the middle. I do use Apple DHCP because my ISP's DHCP service on the router sucks. I liked the feature DHCP on OS X Server provided for my home network. With this feature missing, I may have a motivator to learn ruby, python, and/or Objective-C and create an application because this is screaming "as an opportunity for a third-party provider".
- ``` ipfilter ``` – HELLO! No firewall? Easy... you still have the Application Firewall in ``` /usr/libexec/ApplicationFirewall/ ``` folder which is enabled by the "Security & Privacy" System Preference Pane. If you want to know more, I'd suggest starting with Charles Edge's post at . But in my opinion, this falls right in line with Mt Lion's new [Gatekeeper][gatekeeper]. If all ports are "off", and code signing/sandboxing is enforced then it seems your system is pretty secure.
- ``` pcast(library) ``` – Podcasting is no longer available? I've done several Macworld presentations on installing and configuring Podcast Producer, so this news is personally sad to me. Who knows, it may come back to life in some other format?
- ``` xgrid ``` / ``` xsan ``` – um... check the added section. :)

Let's take a look of what has been added to Mt Lion as an admin service to see if this makes us feel any better.

- FTP – I'm sure this will make some people happy as FTP has returned to a GUI setting. And as soon as people say thanks, check out the service, they will complain about not enough features. Personally, FTP is a horrible idea unless you are knowingly opening a port for people to download/upload stuff from your server. If you believe the solution is "I'll protect it with a password", it's in cleartext. Thank you for your password.
- san – Ah... ok so xsan is not dead. Or is it? I really don't know as when I perform a ``` sudo serveradmin settings san ``` to see what options are available, I get "san:numberOfFibreChannelPorts = 0″. Oh yea... I don't have any Fiber Channel equipment so I never used Xsan. I'm sure someone who deals with Xsan will have more to write about this, but as for me it's on my "I don't care" list.

Feel better? No? Me neither. But we move on as any Mac Administrator knows things will constantly change. Maybe the items that were removed will become available in 10.8.3 (similar to better log options that were given on Lion 10.7.3)? The things that Apple did finally port over to Server.app are clean, easy to figure out, and seem to be stable.

[gatekeeper]: http://www.apple.com/osx/whats-new/#gatekeeper
