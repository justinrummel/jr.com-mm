---
layout: single
title: "Acquiring a S/MIME Certificate for Free"
date: 2011-06-24
categories:
    - "Tech Article"
tags:
    - Apple
    - Certificates
    - IOS
    - Lion
    - OSX
    - S/MIME
---

From the last article, I hope you are now wondering "where do I get this awesome thing called S/MIME certificate!", and the other kicker "What's it going to cost me?" Well you are in luck because email certificates can be obtained for free! There are two site (that I know of) that provide free S/MIME email certificates: [Instant SSL][instantssl] and [Start SSL][startssl].

How To
---

For this How To, I'm going to use Instant SSL. I have nothing against StartSSL (in fact they also give out free one year SSL website certificates!), but I find Instant's process simpler and more direct.

1.  Request your certificate by going to
2.  Click on the "Get it Free Now" button located in the top-middle section of the page.
3.  This will open a new page requesting general information such as name, your email which you want acquire an S/MIME certificate, key size (leave the default 2048), and a revoke key (if you feel your certificate has been compromised, this will allow InstantSSL to make your certificate invalid thus will generate a warning to anyone opening a message in the future).
4.  Upon submitting your information, you should be forward to a page stating your "Application for Secure Email Certificate" is successful. Go check your email and wait for a message from InstantSSL (should be relatively quick), and click on the button that states "Click & Install Comodo Email Certificate". ![p7s]({{ site.url}}/images/2011/06/p7s.png){: .align-right}
5.  You should now have downloaded an encrypted CollectCCC.p7s file that contains both your Public and Private Key.
6.  Double click the CollectCCC.p7s file to import your S/MIME certificate into Keychain Access (it should be located in your "login" keychain if Keychain Access asks you where to save the file).
7.  To verify this has been done, locate your login keychain, select "My Certificates" and you should see your email address with a triangle to the left. click on the triangle and this will display your private key (with an icon of a key).

![full screen of key pair]({{ site.url }}/images/2011/06/Keys.png){: .align-center}

That is it! You now have a S/MIME certificate for signing and encrypting email messages. Stay tuned for using your newly acquired S/MIME email certificate in Apple Mail and in iOS.

![full screen of key pair]({{ site.url }}/images/2011/06/smime-cert-1.png){: .align-center}
Step One; Enter your name, email, key size, and revoke key


![full screen of key pair]({{ site.url }}/images/2011/06/smime-cert-2.png){: .align-center}
Step Two; Success! Now check your email


![full screen of key pair]({{ site.url }}/images/2011/06/smime-cert-3.png){: .align-center}
Step Three; Download, double-click and install in Keychain Access

[instantssl]: http://www.instantssl.com/
[startssl]: https://www.startssl.com/