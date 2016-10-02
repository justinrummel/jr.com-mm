---
layout: single
title: "Bushel: 'You put your Apple things in here' for small businesses"
date: 2015-01-15T11:21:33-05:00
modified:
description: "What is Bushel, what can it do, and is it for me?"
categories:
    - "Tech Article"
tags:
    - Apple
    - Bushel
    - OSX
    - IOS
    - Yosemite
header:
    image: 2015/01/15/Bushel-Header.png     			# Twitter (use 'overlay_image')
    overlay_image: 2015/01/15/Bushel-Header.png       	# Article header at 2048x768
    overlay_filter: 0.15
    teaser: 2015/01/15/Bushel-Header-Twitter.png    # Shrink image to 575 width
    caption: "Photo credit: [**Bushel**](http://www.bushel.com)"
---
Bushel is an Apple device (OSX and iOS) management tool that will assist with items that would normally frustrate people once you try to deploy/issue more than three devices.  So I'm please to share (if you [haven't][one] [seen][two] [already][three]) that [Bushel][bushel] is now available to the public! I've had a chance to review Bushel for a couple of months since its first private beta release during JAMF Software's National User Conference and have been quite impressed.

Features
---
Your Bushel web interface is hosted for you on Bushel's servers.  This helps companies who either don't want to deal with having a server internally (knowing how to configure, setup internal and external networking, and/or with the maintenance requirements), or a company that fully embraces the a cloud infrastructure. I see this as a great positive!  If you have a company policy that states "no cloud infrastructures" will be used then you are most likely too big for Bushel.

Enrolling your Apple devices is made easy by either logging into your Bushel account and clicking on the "Enroll" button, inviting people by email, or by using Apple's Device Enrollment Program (DEP).

Installing Apps can be done by using Apple's Volume Purchasing Program (VPP) where the company purchases licenses for their employees and assigns the apps as needed, or by "Deploy from App Store" which will *recommend* an App and the employee can purchase themselves.

Assistance in Email configuration is also provided by Bushel for Exchange (Office365 and Google Apps EDU/Business/Gov would be included), non Google Apps, Yahoo, or plain IMAP/SMTP (like you would get from an Apple Server).  If you don't know the settings for these services (Exchange/Google/Yahoo/etc) do a quick Google search of "*insert_service_here* SMTP settings" and the answer should be on the first page of results.

Finally, the limited Security option settings available to set are:

- Require a Passcode
- Auto Lock an OSX or iOS device after "x" minutes
- Disable iCloud backups
- Protect company data for Apps that are installed by Bushel (most likely done by VPP).

If you have any questions about VPP or DEP, [Bushel has a great FAQ][faq] that helps answers these questions.  You may also want to review my own article of [Working with VPP and DEP Apple IDs]({{ site.url }}/working-with-vpp-and-dep-apple-ids/).

Who is the target audience?
---

THAT is the big question that I've been trying to answer for the past couple of months.  To better answer that question you need to read the blog post from Bushel themselves.

<q>
The Bushel team consists mostly of people who were involved in small businesses before coming to JAMF (and those who grew JAMF from a small business). We believe in small businesses. And we believe in the innovative workgroups that exist similarly to small businesses within large enterprises. We believe in smaller, self-managing classrooms. We want to make your life better. We want to help you have the best possible experience with Apple products. Because we believe in Apple and we believe in you
</q> ---<cite>[Why Bushel Exists, And What That Means To You](http://blog.bushel.com/2015/01/why-bushel-exists/)</cite>

Bushel is for small businesses or a departments of a larger business.  Bushel highlights some example scenarios in their "[manual][manual]" (I'm putting this in quotes because Bushel is simple that doesn't *really* need a manual, and it is designed that way on purpose!).

Use Cases

- [Small Offices][small-office-environments]
- [Field Services][field-services]
- [Education][education]
- [Apple Consultants][acn]
- Shadow IT within Corporate Environments
- [Retail][retail-environments]

The common trend is there is a small group of people who have a need to *slightly* manage some devices (more than what would be acceptable to do the same repetitive thing on one device at a time), however they don't have a full IT person to take care of them. Or, there is a consultant that could help with the setup of Bushel, but then handover the control to that small group.  As long as the settings on the OSX/iOS devices that you want to control fall into the feature list above, [Bushel is PERFECT][bushel]!  "But wait, there's more"... you can try out everything for FREE for up to three devices.  When you want to get more advance options (custom iOS restrictions or application install outside of the Mac App Store), that is when you need to start looking at a product geared for the Enterprise... like the [Casper Suite][casper]!

[bushel]: http://bushel.com
[toast]: http://instagram.com/p/x11noxIW0u/
[one]: http://www.forbes.com/sites/benkepes/2015/01/14/jamf-offers-apple-device-management-for-the-little-guys/
[two]: http://finance.yahoo.com/news/introducing-bushel-powerful-apple-device-140300749.html
[three]: http://betanews.com/2015/01/14/bushel-makes-apple-mobile-device-management-available-to-smaller-businesses/
[faq]: http://blog.bushel.com/faq/
[manual]: http://blog.bushel.com/manual/
[small-office-environments]: http://blog.bushel.com/2014/10/using-bushel-in-small-office-environments/
[field-services]: http://blog.bushel.com/2014/10/using-bushel-in-field-services/
[education]: http://blog.bushel.com/2014/10/using-bushel-in-education/
[acn]: http://blog.bushel.com/2014/10/bushel-for-apple-consultants/
[retail-environments]: http://blog.bushel.com/2014/10/using-bushel-in-retail-environments/
[casper]: http://www.jamfsoftware.com/products/casper-suite/
