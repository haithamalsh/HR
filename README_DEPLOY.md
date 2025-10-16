Deployment instructions

Two ways to deploy the project to a remote Linux server that has Docker & Docker Compose installed:

1) Manual using the provided script

Prereqs on server:
- Docker and Docker Compose installed
- SSH access from your workstation

From your workstation (Windows cmd / PowerShell):

# Using an SSH key file
bash deploy/deploy.sh user@your-server.com /home/user/imap-app ~/.ssh/id_rsa

# Without explicit key (agent or default key)
bash deploy/deploy.sh user@your-server.com /home/user/imap-app

What the script does:
- rsyncs the repo to the remote path (excludes node_modules, .git, .env)
- runs `docker compose up -d --build` on the remote host

2) Automated via GitHub Actions

Set these repository secrets in GitHub:
- DEPLOY_SSH_KEY: your private SSH key used to access the server
- DEPLOY_TARGET: user@your-server.com
- DEPLOY_PATH: /home/user/imap-app

On push to `main`, the workflow `.github/workflows/deploy.yml` will run and rsync the repository then run docker compose on the remote host.

Notes & troubleshooting
- Ensure the user has permission to run docker commands on the server (add to `docker` group or use sudo in the workflow/script).
- If Docker Compose v2 is available as `docker compose`, the workflow command uses `docker compose`. If your server only has `docker-compose`, edit `docker compose` -> `docker-compose` in `deploy/deploy.sh` and `.github/workflows/deploy.yml`.
- If you prefer to keep persistent volumes on the host under `C:\Users\Elite\.docker`, modify `docker-compose.yml` to bind the volumes to that path before deploying.
