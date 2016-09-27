---
title: S/MIME Email Certificates in-Depth
author: Justin Rummel
layout: single
permalink: /smime-email-certificates-in-depth/
shorturl:
    - http://j.mp/poq26v
tags:
    - Apple
    - Certificates
    - IOS
    - Lion
    - OSX
    - S/MIME
comments: true
header:
  image:
  credit:
  creditlink:
---
Overview
---
We have discussed the basics of S/MIME in my post [What Is S/MIME Email and Why Should I Be Using It]({{ site.url }}/what-is-smime-email-and-why-should-i-be-using-it/), and from the last article [Acquiring a S/MIME Certificate for Free]({{ site.url }}/acquiring-a-smime-certificate-for-free/) you should have your S/MIME certificate installed. Now lets get into some more technical aspects of S/MIME.

A Certificate, is a Certificate, is a Certificate
---
A S/MIME certificate can be store several different ways (see Apple's kbase [About certificate formats][aboutCert]), but you will usually deal with .pem or .cer file for your public key, or a p12 file that contains both your Public and Private Keys. We can get our certificates by one of two ways:

*   Export from Keychain Access
*	Export using the security command

Private Keys
---
![Certificate]({{ site.url }}/images/2011/06/certificate.png)
{: .align-left}

Keychain Access is by far the simplest method. Simply select your Public certificate, click on the pretty blue certificate icon at the top and drag-n-drop to your desktop. This saves the file in a .cer format and you can use QuickLook to see the contents.

![cer export]({{ site.url }}/images/2011/06/smime-cert-quickview.png)

*(QuickLook of my .cer export from Keychain Access)*

The second way is more interesting and leads us to use Terminal.

{% highlight bash %}
$ security find-certificate -a -e j@justinrummel.com -p > ~/Desktop/myPublicCert.pem
{% endhighlight %}

It's always best to test before exporting items and assume that you have the correct information. So lets shorten the command to

{% highlight bash %}
$ security find-certificate -a -e j@justinrummel.com*.
{% endhighlight %}

What we are doing is using the Mac OS X *security* command to find your certificate within the default keychain (your Login keychain), which is usually located at: /Users/*yourusername*/Library/Keychains/login.keychain. We find all the matching values by utilizing the "-a" flag. We want to do this because as time passes you are going to collect expired certificates and we want to keep old certificates just in case you want to decrypted a message in a couple of years. The next flag is "-e" for your email. This should return hopefully one result, but if not, you most likely have expired certificates (and that's OK).

![Show Expired]({{ site.url }}/images/2011/06/Show-Expired.png)
{: .image-right }

If you want to see your expired certificates, the easist way to do this is open Keychain access, enable View => "Show Expired Certificates" and find any records with your email address that has a red "X" (meaning "expired"). Once you know you have one certificate, include the "-p" flag for .pem file type and export (the "> ~/Desktop/myPublicCert.pem" section).

When you look at your myPublicCert.pem certificate through a text editor, it comes back with 30 or so lines with complete gibberish starting with "BEGIN CERTIFICATE" and ending with "END CERTIFICATE". For Example:

<preformated>
---BEGIN CERTIFICATE---
MIIFJjCCBA6gAwIBAgIRAPQyFuvXTYP/N2gOhG540kUwDQYJKoZIhvcNAQEFBQAw
gZMxCzAJBgNVBAYTAkdCMRswGQYDVQQIExJHcmVhdGVyIE1hbmNoZXN0ZXIxEDAO
BgNVBAcTB1NhbGZvcmQxGjAYBgNVBAoTEUNPTU9ETyBDQSBMaW1pdGVkMTkwNwYD
VQQDEzBDT01PRE8gQ2xpZW50IEF1dGhlbnRpY2F0aW9uIGFuZCBTZWN1cmUgRW1h
aWwgQ0EwHhcNMTEwNjE3MDAwMDAwWhcNMTIwNjE2MjM1OTU5WjAjMSEwHwYJKoZI
hvcNAQkBFhJqQGp1c3RpbnJ1bW1lbC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IB
DwAwggEKAoIBAQC+g0EyUhGeY8aHC/8pQmMperV+HjDnND4ofoHVYQS9s8e/PF0B
D5LEbNOKqvrJlDYRY1008PigGgYdmMtddDz6RboX+ab2wczCbonaf4gFFcFW+UHC
/K/WBYwF7MGfj9EZ18Lz2xP84wAVkjObodAcQSO+4bAjGdL1hdw9X8oSLgmAgEqq
/teRYFL4F+dyBnI+oZS4VuEiSBRYMv2ZUB+Xi0GeMU3fHfH89TTL9ldZDgEhw50P
6yC96PzEpVNL1jRGm0x+MOpJ+/mfLrNu0rx0yywwYdwoAnwaJJPmaui+3DYIXh+7
Rx8r+0NJBNTTKvVuHseDQNJQ2IjR3BWo8x63AgMBAAGjggHiMIIB3jAfBgNVHSME
GDAWgBR6E04AdFvGeGNkJ8Ev4qBbvHnFezAdBgNVHQ4EFgQUl4iq6/jpf7Qnvmyk
ftW61dT2w6MwDgYDVR0PAQH/BAQDAgWgMAwGA1UdEwEB/wQCMAAwIAYDVR0lBBkw
FwYIKwYBBQUHAwQGCysGAQQBsjEBAwUCMBEGCWCGSAGG+EIBAQQEAwIFIDBGBgNV
HSAEPzA9MDsGDCsGAQQBsjEBAgEBATArMCkGCCsGAQUFBwIBFh1odHRwczovL3Nl
Y3VyZS5jb21vZG8ubmV0L0NQUzBXBgNVHR8EUDBOMEygSqBIhkZodHRwOi8vY3Js
LmNvbW9kb2NhLmNvbS9DT01PRE9DbGllbnRBdXRoZW50aWNhdGlvbmFuZFNlY3Vy
ZUVtYWlsQ0EuY3JsMIGIBggrBgEFBQcBAQR8MHowUgYIKwYBBQUHMAKGRmh0dHA6
Ly9jcnQuY29tb2RvY2EuY29tL0NPTU9ET0NsaWVudEF1dGhlbnRpY2F0aW9uYW5k
U2VjdXJlRW1haWxDQS5jcnQwJAYIKwYBBQUHMAGGGGh0dHA6Ly9vY3NwLmNvbW9k
b2NhLmNvbTAdBgNVHREEFjAUgRJqQGp1c3RpbnJ1bW1lbC5jb20wDQYJKoZIhvcN
AQEFBQADggEBAFe5DddZMFfIAdqapd+YHnL+QHcaZ48VKt7wmmamqHvH2sPoXXK6
HFtTD0CPOHDioASmR6FDcghtsF9avP9ntnkOkoLtTShastE5UmcVFckJ+EDTHbJB
PBiivMf4OeG1AMx4WbhIst3NAcA/5Z2X2g7DuRKw/yMgHkfE/l9NHdeAXNQcnbkG
YuNBLLKDTMGPfqFJ0z4rz/YcVKdB3t0xO+RK0z0olahEUh/04ImCiRZOZ2B/G4g7
uwGEEkyiDWpA6gmWhej0HmBi6kFDuzxVsLDsEtwASiTw7HylhBx6ntMlWuLh9zVj
XEHpIjv25NNgLXMtlk95TgAaFE6M/Fm1vqs=
---END CERTIFICATE---
</preformated>
*(my real <j@justinrummel.com> public email certificate)*

If this makes any sense to you (other than... Oh, that is a pem output), you might need to get yourself check in an asylum. This should mean nothing to you, fortunately we can get a more human readable printout by using the openssl command.

{% highlight bash %}
$ openssl x509 -text -fingerprint -sha1 -in ~/Desktop/myPublicCert.pem
{% endhighlight %} 

<preformated>
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            f4:32:16:eb:d7:4d:83:ff:37:68:0e:84:6e:78:d2:45
        Signature Algorithm: sha1WithRSAEncryption
        Issuer: C=GB, ST=Greater Manchester, L=Salford, O=COMODO CA Limited, CN=COMODO Client Authentication and Secure Email CA
        Validity
            Not Before: Jun 17 00:00:00 2011 GMT
            Not After : Jun 16 23:59:59 2012 GMT
        Subject: emailAddress=j@justinrummel.com
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
            RSA Public Key: (2048 bit)
                Modulus (2048 bit):
                    00:be:83:41:32:52:11:9e:63:c6:87:0b:ff:29:42:
                    63:29:7a:b5:7e:1e:30:e7:34:3e:28:7e:81:d5:61:
                    04:bd:b3:c7:bf:3c:5d:01:0f:92:c4:6c:d3:8a:aa:
                    fa:c9:94:36:11:63:5d:34:f0:f8:a0:1a:06:1d:98:
                    cb:5d:74:3c:fa:45:ba:17:f9:a6:f6:c1:cc:c2:6e:
                    89:da:7f:88:05:15:c1:56:f9:41:c2:fc:af:d6:05:
                    8c:05:ec:c1:9f:8f:d1:19:d7:c2:f3:db:13:fc:e3:
                    00:15:92:33:9b:a1:d0:1c:41:23:be:e1:b0:23:19:
                    d2:f5:85:dc:3d:5f:ca:12:2e:09:80:80:4a:aa:fe:
                    d7:91:60:52:f8:17:e7:72:06:72:3e:a1:94:b8:56:
                    e1:22:48:14:58:32:fd:99:50:1f:97:8b:41:9e:31:
                    4d:df:1d:f1:fc:f5:34:cb:f6:57:59:0e:01:21:c3:
                    9d:0f:eb:20:bd:e8:fc:c4:a5:53:4b:d6:34:46:9b:
                    4c:7e:30:ea:49:fb:f9:9f:2e:b3:6e:d2:bc:74:cb:
                    2c:30:61:dc:28:02:7c:1a:24:93:e6:6a:e8:be:dc:
                    36:08:5e:1f:bb:47:1f:2b:fb:43:49:04:d4:d3:2a:
                    f5:6e:1e:c7:83:40:d2:50:d8:88:d1:dc:15:a8:f3:
                    1e:b7
                Exponent: 65537 (0x10001)
        X509v3 extensions:
            X509v3 Authority Key Identifier:
                keyid:7A:13:4E:00:74:5B:C6:78:63:64:27:C1:2F:E2:A0:5B:BC:79:C5:7B

            X509v3 Subject Key Identifier:
                97:88:AA:EB:F8:E9:7F:B4:27:BE:6C:A4:7E:D5:BA:D5:D4:F6:C3:A3
            X509v3 Key Usage: critical
                Digital Signature, Key Encipherment
            X509v3 Basic Constraints: critical
                CA:FALSE
            X509v3 Extended Key Usage:
                E-mail Protection, 1.3.6.1.4.1.6449.1.3.5.2
            Netscape Cert Type:
                S/MIME
            X509v3 Certificate Policies:
                Policy: 1.3.6.1.4.1.6449.1.2.1.1.1
                  CPS: https://secure.comodo.net/CPS

            X509v3 CRL Distribution Points:
                URI:http://crl.comodoca.com/COMODOClientAuthenticationandSecureEmailCA.crl

            Authority Information Access:
                CA Issuers - URI:http://crt.comodoca.com/COMODOClientAuthenticationandSecureEmailCA.crt
                OCSP - URI:http://ocsp.comodoca.com

            X509v3 Subject Alternative Name:
                email:j@justinrummel.com
    Signature Algorithm: sha1WithRSAEncryption
        57:b9:0d:d7:59:30:57:c8:01:da:9a:a5:df:98:1e:72:fe:40:
        77:1a:67:8f:15:2a:de:f0:9a:66:a6:a8:7b:c7:da:c3:e8:5d:
        72:ba:1c:5b:53:0f:40:8f:38:70:e2:a0:04:a6:47:a1:43:72:
        08:6d:b0:5f:5a:bc:ff:67:b6:79:0e:92:82:ed:4d:28:5a:b2:
        d1:39:52:67:15:15:c9:09:f8:40:d3:1d:b2:41:3c:18:a2:bc:
        c7:f8:39:e1:b5:00:cc:78:59:b8:48:b2:dd:cd:01:c0:3f:e5:
        9d:97:da:0e:c3:b9:12:b0:ff:23:20:1e:47:c4:fe:5f:4d:1d:
        d7:80:5c:d4:1c:9d:b9:06:62:e3:41:2c:b2:83:4c:c1:8f:7e:
        a1:49:d3:3e:2b:cf:f6:1c:54:a7:41:de:dd:31:3b:e4:4a:d3:
        3d:28:95:a8:44:52:1f:f4:e0:89:82:89:16:4e:67:60:7f:1b:
        88:3b:bb:01:84:12:4c:a2:0d:6a:40:ea:09:96:85:e8:f4:1e:
        60:62:ea:41:43:bb:3c:55:b0:b0:ec:12:dc:00:4a:24:f0:ec:
        7c:a5:84:1c:7a:9e:d3:25:5a:e2:e1:f7:35:63:5c:41:e9:22:
        3b:f6:e4:d3:60:2d:73:2d:96:4f:79:4e:00:1a:14:4e:8c:fc:
        59:b5:be:ab
SHA1 Fingerprint=7C:E2:A0:0F:11:FC:4F:83:9D:05:26:C2:7D:75:FD:4A:2C:58:F8:23
---BEGIN CERTIFICATE---
MIIFJjCCBA6gAwIBAgIRAPQyFuvXTYP/N2gOhG540kUwDQYJKoZIhvcNAQEFBQAw
gZMxCzAJBgNVBAYTAkdCMRswGQYDVQQIExJHcmVhdGVyIE1hbmNoZXN0ZXIxEDAO
BgNVBAcTB1NhbGZvcmQxGjAYBgNVBAoTEUNPTU9ETyBDQSBMaW1pdGVkMTkwNwYD
VQQDEzBDT01PRE8gQ2xpZW50IEF1dGhlbnRpY2F0aW9uIGFuZCBTZWN1cmUgRW1h
aWwgQ0EwHhcNMTEwNjE3MDAwMDAwWhcNMTIwNjE2MjM1OTU5WjAjMSEwHwYJKoZI
hvcNAQkBFhJqQGp1c3RpbnJ1bW1lbC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IB
DwAwggEKAoIBAQC+g0EyUhGeY8aHC/8pQmMperV+HjDnND4ofoHVYQS9s8e/PF0B
D5LEbNOKqvrJlDYRY1008PigGgYdmMtddDz6RboX+ab2wczCbonaf4gFFcFW+UHC
/K/WBYwF7MGfj9EZ18Lz2xP84wAVkjObodAcQSO+4bAjGdL1hdw9X8oSLgmAgEqq
/teRYFL4F+dyBnI+oZS4VuEiSBRYMv2ZUB+Xi0GeMU3fHfH89TTL9ldZDgEhw50P
6yC96PzEpVNL1jRGm0x+MOpJ+/mfLrNu0rx0yywwYdwoAnwaJJPmaui+3DYIXh+7
Rx8r+0NJBNTTKvVuHseDQNJQ2IjR3BWo8x63AgMBAAGjggHiMIIB3jAfBgNVHSME
GDAWgBR6E04AdFvGeGNkJ8Ev4qBbvHnFezAdBgNVHQ4EFgQUl4iq6/jpf7Qnvmyk
ftW61dT2w6MwDgYDVR0PAQH/BAQDAgWgMAwGA1UdEwEB/wQCMAAwIAYDVR0lBBkw
FwYIKwYBBQUHAwQGCysGAQQBsjEBAwUCMBEGCWCGSAGG+EIBAQQEAwIFIDBGBgNV
HSAEPzA9MDsGDCsGAQQBsjEBAgEBATArMCkGCCsGAQUFBwIBFh1odHRwczovL3Nl
Y3VyZS5jb21vZG8ubmV0L0NQUzBXBgNVHR8EUDBOMEygSqBIhkZodHRwOi8vY3Js
LmNvbW9kb2NhLmNvbS9DT01PRE9DbGllbnRBdXRoZW50aWNhdGlvbmFuZFNlY3Vy
ZUVtYWlsQ0EuY3JsMIGIBggrBgEFBQcBAQR8MHowUgYIKwYBBQUHMAKGRmh0dHA6
Ly9jcnQuY29tb2RvY2EuY29tL0NPTU9ET0NsaWVudEF1dGhlbnRpY2F0aW9uYW5k
U2VjdXJlRW1haWxDQS5jcnQwJAYIKwYBBQUHMAGGGGh0dHA6Ly9vY3NwLmNvbW9k
b2NhLmNvbTAdBgNVHREEFjAUgRJqQGp1c3RpbnJ1bW1lbC5jb20wDQYJKoZIhvcN
AQEFBQADggEBAFe5DddZMFfIAdqapd+YHnL+QHcaZ48VKt7wmmamqHvH2sPoXXK6
HFtTD0CPOHDioASmR6FDcghtsF9avP9ntnkOkoLtTShastE5UmcVFckJ+EDTHbJB
PBiivMf4OeG1AMx4WbhIst3NAcA/5Z2X2g7DuRKw/yMgHkfE/l9NHdeAXNQcnbkG
YuNBLLKDTMGPfqFJ0z4rz/YcVKdB3t0xO+RK0z0olahEUh/04ImCiRZOZ2B/G4g7
uwGEEkyiDWpA6gmWhej0HmBi6kFDuzxVsLDsEtwASiTw7HylhBx6ntMlWuLh9zVj
XEHpIjv25NNgLXMtlk95TgAaFE6M/Fm1vqs=
---END CERTIFICATE---
</preformated>

We can now see that the entity who issued my certificate (The "third party") is "COMODO CA Limited". My certification is valid until Jun 16 23:59:59 2012. This is a little easier to comprehend, and it also lets us know that this is a certificate specific for the email address <j@justinrummel.com>.

Private Keys
---
To export your public and private keys for backup purposes (remember... you do not want to lose this information or else you will never be able to open old emails), you can do this one of two ways Keychain Access or use the security command.

For Keychain Access you want to be sure you select the Category "My Certificates" section on the bottom left hand side of your Keychain Access window. This shortens you list of possible items you would want to export, while still having the option to select your Public and Private keys. Find your email address and click on the disclosure triangle and select both the certificate and the private key (icon looks like a key... how appropriate). You will now need to select File => Export Items (or Ctrl Click the certificates), and save the two items as one .p12 file. Once you click on OK, you will be prompted for a password. This is to ensure your private key is now encrypted using this password as part of the export algorithm. You may also be requested to "Allow" access to your Login Keychain.

![Private and Public Export from Keychain Access]({{ site.url }}/images/2011/06/Private-and-Public-Export.png)

You will not be able to read this file via a text editor, instead you can read the information by entering the following command:

{% highlight bash %}
$ openssl pkcs12 -info -in ~/Desktop/myPublicCert.p12
{% endhighlight %}

This will display both your private and public keys in a .pem format. This is what allows Keychain Access to import your certificates and use for Mail in case you need to re-import the files to your machine or use for iOS (to be discussed on a later article).

To do this in Terminal, you unfortuanely cannot specify the selection of one S/MIME email Public/Private key pair... as the security command is more of a "All or nothing" approach.  This can be seen as a positive non-capable feature of the security command as you don't have to worry about exporting each S/MIME certificate that you acquire over time as it's all done at once. To do this we again go back to the security command:

{% highlight bash %}
$ security export -k login.keychain -t identities -f pkcs12 -o ~/Desktop/myCerts.p12
{% endhighlight %}

This will grab EVERYTHING within your Login keychain that has a public and private key (See "My Certificates" in Keychain Access). You can test your export by creating a new Keychain and then importing your myCerts.p12 file.

{% highlight bash %}
$ security create-keychain ~/Desktop/test.keychain
password for new keychain:
retype password for new keychain:
$ security import ~/Desktop/myCerts.p12 -f pkcs12 -k ~/Desktop/test.keychain
{% endhighlight %}

Footnotes
---
1.  The integrity of a single certificate file can be verified by:

{% highlight bash %}
$ security verify-cert -c ~/Desktop/myPublicCert.pem
{% endhighlight %}

[aboutCert]: http://docs.info.apple.com/article.html?path=Mac/10.6/en/15177.html
