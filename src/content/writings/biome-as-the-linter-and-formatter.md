---
title: Trying Biome as the next code linter and formatter
subtitle: An alternative for ESLint and Prettier
createdAt: 2024-03-28
tags:
  - tutorial
---

# Intro

As a software developer, our primary task is to write code, and it is not just about writing it so that the program runs well. We also need to ensure that the code we write is clean, which means we must pay attention to things such as giving variable names, removing unused code, and maintaining consistency. While a developer can manually keep the code clean, it can be difficult when there is a lot of code to write, and when we working with a team.

![](https://miro.medium.com/v2/resize:fit:800/0*jnjuUq6sSpXElmRp.jpeg)

> Note: the topic we will talk about in here is not really cover/represent about "clean code", there are a lot another things about clean code outside.

This is where tools like code linters and formatters come in handy. As developers who use JavaScript especially, we must already know about ESLint and Prettier. Both of these are popular tools that useful in keeping our codebase clean and consistent. With **ESLint** we can trace syntax errors, logic errors, get code suggestions, etc, based on the ESLint rules that we already config. While **Prettier** is used for formatting our code which includes the semicolon usable, tab indentation, quotes usable, trailing comma, etc, it is based on our Prettier configuration as well. In the project, we can use one of them or even combine both of them.

# About Biome

In August 2023, there was another code linter/formatter tool released, it's named Biome, so it's what we will talk about.

![Biome home page](https://cdn.hashnode.com/res/hashnode/image/upload/v1711563997935/1d8ffb10-b389-4770-ab7e-cfd4bf3c61a6.png)

> Fun fact: the first logo of Biome was looks like same with [Remix](https://remix.run) logo XD.

## What is this?

> **Biome is a**[**fast formatter**for _JavaScript_](https://github.com/biomejs/biome/tree/main/benchmark#formatting), _TypeScript_, _JSX_, and _JSON_ that scores [**97% compatibility with _Prettier_**](https://console.algora.io/challenges/prettier), [**saving CI and developer time**.](https://console.algora.io/challenges/prettier)
>
> **Biome is a**[**performant linter**](https://github.com/biomejs/biome/tree/main/benchmark#linting) for _JavaScript_, _TypeScript_, and _JSX_ that features [**more than 200 rules**](https://biomejs.dev/linter/rules/) from ESLint, typescript-eslint, and [other sources](https://github.com/biomejs/biome/discussions/3).

That's two main points that I quote from the [official site](https://biomejs.dev). So basically Biome is a JavaScript/TypeScript linter and formatter same as ESLint and Prettier, yeah so Biome alone does a thing that ESLint and Prettier do, and it is built on **Rust**.

## Reasons to use it

Before trying to use it, let's get to know why we should try it, and maybe make it an ESLint and Prettier alternative for our development.

### Better performance

Biome has a better performance on linting and formatting code, yup, as I mentioned below, Biome is built on 🦀 Rust. And then.., I don't know how to describe this anymore tbh.

### Some pre-configured rules

If you have used ESLint and Prettier before, you know there are a lot of plugins to do simple things such as TypeScript, React plugins, or import sorter from Trivago. So Biome came in already with some useful top-level config options such as some I mentioned before, which are TypeScript, React, and import sorter.

### IDE/Text editor integrations

![Biome extension on Visual Studio Code](https://cdn.hashnode.com/res/hashnode/image/upload/v1711565398087/3a4c5c15-e039-4142-bbc2-faac6bc36beb.png)

Biome already has an official integration/plugin with Visual Studio Code and IntelliJ IDEA, and a plugin that is maintained by communities for some other editors such as Neovim, Emacs, Helix, and Sublime Text. Get to know more about this [here](https://biomejs.dev/guides/integrate-in-editor/).

# Getting started

"Talk is cheap, show me the <s>code</s> demo", let's try to use it.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1711587816655/0054df29-22a5-41e2-a10b-f33ad6d7a223.png)

Here I will use the basic React Vite app for the implementation.

## Install Biome

So, first of all, install the Biome itself as the development dependencies, here I will use [PNPM](https://pnpm.io) as the package manager.

```bash
pnpm add --save-dev --save-exact @biomejs/biome

# if using NPM
npm i --save-dev --save-exact @biomejs/biome
# if using Yarn
yarn add --dev --exact @biomejs/biome
```

> `--exact` will resolve the version of the package and add it to your `package.json` with an exact version number instead of a version range.

## Init configuration file

Now create a Biome configuration file by running the init command.

```bash
pnpm biome init

# if using NPM
npx @biomejs/biome init
# if using Yarn
yarn biome init
```

After running that command, now we will have `biome.json` a file in our root project directory. The file will contain this code:

```bash
{
	"$schema": "https://biomejs.dev/schemas/1.6.3/schema.json",
	"organizeImports": {
		"enabled": true
	},
	"linter": {
		"enabled": true,
		"rules": {
			"recommended": true
		}
	}
}
```

## Usage

After initiating the configuration file, now we can use it. There are three main commands.

1. Format files.

```bash
pnpm biome format <files> --write

# if using NPM
npx @biomejs/biome format <files> --write
# if using Yarn
yarn biome format <files> --write
```

2. Lint files.

```bash
pnpm biome lint <files>

# if using NPM
npx @biomejs/biome lint <files>
# if using Yarn
yarn biome lint <files>
```

3. Run both format and lint.

```bash
pnpm biome check --apply <files>

# if using NPM
npx @biomejs/biome check --apply <files>
# if using Yarn
yarn biome check --apply <files>
```

To make it easier, let's just add those commands into `"scripts"` in the `package.json`. So the `package.json` file would look like this:

```json
{
  // ...
  "scripts": {
    // ...
    "format": "biome format --write ./src",
    "lint": "biome lint ./src",
    "check": "biome check --apply ./src"
  }
  // ...
}
```

So now we just run these commands easily. Go [here](https://biomejs.dev/reference/configuration/) for the advanced configurations.

# Development status

The latest minor release of Biome came on 8 March 2024, which is version [1.6.0](https://github.com/biomejs/biome/releases/tag/cli%2Fv1.6.0). It has some changes, such as "Partial support for Astro, Svelte, and Vue files" and some new rules. So it's good news for developers who casually use Astro, Svelte, and Vue.

# Conclusion

Now should we use Biome and fully replace ESLint and Prettier?

1. It depends, currently, I use it for my project only, if you are going to use it on your work project, maybe you can discuss it with your team.
2. If there is an ESLint or Prettier plugin rule that always you use and is not available yet on Biome, then you can just use ESLint with Prettier.

And maybe there are other reasons to think about it.

So that's it, thank you ✨.

# References

- [https://biomejs.dev](https://biomejs.dev/)
- [https://youtu.be/KI7mbm-BxqA?si=h16A0ZJYntzfGzZJ](https://youtu.be/KI7mbm-BxqA?si=h16A0ZJYntzfGzZJ)
