---
title: "I moved my domains to Google Domains, and you won't believe what happened next"
date: 2014-12-30 14:53
layout: single
categories:
    - "Random""
tags:
    - Google
header:
    image: 2015/01/15/domainsblogpostimage.png					# Twitter (use 'overlay_image')
    overlay_image: 2015/01/15/domainsblogpostimage.png		    # Article header at 2048x768
    overlay_filter: 0.15
    teaser: 2015/01/15/domainsblogpostimage_thumb.png 			# Shrink image to 575 width
    caption: "Photo credit: [**Google**](http://google.com)"
---
OK, that title is COMPLETELY intended for click bait. I just think it's funny how "online news sites" use this to get people to click on things.

## Overview
{% twitter oembed https://twitter.com/sudeude/status/549685535384813568 %}

Anyways, [@sudeude][sudeude] [sent a tweet][sudeudeGD] inviting anyone to try Google Domains. In typical Google fashion, Google Domains is in beta thus needing an invite (we won't guess how LONG Google Domains will be in beta). I wasn't really in the need for a new domain registrar as I was happy with my current provider, however, within the past year they were sold off to another registrar so I had no emotional ties to their service. I'm also not worried about any glitches that may be produced from the migration as I use ZoneEdit (for a cost) to manage the records vs. being dependent on the registrar.

I quickly visited Google Domains page and reviewed the very short home page. "Pick a name and go!"... sure I've heard that before. But then I checked the [features page][features], and read the first item was instantly SOLD.

<quote Google Domains Feature Page https://domains.google.com/about/features.html>
**No additional cost for private registration**

When you purchase or transfer a domain name, private registration is almost always an option (some domain endings do not support this feature). If private registration is selected, we cover the cost of keeping your details private (e.g. your name, address and other contact information).
</quote>

FREE private registration? SIGN ME UP! I've always enabled private registration and it usually costs about $10 per domain. I have a lot of domains so moving them to Google Domains is a perfect solution to save me money. All the other features are what you would expect from a registrar... except the last item is something new for Google, an option to CALL FOR SUPPORT?! 

<quote>
With Google Domains, you get phone and email support (M-F, 9am to 9pm EST).
</quote>

I don't think I'll need it, but sure! 

## Process Review

-	**Getting my Invite** - I assume once I DM'd my super secret personal email, the invite was sent, however, it took several hours to get the invite link from Google (so be patient).
-	**Requirements Check** - Nothing surprising here, you MUST have your domain unlocked and any privacy features must be disabled.
-	**Authorization Code** - Request this from my current Registrar and copy/paste into Google's migration form.
-	**Officially migrating the domain** - This is where things get interesting.  Google has to send the request to your current registrar, who then (usually) sends you an email to immediately approve, cancel, or ignore which will then fully process in about 5 days (depends on your registrar's process).  Needless to say it could be a couple of hours, or days to complete. 

<figure>
<a href="{{ site.url }}/images/2014/12/30/1-Ready.png"><img src="{{ site.url }}/images/2014/12/30/1-Ready_480.png" alt="1-Ready" title="1-Ready" /></a><br />
<a href="{{ site.url }}/images/2014/12/30/2-Set.png"><img src="{{ site.url }}/images/2014/12/30/2-Set_480.png" alt="2-Set" title="2-Set" /></a><br />
<a href="{{ site.url }}/images/2014/12/30/3-Transfer.png"><img src="{{ site.url }}/images/2014/12/30/3-Transfer_480.png" alt="3-Transfer" title="3-Transfer" /></a>
</figure>

## Results
I have to say I'm impressed that Google found all my custom A, MX, CNAME, and TXT records and brought them over to their management interface. It was truly *seemless* without any interruption of my services.

There is a GREAT tool in the Advance section for Google Apps for your Domain (Business/EDU/GOV) that generates the necessary CNAME, MX etc needed for those type of domains. It is a simple dropdown and review two checkboxes to enable. It will also pre-validate to make sure you are not creating any duplicates or conflicting records. In addition you can select to create an App Engine subdomain that points to your Engine ID to quickly create the needed records. 

<figure>
<a href="{{ site.url }}/images/2014/12/30/4-GAFYD.png"><img src="{{ site.url }}/images/2014/12/30/4-GAFYD_480.png" alt="4-GAFYD" title="4-GAFYD" /></a><br />
<a href="{{ site.url }}/images/2014/12/30/5-AppEng.png"><img src="{{ site.url }}/images/2014/12/30/5-AppEng_480.png" alt="5-AppEng" title="5-AppEng" /></a>
</figure>

## "One more thing"
Google Domains does NOT provide Dynamic DNS. You can still migrate your domain to Google, however, be sure to toggle the "Don't import my settings" on step two as seen above.

[sudeude]: https://twitter.com/sudeude/ 
[sudeudeGD]: https://twitter.com/sudeude/status/549685535384813568
[features]: https://domains.google.com/about/features.html 
