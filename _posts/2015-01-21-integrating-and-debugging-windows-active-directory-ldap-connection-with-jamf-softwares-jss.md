---
layout: single
title: "Integrating (and Debugging) Windows Active Directory LDAP Connection With JAMF Software's JSS"
date: 2015-01-21T09:45:32-05:00
modified:
description: "Is your JSS AD setup not going well?  Start here."
categories:
    - "Tech Article"
tags:
    - Active Directory
    - Casper Suite
    - DNS
    - JSS
header:
    image: 2015/01/20/casper-suite-cropped.jpg     # Twitter (use 'overlay_image')
    overlay_image: 2015/01/20/casper-suite-cropped.jpg       # Article header at 2048x768
    overlay_filter: 0.15
    teaser: 2015/01/20/casper-suite-cropped-Twitter.jpg    # Shrink image to 575 width
    caption: "Photo credit: [**JAMF Software**](http://www.jamfsoftware.com/products/)"
---

I'm guessing you are looking at your JSS screen trying to connect an LDAP server, specifically Active Directory (AD), but things are not going well.  First of all, breath.  There have been countless times when I'm performing a JumpStart and things "just don't work" in terms of integrating the JSS and Active Directory, especially if your AD is anything beyond the standard "Next, Next, Next" installation process when it was initially setup.

Network Environment Debugging
---

First, we're going to do some simple network debugging that I usually perform once I'm onsite to make sure the AD environment is providing the necessary DNS records.  I'm hosting this example environment on my laptop via VMware Fusion 7.1 Pro with:

- one VM running Windows Server 2012 R2 as my AD and DNS server
- one VM running Ubuntu 14.04.1 as my JSS
- one VM running OS X Yosemite as my "Admin Station"

All VMs are essentially on the same isolated network as I have configured each VM to use "NAT" for their Network Settings.  My AD server's [FQDN][fqdn] is ```dc01.pretend.co``` with an IP address of ```192.168.204.10/24``` while my JSS server's FQDN is ```jss.pretend.co``` with the static IP address of ```192.168.204.11/24``` and the gateway (my laptop) is ```192.168.204.2/24```.  I've configured my test AD server to have the domain of "PRETEND" and it is also providing DNS (forwarding to the gateway), and both the JSS and "Admin Station" are pointing to the AD server for DNS lookups.

<figure>
<a href="{{ site.url }}/images/2015/01/20/TestSetup.png"><img src="{{ site.url }}/images/2015/01/20/TestSetup_800.png" title="" /></a>
</figure>

Debugging DNS overview
---

For debugging the AD environment, I'm going to do a host of the "pretend.co" which should give me a list of all the domain controllers, next I would verify the forward and reverse DNS names to IP address of my domain controllers, then finally verify some LDAP SRV records.

{% highlight bash %}bash
#!/bin/bash

# Copyright (c) 2015 Justin Rummel
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.

# Created by Justin Rummel
# Version 1.0.0 - 2015-1-21

# Modified by
# Version

### Description
# Script to check AD DNS environment

### Variables
dns_server=`dig +noall +identify | cut -d\( -f2 | cut -d\) -f1`
dns_Ethernet=`networksetup -getdnsservers Ethernet`
dns_WiFi=`networksetup -getdnsservers Wi-Fi`

### Functions
ethernet () {
	[[ "${dns_Ethernet}" == "${dns_server}" ]] && { test Ethernet; exit 0;} || { wifi; }
}

wifi () {
	[[ "${dns_WiFi}" == "${dns_server}" ]] && { test Wi-Fi; exit 0;} || { echo "Are you online?  Not sure so I'll stop now."; exit 1; }
}

test () {
	service="${1}"
	echo -e "Network tests are performed using your ${service} interface"

	domain=`networksetup -getsearchdomains "${service}"`
	echo -e "DNS Search domain is ${domain}"
	echo -e "\n"

	dcs=`host "${domain}"`
	echo -e "Here is a list of your Domain Controllers\n ${dcs}"
	echo -e "\n"

	echo -e "Testing your Reverse DNS"
	dcIP=`host "${domain}" | tail -n 1 | awk -F " " '{print $NF}'`
	dnsReverse=`host "${dcIP}"`
	echo -e "${dnsReverse}\n"

	echo -e "Testing your Forward DNS"
	dcName=`echo "${dnsReverse}" | awk -F " " '{print $NF}' | sed 's/\.$//'`
	dnsForward=`host "${dcName}"`
	echo -e "${dnsForward}\n"

	echo -e "Testing your Service DNS records for Kerberos (there should be some results)"
	dig -t SRV _ldap._tcp."${domain}" +short
	dig -t SRV _kerberos._tcp."${domain}" +short
	dig -t SRV _kpasswd._tcp."${domain}" +short
}

ethernet

exit 0;
{% endhighlight %}

Here is the result of my test environment.  You're results should hopefully have more AD serviers populated, but otherwise it would be close to this gist:

{% gist 4bae71d761d2fcd8bd19 %}

#### What to look for when debugging DNS
Your "dns_server" should be the IP address for one of your domain controllers.  With that said, only your internal AD DNS servers should be listed in a client's network settings.  Providing internal and external DNS options (like Google's or OpenDNS) in your DHCP scope settings will only confuse an Apple device.  If any of these commands return unexpected results, there is something wrong with your network.

