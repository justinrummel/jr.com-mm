---
layout: single
title: "MacDMV Regex-101 Presentation (Part 2)"
date: 2015-04-03T10:44:12-04:00
modified:
description: "Second half of my presentation given to MacDMV group to provide a fundamental understanding of regex"
categories:
    - "Tech Article"
tags:
    - CLI
    - REGEX
    - MacDMV
header:
    image: /assets/images/2015/02/25/regex-Header.png     # Twitter (use 'overlay_image')
    overlay_image: /assets/images/2015/02/25/regex-Header.png       # Article header at 2048x768
    overlay_filter: 0.15
    teaser: /assets/images/2015/02/25/regex-Header-Twitter.png    # Shrink image to 575 width
    caption: "Photo credit: [**Pyfisch**](http://commons.wikimedia.org/wiki/File:Pictogram_voting_regex.svg)"
---
**NOTE:** Again, I was going to give this presentation for MacDMV this month, however, due to unannounced circumstances I won't be able to present.  Here is what I was going to post immediately following the meet-up.

<hr />

[Part 1 of my regex series]({{ site.url }}/macdmv-regex-101-presentation-part-1/) gave fundamental examples on how to use regex depending on if you want to find words at the begging, middle, or the end of multiple lines of text.  This section will try to provide examples that are closer to Mac Admin thus being more useful.

Mac Admin Examples
---

Let's take our knowledge gained from the previous article and apply it to a more practical (or at least somewhat a practical) example that an Mac Admin may want to accomplish; read a plist file.  YES, defaults read would be much easier.  YES /usr/libexec/PlistBuddy would be another reasonable solution... but we're playing with regex so grab a chair and sit down!

### Regex the Dock
My first example we'll read the Dock (com.apple.dock.plist).  The dock is located on a per user basis, thus it lives in the User's Library => Preference folder.  Let's find out information regarding our dock, first let's print the entire file.

{% highlight bash %}
defaults read ~/Library/Preferences/com.apple.dock.plist
{% endhighlight %}

It's big!  I'm not going to paste that into an article that is already too long.

For fun (and to validate our future results) how many times does "bundle-identifier" occur (I get 24)?

{% highlight bash %}
defaults read ~/Library/Preferences/com.apple.dock.plist | grep -c '"bundle-identifier"'
{% endhighlight %}

#### Find the "bundle-identifier"
Our goal is to find the text that follows each "bundle-identifier" so we can see each of the unique reverse URL strings that point to an icon.  To do this I followed this logic when creating my regex:

