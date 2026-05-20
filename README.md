# aegis-heal-test 🔥

This repo is **intentionally maximally broken** for testing AEGIS autonomous healing.

## 41 Bugs Across 3 Workflow Files

### `ci.yml` — 24 bugs
| # | Bug | Job |
|---|-----|-----|
| 1 | Node version `18.99.99` doesn't exist | setup |
| 2 | `cache-dependency-path: yarn.lock` — no yarn.lock in project | setup |
| 3 | `--frozen-lockfile` — no package-lock.json committed | setup |
| 4 | Circular dependency: lint needs test, test needs lint | lint↔test |
| 5 | `--config .eslintrc.json` — file doesn't exist | lint |
| 6 | No npm install before eslint | lint |
| 7 | test needs lint which needs test → circular | test |
| 8 | Node 16 in matrix — EOL, unsupported | test |
| 9 | `npm ci` without package-lock.json | test |
| 10 | `working-directory: ./test` — folder is `tests/` | test |
| 11 | `secrets.UNDEFINED_TEST_ENV` — not defined | test |
| 12 | `npm ci` without lockfile again | coverage |
| 13 | `npx nyc` — nyc not in package.json | coverage |
| 14 | Uploads `coverage/lcov.info` which won't exist | coverage |
| 15 | `secrets.CODECOV_TOKEN` — not defined | coverage |
| 16 | `windows-latest` runner for Linux shell script | build |
| 17 | `mkdir -p` and `cp` fail on Windows cmd | build |
| 18 | `dist/` won't exist because build failed | build |
| 19 | `DOCKER_USERNAME` / `DOCKER_PASSWORD` — not defined | docker |
| 20 | `./docker/Dockerfile` — no Dockerfile in repo | docker |
| 21 | `myapp:latest@@invalid` — invalid Docker tag | docker |
| 22 | deploy depends on docker which fails | deploy |
| 23 | `PROD_HOST`, `PROD_USER`, `PROD_SSH_KEY` — not defined | deploy |
| 24 | `appleboy/ssh-action@v2.99.99` — version doesn't exist | deploy |

### `security.yml` — 7 bugs
| # | Bug |
|---|-----|
| 25 | `npm ci` without lockfile |
| 26 | `npm audit --audit-level=low` fails on any vuln |
| 27 | `./reports/` directory doesn't exist |
| 28 | `snyk/actions/node@v99.99.99` — version doesn't exist |
| 29 | `SNYK_TOKEN` — not defined |
| 30 | `gitleaks/gitleaks-action@v99` — doesn't exist |
| 31 | `GITLEAKS_LICENSE` — not needed/not defined |

### `deploy.yml` — 10 bugs
| # | Bug |
|---|-----|
| 32 | `python-version: 3.12` — should be string `"3.12"` |
| 33 | `--break-system-packges` — typo in pip flag |
| 34 | `scripts/pre_deploy_check.py` — file doesn't exist |
| 35 | `npm ci` without lockfile |
| 36 | `secrets.STAGING_API_URL` — not defined |
| 37 | `npm run build:staging` — script doesn't exist |
| 38 | `scp` without SSH key setup |
| 39 | `curl https://staging.example.com/health` — fake URL |
| 40 | `slackapi/slack-github-action@v1.99.99` — doesn't exist |
| 41 | `SLACK_WEBHOOK` — not defined |

## How to Use With AEGIS

1. Push this repo to GitHub (push as-is — all bugs included)
2. GitHub Actions will immediately start failing
3. Open AEGIS → add this repo → click **HEAL**
4. AEGIS will:
   - Detect the latest failed run
   - Read all 3 workflow files
   - Send to AI for analysis
   - Create branch `aegis/fix-<timestamp>`
   - Commit fixes
   - Open a Pull Request with all changes
5. Review the PR on GitHub — merge it to apply fixes

## What Good Fixes Look Like
AEGIS should fix things like:
- `node-version: 18.99.99` → `node-version: "20"`
- `needs: [test]` on lint (circular) → remove the circular needs
- `working-directory: ./test` → `working-directory: ./tests`
- `npm ci` → `npm install` (no lockfile)
- `python-version: 3.12` → `python-version: "3.12"`
- `--break-system-packges` → `--break-system-packages`
- Remove/fix non-existent action versions
