---
layout: single
title: "JAMF Software Casper Suite in an Amazon EC2 Cloud"
date: 2013-03-07 18:56
categories:
    - "Tech Article"
tags:
    - Casper Suite
    - Amazon
    - JSS
    - EC2
    - Ubuntu Server
    - Linux
---
I had the interesting opportunity of installing the Casper Suite on an Amazon EC2 Cloud server and wanted to post my findings on the subject for other future "cloud" users.  Overall the process is very simple, as you can configure a Windows 2008 R2 Server or Linux server via one of Amazon's Quick Launch Configurations.  I'll review technically what was needed for the environment along with a couple of "gotchas".

I'll assume that you have (or have the means of getting) an EC2 account with Amazon with the proper ports opened for security {22 (ssh), [80, 443] (http(s)), 445 (smb), 8443 (Tomcat)}.  For this installation we used an Ubuntu Server 12.04 LTS (Long Term Support) Quick Launch Configuration (which does not come with a GUI... ALL command line... just the way I like it!).

Environment
---

### JSS
- EC2 (Amazon Elastic Compute Cloud) Amazon Micro instance was sufficient to host the JSS even though it technically doesn't meet the requirements listed by JAMF in terms of RAM and CPU.  Obviously as your environment grows, so will your server resource needs.  The main point is you can get something started **VERY** cheaply.
- Created a 1TB EBS (Amazon Elastic Block Store) drive to store data.  Note, EC2 instances that are greater than "micro" have "local instance storage".  This storage will be deleted if the server is restarted (think of it as a giant /tmp folder).  Therefore, it is critical... no matter what EC2 instance type you create (micro, small, large, etc) that you create an EBS drive.
- Attached the EBS to our EC2 server via Amazon's Management Console.

Our EC2 was running a fresh install from Amazon's images of Ubuntu Server 12.04 LTS, and we performed the following items.

``` bash
# Update the default image
sudo apt-get update
sudo apt-get upgade

# Install JDK for Tomcat
sudo apt-get install openjdk-6-jdk

# Installed mysql for JSS.  This will ask for a password for root.
# Be sure to following JAMF's documentation to create the MySQL database tables
sudo apt-get install mysql-server

# scp JSSInstallerLinux8.63.zip scp to Ubuntu Amazon Server
# this requires using the Amazon's .pem certificate
# scp -i /path/to/amazon.pem JSSInstallerLinux8.63.zip ubuntu@PUBLIC.IP

# Format the EBS 1TB vol, create mount point of "CasperShare", modify the /etc/fstab in case the system reboots, mounted 1TB drive
sudo mkfs ext3 /dev/xvdf
sudo mkdir -m 000 /CasperShare
echo "/dev/xvdf /CasperShare auto noatime 0 0" | sudo tee -a /etc/fstab
sudo mount /CasperShare

# Installed apache2 for http downloads
# Created a symlink from /var/www/CasperShare to /CasperShare
sudo apt-get install apache2

# Created two new users: casperadmin and casperuser
sudo useradd -d /home/casperadmin -m casperadmin
sudo passwd casperadmin

# Installed Samba for SMB mounts
sudo apt-get install samba

#   Added smbpassword for casperadmin
smbpasswd -a casperadmin

#   Added CasperShare SMB folder
;[accounts]
;	comment = CasperShare
;	path = /CasperShare
;	valid users = casperadmin
;	public = no
;	writable = yes
```

Notes
---

### Casper Remote
Casper Remote will not work.  For some reason the JSS reports everyone's IP address as the public WAN ip address instead of looking at ``` ipconfig getifaddr en0 ``` or some other sophisticated method to determine the IP address of a machine during the "every15" trigger. This information could be collected as an Extension Attribute, but Casper Remote won't read this data for remote actions (such as pushing Application Packages and/or VNC services).

### Distribution Points
You still need to create a Distribution point for "CasperShare" in the JSS using SMB services for upload, and HTTP services for download.  This will allow "you" as the Casper Admin to upload your Scripts, Packages, and other management items to your EBS.

The Apache2 HTTP service is needed for your users to download your packages that have been uploaded by Casper Admin.app.  I am *assuming* that the need of an EC2 server is because your user base is diverse and spread out across varying degrees of counties, states, or countries.

### NetBoot
You will not be able to NetBoot for imaging with this setup.  Even *IF* you got a NetSUS VM running locally on your LAN or download and install Server.app on a spare Apple machine, you don't have a Base OS to upload in Casper Admin.app.  If you *wanted* to waste the space (and time to upload) a Base OS and then use Target Disk mode for imaging, that *could* be investigated, but I would opt for using Recovery HD and then enroll your devices via URL or QuickAdd.pkg.

### Software Update
This would be a great scenario to utilize NetSUS, or better yet install [Reposado][reposado] in a separate micro EC2 install to manage Apple Software Updates.  You can configure Reposado to be your primary index.sucatalog which points to Appple's download servers (thus not requiring you to store any data).  With Reposado combined with the Open Source GUI project [Margarita][margarita] you can have an easily deployable and maintainable solution for Software Updates.  You can find a great "How To" to setup Reposado and Margarita at [Joe Wollard's][denisonmac] site, which is also getting some feedback on [Reposado's Google Group forum][repo].

### Clustering
You can cluster your JSS with multiple which may help with the IP addressing elements for Casper Remote, however, creating a cluster for JSS is beyond this article.  You can find some information on [JAMF Nation][jamfnation] by searching for "DMZ" or "Cluster".  Such as:

- [Installing a JSS Web Application in the DMZ][dmz]
- [Setting up A Clustered JSS][cluster]

### Additional Thoughts
If you have any suggestions on Samba security I would greatly appreciate it.  The default setup seems that only "printers" is advertised so it would be simple to disable that broadcast while everything else is *mostly* locked down.  You could always perform ``` sudo service smb [stop | start] ``` for times when you want to upload via Casper Admin.app if you didn't like the idea of having a smb in the cloud.

[reposado]: http://groups.google.com/group/reposado
[margarita]: https://github.com/jessepeterson/margarita
[denisonmac]: http://denisonmac.wordpress.com/2013/02/28/running-margarita-in-apache/
[repo]: https://groups.google.com/forum/?fromgroups=#!topic/reposado/Sd4L8mgBv8I
[jamfnation]: https://jamfnation.jamfsoftware.com/
[dmz]: https://jamfnation.jamfsoftware.com/article.html?id=174
[cluster]: https://jamfnation.jamfsoftware.com/discussion.html?id=5702