- Use ```("bundle-identifier")```
- Use ```(.+)``` to include stuff after "bundle-identifier"
- Use ```(";$)``` to stop at the end of the line
- Insert ```?<=``` in the beginning of the bundle-identifier section to exclude the words bundle-identifier from the results
- Insert ```?=``` in the beginning of the ";$ section to exclude from the result
- Insert ``` = "``` at the end of the bundle-identifier section to remove from search results
- Replace ```(.+)``` to a more specific ```(\S+)``` search string (I wanted something more than "anything".  ```\S``` does "Matches anything but white space characters". ```\D``` won't work because "Subline 3" (com.sublimetext.3) and  "Textual 5" (com.codeux.irc.textual5) have numbers in their names.)

What the below video example as I type out each of the above sections to get my final result.

<div class="embed-container embed-container-16x9">
    <iframe src='//player.vimeo.com/video/120617299?portrait=0' scrolling='no' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
</div>


Picture example
<figure>
	<a href="{{ site.url }}/assets/images/2015/02/25/1-bundle-identifier.png"><img src="{{ site.url }}/assets/images/2015/02/25/1-bundle-identifier_800.png" alt="HardVHD 1"></a>
</figure>

#### Now Find the _CFURLString

<figure>
	<a href="{{ site.url }}/assets/images/2015/02/25/2-_CFURLString.png"><img src="{{ site.url }}/assets/images/2015/02/25/2-_CFURLString_800.png" alt="HardVHD 1"></a>
	<figcaption>Same as "bundle-identifier" but now using "_CFURLString" in the first line</figcaption>
</figure>

#### Now Find the file-label

<figure>
	<a href="{{ site.url }}/assets/images/2015/02/25/3-file-label.png"><img src="{{ site.url }}/assets/images/2015/02/25/3-file-label_800.png" alt="HardVHD 1"></a>
	<figcaption>Close to "bundle-identifier" but now we must take into consideration results with or without quotes and that the names may have spaces.</figcaption>
</figure>

Some of you may notice that "bundle-identifier" has 24 results while "_CFURLString" has 27.  I have three folders in my Dock thus they don't have a bundle-identifier, just the folder path sting that is returned from "_CFURLString".  The file-label result was tricky to figureout, but still simple in design.  I had to take into consideration that the label may NOT have quotations surrounding the label as they will only appear when there is a space in the name.

To use an awk example of the same goal, we find the bundle-dentifier and then trim out the extra "stuff" away from our result with ```gsub```:

{% highlight bash %}
justinrummel@Rummel-MBPr ~/D/G/jr.com-hpstr> defaults read ~/Library/Preferences/com.apple.dock.plist | awk '/"bundle-identifier" / { gsub("\"", "", $NF); gsub(";", "", $NF); print $NF}'
com.apple.launchpad.launcher
com.apple.appstore
com.apple.ActivityMonitor
com.apple.Console
com.codeux.irc.textual5
com.tapbots.TweetbotMac
com.apple.FaceTime
com.apple.iChat
com.apple.Safari
com.google.Chrome
com.mailplaneapp.Mailplane3
com.apple.mail
com.apple.AddressBook
com.apple.iCal
com.apple.Notes
com.apple.reminders
com.apple.Maps
com.apple.iTunes
com.apple.iBooksX
com.apple.systempreferences
com.smileonmymac.PDFpenPro6.MacAppStore
com.sublimetext.3
com.apple.RemoteDesktop
com.jamfsoftware.selfservice
{% endhighlight %}

### Create an AutoPKG Processor
Making ".jss" or ".munki" recipes is strait forward by a quick copy and paste from one of the multiple examples that have already been built, but they are only useful if a ".pkg" and/or ".download" parent recipe are available!  Fortunately, the Autopkg team have the processor called [URLTextSearcher][URLTextSearcher] which makes creating the ".download" simple! [^1]

#### Example #1
For the first example I'm going to use Shea Craig's [Vivaldi.download.recipe][Vivaldi.download.recipe].  There are three processors that are being used:

- URLTextSearcher
- URLDownloader
- EndOfCheckPhase

The "URLDownloader" performs the download operation and "EndOfCheckPhase" ensure it was a successful download, the item we are going to focus on is "URLTextSearcher" which tells URLDownloader **WHAT** to download.

"URLTextSearcher" has two Arguments that are required: "url" (our source URL) and "re_pattern" (regex!)

What Shea is requesting is for Autopkg to visit our URL "https://vivaldi.com" and find the regex pattern of "https://vivaldi\.com/download/Vivaldi[0-9TP_.]+\.dmg".  The actual regex is being displayed in the brackets (along with just before and after), so let's focus dissecting in this area.

- ```Vivaldi``` 	Having this in the beginning states the download name MUST start with "Vivaldi"
- ```[0-9]```  	This section states any number from zero to 9 may possibly in use
- ```[TP]```		This section states the only these letters are being used after Vivaldi
- ```[_.]```		This section states the only two special characters that may also be used are "_" and "."
- ```[+\.dmg]```	This is the end of our download file.  The "+" states look for a long pattern, then you will find our ".dmg" (and don't forget to escape our dot in front of the dmg!)

This regex works great, however, the "TP" letters in the middle of the name worry me. Vivaldi may strip the TP letters because sometime in the future Vivaldi may not be a "Technical Preview", however, what if they replaced that with "RC" for release candidate?  Everyone's pkg, jss, munki recipes would start generating fail messages because the name changed outside of the acceptable regex pattern.  What we could do is simply state as long as the download file ends with "DMG", then give it to me!  I would assume then the file name could contain letters, numbers, and special characters, but not spaces.  From "Part 1" we learned that ```\S``` will do that assumption just fine, thus line 31 would be:

{% highlight xml %}
<string>https://vivaldi.com/download/[\S]+\.dmg</string>
{% endhighlight %}

#### Example #2
For my second example I applied the same theory when reviewing Vivaldi to create a new recipe for Wireshark's Development release installer.  If you haven't heard, [Wireshark's Development Release](https://www.wireshark.org/download.html) can be used without installing X11 on your machine as they are moving [away from XQuarts to Qt][qt].  By using the same AutoPkg processor "URLTextSearcher", I could scrap the page to find only the development releases vs. the "Stable" or even the "Old Stable" options.

I reviewed the HTML source for the download page to see what patterns I could extract that said this file is a development release vs. the other two releases, and I believe a development release is based off of: [^2]

- The Development version is separated into three number tuple
- The first section is the number 1
- The second section is two digits, but the first digit is greater than 1
- The third section is consists of 1 or 2 digits
- Ends with "Intel 64.dmg"

This gave me the regex of: ```<string>Wireshark 1\.[2-9][1-9]\.\d{1,2} Intel 64\.dmg</string>``` and is now available on my official autopkg repo located at: [https://github.com/autopkg/justinrummel-recipes/tree/master/WiresharkDev](https://github.com/autopkg/justinrummel-recipes/tree/master/WiresharkDev).

Footnotes
---

[^1]: This assume the application that you want to create a ".download" recipe is not being provided by the Sparkel framework, as that is a <a href="https://github.com/autopkg/autopkg/wiki/Processor-SparkleUpdateInfoProvider">separate processor</a>.
[^2]: I know at some point I may have to return to <a href="https://wiki.wireshark.org/Development/ReleaseNumbers">https://wiki.wireshark.org/Development/ReleaseNumbers</a> to get a better definition of the development release number, but for now this assumption works.

[URLTextSearcher]: https://github.com/autopkg/autopkg/wiki/Processor-URLTextSearcher
[Vivaldi.download.recipe]: https://github.com/autopkg/sheagcraig-recipes/blob/master/Vivaldi/Vivaldi.download.recipe
[qt]: https://www.wireshark.org/news/20141007.html