#### LDAP testing
Next lets make sure that we are dealing with the standard ldap port of 389 with an administrator account that should be allowed to view the entire directory tree if needed.

{% highlight bash %}bash
ldapsearch -H ldap://dc01.pretend.co -b "dc=pretend,dc=co" -x -D "PRETEND\administrator" -W -L "(objectClass=group)" name member
{% endhighlight %}

Here is a [link to a gist][ee1b345d578dce338b39] that shows the expected results.  You should get *some* positive looking results.  If you get an error, you have restricted AD so much that simple lookup queries are not working.  Go talk to your AD guy and find out what they have done to AD to be so cranky.

JSS LDAP Setup - Active Directory
---

When the Active Directory LDAP setup assistant works, it's great!  Just remember some of these tips:

- "Hostname or IP Address" is the FQDN of a Domain Controller
- For your LDAP server account, it's looking for your DOMAIN (e.g. PRETEND) along with an AD Administrator account username and password (or better yet a Service Account).
- Have two test AD accounts ready where one user is known to be in a group and not in another (like yourself and another employee that is NOT in IT).  We'll test to make sure the lookups are displaying the correct user info and group membership.

<figure class="half">
<a href="{{ site.url }}/images/2015/01/20/1-LDAP-Setup.png"><img src="{{ site.url }}/images/2015/01/20/1-LDAP-Setup_256.png" title="" /></a>
<a href="{{ site.url }}/images/2015/01/20/2-LDAP-Setup.png"><img src="{{ site.url }}/images/2015/01/20/2-LDAP-Setup_256.png" title="" /></a>
</figure>
<figure class="half">
<a href="{{ site.url }}/images/2015/01/20/3-LDAP-Setup.png"><img src="{{ site.url }}/images/2015/01/20/3-LDAP-Setup_256.png" title="" /></a>
<a href="{{ site.url }}/images/2015/01/20/4-LDAP-Setup.png"><img src="{{ site.url }}/images/2015/01/20/4-LDAP-Setup_256.png" title="" /></a>
</figure>
<figure class="half">
<a href="{{ site.url }}/images/2015/01/20/6-LDAP-Setup.png"><img src="{{ site.url }}/images/2015/01/20/6-LDAP-Setup_256.png" title="" /></a>
<a href="{{ site.url }}/images/2015/01/20/7-LDAP-Setup.png"><img src="{{ site.url }}/images/2015/01/20/7-LDAP-Setup_256.png" title="" /></a>
</figure>
<figure class="half">
<a href="{{ site.url }}/images/2015/01/20/8-LDAP-Setup.png"><img src="{{ site.url }}/images/2015/01/20/8-LDAP-Setup_256.png" title="" /></a>
<a href="{{ site.url }}/images/2015/01/20/9-LDAP-Setup.png"><img src="{{ site.url }}/images/2015/01/20/9-LDAP-Setup_256.png" title="" /></a>
</figure>

JSS LDAP Setup - Manual
---

Sometimes the LDAP setup assistant just doesn't work.  No matter how many ways you enter your DOMAIN and then provide authentication credentials it never gets pass the verification.  In these cases, we'll use the manual configuration method and verify our settings from the following screen shots.

Key items to look for are:

- Server and Port should be your FQDN of a domain controller and 389 unless you have enabled LDAPS.  Then you made your own nightmare.
- Yes, that is what a Distinguished Name (DN) looks like.  Find the FULL path.
- On your User Mappings, sometimes organizations will have multiple CNs or OUs in the same level.  If so, just use ```dc=domain,dc=tld``` and search your whole domain.  And yes, that may take longer.
- Verify the LDAP Attributes carefully.  Email is sometimes just ```mail```.
- The group Mappings have the same issues as User Mappings.  You may need to move it to ```dc=domain,dc=tld``` and it will take longer.

<figure class="half">
<a href="{{ site.url }}/images/2015/01/20/10-LDAP-Setup.png"><img src="{{ site.url }}/images/2015/01/20/10-LDAP-Setup_256.png" title="" /></a>
<a href="{{ site.url }}/images/2015/01/20/11-LDAP-Setup.png"><img src="{{ site.url }}/images/2015/01/20/11-LDAP-Setup_256.png" title="" /></a>
</figure>
<figure class="half">
<a href="{{ site.url }}/images/2015/01/20/12-LDAP-Setup.png"><img src="{{ site.url }}/images/2015/01/20/12-LDAP-Setup_256.png" title="" /></a>
<a href="{{ site.url }}/images/2015/01/20/13-LDAP-Setup.png"><img src="{{ site.url }}/images/2015/01/20/13-LDAP-Setup_256.png" title="" /></a>
</figure>
<figure class="half">
<a href="{{ site.url }}/images/2015/01/20/14-LDAP-Setup.png"><img src="{{ site.url }}/images/2015/01/20/14-LDAP-Setup_256.png" title="" /></a>
<a href="{{ site.url }}/images/2015/01/20/15-LDAP-Setup.png"><img src="{{ site.url }}/images/2015/01/20/15-LDAP-Setup_256.png" title="" /></a>
</figure>

[ee1b345d578dce338b39]: https://gist.github.com/justinrummel/ee1b345d578dce338b39
[fqdn]: http://en.wikipedia.org/wiki/Fully_qualified_domain_name