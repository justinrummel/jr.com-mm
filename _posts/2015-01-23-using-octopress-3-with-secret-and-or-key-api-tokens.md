---
layout: single
title: "Using Octopress 3 With Secret And/or Key API Tokens"
date: 2015-01-23T16:39:25-05:00
modified:
description: "If you are trying to use API Tokens for Flickr or Twitter, here is smart option"
categories:
    - "Random"
tags:
    - "Octopress"
header:
    image: /assets/images/2015/01/11/Octopress.jpg					# Twitter (use 'overlay_image')
    overlay_image: /assets/images/2015/01/11/Octopress.jpg		    # Article header at 2048x768
    overlay_filter: 0.15
    teaser: /assets/images/2015/01/11/Octopress_thumb.png 			# Shrink image to 575 width
    caption: "Photo credit: [**Octopress**](http://octopress.org)"
---

One thing that I love about [Octopress][octopress] is the support is GREAT!  I've posted several questions in the past month in troubleshooting new features with Octopress; with [Brandon Mathis][imathis] providing quick, easy to understand, and pleasant replies.  You also have the resources of other Octopress/Jekyll users in using their plugins to enhance your site such as adding adding Flickr images or embedding Twitter posts by referencing their unique identifier.  This is all done by using each third-party' (Flickr or Twitter) dev environments.

Twitter API Token
---

I wanted a plugin that will pull and display a tweet it as if it was being viewed on a browser ([as seen on this post]({{ site.url }}/i-moved-my-domains-to-google-domains-and-you-wont-believe-what-happened-next/)).  My quick Google searching resulted in this Jekyll plugin [https://github.com/rob-murray/jekyll-twitter-plugin](https://github.com/rob-murray/jekyll-twitter-plugin) which seemed perfect as it was a gem that could be defined vs. having to install a plugin.  The only change I needed to perform from the setup documentation was the gem needed to be declared inside the `group :jekyll_plugins do` section vs. under the main list.  The Twitter plugin performs API calls and pulls the tweet as desired and displays it perfectly (example as illustrated in the [jekyll-twitter-plugin's README.md][readme]).

To place API calls to Twitter you need to create an API application by going to [https://developer.twitter.com/en/apply/user](https://developer.twitter.com/en/apply/user) and filling out their form. Once it's complete you can see your new App listed in the https://twitter.com/settings/applications (after login) section on your Twitter account.  Your new app has four important items to make API calls:

- consumer_key
- consumer_secret
- access_token
- access_token_secret

To use these tokens, you have two choices: embed them into your shell environment or declare them into your Octopress environment.  I prefer to use the [fish shell][fish], and for whatever reason I couldn't `set` the variables correctly, so now I'll have to attempt option #2.  **But wait!**  That means my super-secrete, special, precious keys may be in the public as I push my code changes to a github repo (for better support by Brandon)!  That won't work!  I did a little more research and found that Jekyll has the ability to reference multiple .yml files to build or server a site by using the `-c` flag.  Example: [^1]

{% highlight bash %}
jekyll s -c _config.yml,_AccessKeys.yml,_localhost.yml --drafts
{% endhighlight %}

I then created a "AccessKeys.yml" that now stores all my API tokens and made sure that the new .yml file is listed in my .gitignore.  Tokens are safe, fancy API stuff works, and I'm happy.

Footnotes
---

[^1]: The *_localhost.yml* in this example is using the same jekyll "-c" feature by declaring my site as "http://localhost:4000" so I can look and verify how my page will be displayed without publishing to my site directly.  When I do publish, I perform a "jekyll b -c _config.yml,_AccessKeys.yml; octopress deploy".

[octopress]: http://octopress.org
[imathis]: https://github.com/imathis
[readme]: https://github.com/rob-murray/jekyll-twitter-plugin/blob/master/README.md
[fish]: https://fishshell.com
