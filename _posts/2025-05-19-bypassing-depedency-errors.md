---
title: "Bypassing Dependency Errors with Dummy Packages"
excerpt: "Bypassing Dependency Errors for .deb Packages on Kali Linux with Dummy Packages"
ribbon: red
categories: ["deb","minecraft","debian", "linux"]
header:
    teaser: '/assets/images/teasers/minecraft.png'
lib-gdk:
- url: /assets/images/deb/lib-gdk.png
  image_path: /assets/images/deb/lib-gdk.png
  title: "Play with Dummpy packages"

already:
- url: /assets/images/deb/i-have.png
  image_path: /assets/images/deb/i-have.png
  title: "Play with Dummpy packages"

fake:
- url: /assets/images/deb/fake-pkg.png
  image_path: /assets/images/deb/fake-pkg.png
  title: "Play with Dummpy packages"
---

# Fixing Missing or Renamed Dependencies When Installing .deb Packages on Kali Linux


While installing minecraft `.deb` packages on Kali Linux (or other Debian-based distros), i encounter this dependency errors like:

```bash
Unsatisfied dependencies:
 minecraft-launcher : Depends: libgdk-pixbuf2.0-0 (>= 2.22.0) but it is not installable
Error: Unable to correct problems, you have held broken packages.
Error: The following information from --solver 3.0 may provide additional context:
   Unable to satisfy dependencies. Reached two conflicting decisions:
   1. minecraft-launcher:amd64=2.1.3 is selected for install
   2. minecraft-launcher:amd64 Depends libgdk-pixbuf2.0-0 (>= 2.22.0)
      but none of the choices are installable:
      [no choices]
```

This usually happens because:

- The `.deb` was built for an older Debian-based distro version.
- Some library package names have changed or been replaced in newer Kali/Debian releases.
- System actually *has* the library, but under a different package name. For example installer needs the version `libgdk-pixbuf2.0-0` but your system have `libgdk-pixbuf-2.0-0`

## Why Does This Happen?

Package maintainers sometimes rename libraries as they evolve. For example:

- The package `libgdk-pixbuf2.0-0` might have been renamed to `libgdk-pixbuf-2.0-0` in newer distros.
- The `.deb` file (minecraft) still demands the old package name, so `apt` refuses to install.


{% include gallery id="lib-gdk" caption="apt refuses to install" %}{: .align-center}

But the package is already installed in my machine with different name:


{% include gallery id="already" caption="already installed" %}{: .align-center}

## Sometimes `apt install ./package.deb` Fails, But `dpkg -i ./package.deb` Works

- `apt` performs strict dependency checks and will refuse to install the package if dependencies can't be met.
- `dpkg` just installs the package without resolving dependencies, so it succeeds but leaves broken dependencies.
- You can then run `sudo apt --fix-broken install` to fix what’s missing — but if the exact package name doesn’t exist, this often fails or removes the package.


## The Clean Workaround: Using a Dummy Package with `equivs`

You can create a dummy package to **fake** the missing dependency, telling `apt` it’s installed — while your system already has the real functionality under a differently named package.

### Step-by-step:

1. Install `equivs`:

```bash
sudo apt install equivs
```

2. Create a working directory and control file:

```bash
mkdir ~/dummy-pkg && cd  ~/dummpy-pkg
equivs-control missing-lib-name
```

3. Edit `missing-lib-name` with your favorite editor (e.g. `vim`), replacing the contect with:

```bash
Section: misc
Priority: optional
Standards-Version: 3.9.2

Package: missing-lib-name
Version: 1.0 // insert the version No. that is missing
Provides: missing-lib-name
Description: Dummy package to satisfy missing dependency
  This is a dummy package. The actual functionality is provided by a different package.
```


{% include gallery id="fake" caption="fake package" %}{: .align-center}

4. Build and install the dummy package:

```bash
equivs-build missing-lib-name
sudo apt install ./missing-lib-name_1.0_all.deb
```

#### Why this works: A simple Analogy

Imagine Minecraft is a guest who insists they won’t come to the party unless "DJ Mike" is there. But you already have "DJ Michael" playing — they’re the same person, just a different name.

So you throw a cardboard cutout labeled “DJ Mike” in the corner.

Now Minecraft walks in and says:
"Oh cool, DJ Mike's here. Let’s party."


#### Wrapping Up

This tricks lets you bypass pacakge naming mismatches and get legacy or third-party `.deb` files working on Debian based linux distros.

**NOTE: Only use dummpy package when you are confident the real func exists on your system under another package.**
