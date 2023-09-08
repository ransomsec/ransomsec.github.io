---
tags: [RCE, SQLi, Bug]
title: The RCE File
categories: [hunting]
excerpt: The $0 RCE!
header:
    image: '/assets/images/headers/di.png'
dir:
- url: /assets/images/rd/dir.png
  image_path: /assets/images/rd/dir.png
  title: "Directory Listening..!"
dashboard:
- url: /assets/images/rd/dashboard.jpg
  image_path: /assets/images/rd/dashboard.jpg
  title: "Admin Panel"
mail:
- url: /assets/images/rd/rce_file.jpg
  image_path: /assets/images/rd/rce_file.jpg
  title: "Company mail.."
---

---

# Introduction

Hello fellow hackers! I hope you are doing well and enjoying your `hacking`
journey. In this blog post, I will share one of my most headache-inducing
bug-finding story. However, this story isn't about finding the bug; the headache
came from the company's response. I will explain why this happened shortly. I
hope you can learn from my mistakes and avoid wasting your time as I did. So,
buckle up, because we are on our way!

Table of Contents:

* toc
{:toc}

---

# Recon

As a security researcher, we are well aware of our daily work routines. So, as
usual, one day, I started reconnaissance on one of my target companies to find
any juicy bugs. For this, I used Google Dorks to search for vulnerabilities in
my target company. Have you heard of `Google Dorks?` ;)

There are numerous Google Dorks texts available, but I often use this one as an
example:

```bash
site:*.site.com intitle:Index of / ext:php
```

After entering this query in the Google search bar, I got many results, but one
caught my eye. It was the **"Index of /" (Directory Listening)** that contained
my target `site.com.bak` file. This was unusual for me because this was not my
intended target for finding bugs. So, what is this? Let's check it out!

Firstly, it turned out to be a large **Medical Checkup Center**; Secondly, I had
access to all of their backend information, including source code, payment info,
PII of workers/doctors/patients/staff, API keys, AWS keys, and everything else.
Sounds scary, doesn't it?

At this point, I was taken aback, feeling like I had "reaped rewards without
sowing." So, I slowly started understanding the structure of this new target and
delved into the source code, hoping to find something significant!

My main target is a money transfer company, and my new target is use their
services for transferring money. The backup file I found is related to my new
target, not my primary one.

---

# Catch The Bug

After analyzing the folder and files, I became very curious to read the source
code of those files. The server being an Apache server without a Web Application
Firewall (WAF) intrigued me even more. There were many .js files available to
read.

My plan was to examine the source code of files with interesting names like
**admin.js, config.js, server.js, etc.**

{%include gallery id="dir" caption="Directory Listening"%}{: .align-center}

During my analysis, I discovered some juicy paths hosted on the official website
of my new target, such as `example.com/siteName-AdminLogin`, which only had a
signin option, and a config file containing credentials for the `Adminer`,
hosted on AWS.

> Adminer (formerly phpMinAdmin) is a full-featured database management tool
> written in PHP. Conversely to phpMyAdmin, it consist of a single file ready to
> deploy to the target server. Adminer is available for MySQL, PostgreSQL,
> SQLite, MS SQL, Oracle, Firebird, SimpleDB, Elasticsearch and MongoDB.

Now, with DB credentials I access to the Adminer, Now I had the freedom to
perform CRUD operations on the target server. I considered updating the
passwords of available admins on the server to directly login to the admin panel
becuase it's not in encrypted form (?). However, I didn't want to take the easy
way. Instead, I decided to pause at the database section and proceed to explore
the Admin panel further to continue my journey.

In the admin panel, the UI/UX appeared well-designed, but I was more interested
in testing its security.

Now I ask you a question! As a hacker, what first thing comes in your mind when
you're seeing a login panel? `'or 1=1-- sql'` Right? That's exactly the same thing
also come in my mind, so, I put the payload in the username/email field, and to
my surprise, my new target was vulnerable to **SQL injection**. ;)

Now, I had access to all the information as in the database but presented in a
fully designed manner. Looks like the developer put all of their knowledge into
designing the website. ;)

{%include gallery id="dashboard" caption="Admin Panel"%}{:.align-center}

Having access to the admin panel meant having the power to do anything
imaginable. But that didn't stop me because I found a file upload section where
banner says only `.png|.jpg/.jpeg` files are allowed? Seriously? Let's check it.
Now again if you see file upload option, in your target, what thing first come
in your mind? `Unrestricted File Upload?`. So as expected, I also thought about
this, and I uploaded a simple PHP script,

```php
<?php phpinfo();?>
```

