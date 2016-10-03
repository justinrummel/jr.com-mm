---
layout: single
title: "MacDMV Regex-101 Presentation (Part 1)"
date: 2015-03-31T20:23:38-04:00
modified:
description: "Presentation given to MacDMV group to provide a fundamental understanding of regex"
categories:
    - "Tech Article"
tags:
    - CLI
    - REGEX
    - MacDMV
header:
    image: 2015/02/25/regex-Header.png     # Twitter (use 'overlay_image')
    overlay_image: 2015/02/25/regex-Header.png       # Article header at 2048x768
    overlay_filter: 0.15
    teaser: 2015/02/25/regex-Header-Twitter.png    # Shrink image to 575 width
    caption: "Photo credit: [**Pyfisch**](http://commons.wikimedia.org/wiki/File:Pictogram_voting_regex.svg)"
---
**NOTE:** I was going to give this presentation for MacDMV this month, however, due to unannounced circumstances I won't be able to present.  Here is what I was going to post immediately following the meet-up.

<hr />

There is no better way to comprehend a new topic by admitting you know nothing.  Prior to this article I knew **nothing** about regex, how it was used, when to use it, and with what programs could utilize it's capabilities. What I did know is regex could find "stuff" within text whether that text was a simple paragraph, multiple lined sentences, or in a result string from CLI commands.

To start learning how to use regex I decided to use Apple's "The Crazy Ones" text (Full version) [^1] as my source and tried to extract information to better understand regex.

I am using two different formatted versions "The Crazy Ones".  Once is a giant long text string that wraps around as seen here:

{% gist a7677d43ab3f0e35467b %}

My second version is a multi lined version that can be seen here: [^2]

{% gist 3a9371e2def6ac223433 %}

The Basics
---

Below are some of the command line utilities that can use some principals of regex, however, there are some limitations such as stringing multiple searches by using parenthesis, or backreference (Dependants if an item is before or after a result).

- egrep or grep -E
- sed -e
- awk

Most of the tools that I have reviewed are focusing on programming languages such as perl, python, ruby, javascript, php, Objective C, etc.  As you start learning new tools to assist in managing your Apple environment (munki, autopkg, puppet, Casper Suite, etc) regex can definitely assist as these tools use programming languages to achieve their goals.

### Beginning of words
Lets play around with some examples.  I'm taking my two source texts (singe line and multi lined) of "The Crazy Ones" and try to find "stuff" and review the results.  In the below pictures you will first see an attempt to find the word "```the```" anywhere within my test sources, then use "```^the```" to only find those letters at the beginning.

In order to try help illustrate I've created a text table to show which text items I'm trying to search and the words that were matched.  Below the text table are screenshots of the results because in this case pictures are far better explaining the results than text.

| Test Options           | Apple single line | Apple multi Line    |
|:-----------------------|:-----------------:|--------------------:|
| ```the``` (anywhere)   | the, they, them   | the, they, them     |
|----
| ```^the``` (beginning) | none              | none                |
|----
| ```The``` (anywhere)   | The, They         | The, They           |
|----
| ```^The``` (beginning) | none              | The, They           |
|=====
{: rules="groups"}

#### Single Line Results
<figure class="fourth">
<a href="{{ site.url }}/images/2015/02/25/single-1.png"><img src="{{ site.url }}/images/2015/02/25/single-1_256.png" /></a>
<a href="{{ site.url }}/images/2015/02/25/single-2.png"><img src="{{ site.url }}/images/2015/02/25/single-2_256.png" /></a>
<a href="{{ site.url }}/images/2015/02/25/single-3.png"><img src="{{ site.url }}/images/2015/02/25/single-3_256.png" /></a>
<a href="{{ site.url }}/images/2015/02/25/single-4.png"><img src="{{ site.url }}/images/2015/02/25/single-4_256.png" /></a>
</figure>

#### Multi Line Results
<figure class="fourth">
<a href="{{ site.url }}/images/2015/02/25/multi-1.png"><img src="{{ site.url }}/images/2015/02/25/multi-1_256.png" /></a>
<a href="{{ site.url }}/images/2015/02/25/multi-2.png"><img src="{{ site.url }}/images/2015/02/25/multi-2_256.png" /></a>
<a href="{{ site.url }}/images/2015/02/25/multi-3.png"><img src="{{ site.url }}/images/2015/02/25/multi-3_256.png" /></a>
<a href="{{ site.url }}/images/2015/02/25/multi-4.png"><img src="{{ site.url }}/images/2015/02/25/multi-4_256.png" /></a>
</figure>

As you can see regex is much more helpful when dealing with multi lined items vs. one giant run-on string of text.

### End of words
To find items that exist at the end of a string, place a dollar sign ($) at the end of your search requirements, for example: ```foo$```

Let's try to find the periods at the end of our multi line sample text.  First, we're knowingly going to incorrectly try just a "." (period) to see if we can find a match.

