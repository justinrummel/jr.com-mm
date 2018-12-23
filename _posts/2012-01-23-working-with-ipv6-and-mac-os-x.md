---
layout: single
title: "Working With IPv6 and Mac OS X"
date: 2012-01-23
categories:
    - "Tech Article"
tags:
    - Apple
    - IPv6
    - Lion
    - OSX
header:
    image: /assets/images/lion-OG-Header.jpg     # Twitter (use 'overlay_image')
    overlay_image: /assets/images/lion-OG-Header.jpg       # Article header at 2048x768
    overlay_filter: 0.15
    teaser: /assets/images/lion-OG-Header-Twitter.jpg    # Shrink image to 575 width
    caption: "Photo credit: [**Apple, Inc**](https://www.apple.com)"
---

I don't feel that anyone reading this in 2012 has never heard of IPv6. The easiest way to put it it's a combinations of HEX values to make a big ugly "thing" that represents your computer. IPv4 was simple; four octets made up of a value from 0-255; thus 192.168.1.111. IPv6 takes this to a new other level. From Wikipedia:

> IPv6 addresses have two logical parts:a 64-bit network prefix, and a 64-bit host address part. (The host address is often automatically generated from the interface MAC address.[37]) An IPv6 address is represented by 8 groups of 16-bit hexadecimal values separated by colons (:) shown as follows:
>
>  ```2001:0db8:85a3:0000:0000:8a2e:0370:7334```
>
> The hexadecimal digits are case-insensitive.  The 128-bit IPv6 address can be abbreviated with the following rules:
>
> Rule 1: Leading zeros within a 16-bit value may be omitted. For example, the address
>
>  ```fe80:0000:0000:0000:0202:b3ff:fe1e:8329```
>
> may be written as
>
>   ```fe80:0:0:0:202:b3ff:fe1e:8329```
>
> Rule 2: One group of consecutive zeros within an address may be replaced by a double colon. For example,
>
>   ```fe80:0:0:0:202:b3ff:fe1e:8329```
>
> becomes
>
>   ```fe80::202:b3ff:fe1e:8329```
>
> <cite>[Wikipedia, IPv6 address](https://en.wikipedia.org/wiki/IPv6_address#IPv6_addresses_in_the_Domain_Name_System)</cite>

A single IPv6 address can be represented in several different ways, such as 2001:db8::1:0:0:1 and 2001:0DB8:0:0:1::1. RFC 5952 recommends a canonical textual representation

How do I get an IPv6 Address on Lion
---

You most likely already have one! If you navigate to System Preferences = Network and click on the "Advance..." button on your Ethernet settings, you should see "Configure IPv6" and it's set to automatic. You're DONE!

![IPv6-Settings]({{ site.url }}/assets/images/2012/01/IPv6-Settings.png)

Now, finding is your IPv6 address is another story. The best way to discover your IPv6 address is running the following command in Terminal:

{% highlight bash %}
$ ifconfig en0
{% endhighlight %}

You should get back something like the following:
{% highlight bash %}
$ justinrummel@jrummel-mbp:~$ ifconfig en0
en0:flags=8863 mtu 1500
 options=27
 ether 00:25:bc:dc:99:24
 inet6 fe80::225:bcff:fedc:9924%en0 prefixlen 64 scopeid 0x4
 inet 192.168.1.11 netmask 0xffffff00 broadcast 192.168.1.255
 media:autoselect (1000baseT )
 status:active
{% endhighlight %}

You can see the inet6 value that starts with the hex values "fe80", that is my IPv6 address. Notice at the end of that string is "%en0", you don't need that part. An easy way only to get the IPv6 Address in one line could be:

{% highlight bash %}
$ ifconfig en0 | grep inet6 | awk -F " " '{print $2}' | sed 's/%en0//'
{% endhighlight %}

How to test IPv6 on your local network
---

Normally to test if a computer is on your network you would initiate a "ping" to the IP address of your target machine. IPv6 has the same capabilities, however, the function is not embedded into the "ping" command... it's now "ping6"!

The interesting part of ping6 is that you have to declare the interface you are using to send the command. So on a standard Mac machine (and non-MB Air), you have two interfaces to choose from:

1.  Ethernet:en0
2.  WiFi (f.k.a AirPort):en1

So if I wanted to ping from my laptop to a target machine IPv6 address of "fe80::c62c:3ff:fe21:cc0e", I would perform a ping6 the following:

{% highlight bash %}
$ justinrummel@jrummel-mbp:~$ ping6 -I en0 -c 1 fe80::c62c:3ff:fe21:cc0e
PING6(56=40 8 8 bytes) fe80::225:bcff:fedc:9924%en0 --> fe80::c62c:3ff:fe21:cc0e
16 bytes from fe80::c62c:3ff:fe21:cc0e%en0, icmp_seq=0 hlim=64 time=0.406 ms

--- fe80::c62c:3ff:fe21:cc0e ping6 statistics ---
1 packets transmitted, 1 packets received, 0.0% packet loss
round-trip min/avg/max/std-dev = 0.406/0.406/0.406/0.000 ms
{% endhighlight %}

Sources
---

- Wikipedia IPv6
- ping6 man page