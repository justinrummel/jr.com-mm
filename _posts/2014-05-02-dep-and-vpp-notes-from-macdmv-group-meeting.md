---
title: "DEP and VPP Notes from MacDMV Group Meeting"
author: Justin Rummel
layout: single
date: 2014-05-02 11:59
tags:
    - Apple
    - DEP
    - VPP
published: true
header:
  image:
  credit:
  creditlink:
---
On May 1st, [MacDMV's second "tech" session][2014-05-01] took place covering Apple's [Device Enrollment Program][DEP] (DEP) and how it relates to [JAMF Software's Casper Suite][JSS], a little about VPPMD (because once you start talking about DEP you can't help but talk about VPP), and [Munki in a Box][MiaB] which is a deployment script for Munki by Tom Bridge.

Here are my notes from the DEP session (with a little VPP knowledge).

-	When an organization signs up for DEP, any device that has been purchased by that organization for the past three years is qualified to be added in your DEP portal.  For example, if you sign-up Jan 1st, 2016... only devices purchased by your organization from Jan 1st, 2013 will qualify.  So do it now!
-	When configuring "PreStage Enrollment" in your JSS, the default behavior for a skipped item during the Setup Assistant is off. For example; if you select to skip "Location Activation" in your PreStage Enrollment setup, location items will be off.  From Apple's perspective there are privacy concerns regarding location, which require the user to actively enable a privacy sensitive feature.  Skipped items cannot be re-activated remotely via Configuration Profile, but end user can enable by touching the device.
-	The T&Cs that you can skip for PreStage Enrollment for DEP is the agreement for the device. If during Setup Assistant you authenticate/create an Apple ID, you will still see the Apple ID T&Cs.
-	If you have a device with Activation Lock enabled, but you don't have the Apple ID's password to restore the device (e.g. you have a "brick" in your hand), call AppleCare immediately. You will need to verify that you do own the device so be ready with purchase details.
-	Supervised devices will allow to "push" apps from VPP. So enable Supervision in DEP.
-	DEP is not for BYOD as DEP is for devices owned by the organization (makes sense once you say it out loud)!!!
-	Apple's License model is you can use VPPMD apps on organization issued devices AND personal device.

[2014-05-01]: http://www.macdmv.com/may-1st-meet-up-recap
[DEP]: https://www.apple.com/education/it/dep/
[JSS]: http://www.jamfsoftware.com/news/apple-innovation-device-enrollment-program-dep-and-volume-purchase-program-/
[MiaB]: http://tbridge.github.io/munki-in-a-box/
