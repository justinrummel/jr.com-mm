---
layout: single
title: "Google Domains Now Does Dynamic DNS"
description: "Google Domains is now for the public, with upgrades!"
date: 2015-01-16T17:20:13-05:00
modified:
categories:
    - "Random"
tags:
    - Google
header:
    image: 2015/01/15/domainsblogpostimage.png					# Twitter (use 'overlay_image')
    overlay_image: 2015/01/15/domainsblogpostimage.png		    # Article header at 2048x768
    overlay_filter: 0.15
    teaser: 2015/01/15/domainsblogpostimage_thumb.png 			# Shrink image to 575 width
    caption: "Photo credit: [**Google**](http://google.com)"
---

So I was *really* hoping for some invite codes from Google Domains while it was still in private beta.  This way everyone would shower me with love and affection, and in return for I would provide my precious invite codes... but Google just had to kill my dreams and make it available for everyone!  The nice thing is there must have been some great feedback from previous beta testers as some changes have been applied since my review two weeks ago (I never received a feedback request, so I cannot take any credit).

<q>
Here’s a list of the updates:

- We improved the search and suggestion experience because you requested help finding the perfect domain name.
- We added over 60 new domain name endings like .company, .florist and .coffee because you requested more choices as you search.
- We created a simple dashboard to manage your domain, website and email settings because you requested these actions be only one click away.
- We integrated with Blogger so you can create a blog and easily connect it to your domain because you requested more options as you start building your web presence.
- We improved integration with website builders so you can quickly view and compare themes and plans because you wanted to know more about the available options before signing up.
- We added dynamic DNS so you can setup your domain and keep it pointing to the same computer even when the IP address changes because you requested this for your business.

</q> ---<cite>[Making it easier to get your business online with Google Domains](http://googleandyourbusiness.blogspot.com/2015/01/making-it-easier-to-get-your-business.html)</cite>

It's that last bullet that I'm excited about, Dynamic DNS!  I logged into my account to searched around for the new Dynamic DNS interface and couldn't find the right location.  Since googleing "Google Domains" is somewhat pointless in returning decent results (much like OSX's security command), I did [what I thought was the unthinkable]({{ site.url}}/i-moved-my-domains-to-google-domains-and-you-wont-believe-what-happened-next/) and used Google Domains [new support chat feature][chat]!  I was directed to review the DNS Section, then "Synthetic records" area for a new added dropdown option for Dynamic DNS.

<figure>
<a href="{{ site.url }}/images/2015/01/15/Google-DynDNS-Add.png"><img src="{{ site.url }}/images/2015/01/15/Google-DynDNS-Add_800.png" alt="Add Google Domains" title="Add Google Domains" /></a>
</figure>

From there you can define a subdomain (or "@" wildcard would work as well) and Google will provide you with a new 16 character randomly generated unique username and password.  You must then configure your DynDNS application of choice (such as DDclient and INADYN) to use these values.  [Google has a support page that explains how to configure these settings][dyndns-setup].

<figure>
<a href="{{ site.url }}/images/2015/01/15/Google-DynDNS-Configure.png"><img src="{{ site.url }}/images/2015/01/15/Google-DynDNS-Configure_800.png" alt="Add Google Domains" title="Add Google Domains" /></a>
</figure>

Unfortunately, my Verizon FiOS router does not have a setting for Google Domains (can't complain since it was *JUST* released), but I will be sending a feature request through my "inside resources".

[chat]: https://support.google.com/domains/answer/6058244?hl=en&ref_topic=3314005
[dyndns-setup]: https://support.google.com/domains/answer/6147083