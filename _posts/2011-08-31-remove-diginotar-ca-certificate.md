---
layout: single
title: "Remove Diginotar CA Certificate"
date: 2011-08-03
categories:
    - "Tech Article"
tags:
    - Apple
    - Certificates
    - Lion
    - OSX
    - OSXS
---

First, I want to say thanks to [Edward Marczak][radiotope] for his original post on how to remove the Diginotar CA Certificate, and his forward thinking about how to do this from a System Admin perspective. I wanted to add a few more bits of info to his post to better explain the *security* command.

In Ed's post, he states to run this command:

{% highlight bash %}
$ sudo /usr/bin/security delete-certificate -Z C060ED44CBD881BD0EF86C0BA287DDCF8167478C /System/Library/Keychains/SystemRootCertificates.keychain
{% endhighlight %}

So the "-Z" flag is telling they system to search based on the SHA-1 has value of the certificate. How do you know this is the correct certificate? By using the find-certificate operation.

{% highlight bash %}
$ /usr/bin/security find-certificate -Z -e "info@diginotar.nl" /System/Library/Keychains/SystemRootCertificates.keychain | grep SHA | awk -F ": " '{print $2}'
{% endhighlight %}

In the command above, I'm asking the security command to find the certificate with the email address with the "-e" flag. The "-Z" flag in this command states to print out the SHA-1 has value. At the end I'm using "grep" to filter all the other information that comes with displaying your certificate information via Terminal then "awk" to only return the hash value. This way you can have some logic to ensure that you system find the correct certificate to delete vs. taking information from a website and fully trusting the instructions (no offense to Ed, it is just a good practice to perform sanity checks).

{% highlight bash %}
#!/bin/sh
BADDIGI=$(/usr/bin/security find-certificate -Z -e "info@diginotar.nl" /System/Library/Keychains/SystemRootCertificates.keychain | grep SHA | awk -F ": " '{print $2}')
echo "Going to delete: $BADDIGI"
sudo /usr/bin/security delete-certificate -Z "$BADDIGI" /System/Library/Keychains/SystemRootCertificates.keychain
{% endhighlight %}

So the obvious question from the above command is "How do I know info@diginotar.nl was the correct email"? Simple, I checked Keychain Access.

If you open Keychain Access (located in /Applications/Utilities/), do a search for Diginotar (you will get one value in return as seen below). Right click the certificate and select "Get Info".

![Digi-Search]({{ site.url }}/images/2011/08/Digi-Search.png){: .align-center}
![Digi-Info]({{ site.url }}/images/2011/08/Digi-Info.png){: .align-center}

[radiotope]: http://radiotope.com/content/remove-certificate
