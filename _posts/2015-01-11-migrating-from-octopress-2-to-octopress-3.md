---
layout: single
title: "Migrating From Octopress 2 to Octopress 3"
description:
date: 2015-01-11
modified:
categories:
    - "Random"
tags:
    - "Octopress"
header:
    image: 2015/01/11/Octopress.jpg					# Twitter (use 'overlay_image')
    overlay_image: 2015/01/11/Octopress.jpg		    # Article header at 2048x768
    overlay_filter: 0.15
    teaser: 2015/01/11/Octopress_thumb.png 			# Shrink image to 575 width
    caption: "Photo credit: [**Octopress**](http://octopress.org)"
---

I've been using [Octopress 2 since February of 2013]({{ site.url }}/octotransfigurator-inator-migrating-from-wordpress/) and I've learned a little about ruby (not that I've programed any), updated my knowledge about current website frameworks, and have seen what it takes to maintain an open-source project that is actually popular.

In case you didn't know, Octopress is getting ready for a [major update to version 3][octo3].  This article is somewhat premature as there is no release date ("It's ready when it's ready!"), but with that said I believe the team is getting close! So now the big question... how do I move my current site to the new Octopress 3?

What's new
---

One item that is new in Octopress 3 is more inline with adding support to Jekyll vs. replacing common commands such as "build" and "serve" to test your site so you will have to change your workflow ("rake clean; rake generate; rake preview; etc" is gone.  You can safely dump that out of your memory).  Also, the main element for octopress in generateing your framework is now separate from all the tag process that you may have used to add content to your site (e.g. img, video, blockquote, etc).

Commands
---

Here are some new commands that I've been dealing with for the past couple of weeks

- **octopress**: the team has a great [overview of this new command][basic-usage].  It will serve as the way to create a new site, post, page, draft... everything in how Octopress is helping you with your Jekyll site.
- **jekyll**: You can use ```jekyll build --watch``` to generate the pages, but I usually use ```jekyll s``` to host a local version of my site on my laptop so I can review new articles that I've created (or fixing old posts).  If you are using the new drafts feature, use ```jekyll s --drafts```.  The nice thing about hosting on your local machine is that jekyll is setup for "watching", therefore, any changes while the site is running are seen within a few seconds (vs. having to re-generate and re-serve).
- **bundle**: I never "updated" Octopress 2.  I had a site that worked and have been using that code since I started.  Now, with the development going so fast I'm often doing ```bundle update``` to pull the changes that have been completed (sometimes daily).

Process
---

I *highly* recommend you try to install a basic octopress site to see what breaks from your current content.  The only thing you really need to do is create a new folder that will hold your test site (e.g. ~/Documents/octopress3/) and inside that folder create a file called "Gemfile" with the following contents:

``` ruby
source 'https://rubygems.org'

gem 'jekyll'

group :jekyll_plugins do
	gem 'octopress', '~> 3.0.0.rc'
end
```

Once you have this in place, perform a ```bundle install``` and the required gems will be installed on your machine.  You will occasionally do a ```bundle update``` to get the latest vesions of the gems that are installed, OR if you need to add additional gems for tags [^1].  To add the Octopress framework perform a ```octopress new www``` and it will create a new "www" folder with all the needed files.  Be sure to ```cd www``` for the next steps.

Now that we have the framework installed, do a ```jekyll s``` to start hosting the site on your machine and open your browser to http://localhost:4000/.  If you get any errors, I'm guessing there are some missing gem requirements.  Read the errors and add the needed gems to your Gemfile.  Once you know you have a good foundation to run Octopress 3, take one of your articles from your old site to your new site to see if anything breaks.  You may need to Cancel your ```jekyll s``` and run it again several times to see any errors.  Keep moving files over to the new Octopress 3 one-by-one, OR you can go for the shotgun approached and copy all of them (Don't forget to move your static pages and images as well)!  I found there were several tags that I had used in my site that were no longer part of the core octopress framework.  I had to add additinal items to my Gemfile just to make my site work (see: [my test "Gemfile" commit history][Gemfile] for an examples)

``` ruby
gem "octopress-image-tag"
gem "octopress-codeblock"
gem "octopress-quote-tag"
gem "octopress-video-tag"
```

I did a clean install of Octopress 3 and migrated my posts a couple of times, to the point where I felt confident I could migrate my site fairly quickly once Octopress 3 was officially released. Now time to look for some themes!  What I didn't expect is to find themes already available for Octopress 3.  After reviewing some features I was able to do the same process as above but starting with the theme download.  I was also able to adjust my code to remove the "octopress-image" and "octopress-video" tags from my Gemfile.

Footnotes
---

[^1]: You may need to specify a particular release of a gem, or even a specific version of a commit.  Google is your friend to get some examples, but you can see them referenced in <a href="https://github.com/octopress/octopress/issues">Octopress's Issues section</a>.

[octo3]: https://github.com/octopress/octopress
[basic-usage]: https://github.com/octopress/octopress#basic-usage
[Gemfile]: https://github.com/justinrummel/jr.com-hpstr/commits/master/Gemfile