| Test Options       | Apple Multi Line       |
|:-------------------|-----------------------:|
| ```.```            | everything!            |
|----
| ```.$```           | periods as desired     |
|----
| ```\.```          | periods as desired     |
|=====
{: rules="groups"}

<figure class="third">
<a href="{{ site.url }}/images/2015/02/25/period-1.png"><img src="{{ site.url }}/images/2015/02/25/period-1_256.png" /></a>
<a href="{{ site.url }}/images/2015/02/25/single-2.png"><img src="{{ site.url }}/images/2015/02/25/period-2_256.png" /></a>
<a href="{{ site.url }}/images/2015/02/25/period-3.png"><img src="{{ site.url }}/images/2015/02/25/period-3_256.png" /></a>
</figure>

Sometimes you need to watch out for special characters and "escape" them so our program (or CLI command) can understand what we want such as the period "." (or "\\" by escaping our escaping character). Also note there is always a different way to do something.  One way may be better than the other, such as in this example if I *really* only wanted the periods at the end of sentences I should look for "```.$```", as sometimes in my writing I'll use an ellipsis (...) to indicate a more dramatic pause vs. just a comma.  The use of "```\.```" would give me false positives on ellipsis within any of my articles.

Lets find the special characters in our multi line sample text.

| Test Options       | Apple Multi Line       |
|:-------------------|-----------------------:|
| ```,```            | only commas            |
|----
| ```'```            | only apostrophes       |
|----
| ```(,\|'\|\.)```  | special characters     |
|=====
{: rules="groups"}

<figure class="third">
<a href="{{ site.url }}/images/2015/02/25/special-1.png"><img src="{{ site.url }}/images/2015/02/25/special-1_256.png" /></a>
<a href="{{ site.url }}/images/2015/02/25/special-2.png"><img src="{{ site.url }}/images/2015/02/25/special-2_256.png" /></a>
<a href="{{ site.url }}/images/2015/02/25/special-3.png"><img src="{{ site.url }}/images/2015/02/25/special-3_256.png" /></a>
</figure>

This time we're using the pipe symbol to symbolically state "comma OR apostrophe OR period".  Notice we are not surrounding things around double quotes or single quotes.  I believe this makes things harder to read, but that is the syntax that is being used.

### Words in the middle
This is where things get complicated.  Trying to slice through line after line the right word, words, or data segment within a multi lined text can be difficult as we need to correctly spell our conditions.  Furthermore, conditions may have dependencies on what precedes or follows the desired text.  The different types of requirements are as follows:

#### Assertions

- ```foo(?=bar)```		Lookahead assertion. The pattern foo will only match if followed by a match of pattern bar.
- ```foo(?!bar)```		Negative lookahead assertion. The pattern foo will only match if not followed by a match of pattern bar.
- ```(?<=foo)bar```		Lookbehind assertion. The pattern bar will only match if preceded by a match of pattern foo.
- ```(?<!foo)bar```		Negative lookbehind assertion. The pattern bar will only match if not preceded by a match of pattern foo.

#### Character Classes

- ```.```			Matches any character except newline. Will also match newline if single-line mode is enabled.
- ```\s```		Matches white space characters.
- ```\S```		Matches anything but white space characters.
- ```\d```		Matches digits. Equivalent to [0-9].
- ```\D```		Matches anything but digits. Equivalent to [^0-9].
- ```\w```		Matches letters, digits and underscores. Equivalent to [A-Za-z0-9_].
- ```\W```		Matches anything but letters, digits and underscores. Equivalent to [^A-Za-z0-9_].

#### Bracket Expressions

- ```[adf]```		Matches characters a or d or f.
- ```[^adf]```	Matches anything but characters a, d and f.
- ```[a-f]```		Match any lowercase letter between a and f inclusive.
- ```[A-F]```		Match any uppercase letter between A and F inclusive.
- ```[0-9]```		Match any digit between 0 and 9 inclusive. Does not support using numbers larger than 9, such as [10-20].

#### Quantifiers

- ```\*```		0 or more. Matches will be as large as possible.
- ```*?```		0 or more, lazy. Matches will be as small as possible.
- ```\+```		1 or more. Matches will be as large as possible.
- ```+?```		1 or more, lazy. Matches will be as small as possible.
- ```?```			0 or 1. Matches will be as large as possible.
- ```??```		0 or 1, lazy. Matches will be as small as possible.
- ```{2}```		2 exactly.
- ```{2,}```		2 or more. Matches will be as large as possible.
- ```{2,}?```		2 or more, lazy. Matches will be as small as possible.
- ```{2,4}```		2, 3 or 4. Matches will be as large as possible.
- ```{2,4}?```	2, 3 or 4, lazy. Matches will be as small as possible.

String matching requirements are bundle together by enclosing their unique elements in-line.  Use parenthesis to enclose Assertions or Character Classes while adding Bracket Expressions or curly brackets for Quantifiers inside those parenthesis.

