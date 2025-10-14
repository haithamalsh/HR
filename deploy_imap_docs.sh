#!/usr/bin/env bash
set -euo pipefail

# تعديل: ضَع رابط المستودع المحلي أو اتركه للاستنساخ
REPO_SSH="git@github.com:haithamalsh/HR.git"
BRANCH="imap-docs"
TMPDIR="$(mktemp -d)"
echo "Working in $TMPDIR"
cd "$TMPDIR"

# Clone repo (shallow)
git clone "$REPO_SSH" repo && cd repo

# Create branch
git checkout -b "$BRANCH"

# Ensure docs dir
mkdir -p docs

# Create docs files (use the content you approved — minimal placeholders shown; replace with full content if desired)
cat > docs/project-plan.md <<'EOF'
# خطة المشروع — منصة الأعمال والأتمتة الميكاترونية المتكاملة (IMAP)

الإصدار: 1.0
التاريخ: 2025-10-14
الكاتب: AI Expert System

(المحتوى الكامل لملف خطة المشروع — انسخ/الصق المحتوى الذي أرسلته مسبقاً هنا)
EOF

cat > docs/system-analysis-requirements.md <<'EOF'
# وثيقة تحليل النظام والمتطلبات — IMAP

الإصدار: 1.0
التاريخ: 2025-10-14

(المحتوى الكامل لملف تحليل النظام والمتطلبات — انسخ/الصق المحتوى الذي أرسلته مسبقاً هنا)
EOF

cat > docs/system-specification.md <<'EOF'
# وثيقة مواصفات النظام — IMAP

الإصدار: 1.0
التاريخ: 2025-10-14

(المحتوى الكامل لملف مواصفات النظام — انسخ/الصق المحتوى الذي أرسلته مسبقاً هنا)
EOF

cat > docs/architecture-diagrams.md <<'EOF'
# مخططات معمارية — توصيف جاهز للرسم (IMAP)

الإصدار: 1.0
التاريخ: 2025-10-14

(المحتوى الكامل لملف المخططات — انسخ/الصق المحتوى الذي أرسلته مسبقاً هنا)
EOF

# Devcontainer skeleton
mkdir -p .devcontainer
cat > .devcontainer/devcontainer.json <<'EOF'
{
  "name": "IMAP Dev Container",
  "build": { "dockerfile": "Dockerfile" },
  "customizations": {
    "vscode": {
      "extensions": [
        "esbenp.prettier-vscode",
        "dbaeumer.vscode-eslint",
        "ms-azuretools.vscode-docker",
        "mhutchie.git-graph",
        "ms-vsliveshare.vsliveshare"
      ]
    }
  },
  "forwardPorts": [3000,4000,8080,9000],
  "postCreateCommand": "echo 'Run ./scripts/bootstrap-dev.sh to bootstrap dev environment'"
}
EOF

cat > .devcontainer/Dockerfile <<'EOF'
ARG VARIANT=18-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}
RUN apt-get update && apt-get install -y jq curl git build-essential && rm -rf /var/lib/apt/lists/*
WORKDIR /workspaces/imap
EOF

# docker-compose skeleton for local dev
cat > docker-compose.yml <<'EOF'
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: imap
      POSTGRES_PASSWORD: imap
      POSTGRES_DB: imapdb
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
EOF

# Basic CI workflow skeleton (pull-request checks)
mkdir -p .github/workflows
cat > .github/workflows/ci.yml <<'EOF'
name: CI
on:
  pull_request:
    types: [opened, synchronize, reopened]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install deps
        run: npm ci || true
      - name: Lint
        run: echo "Add lint script per service"
      - name: Run tests
        run: echo "Add test commands"
EOF

# Optional: scripts dir
mkdir -p scripts
cat > scripts/bootstrap-dev.sh <<'EOF'
#!/usr/bin/env bash
set -e
echo "Bootstrap dev environment (install workspace deps etc.)"
# Add project-specific bootstrap commands here
EOF
chmod +x scripts/bootstrap-dev.sh

# Add files, commit, push
git add docs .devcontainer docker-compose.yml .github scripts || true
git commit -m "chore(docs+dev): add IMAP docs, devcontainer, docker-compose, CI skeleton" || true

# Push branch
git push -u origin "$BRANCH"

echo "DONE: branch '$BRANCH' pushed. Open a Pull Request from '$BRANCH' into 'main' on GitHub."
echo "If you want, open the repo in VS Code now and create the PR via the Git UI, or use the GitHub web UI to create the PR."
