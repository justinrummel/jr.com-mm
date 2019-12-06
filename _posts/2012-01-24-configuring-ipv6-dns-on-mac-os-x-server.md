---
layout: single
title: Configuring IPv6 DNS on Mac OS X Server
date: 2012-01-24
categories:
    - "Tech Article"
tags:
    - Apple
    - DNS
    - IPv6
    - Lion
    - OSXS
header:
    image: /assets/images/lion-OG-Header.jpg     # Twitter (use 'overlay_image')
    overlay_image: /assets/images/lion-OG-Header.jpg       # Article header at 2048x768
    overlay_filter: 0.15
    teaser: /assets/images/lion-OG-Header-Twitter.jpg    # Shrink image to 575 width
    caption: "Photo credit: [**Apple, Inc**](https://www.apple.com)"
---

Over the past several months, my company has been dealing with AD/OD integrations with Lion 10.7.2 and the customer's environment is using ".local". If you are not familiar with the history between ".local" and Apple computers simply put: they don't mix. PERIOD. It all stems from Apple OS X Clients using the naming convention of "ComputerName.local" as its address for Bonjour services. When an Active Directory (AD) environment uses something like "company.local", Lion doesn't know if you are talking DNS or Bonjour... so it just tries everything, thus giving you delayed authentication (login) against your AD controllers.

With the release of OS X Lion, Apple stepped up the complexity notch and introduced IPv6 in its broadcast for resolving names, thus now you have four sets of timeouts to compete with:

1.	IPv4 DNS
2.	IPv4 Bonjour
3.	IPv6 DNS
4.	IPv6 Bonjour

Normally, if we can't get DNS working from the customer on their Windows AD domain controller, we'll utilize Apple's DNS service to place GOOD values until the customer can work out the "fun" of Windows DNS (hint, the more domains and the more domain controllers... it seems difficult in keeping records versus AD replication making things automagically disappear). One issue, Server Admin doesn't allow for creating IPv6 records (a.k.a AAAA records) so we're going to crank these out by hand!

Configuring Mac OS X DNS for IPv6 Records
---

Before we go any farther, I'm warning you now... modifying BIND configuration files by hand could will cause you grief later. You have just committed yourself to the rest of your life on hand modification of DNS records because once you start using Server Admin again... it may (and most likely) remove anything it doesn't understand. That's the joys of Apple's Server Admin tool.

If you have never looked at creating and/or adjusting BIND records on an Apple Server, I would first HIGHLY recommend you pick up a copy of Ed Marczak's Mac OS X Advanced System Administration v10.5]. It explains a lot about DNS and configuring BIND from command line starting at page 89 – 104. I'm not going to over the intricacies, I'm going for the dirty nibbles of IPv6 and what files you will adjust or create.

Test Environment
---

In my test environment I have four domains:

- justinrummel.net
- apple.edu
- example.prv
- newco.prv

All of these domains live in my lab network of 192.168.1.1/24 subnet, meaning all machines have 192.168.1.x IP address. Some machines may have multiple records within multiple zones; for instance my Software Update Server (SUS) is always "sus.zone.tld" so: sus.justinrummel.net, sus.apple.edu, sus.example.prv, sus.newco.prv all point to my one SUS server who's IP address is 192.168.1.111.

In order for Apple machines to fully work, you also need reverse DNS entries, which reverse zones. Reverse zones are displayed in a reverse IP structure, thus in my environment with every machine having a 192.168.1.x IP address, we're using 1.168.192 reverse name, plus "in-addr.arpa" as a suffix per ARPA naming conventions.

Each of these zones (forward and reverse) are listed in the /etc/named.conf file, which points to the zone files that reside within your /var/named directory.

Before we go any further, it is best practice to stop your DNS service prior to modifying any files so be sure to run sudo serveradmin stop dns before you change any files.

/var/named
---

I'm going to focus my examples on ONE domain "newco.prv" to make things easy to understand, however, this could be applied to any of the domains that I host within my lab. Also, at this point I assume you have already read my article [Working With IPv6 and Mac OS X]({{ site.url }}/working-with-ipv6-and-mac-os-x/) and know how to find your IPv6 address.

We are going to start with the easy files that we want to adjust to make IPv6 work in our environment. When you are thinking about DNS services on your Apple server, you are most likely thinking "How does a FQDN get translated to this IP address". The files that make this magic happen are located in your /var/named/ directory. You are going to have a file for each zone that starts with "db" (example db.newco.prv), which is the forwarding zone file. You will also have a "db.reverse.IP.in-addr.arpa" which is the IPv4 reverse zone file. There are two files that are "named.ca" and "named.local" that you can ignore as this is used for listing DNS root servers and your localhost environment respectively.

