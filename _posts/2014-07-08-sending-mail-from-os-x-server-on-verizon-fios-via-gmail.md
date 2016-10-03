---
layout: single
title: "Sending Mail from OS X Server on Verizon FiOS via Gmail"
date: 2014-07-08 13:41
categories:
    - "Tech Article"
tags:
    - Apple
    - Mavericks
    - OSXS
    - Mail
    - Postfix
    - FiOS
---

Yes I know this is a lengthy... long... and very specific post title, but I hope it helps someone else in the same predicament.

Overview
---

I have been fighting OS X Server and Verizon FiOS for months.  The shortest explanation is that [Verizon blocks port 25][verizon] (standard SMTP port) and forces you to use port 465 (SMTP via SSL).  I'm Ok with that rule, however, no matter how many times I try to use smtp.verizon.net:465 in OS X Server, I would get an error in the /var/log/mail.log stating you must use TLS.  When trying to use port 587 to force TLS, I get an operation timeout error.  If I switch to use smtp.gmail.com:[25,465,587] I would get black listed b/c Verizon won't allow SMTP off their FiOS network that does not originate from a verizon SMTP server.

Solution
---

Which leads me to today.  I was searching (again) a way to fix this by sending a simple ```sendmail user@domain.tld < filename.txt``` when I stumbled upon this [blog post][wormly].  The goal of the article is to send TLS mail from postfix on a linux box.  While reviewing the commands and comparing to an OS X Server main.cf file (in /Library/Server/Mail/Config/postfix) I noticed a couple key items missing.  Unfortunately I took a shotgun approach so I don't know specifically which line fixed the issue, but here is a copy/paste of the items that I placed at the bottom of my main.cf:

{% highlight bash %}bash
#### Added by jbr 2014-07-08
smtp_connection_cache_destinations = smtp.gmail.com
relay_destination_concurrency_limit = 1
default_destination_concurrency_limit = 5
smtp_use_tls = yes
smtp_sasl_security_options = noanonymous
smtp_sasl_tls_security_options = noanonymous
smtp_tls_note_starttls_offer = yes
smtp_tls_scert_verifydepth = 5
smtpd_tls_req_ccert =no
smtpd_tls_ask_ccert = yes
soft_bounce = yes
{% endhighlight %}

Note
---

These settings assume that you have configured Mail services to relay to smtp.gmail.com:587 and associated it to a proper Gmail account that can send mail.

![Screen Capture OS X Server Mail Settings]({{ site.url }}/images/2014/07/08/FiOS.png){: .align-center}

Source
---
[Relay mail via Google SMTP with Postfix][wormly]

[verizon]: http://www.verizon.com/Support/Residential/internet/highspeed/general+support/top+questions/questionsone/124274.htm
[wormly]: https://blog.wormly.com/2008/11/05/relay-gmail-google-smtp-postfix/
