---
layout: ../../layout/Post.astro
title: 'How I maintain my Arch Linux installation'
date: 2026-05-14 16:06:25 -0300
author: 'Clue'
---
This is a simple guide I have made for when I need to do some maintenance on my Arch Linux system. I have collected these commands from various sources and recommendations from various posts about Arch Linux system maintenance.

These commands should help you keep your system up and running and also clean unused files and packages. Note that I use `opendoas` instead of `sudo`, so if you are using `sudo`, then replace `doas` with `sudo`. You will also need `pacman-contrib` for `paccache`

## Check

- Check for failed services
  - `systemctl --failed`
- Read the journal
  - `journalctl -b`

## Backup

- Backup configuration files
- Backup package list
  - `pacman -Qqe > pkglist.txt`
- Backup the Pacman database
  - `tar -cjf pacman_database.tar.bz2 /var/lib/pacman/local`
- Backup your user data

## Update

- Update your mirror lists
  - `reflector -n 20 --latest 50 --score 20 --sort rate --country 'United States,Brazil' | doas tee /etc/pacman.d/mirrorlist`
  - Obviously, if you prefer different mirrors, or live somewhere else, then change the arguments you give to reflector. These are just my preference.
- Upgrade your system
  - `doas pacman -Syu`
  - `paru`
- (optional) Deal with `pacnew` and `pacmerge` files
  - `pacdiff -s`
- Reboot

## Clean

- Check for old configuration files
  - Look in the following directories:
    - `~/.config/` – where applications stores their configuration
    - `~/.local/share/` – old files may be lying there
- Find broken symlinks
  - `find / -type d \( -path "/dev" -o -path "/proc" -o -path "/run" -o -path "/sys" \) -prune -o -xtype l -print`
- Check space used by journals
  - `journalctl --disk-usage`
- Check for large packages (warning: these commands may not work in the future)
  - Non-AUR: `pacman -Qei | awk '/^Name/{name=$3} /^Installed Size/{print $4$5, name}' | sort -h`
  - AUR: `pacman -Qim | awk '/^Name/{name=$3} /^Installed Size/{print $4$5, name}' | sort -h`
- Check and remove orphan packages
  - `doas pacman -Qdtq`
- Clear caches
  - Pacman cache: `paccache -r`
  - .cache: `rm -rf ~/.cache`

## Tips

- Subscribe to `arch-announce`, to get front-page news
  - [lists.archlinux.org](https://lists.archlinux.org/)
- Pay attention to Pacman output
- Respond to errors as soon as possible

## Sources

- [https://fernandocejas.com/blog/engineering/2022-03-30-arch-linux-system-maintance/](https://fernandocejas.com/blog/engineering/2022-03-30-arch-linux-system-maintance/)
- [https://www.reddit.com/r/archlinux/comments/w3z4wh/how_do_you_maintain_your_arch_linux_system/](https://www.reddit.com/r/archlinux/comments/w3z4wh/how_do_you_maintain_your_arch_linux_system/)
- [https://wiki.archlinux.org/title/System_maintenance](https://wiki.archlinux.org/title/System_maintenance)
- [https://news.ycombinator.com/item?id=40810406](https://news.ycombinator.com/item?id=40810406)
