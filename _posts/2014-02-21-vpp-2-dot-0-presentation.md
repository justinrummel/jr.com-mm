---
layout: single
title: "VPP 2.0 Presentation"
date: 2014-02-21 15:39
categories:
    - "Tech Article"
tags:
    - Apple
    - MacDMV
    - VPP
---
Yesterday I was able to present to the local DC, VA, MD Mac User Group [MacDMV][MacDMV] on VPP.  I felt it was a great success for our first knowledge focus event, and glad things are now in-gear.  As I mentioned during my presentation, I've uploaded my slides to GitHUB so you can download the Markdown source.

Yes... Markdown slides!

I wanted to do something a little different than Keynote (and no PowerPoint is not an option).  I didn't want Keynote as I wanted to share my information for everyone, not just Mac users who happen to have Keynote installed on their machine.  I could have done PDF, but if other's wanted to copy/paste... again it's not as easy if you are not using a Mac.  With my enjoyment of using Markdown as a note taking tool (along as the blog posts for this site), I wanted to find something that would parse Markdown syntax and make it a "presentation".  I found [landslide][landslide].

The README file explains landslide's features pretty well.  What I want to jot down is a quick step-by-step to get my presentation from markdown to your machine in the way everyone else was able to see it on Wednesday night.

``` bash
cd ~/Desktop/
git clone https://github.com/adamzap/landslide.git
cd landslide
python setup.py build
sudo python setup.py install

# At this point you now have the landslide command line utility

cd ~/Desktop/
git clone https://github.com/justinrummel/MacDMV.git
cd MacDMV/VPP-2.0/
landslide slides.md -t themes/light/; open presentation.html
```

And you are done!  You should now be able to see my presentation.

[MacDMV]: http://macdmv.com
[landslide]: https://github.com/adamzap/landslide
