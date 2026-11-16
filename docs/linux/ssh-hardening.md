# Linux SSH Hardening & Client Automation

Comprehensive configuration for modern, cryptographic SSH authentication using Ed25519 keys, client-side configuration aliasing, daemon hardening, and non-standard port protection across Fedora and cloud Linux servers.

---

## 🔑 Cryptographic Key Generation (Client)

Modern security standards favor **Ed25519** elliptic-curve cryptography over legacy RSA (which requires 4096-bit keylengths for equivalent security and suffers higher compute overhead).

```bash
# Generate high-security Ed25519 keypair
ssh-keygen -t ed25519 -C "yasir@homenode.online"

# Deploy public key to target server
ssh-copy-id -i ~/.ssh/id_ed25519.pub ubuntu@<REMOTE_SERVER_IP>
```

---

## ⚡ Client Automation (`~/.ssh/config`)

Instead of memorizing IP addresses, custom ports, and key paths, define structured connection aliases in `~/.ssh/config`:

```text
# AWS Cloud Production Instance
Host aws-ec2
    HostName 54.210.12.88
    Port 2222
    User ubuntu
    IdentityFile ~/.ssh/id_ed25519
    ServerAliveInterval 60
    ServerAliveCountMax 3

# Homelab Primary Node
Host homelab-primary
    HostName 192.168.122.84
    Port 22
    User yasir
    IdentityFile ~/.ssh/id_ed25519
```

With this configuration, connecting securely requires just:
```bash
ssh aws-ec2
```

---

## 🛡️ Server Daemon Hardening (`sshd_config`)

Apply defense-in-depth hardening to `/etc/ssh/sshd_config` on the target server:

```bash
# Backup original configuration
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak

# Edit sshd_config
sudo vim /etc/ssh/sshd_config
```

### Essential Hardening Directives:

```ini
# Move off standard port 22 to mitigate automated bot scans
Port 2222

# Disable root login over SSH
PermitRootLogin no

# Disable all password-based authentication (Keys only)
PasswordAuthentication no
ChallengeResponseAuthentication no
KbdInteractiveAuthentication no

# Restrict allowed cryptographic ciphers and key exchanges
PubkeyAuthentication yes
MaxAuthTries 3
LoginGraceTime 30
ClientAliveInterval 300
ClientAliveCountMax 2
```

### Apply and Validate:
```bash
# Test sshd syntax before restarting to prevent accidental lockouts
sudo sshd -t

# Update firewall rules if port was modified
sudo firewall-cmd --permanent --add-port=2222/tcp && sudo firewall-cmd --reload
# or on UFW:
# sudo ufw allow 2222/tcp

# Restart SSH daemon
sudo systemctl restart sshd
```

> [!CAUTION]
> Always keep your existing active terminal session open while testing a new connection in a separate window to confirm SSH daemon connectivity before closing the root session!