Lets find the words before periods in our multi line sample text.

| Test Options               | Apple Multi Line                                     |
|:---------------------------|-------------------------------------------------:|
| ```(.$)```                 | All the periods                                  |
|----
| ```(\S+)(.$)```            | Words plus periods                               |
|----
| ```(\S{4})(.$)```          | Last four letters plus periods                   |
|----
| ```(\s)(\S{4})(.$)```      | preceding four letter words ONLY, plus periods   |
|----
| ```(?<=\s)(\S{4})(?=.$)``` | only the four letter words that precede a period |
|=====
{: rules="groups"}

<figure class="fifth">
<a href="{{ site.url }}/images/2015/02/25/middle-1.png"><img src="{{ site.url }}/images/2015/02/25/middle-1_256.png" /></a>
<a href="{{ site.url }}/images/2015/02/25/middle-2.png"><img src="{{ site.url }}/images/2015/02/25/middle-2_256.png" /></a>
<a href="{{ site.url }}/images/2015/02/25/middle-3.png"><img src="{{ site.url }}/images/2015/02/25/middle-3_256.png" /></a>
<a href="{{ site.url }}/images/2015/02/25/middle-4.png"><img src="{{ site.url }}/images/2015/02/25/middle-4_256.png" /></a>
<a href="{{ site.url }}/images/2015/02/25/middle-5.png"><img src="{{ site.url }}/images/2015/02/25/middle-5_256.png" /></a>
</figure>

Multiple words with the same meaning
---

Sometimes, two (or more) words could be used in a string to represent an accurate statement, the biggest example is dates.  You could write dates with the month as a number, full name of the month, or just the abbreviation.  You could as add the "st", "nd", or "th" at the end of the days.  Not knowing the pattern of how your string comes into your search criteria could work against you so either a) force a pattern b) take into account of all possibilities.

The way we search for optional items is with the question mark at the end of letters or numbers.  If there is a group of items that need to be optional, then nest them together with parenthesis.  For example I want to match all the possibilities of March 18th, 2015; which could be written as

- March 18th
- March 18
- Mar 18th
- Mar 18

My regex search string would be: ```Mar(ch)? 18(th)?``` giving me the option to include the "ch" at the end of March and the "th" at the end of eighteenth.  But now if I wanted to include "3/18", or "03/18" as a set of possible date formats I need to expand my search string to be: ```(\d{1,2}|Mar(ch)?)( ?/?)18(th)?```

{% highlight bash %}bash
(
	\d{1,2}		# Search for a number that are 1-2 digits in length
	|		# "OR"
	Mar(ch)?	# Start with "Mar" but could have "ch" at the end.
)
(
	&nbps;?		# There might be a space
	/?		# There might be a forward slash
)
(
	18(th)?		# The last group will have 18, but might end with "th"
)
{% endhighlight %}

<figure>
<a href="{{ site.url }}/images/2015/02/25/dates-1.png"><img src="{{ site.url }}/images/2015/02/25/dates-1_800.png" /></a>
</figure>


Tools
---

Applications

- Patterns: [https://itunes.apple.com/us/app/patterns-the-regex-app/id429449079?mt=12][id429449079]

Online

- [https://regex101.com][regex101]

Links
---

- [http://en.wikipedia.org/wiki/Think_different][wikipedia]
- [http://www.funtoo.org/Sed_by_Example,_Part_1][sed1]
- [http://www.funtoo.org/Sed_by_Example,_Part_2][sed2]
- [http://www.funtoo.org/Sed_by_Example,_Part_3][sed3]
- [http://www.regular-expressions.info/index.html][info]

Footnotes
---

[^1]: There are actually three versions of "The Crazy Ones" per this <a href="http://en.wikipedia.org/wiki/Think_different#Text">Wikipedia article</a>: Original, Full version, and Short version.
[^2]: To create the multi lined version I wanted to use sed and substituted each ". " with ".\n" (a period then a line break).  There is an OS X sed issue when trying to substitute with line breaks that is outlined at: <a href="http://stackoverflow.com/questions/6111679/insert-linefeed-in-sed-mac-os-x">http://stackoverflow.com/questions/6111679/insert-linefeed-in-sed-mac-os-x</a>.  To create multi line version I used the following commands, <code>bash-3.2$ cat Apple.quote | sed 's/\. /\. \=/g' | tr "=" "\n"</code>

[id429449079]: https://itunes.apple.com/us/app/patterns-the-regex-app/id429449079?mt=12
[regex101]: https://regex101.com
[wikipedia]: http://en.wikipedia.org/wiki/Think_different#Text
[sed1]: http://www.funtoo.org/Sed_by_Example,_Part_1
[sed2]: http://www.funtoo.org/Sed_by_Example,_Part_2
[sed3]: http://www.funtoo.org/Sed_by_Example,_Part_3
[info]: http://www.regular-expressions.info/index.html
