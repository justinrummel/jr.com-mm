---
layout: single
title: "Octotransfigurator-inator: Migrating from Wordpress"
date: 2013-02-11 10:31
categories:
    - "Random"
tags:
    - "Wordpress"
    - "Octopress"
header:
    image: /assets/images/2015/01/11/Octopress.jpg					# Twitter (use 'overlay_image')
    overlay_image: /assets/images/2015/01/11/Octopress.jpg		    # Article header at 2048x768
    overlay_filter: 0.15
    teaser: /assets/images/2015/01/11/Octopress_thumb.png 			# Shrink image to 575 width
    caption: "Photo credit: [**Octopress**](http://octopress.org)"
---

Lets face it, this site has become stale over the winter months... but largely due to dedicating time to researching, writing, practicing for my two MacIT presentations that happened from Jan 30 - Feb 2nd. Now that I'm finished with MacIT, I need to post PDF links and Vimeo video links that I promised during my session.  But as I look at my site I've realized that it needs something new.  I'm tired of looking at the little squares that were on the top right hand corner.  I'm tired of the default blue.  I'm tired of Wordpress... but there are two issues:

1. What should I use as my new CMS/BLOG/BlahBlahBlah to replace Wordpress?
2. How to migrate the existing data, not loose Google search results, and keep existing features intact (such as post to Twitter once a new page is created).

Then Mid-January [Gary Larizza][glarizza] made announcement on his site that he has started to use [Octopress][octopress].  This immediately piqued my interest as Gary does some fascinating stuff with [Puppet Labs][puppet] and I've wanted to step up my chops in being a "Dev SysAdmin" (something that [Ed Marczak][marczak] has been preaching since 2009 (and probably longer... I just heard it first in 2009.)).

So what is Octopress?  Well you can read their own website, but my short version is "a static web page generator written in Ruby".  Well crap, I don't know Ruby.  But this is what I needed to push me to learn (or at least understand a little), so be it!  Other items to take into consideration is Wordpress security (static pages don't have cross-site security holes), [webserver resource][pureconcepts] (not that I really cared as I pay for my website hosting), and there is a converter from [Wordpress to Octopress on GitHub][jekyll-exporter] (so migration should be easy, right)?!

The last item that I liked about using Octopress is that every post is written in Markdown.  I don't know Markdown, so there is another thing that I get to learn and apply at work when taking notes.  Markdown has the ability to make note taking look nice, but Octopress has enhanced features so that displaying code looks GREAT!

[glarizza]: http://garylarizza.com
[octopress]: http://octopress.org
[puppet]: http://puppetlabs.com
[marczak]: http://radiotope.com
[pureconcepts]: http://jason.pureconcepts.net/2013/01/benchmark-octopress-wordpress/
[jekyll-exporter]: https://github.com/benbalter/wordpress-to-jekyll-exporter

How (a.k.a Give me your Google search result links)
---

Octopress has most of the directions you need to fire up an Octopress site on their [Setup Documentation page][setup].  What I'm going to add are things that I learned trying to make this work.

1.	If you are using another shell other than the default bash on OSX, I hope you know what you are doing.

	I have [Homebrew][brew] installed on my machine for two reasons: easy install of the "fish" shell and nmap. I REALLY like fish, but what I found is getting Ruby to work correctly on OSX and fish is difficult because the default version of Ruby on OSX is 1.8.7 and that version is too old for Octopress.  After several days of trying to make this work, I went back to the bash shell and started to use [Smyck Color Scheme][smyck] to help out with a good color scheme (I still have fish installed, just not the default shell anymore)  The site I found best suited for getting Octopress installed on OSX is on <s>panchoat.org</s> (now deleted).  It takes you through using Homebrew to install the necessary items (Ruby, rbenv, etc) plus walks you through publishing your site for free on github.com as a GitHub page.

[setup]: http://octopress.org/docs/setup/
[brew]: http://mxcl.github.com/homebrew/
[smyck]: https://github.com/hukl/Smyck-Color-Scheme

