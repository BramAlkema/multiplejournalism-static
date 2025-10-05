# Multiple Journalism

A catalog of experiments in journalism, featuring 25 case studies on innovative storytelling approaches.

## About

Multiple Journalism documents groundbreaking projects that pushed the boundaries of journalism through technology, interactivity, and new forms of storytelling. The collection spans eight categories:

- **Networks** - Collaborative journalism platforms
- **Crowds** - Citizen journalism and crowdsourcing
- **Data** - Data-driven investigative reporting
- **Visual** - Interactive and immersive visualization
- **Point of View** - First-person and experiential journalism
- **Immersion** - Virtual reality and participatory experiences
- **Publishing** - Alternative distribution models
- **Robots** - Automated journalism and AI-assisted reporting

## Features

- 25 in-depth case studies with rich media content
- Video and audio embeds from original sources
- Responsive design optimized for all devices
- Category-based filtering and navigation
- Related case recommendations

## Technology

Built with [Eleventy](https://www.11ty.dev/) (v3.1.2), a modern static site generator that transforms Markdown content into fast, accessible HTML.

### Local Development

```bash
# Install dependencies
npm install

# Start development server with live reload
npm start

# Build for production
npm run build
```

The site will be available at `http://localhost:8080/multiplejournalism-static/`

### Deployment

Automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

Live site: https://bramalkema.github.io/multiplejournalism-static/

## Project Structure

```
content/cases/          # Markdown source files for case studies
_includes/              # Nunjucks templates
93d0270/               # CSS and JavaScript assets
uploads/               # Images and media files
.github/workflows/     # GitHub Actions deployment config
_site/                 # Generated HTML (git-ignored)
```

## Contributing

To add or update a case study, edit the Markdown files in `content/cases/`. Each case study includes:

- Frontmatter metadata (title, year, location, category, etc.)
- Markdown content with custom container syntax for media embeds
- Related case recommendations

See existing case files for formatting examples.

## License

Content and case studies remain the property of their original creators and publications.

## Launch Date

October 5, 2025
