# Self-Hosted Docker Services: Audiobookshelf & LAMP

Deployment recipes and container specifications for self-hosting media and web application stacks using Docker and Docker Compose with persistent host volumes.

---

## 1. Audiobookshelf Streaming Server

**Audiobookshelf** is an open-source, self-hosted media server specifically engineered for audiobooks and podcasts, featuring progressive web streaming, multiple user accounts, chapter navigation, and automatic OpenLibrary / Audible metadata scraping.

```mermaid
flowchart TD
    Client["Audiobookshelf Mobile / Web App"]
    ABS["Audiobookshelf Container (:13378)"]

    subgraph Volumes["Host Persistent Storage"]
        Config["/srv/audiobookshelf/config"]
        Metadata["/srv/audiobookshelf/metadata"]
        Audiobooks["/srv/audiobookshelf/audiobooks"]
        Podcasts["/srv/audiobookshelf/podcasts"]
    end

    Client - "Port 13378 (or Reverse Proxy)" --> ABS
    ABS <--> Config
    ABS <--> Metadata
    ABS <--> Audiobooks
    ABS <--> Podcasts
```

### Docker Compose Stack (`compose.yaml`):

```yaml
services:
  audiobookshelf:
    image: ghcr.io/advplyr/audiobookshelf:latest
    container_name: audiobookshelf
    restart: unless-stopped
    ports:
      - "13378:80"
    environment:
      - AUDIOBOOKSHELF_UID=1000
      - AUDIOBOOKSHELF_GID=1000
      - TZ=Asia/Karachi
    volumes:
      - /srv/audiobookshelf/audiobooks:/audiobooks
      - /srv/audiobookshelf/podcasts:/podcasts
      - /srv/audiobookshelf/config:/config
      - /srv/audiobookshelf/metadata:/metadata
```

### Initialization & Launch:
```bash
# Create directory structure with correct host ownership
sudo mkdir -p /srv/audiobookshelf/{audiobooks,podcasts,config,metadata}
sudo chown -R 1000:1000 /srv/audiobookshelf

# Launch container
docker compose up -d
```
Access the server at `http://<SERVER_IP>:13378`.

---

## 2. Dockerized WordPress LAMP Stack

A complete local development and staging environment running WordPress, MariaDB database, and phpMyAdmin over an isolated bridge network.

```yaml
services:
  database:
    image: mariadb:10.11
    container_name: wordpress-db
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wpuser
      MYSQL_PASSWORD: wppassword
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - lamp-net

  wordpress:
    image: wordpress:latest
    container_name: wordpress-app
    restart: unless-stopped
    depends_on:
      - database
    ports:
      - "8085:80"
    environment:
      WORDPRESS_DB_HOST: database:3306
      WORDPRESS_DB_USER: wpuser
      WORDPRESS_DB_PASSWORD: wppassword
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wp_data:/var/www/html
    networks:
      - lamp-net

  phpmyadmin:
    image: phpmyadmin/phpmyadmin:latest
    container_name: wordpress-pma
    restart: unless-stopped
    depends_on:
      - database
    ports:
      - "8086:80"
    environment:
      PMA_HOST: database
      MYSQL_ROOT_PASSWORD: rootpassword
    networks:
      - lamp-net

volumes:
  db_data:
  wp_data:

networks:
  lamp-net:
    driver: bridge
```

### Service Endpoints:
* **WordPress**: `http://localhost:8085`
* **phpMyAdmin**: `http://localhost:8086`
