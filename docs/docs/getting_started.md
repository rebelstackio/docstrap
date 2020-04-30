---
layout: docs
title: Getting Started
permalink: /docs/getting-started/
tabindex: 1
---

## Instalation
```bash
npm i @rebelstack-io/docstrap -g
```

## Usage
- Generate your template
```bash
docstrap [-d --dir]
```
if no dir provided will generate documentation webview in docs folder

- Build your template
```bash
bundle exec jekyll build
```
this will generate ```_site/``` folder with the plain hmtl project.

- Test it locally
```bash
bundle exec jekyll serve
```
this will create a web-server in your local port 4000.

### Configuration file
Don't forget to check the _config.yml in the geneted template.

## Documentation structure
```
.
├── 404.html
├── assets
│   ├── img
│   │   ├── default-logo.svg
│   │   ├── default-logo-white.svg
│   │   ├── expressif-boxmodel.jpeg
│   │   └── metaflux-logo-black.svg
│   ├── js
│   │   ├── index.js
│   │   └── store.js
│   └── main.scss
├── blog.md
├── community.md
├── _config.yml
├── docs
│   ├── api.md
│   ├── examples.md
│   ├── faq.md
│   ├── getting_started.md
│   └── overview.md
├── Gemfile
├── Gemfile.lock
├── _includes
│   ├── blog_menu.html
│   ├── footer.html
│   ├── header.html
│   └── sidebar.html
├── index.md
├── _layouts
│   ├── blog.html
│   ├── community.html
│   ├── default.html
│   ├── docs.html
│   └── home.html
├── LICENSE
├── _posts
│   └── 2020-04-21-welcome-to-docstrap.markdown
└── _sass
    ├── docstrap
    │   └── base.scss
    └── docstrap.scss
```

## Notes
Notice that every view is represented by a markdown file, the convection is ```<name_view>.md``` inside you can update the content and jekyll will build that into you html view
