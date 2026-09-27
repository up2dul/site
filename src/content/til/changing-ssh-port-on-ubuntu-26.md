---
title: Changing the SSH port on Ubuntu 26.04
createdAt: 2026-07-20
---

I recently got a VM from Tencent Cloud running Ubuntu 26.04. It was my first time setting up a VM on this Ubuntu release.

Whenever I set up a new VM, there are a few things I usually configure first. One of them is changing SSH from its default port, `22`, to a custom port.

At first, I did it the way I was already familiar with: changing the `Port` setting in `/etc/ssh/sshd_config`, then restarting the SSH service.

```bash
sudoedit /etc/ssh/sshd_config
```

Then I set or uncommented the port:

```text
Port 2234
```

And restarted SSH:

```bash
sudo systemctl restart ssh
```

But when I checked the listening ports, SSH was still using the old port.

```bash
sudo ss -tlnp | grep ssh
```

After digging into it, I found out that Ubuntu 26.04 uses systemd socket activation for OpenSSH, a behavior introduced in Ubuntu 22.10.

OpenSSH uses systemd socket activation, so the listening socket is managed by `ssh.socket`. Ubuntu also uses a systemd generator that reads the SSH configuration and generates the corresponding socket configuration.

So after changing the port, I needed to reload systemd and restart the SSH socket instead:

```bash
sudo sshd -t
sudo systemctl daemon-reload
sudo systemctl restart ssh.socket
```

`sshd -t` validates the SSH configuration before applying it, which is useful when configuring a remote server where a bad configuration could lock me out.

After restarting the socket, I could verify the new listening port again:

```bash
sudo ss -tlnp | grep ssh
```

The new port also needs to be allowed through both the VM's firewall and Tencent Cloud security group. In my case:

```bash
sudo ufw allow 2234/tcp
```

Finally, before closing the existing SSH session, I test a new connection first:

```bash
ssh -p 2234 user@server
```

That way, I can make sure the new port works before disconnecting from the session that still has access to the server.

This was a small reminder that even familiar server setup tasks can behave differently across newer Linux distributions.

See [Ubuntu's explanation of OpenSSH socket activation](https://discourse.ubuntu.com/t/sshd-now-uses-socket-based-activation-ubuntu-22-10-and-later/30189).