Inside my db.newco.prv zone I have three DNS entries with their associated IP address:

{% highlight dns %}
ldap.newco.prv is linked to IP address 192.168.1.150
jss.newco.prv is linked to IP address 192.168.1.151
cp.newco.prv is linked to IP address 192.168.1.152
{% endhighlight %}

If I wanted my ldap.newco.prv server to link to an IPv6 address, we need to update our db.newco.prv by duplicating the line that references ldap, jss, cp; and substitute our IPv4 address with our IPv6 address, PLUS make sure that the "A" record is now references as "AAAA". My updated db.newco.prv zone would look like this (*this is not the full db.newco.prv zone file, just the snippet that was updated*):

{% highlight dns %}
ldap.newco.prv.                       10800 IN A        192.168.1.150
ldap.newco.prv.                       10800 IN AAAA     fe80::20c:29ff:fe21:28a9
jss.newco.prv.                        10800 IN A        192.168.1.151
jss.newco.prv.                        10800 IN AAAA     fe80::20c:29ff:fe39:d6c
cp.newco.prv.                         10800 IN A        192.168.1.152
cp.newco.prv.                         10800 IN AAAA     fe80::20c:29ff:fed0:c01
{% endhighlight %}

Notice that all of my IPv6 records start with "fe80". These are known as "link-local" IPv6 address and are treated the same way as 192.168.0.0/16, 172.16-32.0.0/16, and 10.0.0.0/8 in that they are not internet routable, they are only for your local network.

Now for the reverse record.

Just like IPv4 we need to reverse your IPv6 record, however, it seems like it's not as simple as making things backwards to be in compliance with ARPA needed structure to "lookup" your IPv6 address and find the associated DNS record. I found a great utility called [ipv6calc][ipv6calc] that I was able to download, tar -xvzf; ./compile; make; sudo make install that will spit out the reverse IPv6 ARPA name.

{% highlight bash %}
$ justinrummel@jrummel-mbp:~$ ipv6calc --in ipv6addr --out revnibbles.arpa fe80::20c:29ff:fe21:28a9
	9.a.8.2.1.2.e.f.f.f.9.2.c.0.2.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.e.f.ip6.arpa.

$ justinrummel@jrummel-mbp:~$ ipv6calc --in ipv6addr --out revnibbles.arpa fe80::20c:29ff:fe39:d6c
	c.6.d.0.9.3.e.f.f.f.9.2.c.0.2.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.e.f.ip6.arpa.

$ justinrummel@jrummel-mbp:~$ ipv6calc --in ipv6addr --out revnibbles.arpa fe80::20c:29ff:fed0:c01
	1.0.c.0.0.d.e.f.f.f.9.2.c.0.2.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.e.f.ip6.arpa.
{% endhighlight %}

Since these are link-local, you can see that at a certain point the numbers become repetitive. Let's make things easy by cutting the "last half" of the string (minus the ".ipv6.arpa." at the end) and this will become our reverse zone (later in this article), and in for our reverse zone file's "$ORIGIN" section.

{% highlight bash %}
$ justinrummel@jrummel-mbp:~$ ipv6calc --in ipv6addr --out revnibbles.arpa fe80::20c:29ff:fed0:c01 | sed 's/.ip6.arpa.//' | cut -c 33-64
	0.0.0.0.0.0.0.0.0.0.0.0.0.8.e.f
{% endhighlight %}

Now it's time to create our new reverse IPv6 DNS zone file so we can translate our ARPA values to DNS names. Let's name the file "reverse-v6-fe80-64.IP6.ARPA" as this tells us it's the reverse IPv6 file for link-local (fe80) addresses. There is really no good way to do this other than copy/paste my example below and adjust your own values.

{% highlight dns %}
$TTL 3d	; Default TTL (bind 8 needs this, bind 9 ignores it)
@ 	IN SOA 0.0.0.0.0.0.0.0.0.0.0.0.0.8.e.f.ip6.arpa.      helpdeskEmail.newco.prv. (
		201201210  	; Serial number (YYYYMMdd)
		24h		; Refresh time
		30m		; Retry time
		2d		; Expire time
		3d		; Default TTL (bind 8 ignores this, bind 9 needs it)
)

                ; Name server entries
                IN     NS     dns1.newco.prv.
                IN     NS     dns2.newco.prv.

$ORIGIN 0.0.0.0.0.0.0.0.0.0.0.0.0.8.e.f.ip6.arpa.
9.a.8.2.1.2.e.f.f.f.9.2.c.0.2.0         IN      PTR     ldap.newco.prv.
c.6.d.0.9.3.e.f.f.f.9.2.c.0.2.0         IN      PTR     jss.newco.prv.
1.0.c.0.0.d.e.f.f.f.9.2.c.0.2.0         IN      PTR     cp.newco.prv.
{% endhighlight %}

