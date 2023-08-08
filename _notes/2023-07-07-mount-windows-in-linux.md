---
layout: notes
title: "Mounting Windows partition in Linux"
date: 2023-03-03
---

I use dual boot (Windows and Linux on the same drive) on my computer. Sometimes,
I need some files that are stored on my Windows partition. To access these
files, I need to switch my partition. But lately, I realized that I waste a lot
of time rebooting my system. I can actually access the files from my Windows
partition in Linux without switching to Windows, using the `mount` command.

---

{: .notice--success}

INFO: You need `root` permission to perform this task. If you are already a root
user, or in `sudo` group, you are good to go. If not, please contact your
administrator.

{: .notice--danger}

Be cautious! If you are not careful about mounting, you may damage your
partition and lose your data.

---

**Table of Contents:**

* toc
{:toc}

---

# First, we need to know which partition we want to mount.

For this, I use the `fdisk` command to check the currently available partitions
in my system. As seen in my system, I currently have four main partitions
available (you may have more).

1. The first one is my main Linux partition: **510.8G**
2. The second one is the "Microsoft Reserved Partition (MSR)," a special
   partition used by Windows OS: **16M**
3. The third one is my main Windows partition, which I want to mount: **360.7G**
4. The fourth one is a disk i created in my Windows partition, labeled as my (F)
   drive: **58.6G**

![disk_list]({{site.baseurl}}/assets/images/mounting/disk_list.png){:
width="800" .align-center}

Now I know which partition I want to mount (/dev/sda4). By default, Windows
partitions typically use the **New Technology File System (NTFS)**. If you want
to check the file system type, you can use the `lsblk` command.

```bash
$ lsblk -f /dev/sda4   # you need to enter your partition, to check the type
```

![file_type]({{site.baseurl}}/assets/images/mounting/file_type.png){:
.align-center}

---

## The next step is where I mount the partition

Usually, in Linux, there is a `/mnt` folder for mounting, so I use this. You can
also use another path if you want.

For a clean work environment, I create a directory in my 'mnt' folder. You can
choose any name you want for the directory:

```bash
$ sudo mkdir /mnt/windows_mount
```

---

## In last how i mount the partition

Now for this we have three command formats to finalize our work:

1. `mount -t ntfs /dev/sda4 /mnt/windows_mount`
   - In this command, we explicitly tell the system the file system type is
     NTFS.

2. `mount.ntfs /dev/sda4 /mnt/windows_mount`
   - With this command, we call the mount.ntfs binary, which also handles NTFS
     file systems.

3. `mount /dev/sda4 /mnt/windows_mount`
   - In this command, the system automatically analyzes the drive and file
     system type to perform the mount operation.

I am comfortable with `mount.ntfs` but you can use any other type if you prefer.

Now, our Windows partition is successfully mounted in our Linux partition, and
we can perform any operation (read, write, execute) that we want.

![mounted]({{site.baseurl}}/assets/images/mounting/mounted.png){: width="800"
height="200" .align-center}

---

## How to unmount the mounted device

After mounting and completing the work, you will want to unmount the partition.
To do this, simply use the `umount` command. This command will unmount the
Windows partition from your Linux partition.

![mounted]({{site.baseurl}}/assets/images/mounting/unmounted.png){: width="800"
.align-center}

See, our windows mounted partiton successfully unmounted.

---

## Best Practices

Here are the best safety precautions to follow:

1. Verify the correct partition or drive before mounting.
2. Use the appropriate mount options for the file system type.
3. Exercise caution when performing any write operations on the mounted
   partition.

---
