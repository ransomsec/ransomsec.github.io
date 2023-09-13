---
title: Shell's builtin Ghost!
excerpt: "Unveiling the Spooky Secrets of Linux Shell: Meet the Built-In Ghost!"
ribbon: red
categories: shell
header:
    teaser: '/assets/images/teasers/shell.png'
ghost:
- url: /assets/images/ghost/ghost.png
  image_path: /assets/images/ghost/ghost.png
  title: "ghost haunted us!"
---

* toc
{:toc}

# Introduction

Have you heard about the **Shell**'s built-in ghost?

Take a look at this shell script:

```bash
if [[ $1 -eq 1 ]]; then
    echo 'If Block'
else
    echo 'Else Block'
fi
```

| This is a simple bash script that checks if the input value `$1` is equal to `1`. If the input value is 1, the if block is executed; otherwise, the else block is executed.

Now, can you spot the ghost?

No? Alright, let's go ghost hunting!


## Ghost Hunt

What are your thoughts on this script's security? Let's attempt to exploit it with command execution!

```bash
$ bash script.sh 1
If Block
$ bash script.sh '\whoami'
Else Block
$ bash hello.sh `$(cat /etc/passwd)`
Else Block
```

At first glance, this script might seem secure, with no apparent way to execute shell commands, correct?

But, no! There is a ghost lurking and ready to haunt us!

Take a look at line one: `if [[ $1 -eq 1 ]]; then`. A ghost resides in this place. If any value is passed here, and if the ghost liking the passing value, allows their friend, the attacker, to gain entry and potentially compromise our system.

### How?

What about this script/payload?

```bash
'boo[$(uname -r > /proc/$$/fd/1)]'
```


{% include gallery id="ghost" caption="ghost haunted us" %}{: .align-center}

Now, observe that this simple script allows someone to execute system commands without any problem! Ghost successfully haunted us!


## Is vulnerability?

As you can see, this behavior could potentially be exploited for malicious attacks. However, IPA judges that the issue lies not with the interpreter itself. To prevent the ghost from haunting us, developers should address this problem.


# Conclusion

To sum it up, we've seen how a seemingly simple method can pose a significant threat. It emphasizes the importance of developers being aware of such issues. This ~~vulnerability~~ highlights the need for developers to stay vigilant and take proactive steps to secure their systems. By staying informed and addressing these issues, developers can better protect their systems from potential risks. Now what you think about this??


- For more details

  1. [dev.to](https://dev.to/greymd/eq-can-be-critically-vulnerable-338m){: target="_blank"}
  2. [Yamaya](https://ya.maya.st/d/201909a.html){: target="_blank"} (Japanese)


{% include cat_footer.html %}
