---
layout: single
title: "Quick Step-by-Step Guide for AutoPKG and JSSImporter"
date: 2014-06-18 09:43
categories:
    - "Tech Article"
tags:
    - Casper Suite
    - JSS
    - OSXS
    - AutoPKG
---
This is a quick step-by-step instructions to get [AutoPKG][AutoPKG] and the [JSSImporter][JSSImporter] to work so Mac Admins can begin testing and evaluating the two products, and see how these tools will help automate the less than glamorous parts of their job.  This is not a lengthy description post explaining the awesome work that other Mac Admins have done in creating AutoPKG and JSSImporter, as there are plenty of other posts that explain this better than I can (including their own respective documentation).

Technical assumptions
---

- The reference installers for AutoPKG and JSSImporter are .pkg files, so they must be run on a Mac.
- The JSSImporter assumes that the JSS Distribution Point is either local, or always mounted.

Step-by-Step
---

- Download and install autopkg

``` bash
curl -OL https://github.com/autopkg/autopkg/releases/download/v0.3.0/autopkg-0.3.0.pkg
```

- Add Default repo

``` bash
autopkg repo-add https://github.com/autopkg/recipes.git
```

- Download JSS-addon via autopkg

``` bash
autopkg run JSS-addon.pkg
```

- Install JSS-addon pkg

``` bash
sudo intstaller -pkg /path/to/jss-autopkg-addon-0.0.2.pkg -target / -verbose
```

- Create an "Standard" User in the JSS with Create, Read, Update rights of JSS Objects.
- Set plist environment variables (no slashes at the end)

``` bash
defaults write com.github.autopkg JSS_REPO /Volumes/JSS_Dist_Point/Packages
defaults write com.github.autopkg JSS_URL https://test.jss.private:8443
defaults write com.github.autopkg API_USERNAME apiUser
defaults write com.github.autopkg API_PASSWORD apiPassword
```

- Test

``` bash
autopkg run TextWrangler.jss
```

Bonus Round
---
Use [@seankaiser][seankaiser]'s [autopkg automation][skauto] LaunchDaemon files to automatically check a list of applications (that you define) and send an email if there are updates!

Sources
---

- [AutoPKG GitHub Repo][AutoPKG]
- [AutoPKG Getting Started Documentation][autoDOC]
- [JSSImporter addon GitHub Repo][JSSImporter]
- [JSSImporter Getting Started Documentation][jssDOC]
- [AutoPKG LaunchDaemon GitHub Repo][skauto]

[AutoPKG]: https://github.com/autopkg/autopkg
[autoDOC]: https://github.com/autopkg/autopkg/wiki/Getting-Started
[JSSImporter]: https://github.com/arubdesu/jss-autopkg-addon
[jssDOC]: http://www.318.com/2014/01/introducing-jssimporter-for-autopkg/
[seankaiser]: https://twitter.com/seankaiser
[skauto]: https://github.com/seankaiser/automation-scripts/tree/master/autopkg

