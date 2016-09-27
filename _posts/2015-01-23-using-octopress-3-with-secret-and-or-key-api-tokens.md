---
layout: single
title: "Using Octopress 3 With Secret And/or Key API Tokens"
date: 2015-01-23T16:39:25-05:00
modified:
categories:
    - "Miscellaneous"
description: "If you are trying to use API Tokens for Flickr or Twitter, here is smart option"
tags:
    - "Octopress"
header:
  image: # 2048x768 for article header
  teaser: # 400x400 for Twitter
  credit:
  creditlink:

---
One thing that I love about [Octopress][octopress] is the support is GREAT!  I've posted several questions in the past month in troubleshooting new features with Octopress; with [Brandon Mathis][imathis] providing quick, easy to understand, and pleasant replies.  You also have the resources of other Octopress/Jekyll users in using their plugins to enhance your site such as adding adding Flickr images or embedding Twitter posts by referencing their unique identifier.  This is all done by using each third-party' (Flickr or Twitter) dev environments.

## Twitter API Token
I wanted a plugin that will pull and display a tweet it as if it was being viewed on a browser ([as seen on this post]({{ site.url }}/i-moved-my-domains-to-google-domains-and-you-wont-believe-what-happened-next/)).  My quick Google searching resulted in this Jekyll plugin [https://github.com/rob-murray/jekyll-twitter-plugin](https://github.com/rob-murray/jekyll-twitter-plugin) which seemed perfect as it was a gem that could be defined vs. having to install a plugin.  The only change I needed to perform from the setup documentation was the gem needed to be declared inside the ```group :jekyll_plugins do``` section vs. under the main list ([see my current Gemfile as the example][gemfile]).  The Twitter plugin performs API calls and pulls the tweet as desired and displays it perfectly (example as illustrated in the [jekyll-twitter-plugin's README.md][readme]).

In order to place API calls to Twitter you need to create an API application by going to [https://apps.twitter.com/app/new](https://apps.twitter.com/app/new) and filling out their form. Once it's complete you can see your new App listed in the [https://twitter.com/settings/applications](https://twitter.com/settings/applications) section on your Twitter account.  Your new app has four important items to make API calls:

-	consumer_key
-	consumer_secret
-	access_token
-	access_token_secret

To use these tokens, you have two choices: embed them into your shell environment or declare them into your Octopress environment.  I personally use the [fish shell][fish], and for whatever reason I couldn't ```set``` the variables correctly, so now I'll have to attempt option #2.  **But wait!**  That means my super-secrete, special, precious keys may be in the public as I push my code changes to a github repo (for better support by Brandon)!  That won't work!  I did a little more research and found that Jekyll has the ability to reference multiple .yml files to build or server a site by using the ```-c``` flag.  Example: <sup id="fnr1-2015-01-23">[1]</sup>

{% highlight bash %}
jekyll s -c _config.yml,_AccessKeys.yml,_localhost.yml --drafts
{% endhighlight %}

I then created a "AccessKeys.yml" that now stores all my API tokens and made sure that the new .yml file is listed in my .gitignore.  Tokens are safe, fancy API stuff works, and I'm happy. 

## Footnotes

<div class="footnotes">
<hr />
<ol>
<li id="fn1-2015-01-23"><p>The _localhost.yml in this example is using the same jekyll "-c" feature by declaring my site as "http://localhost:4000" so I can look and verify how my page will be displayed without publishing to my site directly.  When I do publish, I perform a "jekyll b -c _config.yml,_AccessKeys.yml; octopress deploy".<a href="#fnr1-2015-01-23"  class="footnoteBackLink"  title="Jump back to footnote 1 in the text.">&#8617;</a></p></li>
</ol>
</div>


[octopress]: http://octopress.org 
[imathis]: https://github.com/imathis 
[gemfile]: https://github.com/justinrummel/jr.com-hpstr/blob/master/Gemfile 
[readme]: https://github.com/rob-murray/jekyll-twitter-plugin/blob/master/README.md 
[fish]: http://fishshell.com 
[1]: #fn1-2015-01-23
