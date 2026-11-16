# Enterprise NFS Server & Client Setup

A Linux storage laboratory detailing the installation, export configuration, firewall policy management, and persistent `/etc/fstab` client auto-mounting for a distributed **Network File System (NFS)** between Fedora Server and Ubuntu.

---

## Lab Architecture

```mermaid
flowchart LR
    Server["NFS Server (Fedora)<br/>IP: 192.168.122.68<br/>Export: /nfs/share"]
    Client["NFS Client (Ubuntu)<br/>IP: 192.168.122.70<br/>Mount: /nfs/mnt"]

    Client - "NFSv4 RPC / TCP Port 2049" --> Server
    Server <--> Disk["Physical Storage (/nfs/share)"]
```

---

## Server Configuration (Fedora)

### 1. Install Utilities & Enable Service
```bash
sudo dnf install -y nfs-utils
sudo systemctl enable --now nfs-server.service
```

### 2. Configure Firewalld Rules
Permit NFS network services through the host firewall:
```bash
sudo firewall-cmd --permanent --add-service=nfs
sudo firewall-cmd --permanent --add-service=mountd
sudo firewall-cmd --permanent --add-service=rpc-bind
sudo firewall-cmd --reload
```

### 3. Initialize Shared Directory & Permissions
```bash
sudo mkdir -p /nfs/share
sudo chown nobody:nobody /nfs/share
sudo chmod 775 /nfs/share
```

### 4. Configure NFS Exports (`/etc/exports`)
```text
/nfs/share 192.168.122.0/24(rw,sync,no_subtree_check,no_root_squash)
```

> [!TIP]
> **Vim Sudo Save Trick**: If you open a root-owned file in Vim without `sudo`, you can save it without discarding edits:
> ```vim
> :w !sudo tee %
> :q!
> ```

### 5. Apply and Export Shares
```bash
sudo exportfs -rav
sudo exportfs -v
```

---

## Client Configuration (Ubuntu)

### 1. Install NFS Client Libraries
```bash
sudo apt update
sudo apt install -y nfs-common
```

### 2. Create Mount Target
```bash
sudo mkdir -p /nfs/mnt
```

### 3. Persistent Auto-Mount via `/etc/fstab`
Add the server export to `/etc/fstab` to ensure availability across system reboots:

```text
192.168.122.68:/nfs/share /nfs/mnt nfs defaults,_netdev,auto 0 0
```

> [!NOTE]
> The `_netdev` mount option tells systemd to delay mounting this filesystem until network interfaces and DNS routing are fully online.

### 4. Mount & Verify
```bash
sudo mount -a
df -hT /nfs/mnt
```

Test read/write consistency:
```bash
touch /nfs/mnt/cluster_storage_test
ls -lh /nfs/mnt/
```
The file will immediately appear in `/nfs/share` on the Fedora server.
