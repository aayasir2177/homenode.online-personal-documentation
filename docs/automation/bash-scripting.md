# Production Bash Automation & Scripting

Foundational and advanced Linux shell scripting practices focusing on robust parameter parsing, error trapping, I/O stream redirection, automated backup synchronization, and defensive coding.

---

## Core Shell Scripting Principles

Production DevOps scripts differ from casual CLI commands. They must handle unexpected arguments, exit gracefully upon failure, record meaningful log streams, and validate file preconditions.

### Defensive Script Header:
```bash
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
```
* `-e`: Exit immediately if a command exits with a non-zero status.
* `-u`: Treat unset variables and parameters as an error.
* `-o pipefail`: Return the exit status of the last command in the pipe that failed.
* `IFS=$'\n\t'`: Split strings only on newlines and tabs, avoiding whitespace path corruption.

---

## Stream Redirection & File Descriptors

Linux provides three standard data streams for every running process:

| Stream | Descriptor | CLI Syntax | Usage |
| :--- | :--- | :--- | :--- |
| **Standard Input** | `0` (stdin) | `< file` | Pass file contents into process input |
| **Standard Output** | `1` (stdout) | `> file` or `>> file` | Overwrite or append normal output |
| **Standard Error** | `2` (stderr) | `2> file` or `2>> file` | Capture warnings and runtime errors |
| **Combined** | `1 & 2` | `&> file` or `>> file 2>&1` | Combine both output and error into single log |

### Practical Stream Redirection:
```bash
# Discard stderr, capture stdout
find / -name "*.conf" 2>/dev/null > found_configs.txt

# Append both stdout and stderr to a timestamped log
./backup.sh &>> "/var/log/backup_$(date +%F).log"
```

---

## File & Directory Test Operators

```bash
# Verify file exists and is a regular file
if [ -f "/etc/nginx/nginx.conf" ]; then
    echo "Nginx configuration found."
fi

# Verify directory exists
if [ -d "/mnt/backup" ]; then
    echo "Backup directory mounted."
else
    echo "ERROR: Target directory missing!" >&2
    exit 1
fi

# Check file readability and execution rights
[ -r "$config" ] && [ -x "$script" ]
```

---

## Robust Differential Backup Script

An argument-validated differential backup script using `rsync` with hardlinks and timestamped logging:

```bash
#!/bin/bash
set -euo pipefail

# 1. Enforce strict parameter counts
if [ $# -ne 2 ]; then
    echo "Usage: $0 <source_directory> <destination_directory>" >&2
    echo "Example: $0 /var/www /mnt/backup" >&2
    exit 1
fi

# 2. Extract and sanitize arguments
SOURCE_DIR="${1%/}"
DEST_DIR="${2%/}"
CURRENT_DATE=$(date +%Y-%m-%d_%H%M%S)

# 3. Validate existence of source
if [ ! -d "$SOURCE_DIR" ]; then
    echo "ERROR: Source directory '$SOURCE_DIR' does not exist." >&2
    exit 2
fi

# 4. Prepare directory layout
mkdir -p "$DEST_DIR/logs"
mkdir -p "$DEST_DIR/incremental_backups"
mkdir -p "$DEST_DIR/current"

# 5. Run incremental rsync
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting backup from $SOURCE_DIR to $DEST_DIR..."

rsync \
    --archive \
    --verbose \
    --human-readable \
    --delete \
    --backup \
    --backup-dir="$DEST_DIR/incremental_backups/$CURRENT_DATE" \
    "$SOURCE_DIR/" \
    "$DEST_DIR/current/" \
    &>> "$DEST_DIR/logs/$CURRENT_DATE.log"

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Backup completed successfully."
else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Backup failed with exit code $EXIT_CODE!" >&2
    exit $EXIT_CODE
fi
```

---

## Control Flow: Loops & Functions

### Parsing Files & Processing Line-by-Line:
```bash
process_hosts() {
    local host_file="$1"
    while IFS= read -r host || [ -n "$host" ]; do
        [[ "$host" =~ ^#.*$ ]] && continue   # Skip comments
        [[ -z "$host" ]] && continue          # Skip blank lines

        echo "Pinging target host: $host"
        if ping -c 1 -W 1 "$host" &> /dev/null; then
            echo "[OK] $host is reachable"
        else
            echo "[FAIL] $host is offline" >&2
        fi
    done < "$host_file"
}

process_hosts "inventory_ips.txt"
```