2.	Octopress Plugins are available, are you sure you want to use them?

	I have a couple of additional Flickr plugins ([FlickrImage][FlickrImage] and [Flickr Badge][FlickrBadge]) and the [octolayer][octolayer] installed on my site because when I first re-started this page for work, it was also a traveling photography site that linked to my Flickr account with location maps for remote areas (i.e. Alaska).  I found a couple of plugins that worked that allowed easy input values of Flickr picture ID's which could then be generated as true links by some Ruby code.  What I've found out is plugins (especially ones that use API keys) will add generation time on your local machine.  If you have a hard time waiting a couple of *minutes* for all of your pages to be generated as Ruby code gets executed to make your life a little easier, you may need to reconsider adding additional plugins.  This makes me wonder what will happen to a website that has 1000 posts of just raw text; how long will page generation take?

[FlickrImage]: http://blog.pixarea.com/2012/07/fetch-images-from-flickr-to-show-in-octopress-slash-jekyll
[FlickrBadge]: https://github.com/chronon/Octopress-Flickr-Badge
[octolayer]: https://github.com/mguentner/octolayer

3.	Themes that are "based" off the original may still be missing items.

	I decided to use the [Darkstripes][darkstripes] theme with the minor modifications.  One thing I learned is that sometimes theme remove elements from css, which DESTORY plugins.  In my case, the FlickrImage plugin required the $noise-bg variable which is on the default "classic" theme.  For some reason the author of "Darkstripes" removed this, thus generated a couple of debuging-hell hours to track down what was wrong. The nice thing, when Octopress goes wrong on generating pages, it usually has a clue why within the error output.

[darkstripes]: https://github.com/amelandri/darkstripes

4.	Markdown.  Learn it!

	If you have NEVER used Markdown, you have a small learning curve but nothing outrageous.  I now have three bookmarked pages to make sure I can always find the proper way to use Markdown and Octopress Code snippets in posts.

	*	[Daring Fireball][daringfireball] post on Markdown gives you standard MD to HTML items that you would want to use on your posts.  Links, lists, Generic insert images, etc.
	*	[Octopress Basics][basics] will provide a "how to" on starting new posts within Octopress such as making sure that categories and tags are correctly inserted in the header AND know the -three- four important rake commands: rake clean, rake generate, rake preview, rake deploy.
	*	[Octopress Code Snippets][snippets] is a great resource on the best way to insert code (like a good Dev SysAdmin, share your knowledge)!  By inserting three 'back ticks' on one line, anything below will be formatted as code.  Items that I learned, be sure you only use three (four will produce "generate" errors) and be sure to end with three 'back ticks'.  The nice thing about this is that you can also format the code for the particular language that you are using with Syntax Highlighting. Use "bash" OR "ruby" on the first line after your three 'back ticks', and your code will be formatted in that language for easy reading.  You can also embed gists from GitHub, or use "codeblock" if you need some output text just formatted differently (I used this for displaying the public SSL cert info on one of my articles).

[daringfireball]: http://daringfireball.net/projects/markdown/
[basics]: http://octopress.org/docs/blogging/
[snippets]: http://octopress.org/docs/blogging/code/

5.	Wordpress Migration

	This was the hardest part to get working.  Fortunately [the developer ][benbalter] was very helpful in getting some errors resolved so I could finally download ALL of my Wordpress content converted to Markdown, zipped, and downloaded to my local machine.  Without this, I would have soon gave up on Octopress.

[benbalter]: https://github.com/benbalter

Final Thoughts
---

The page generation has me concerned.  When I first started cleaning up the export of my old Wordpress articles to Markdown, generation was FAST!  It was nothing for me to change a word, generate, preview and see the results immediately.  Now with the additional plugins, it takes a couple of minutes.  I may have to rethink about my Flickr account integration.  Also, I've archived my old website on my web hosting provider's server just in case I need to revert back for some reason.

Also, apparently I watch too much [Phineas & Ferb][Phineas_and_Ferb] with my kids, and have a particular affinity for the [Evil Dr. Heinz Doofenshmirtz][DoofDaily] (as the title suggests).

[Phineas_and_Ferb]: http://en.wikipedia.org/wiki/Phineas_and_Ferb
[DoofDaily]: http://en.wikipedia.org/wiki/Dr._Heinz_Doofenshmirtz