and voila it was executed on the backend, giving me the PHP info. Meaning there
is no security checks in the file upload section.

With that success, I proceeded to gain Remote Code Execution (RCE) on the server
by uploading a [PHP webshell][web-shell]{:target="_blank"}. Now, I had full
control over the server. It was an exhilarating experience, and I felt like
Alderson.

---

# Let's Play The Game

Now, time to stop my testing and report it to the victim organization. However,
the most problematic thing is that my new target does not have any bug bounty
program. When the target lacks a bug bounty program, reporting and explaining
the vulnerability becomes more challenging, and convincing them of the danger it
poses is even harder. So, first, I packed up an email and sent it to their
support mail. I know these types of programs can be very problematic, as they
silently patch the bugs and never mail back to you, nor provide any updates or
bounties.

I only sent some minimal information about the vulnerability, along with some
images, and to my surprise, they responded in one week! ;)

They mailed me:

**"Thank you, I appreciate your effort. Can you give us more detail about this
issue?"**

I said, why not? But Again, I also didn't send the full detail; I only explained
the "Directory Listening" issue and asked for a bounty. Now, guess what? They
silently patched the bug by adding a `.htaccess` file and did not mail me again.

> The `.htaccess` file is a configuration file used on web servers, especially
> Apache HTTP Server, to control various aspects of a website's behavior. The
> `.htaccess` file can help prevent directory listing on web servers.

But no problem, I also have access to your soul; we are white hats. If the
organization is vulnerable and doesn't care about their security, our work is to
inform their customers that their data is in vulnerable hands, and it can be
breached anytime!

On the new target site, there is a banner sliding feature where they add their
Machines, Drs, Branched, High-Tech secure systems (seriously?) etc.

So, first, I went to the Adminer panel and updated one of the banner links with
my hacking quote:

_**If you spend more on coffee than on IT security, you will be hacked.**_

But you know, they removed the banner and set their banner again, and again, I
updated the banner. I played this game 5-6 times! It was fun, and they mailed me
and asked me to tell all the issues, but they didn't mention any bounty. So, I
emailed again and asked for a Computer as a bounty because my new victim is
really close to my area, and at that time, I needed a machine.

They mailed me with this message:

{%include gallery id="mail" caption="Message from Company"%}{:.align-center}

I said, really ₹5K for RCE|SQLi type issues? Seriously? Then I emailed again and
asked for an improved bounty, but they did not respond again.

---

# Is Fixed?

Now, one month has passed, and the vulnerability still exists. But one day,
surprisingly, they silently patched all the issues. They removed the path,
disabled the file upload section, and updated the vulnerable code and remove my
webshell. That's why sometimes I hate logs; now they are not responding again.
However, their fixes are still vulnerable because they only removed some
functions, mostly vulnerable functions are still in the code.

At this point, not exactly RCE but someone easily access the PII and other
sensitive information through API.

---

# Headache

The headache is that I wasted a lot of time there. So at this point, I
considered publishing all the proof-of-concepts in the form of a blog. However,
I then realized that if any bad actor tries to attack their site using the
information I provide, innocent patients could be targeted. Their server
contains mostly details of customers and patients, including their personal and
important information. These days, my headache feels like it's at 100%, making
it difficult for me to sleep at night. My brain feels like it's on the verge of
exploding, but I'm determined to stay strong and push through. I'm doing my best
to let go of the stress and move forward.

> "O you who have believed, seek help through patience and prayer. Indeed, Allah
> is with the patient." (Quran 2:153)

---

# Conclusion

In conclusion, I have more details to share, but for now, I believe it's
enough to disclose what I have found. Through this experience, I have
learned some valuable lessons.

1. To be cautious when choosing a target for testing, especially if they do not
   have a bug bounty program. As a newcomer in the field of cybersecurity, I
   have realized that such targets may not prioritize security and may be
   hesitant to invest in securing their products. Consequently, they might not
   show appreciation or willingness to pay researchers for their efforts.

2. Read the source code of the target and try to chain multiple vulnerabilities
   to create one critical issue.

3. Embrace the thrill of exploring new frontiers in the digital realm, and let
   your curiosity and passion for hacking lead you to uncover the secrets hidden
   within the code. Happy hacking! 🚀

And lastly, I would like to thank my bhai
[RemonSec][remonsec]{:target="_blank"} for the tremendous support provided
during that challenging situation. ;)

---

**Thank you for your time and for reading my blog. Hope you learned something.**
;)

[web-shell]: https://www.kali.org/tools/webshells/
[remonsec]: https://x.com/remonsec

{%include cat_footer.html%}
