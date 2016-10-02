---
layout: single
title: "10.8 Mountain Lion Server: Websites and Wiki"
date: 2012-07-25
categories:
    - "Tech Article"
tags:
    - Apple
    - Mt Lion
    - OSXS
---
Websites (f.k.a Web) and Wiki have already been moved to Server.app when Lion Server was released, so I didn't expect much to change, but upon review there is a twinkle of Advanced option for Mac Administrators in terms of these two Services.

Websites
---
First Python is now included as an Apache Module. Python also gets a small update as Lion's version of python was 2.7.1 while Python 2.7.2 is available in Mt Lion. You can enable Python option along with PHP (which also received a small version bump from 5.3.10 to 5.3.13) in the main Websites configuration page.

Another interesting item is by default Apple has pre-configured two sites; one for http (port 80) and one for https (port 443). This is a much welcome change as I'm always creating a second site for https in my installations so that "Profile Manager", "Change Password", or even logging into Wiki can be done in a secure fashion.

![Web Settings 1]({{ site.url }}/images/2012/07/1-mtl-web.png){: .align-center}

If we dive a little deeper into the sites settings, you will also notice the Redirect options have improved. We now have a simple option that if someone visits the http version of the site, it will be auto re-directed to the https. A couple of simple dropdown options makes your entire web experience secure!

![Web Settings 2]({{ site.url }}/images/2012/07/2-mtl-web.png){: .align-center}
![Web Settings 3]({{ site.url }}/images/2012/07/3-mtl-web.png){: .align-center}
![Web Settings 4]({{ site.url }}/images/2012/07/4-mtl-web.png){: .align-center}

Lastly, we now have .htaccess options within each site that was available in Snow Leopard (but not in Lion). You can specify for a specific site to allow:

- Server Side Includes (SSI)
- .htaccess overrides
- folder listings
- CGI execution
- Custom Error page redirect

![Web Settings 5]({{ site.url }}/images/2012/07/5-mtl-web.png){: .align-center}

Wiki
---
Now have the option for Wiki's to become a WebDAV Share, however, I haven't quite figured out the URL path to mount the share on my iPad. Home to update this with a link from someone who has figured this out.
