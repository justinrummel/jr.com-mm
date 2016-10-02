---
layout: single
title: "What Is S/MIME Email and Why Should I Be Using It"
date: 2011-06-17
description: "This article describes what is S/MIME is and why should you care by giving examples that relate S/MIME to everyday occurrences."
categories:
    - "Tech Article"
tags:
    - Apple
    - Certificates
    - IOS
    - Lion
    - OSX
    - S/MIME
    - Mail
---
During the WWDC 2011 keynote, Apple announced that iOS 5 was going to have the capabilities of S/MIME. With that new feature announcement, it becomes a perfect topic to kick off my Foundations segments. Hopefully this article will describe what S/MIME is and why people should use it, interest everyone to use it now, and once iOS 5 comes out you will appreciate the fact that S/MIME email is now available.

From my two years of using S/MIME email, I've identified that there are two types of individuals who are using this feature: a) Government b) tech geeks. I can understand the lack of participation of S/MIME for general email usage as there are many hurdles to overcome to make S/MIME possible. But first the main question, what is S/MIME and Why should I be using it?!

Definition
---
S/MIME stands for Secure/Multipurpose Internet Mail Extensions and is a standard for public key encryption and signing of MIME data (an email message)[^2]]. What it allows you to do is two things:

1.	Ensure to your email recipients that YOU actually sent the email
2.	Allows the possibility of sending and/or receiving email encrypted

Example Story of Bad Email
---
Everyone has experienced the email from a family member or friend where the subject line seems a little... odd. Upon opening the email you notice is SPAM (ARG! they got me to open SPAM!)! Somehow a spammer was able to use your friends email address (termed spoof) which, understandably, made you feel comfortable enough to open and read the message. There are worse scenarios other than spoofing an address such as a trojan or actually "hacking" an account... but the concept is still the same; you opened an email that wasn't really from your friend or family member. This experience fostered the need for having a more secure form of email.

First Signing. I like to relate the process of signing an email to putting a wax seal on a letter back when email or a government operated post office didn't exist. Individuals would understand that a letter with a particular wax seal was the stamp of a sender, and thus knew it was authentic and should be trusted; same thing for sending a signed S/MIME email. If you don't see the "signed" icon in Apple's Mail (or any other Mail application), then you would be concerned that the email wasn't truly from the sender.

So how do you encrypt email?
---
Question: If you send a letter through the post office do you simply print a piece of paper and drop off in a mailbox, or do you put it in an envelope. Why put it in an envelope? So people won't read the contents of inside the envelope! If you are worried about people reading your letter, why do you send an email without a virtual "envelope"? As an email passes through every router and switch... and from one mail server to another... without it being inside a virtual "envelope" (thus encrypted), anyone could look at your letter. Yes it's a little dramatic, but it is possible.

Now that I have hopefully peaked your interested in sending signed and/or encrypted email messages, how is it possible? Well, it first deals with certificates. Certificates don't have to be hard, but it takes a bit to get used to and there are several complications when dealing with certificates:

1.  Certificates must come from a "Third Party".
2.  Certificates must be shared in some fashion (Fortunately email makes this simple).
3.  Certificates expire.
4.  Certificates require a email application (not a browser).

So why do certificates have to come from a "Third Party"? The easiest way to explain this is with another analogy. If you buy a used car do you trust the dealer or do you get a Car Fax or send the car to your own mechanic to check things out? A third party performs the necessary process of checks and balance to ensure the person sending an email is truly the person who should own the certificate (e.g. make sure they are the one with the correct wax seal). The other issue is most certificates only last for one year, so you have just begun the never ending cycle of annually renewing your email certificate. An item to note, with something being an annual process (vs. monthly, weekly, or daily) you may have to re-learn each year how to obtain your certificate each year so I would suggest to take notes.

So what about the second bullet? It needs a little more description about certificates and how they are created with your third party. When you make a request to get your email certificate, you need to send a "password" to generate two items: A Private Key and Public Key. Your Private Key should be kept private and safe! This is how you de-crypt messages from your family and friends, and is the only way you can read messages if someone send you an encrypted email. If you lose your private key, you will never be able to get it back, thus you will never be able to open any messages that are encrypted! The way you send an encrypted message is by using your Public Key which is automatically sent every time you "sign" an email message.

Lets put this exchange in a more real life scenario. I want to have my taxes done by a CPA thus I need to send all of my tax documents. Now I could FAX the documents or simply use USPS, but since this is 2011 lets use email... secure email, via S/MIME! I would send a signed email to my CPA and simply state "Please reply with a signed email message so I can send my tax information". Upon my CPA's reply, his Public Key is passed to me which I use to encrypt my next email that contains all of my tax information. The CPA has his Private Key which de-crypts my email automatically and is able to download my tax information.[^1]

The nice thing is once you have your certificate, most email applications make the process of sending signed email and/or encrypted emails simple. Where doesn't S/MIME work? Any web based platform such as Gmail, Hotmail, Yahoo, etc. Now you could configure your mail application to use their service via IMAP or POP, then S/MIME would work... you just cant use the webmail version of their service. If someone sends you an encrypted mail to your email account and you are not using your Mail application... it will not open.

Footnotes
---

[^1]: Most email applications allow you to encrypt an email message by a simple button. Screenshots of Mail and iOS pending on future posts.
[^2]: <a href="http://en.wikipedia.org/wiki/S/MIME">S/MIME info by Wikipedia</a>
