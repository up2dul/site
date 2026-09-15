---
title: Profanity Kit
images:
  - profanity-kit-1.webp
  - profanity-kit-2.webp
  - profanity-kit-3.webp
technologies:
  - Monorepo
  - TypeScript
  - Node.js
  - Vitest
  - tsdown
accomplishedAt: 2026-09-01
appLink: https://profanity-kit.up2dul.dev
repoLink: https://github.com/up2dul/profanity-kit
---

## Overview

A lightweight, zero-dependency profanity filtering library for JavaScript and TypeScript. It provides a simple API for detecting, filtering, and validating profane words, with multilingual support and compatibility across Node.js and browser environments.

## Purpose

I had implemented profanity filtering several times across different projects, including Qalbwise. Each time, I ended up solving a similar problem again, so I decided to turn the solution into a reusable open-source package instead.

I built profanity-kit to make profanity filtering straightforward to add to any JavaScript or TypeScript project, with a simple API, sensible defaults, multilingual support, and room for customization when needed.

## What I Did

I designed and built the library from the ground up, including its public API, filtering engine, multilingual dictionary system, and TypeScript types. I made several architectural decisions around word matching, package structure, runtime compatibility, and extensibility while keeping the core package zero-dependency and tree-shakeable.

I set up the development workflow with a monorepo architecture, automated testing, linting, Git hooks, versioning, and a release pipeline for publishing the package to npm.

Beyond the library itself, I built and deployed its documentation website with API references, usage guides, examples, and an interactive playground so developers can explore the library before integrating it into their projects.
