# ADR: Deployment Architecture for Multiple Journalism Static Site

## Status
Accepted

## Context
The Multiple Journalism website has been migrated from PHP/Garp CMS to a static site using Eleventy (11ty). The site needs to be deployed automatically when changes are pushed to the repository.

## Decision

### Deployment Platform: GitHub Pages

The site is deployed using **GitHub Pages** with an automated CI/CD pipeline via **GitHub Actions**.

### Build Process

#### Local Development
- **Command**: `npm start` or `npx @11ty/eleventy --serve`
- **Purpose**: Run local development server with live reload
- **Output**: Serves site at `http://localhost:8080`
- **Build dir**: `_site/` (generated from `content/` directory)

#### Production Build
- **Command**: `npm run build` or `npx @11ty/eleventy`
- **Purpose**: Generate static HTML files for production
- **Output**: `_site/` directory with all static assets
- **Path Prefix**: `/multiplejournalism-static/` (configured in `.eleventy.js`)

### GitHub Actions Workflow

**File**: `.github/workflows/build-and-deploy.yml`

**Triggers**:
- Push to `main` branch (automatic deployment)
- Manual trigger via `workflow_dispatch`

**Steps**:
1. **Checkout**: Clone repository
2. **Setup**: Install Node.js 20 with npm cache
3. **Install**: Run `npm ci` to install dependencies
4. **Build**: Run `npm run build` to generate `_site/`
5. **Deploy**: Use `peaceiris/actions-gh-pages@v3` to push `_site/` to `gh-pages` branch

**Deployment Details**:
- **Source Branch**: `main`
- **Deploy Branch**: `gh-pages`
- **Publish Directory**: `_site/`
- **Bot User**: `github-actions[bot]`

### Static Site Generator: Eleventy (11ty)

**Version**: 3.1.2

**Configuration** (`.eleventy.js`):
- **Input Directory**: `content/`
- **Output Directory**: `_site/`
- **Includes**: `_includes/`
- **Data**: `_data/`
- **Template Engines**: Nunjucks for HTML and Markdown templates
- **Path Prefix**: `/multiplejournalism-static/`

**Static Assets** (passthrough):
- `93d0270/` (CSS, JS assets)
- `uploads/` (images, media)
- `favicon.ico`
- `*.css`, `*.html`

**Markdown Features**:
- Custom containers for video embeds (`:::video`)
- Custom containers for Soundcloud embeds (`:::soundcloud`)
- Attribute support via `markdown-it-attrs`
- HTML in markdown enabled

### Content Structure

**Case Studies**: `content/cases/*.md`
- 25 markdown files with frontmatter
- Video/audio embed data in frontmatter
- Processed by Eleventy into HTML pages

## Consequences

### Positive
1. **Zero hosting cost** - GitHub Pages is free for public repos
2. **Automatic deployment** - Push to main = instant deploy
3. **Version control** - All deployments tracked in git
4. **Fast builds** - Static site generation is quick (~seconds)
5. **CDN delivery** - GitHub Pages serves via CDN
6. **Local testing** - Easy to test locally before pushing

### Negative
1. **GitHub dependency** - Tied to GitHub ecosystem
2. **Static only** - No server-side processing
3. **Path prefix required** - URLs include `/multiplejournalism-static/`
4. **Build on push** - Every push to main triggers deployment

### Testing Strategy

**Before pushing changes**:
```bash
# Test local build
npx @11ty/eleventy

# Test local server
npx @11ty/eleventy --serve
# Visit http://localhost:8080/multiplejournalism-static/
```

**After pushing to main**:
1. GitHub Actions automatically builds
2. If build succeeds, deploys to `gh-pages` branch
3. Site updates at `https://bramalke.github.io/multiplejournalism-static/`
4. Check GitHub Actions tab for build status

### Video/Audio Update Workflow

When updating video/audio embeds:
1. ✅ Extract data from WBM HTML archives
2. ✅ Update markdown files in `content/cases/*.md`
3. ⚠️ **MUST test locally**: `npx @11ty/eleventy`
4. ⚠️ **Check for errors** in build output
5. ✅ Commit and push to `main`
6. ✅ GitHub Actions builds and deploys automatically
7. ✅ Verify live site after deployment

## Notes

- Repository: `https://github.com/BramAlkema/multiplejournalism-static`
- Live Site: `https://bramalkema.github.io/multiplejournalism-static/`
- No manual deployment needed - fully automated
- Build failures prevent deployment (GitHub Actions will fail)
- **Critical**: Always test locally before pushing to avoid broken deployments
