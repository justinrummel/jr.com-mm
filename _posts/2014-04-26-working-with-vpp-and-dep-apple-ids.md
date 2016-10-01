---
title: "Working with VPP and DEP Apple IDs"
layout: single
date: 2014-04-26 09:50
tags:
    - Apple
    - VPP
    - DEP
    - OSXS
    - Apple ID
---
These are notes about getting the Apple IDS and their two-step verification authentication ready for Apples Volume Purchasing Program (VPP) and Device Enrollment Program (DEP).  WORST case give yourself two weeks to complete all the items listed below, but realisticly it can be done within three business days.

You will be creating a LOT of Apple IDs.  Do yourself a favor and get a password manager, or have some other secure method of recording what/how each new Apple ID is being used.  There are two *levels* of Apple IDs.

#### [VPP | DEP] Program Agent

	This is the individual with purchasing power and/or signature authority.

#### [VPP | DEP] Program Admin

	This is the technical individual that needs to do the work.

If you are the same person, still create multiple accounts as tokens are necessary to make VPP and DEP work and they will expire every year, OR if the password is changed on that account.

Day 1 "Monday"
---
The assumption is that you do not have an existing VPP account, and since DEP is new, you don't have an account for that program either.

You will need to create two NEW Apple IDs at [https://deploy.apple.com](https://deploy.apple.com): one for VPP and one for DEP.  Both of these may take five days for Apple to validate the individual that made the request (or was requested by someone on their staff) is the responsible person of the organization.  The person identified for these accounts **MUST** be someone within your institution or company who has "signature authority".  In terms of the Job Title, be sure that if there are any public facing websites or social media listings of the person that will be listed as the Program Agent, it matches to what you submit to Apple (Owner, Vice President, Director, etc).  Apple has staff validating the information you submit, not an automated system.  Apple will call you and verify the information that has been submitted is accurate, so be sure to enter a cell number as the primary way to contact the individual who needs to approve the account.

-	vppmd@domain.tld
-	dep@domain.tld

Day 8 "Monday"
---
After five business days, you should now have two new Apple IDs.  Begin enabling two-step verification authentication as described at: [http://support.apple.com/kb/HT5570](http://support.apple.com/kb/HT5570).  Just because you created a VPP or DEP account does not mean that two-step verification authorization has been enabled.  You must do this after you login to the new Apple ID accounts.  Two-step verification is required for VPP and DEP... so begin two-step verification started immediately once you login.  If you happen to be using an old VPP account because you still have money available, your account will need to be converted to allow two-step verification, thus it may take 72 hours for Apple to perform some background routines.

When you enable two-step verification DO NOT CHANGE ANYTHING ELSE.  If you change an address, phone number, or security questions it may raise red flags to Apple, thus causing you delays. &nbsp;<sup id="fnr1-2014-04-26">[1]</sup>&nbsp;<sup id="fnr2-2014-04-26">[2]</sup>

Day 11 "Thursday"
---
We can now *invite* Admin accounts for VPP and DEP.  VPP Admins should be for specific Profile Manager servers OR for specific departments (who have their own Profile Manager)&nbsp;<sup id="fnr3-2014-04-26">[3]</sup> that need to control expenses on what apps are purchased.  So think of it as:

-	pm01@domain.tld
-	pm02@domain.tld
-	pm03@domain.tld

We can also now *invite* our DEP Admin.  DEP Admins should be invites to individual's work email account as it identifies the individual who can add devices to your MDM server.  However, if that account already exists just create "DEP" accounts as needed.&nbsp;<sup id="fnr4-2014-04-26">[4]</sup>

Notes
---
<div class="footnotes">
<hr />
<ol>
	<li id="fn1-2014-04-26"><sup>[1]</sup> DEP cannot use iCloud, therefore you MUST be able to accept SMS messages on your phone.  Remember, two factor authentication is for login and *purchases*.  The cell phone with SMS must be the "Admin's" phone, because as soon as you begin to purchase apps (Free or Paid), you will get a request for the SMS four digit code each time as you must authentication with two-step verification if items are purchased!&nbsp;<a href="#fnr1-2014-04-26" class="footnoteBackLink" title="Jump back to footnote 1 in the text.">&#8617;</a></li>

	<li id="fn2-2014-04-26"><sup>[2]</sup> If iPhones are issued by a School or a Government agency, sometimes cellular providers impose a block on SMS to prevent unnecessary charges (such as the ability to vote for your favorite singer on American Idol).  This restriction may stop any Apple SMS messages; call your provider to get the block removed.&nbsp;<a href="#fnr2-2014-04-26" class="footnoteBackLink" title="Jump back to footnote 1 in the text.">&#8617;</a></li>

	<li id="fn3-2014-04-26"><sup>[3]</sup> If you are using another MDM besides Profile Manager, you only need one token per department or sub-organization that wants to control what apps are being purchased.  See your MDM Provider for details.&nbsp;<a href="#fnr3-2014-04-26" class="footnoteBackLink" title="Jump back to footnote 1 in the text.">&#8617;</a></li>

	<li id="fn4-2014-04-26"><sup>[4]</sup> At this point it reminds me that Google Accounts <a href="https://support.google.com/mail/answer/12096?hl=en">automatically have an alias feature</a> where you can add a plus sign and something else between the username and the "@" symbol.  So an example:<br>

	<ul><li>email address: myaccount@gmail.com</li>
	<li>alias address: myaccount+dep1@gmail.com</li></ul>
	Both emails will be sent to the same gmail account, however, they are still unique and different so this trick could be used to create additional Apple ID accounts based off your work address.&nbsp;<a href="#fnr4-2014-04-26" class="footnoteBackLink" title="Jump back to footnote 1 in the text.">&#8617;</a></li>
</ol>
</div>

[1]: #fn1-2014-04-26
[2]: #fn2-2014-04-26
[3]: #fn3-2014-04-26
[4]: #fn4-2014-04-26
