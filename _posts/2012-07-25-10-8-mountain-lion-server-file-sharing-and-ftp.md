---
layout: single
title: "10.8 Mountain Lion Server: File Sharing and FTP"
date: 2012-07-25
categories:
    - "Tech Article"
tags:
    - Apple
    - Mt Lion
    - OSXS
header:
    image: /assets/images/mt-lion-OG-Header.jpg			    # Twitter (use 'overlay_image')
    overlay_image: /assets/images/mt-lion-OG-Header.jpg		# Article header at 2048x768
    overlay_filter: 0.15
    teaser: /assets/images/mt-lion-OG-Header-Twitter.jpg 		# Shrink image to 575 width
    caption: "Photo credit: [**Apple, Inc**](https://www.apple.com)"
---

In terms of File Sharing, there is really nothing different from Lion to Mt Lion. There is a bonus for iOS users in EDU in that you can now create a WebDAV "DropBox" for students submitting their assignments. Follow ~~this kbase for setting up DropBox shares~~ and you will soon be able to have students store their assignments on your server.

![1-mtl-dropbox]({{ site.url }}/assets/images/2012/07/1-mtl-dropbox.png){: .align-center}

![2-mtl-dropbox]({{ site.url }}/assets/images/2012/07/2-mtl-dropbox.png){: .align-center}

![3-mtl-dropbox]({{ site.url }}/assets/images/2012/07/3-mtl-dropbox.png){: .align-center}

FTP
---

FTP has returned! Actually, returning doesn’t really deserve an exclamation point IMHO, however, there were several complains in the Mac Community that this item was missing during the transition to Lion.  The FTP interface is not full feature (but neither was Snow Leopard’s) as you can only identify one folder as being a FTP share. You can select any folder that has already been configured in File Sharing as an AFP/SMBX share, the Websites folder located at /Library/Server/Web/Data/Sites/, or choose any location by selecting the "Custom" option.

![4-mtl-dropbox]({{ site.url }}/assets/images/2012/07/1-mtl-FTP.png){: .align-center}

Footnotes
---
- For what ever reason Apple took FTP out of Server Admin and did not provide users with a replacement. There are may ways to re-enable in Lion, but now as of Mt Lion we have a full port of the Server Admin features (which wasn’t really much to begin with).
