---
layout: notes
notes_date: true
notes_pagination: true
title: MultiForm SQLi Technique
injected:
- url: /assets/images/notes/injected.png
  image_path: /assets/images/notes/injected.png
  title: 'Payload Injected'

---

If you are performing an SQL Injection attack on your target and encounter
`Content-Type: multipart/form-data` where do you start the attack?

For example:

![multi]({{site.baseurl}}/assets/images/notes/multi.png){: width="700"
hight="500" .align-center}

Since there is no traditional way like `username=admin&password=password` where
do we inject our payload?

You can inject the payload as well. It's similar to the traditional method, but
the locations are different. First, observe the value for "username" in line 26;
it acts as the key (our injection point).

For simplicity, just copy the request into a file and then run `SQLmap` using
this command:

```bash
sqlmap -r request.sql -p username
```

| -r - Load HTTP request from a file

| -p - Testable parameter(s)

And you're done!

{%include gallery id="injected" caption="Successfully Injected"%}{:.align-center}
---

{% include cat_footer.html %}