Notice our bits 33-64 (which is what we received from the above sed / cut one liner) from our link-local values in the "$ORIGIN" section and bits 1-31 is only being references for our IPv6 to DNS name value. Now that we have our DNS forward and reverse zones files updated and created, we need to set the BIND configuration file to use our new IPv6 records.

/etc/named.conf
---

Your named.conf file is going to list each of your DNS zones that your server provides along with security settings and environment records for replication between multiple DNS servers. Think of your named.conf file as a configuration file that points to the "real data" versus housing any true information. In my test environment's /etc/named.conf file I have five forwarding zones (the for domains I host plus "localhost").

The good news is we don't need to add an IPv6 forwarding zone because we just updated our forward zone file "db.newco.prv" with the new AAAA records. However, we need to add a new zone to the named.conf file so it can find our reverse IPv6 zone as that was just created.

A zone file is constructed of these sections:

- Its type
- The zone file name
- If you can transfer the zone information (to a slave DNS that you control)
- If the slave can update the zone files

To make things easy, open your /etc/named.conf file and find the line with *view "com.apple.ServerAdmin.DNS.public"* and add this information below:

{% highlight dns %}
zone "0.0.0.0.0.0.0.0.0.0.0.0.0.8.e.f.ip6.arpa" {
		type master;
		file "reverse-v6-fe80-64.IP6.ARPA";
		allow-transfer {
			com.apple.ServerAdmin.DNS.public;
		};
		allow-update {
			none;
		};
	};
{% endhighlight %}

What this is doing is adding the reverse zone "0.0.0.0.0.0.0.0.0.0.0.0.0.8.e.f" which was created from bits 33-64 in our IPv6 to ARPA conversion. It's also stating that this is the master DNS record, and information can be propagated to any DNS slaves that may be running in my house (if you don't have a DNS slave, use "none"). Notice I'm not allowing any updates by my slave as this is best practice. Lastly, there is a file setting that uses the same name that we gave our file within /var/named/ of "reverse-v6-fe80-64.IP6.ARPA".

Test
---
There you go, everything is now configured time to test. Don't forget, we did this all when DNS was stopped, we need to run sudo serveradmin start dns and we can watch our logs by doing a "tail -F /Library/Logs/named.log" to make sure we don't see any "errors" or "ignore" warnings. Once you are confident in that DNS is running again, start checking your DNS entries by using the host and ping6 commands.

{% highlight bash %}
$ justinrummel@jrummel-mbp:~$ host cp.newco.prv
	ldap.newco.prv has address 192.168.1.152
	ldap.newco.prv has IPv6 address fe80::20c:29ff:fed0:c01

$ justinrummel@jrummel-mbp:~$ host 192.168.1.152
	150.1.168.192.in-addr.arpa domain name pointer cp.newco.prv.

$ justinrummel@jrummel-mbp:~$ host fe80::20c:29ff:fed0:c01
	1.0.c.0.0.d.e.f.f.f.9.2.c.0.2.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.e.f.ip6.arpa domain name pointer cp.newco.prv.

$ justinrummel@jrummel-mbp:~$ ping6 -I en0 -c 1 jss.newco.prv
	PING6(56=40 8 8 bytes) fe80::225:bcff:fedc:9924%en0 -- fe80::20c:29ff:fe39:d6c
	16 bytes from fe80::20c:29ff:fe39:d6c%en0, icmp_seq=0 hlim=255 time=0.618 ms

	--- jss.newco.prv ping6 statistics ---
	1 packets transmitted, 1 packets received, 0.0% packet loss
	round-trip min/avg/max/std-dev = 0.618/0.618/0.618/0.000 ms
{% endhighlight %}

Conclusion
---

I believe Apple will soon give us the capabilities of setting IPv6 records within Server Admin sometime in the near future, as it will become important as operating systems and networks progress and fully utilize IPv6. And don't forget on June 6th 2012 we'll be celebrating [World IPv6 Launch: this time it's for real][world-ipv6-launch]

If you have any troubles with your IPv6 values not returning, my guess there is something minor such as one to many zeros in your IPv6 ARPA zone name and/or you have a simple typo. I'll try to help as much as I can if there are any questions.

Additional Sources
---

- [IPv6 Converter](https://ipv6-literal.com/)

[ipv6calc]: https://mirrors.bieringer.de/www.deepspace6.net/projects/ipv6calc.html#idm140499222678768 "ipv6calc"
[world-ipv6-launch]: https://arstechnica.com/business/news/2012/01/world-ipv6-launch-this-time-its-for-real.ars
