---
title: A Guide to Contributing to an Open Source Projects
subtitle: Start contributing something to an Open Source Project/Software that you found
createdAt: 2023-07-23
tags:
  - tutorial
---

## What is Open Source?

From Wikipedia, this is what we get about Open Source:

> **Open-source software** (**OSS**) is [computer software](https://en.wikipedia.org/wiki/Software) that is released under a [license](https://en.wikipedia.org/wiki/Open-source_license) in which the [copyright](https://en.wikipedia.org/wiki/Copyright) holder grants users the rights to use, study, change, and [distribute the software](https://en.wikipedia.org/wiki/Software_distribution) and its [source code](https://en.wikipedia.org/wiki/Source_code) to anyone and for any purpose.

In simpler terms, it means that the software's underlying code is made accessible to the public, and anyone is allowed to view, modify, and share it.

## Why contribute to Open Source?

By contributing to the project, we can help the community who made it and so many peoples who used the project, and your contribution history can be a valuable addition to their portfolio. We can even contribute some simple things such as typos, grammatical errors, or docs addition, so not every contribution should be a code change.

## Pre-requisite

You only need to know about the basic of [git](https://git-scm.com/) such as cloning, push, and pull. And already have a GitHub or another git platform account.

## Finding the project to contribute

Selecting a project that aligns with your interests and expertise is essential. Look for projects that you use or find interesting. To explore different projects, you can browse them on popular platforms like GitHub, GitLab, and Bitbucket.

### Example

Recently I am on learning and exploring Jotai state management at [tutorial.jotai.org](https://tutorial.jotai.org) (_an Official interactive Jotai tutorials website_) and found something wrong with the sentences, so here I will use this as an example to contribute because it was open source too.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1690104010777/ec40f301-517a-4106-b8da-b5d2878c0340.png)

I captured this from [tutorial.jotai.org/quick-start/theme-setting](https://tutorial.jotai.org/quick-start/theme-setting) which is one of the pages on the website, something's wrong, right? Yeah, there are some grammatical errors, especially the "for you app" sentence, this is what I want to fix, so let's just get started.

> FYI: [Jotai](https://jotai.org) is one of the popular state management libraries for React app.

## Get in touch with the project source

So, after finding the project that would we contribute to, let's open the source of the project. For this case, it is [github.com/jotaijs/jotai-tutorial](https://github.com/jotaijs/jotai-tutorial).

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1690104628024/a0d1203c-0940-4d78-82b0-f37de215517b.png)

> It is a Next.js project, if you don't know about Next.js it doesn't matter, because it is only for example.

### Know what to change

Make sure we know what we will change through the project codebase. In my case, it is in [~/app/quick-start/theme-setting/markdown.ts](https://github.com/jotaijs/jotai-tutorial/blob/main/app/quick-start/theme-setting/markdown.ts).

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1690106939520/c94da8a6-112b-4819-926c-4883df8b66e3.png)

Yup, that is the code that shows the grammatical errors.

### Contribution guidelines

Getting to know about project contribution guidelines is one of the important parts. We should read and understand the contribution guidelines of the open source project we want to contribute to which is usually listed in the file `CONTRIBUTING.md`. Here is an example:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1690113125710/b6bc89ac-9409-423c-8575-05af38a79fcf.png)

The file usually contains "**How to contribute"**, "**Code of Conduct", "Branching and Versioning"**, and "**Coding Standards and Style Guidelines".**

## Start to make a changes

> I will use GitHub because the project that I am exemplifying is on GitHub. So if the project you are going to contribute is on another platform like GitLab or Bitbucket, that's fine.

### Fork the repository

On the project repository page, click the "**Fork"** button.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1690115541859/abe7ff23-19ba-46fd-a4be-d101582c45ce.png)

In this step, we can create a new name or description of the repository. But I will change nothing, so in this step, I will immediately click the "**Create fork**" button.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1690115408452/4cab23c6-c5e0-44c7-8dad-825caa0f8fbf.png)

So here is my repository that forked from [github.com/jotaijs/jotai-tutorial](https://github.com/jotaijs/jotai-tutorial).

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1690115876876/40e88cf6-b36b-4188-9e67-3f540a4848a9.png)

### Clone the forked repository

Now on the forked repository clone the git repository to local. Copy the git URL.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1690120879926/b1abfb94-1ff1-48d4-b967-3ef8f263ed5a.png)

Open the local directory for the project to the terminal, run `git clone <GIT_URL> <PROJECT_FOLDER_NAME>`, in here I pass the folder name to "jotai-tutorial".

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1690121720577/ea32dd0e-9755-4fa6-a20f-00b02fd50d44.png)

And then open the project using code editor, I will use [Visual Studio Code](https://code.visualstudio.com).

### Make a changes

Because we already know what would we change, so just make the changes now using code editor.

![Before and after changes](https://cdn.hashnode.com/res/hashnode/image/upload/v1690123788621/827d6541-a05a-431b-ad49-7f2cb668bdb6.png)

Those are the changes I have been working on. Left (before) and right (after).

### Push the changes

After we make the changes now create a new branch. Why did we create a new branch instead of using the main (`main`) branch? it's keeping the `main` branch clean. So in this case, I will create a new branch named `fix/theme-switcher-grammar` by running this command:

```bash
git checkout -b fix/theme-switcher-grammar
```

By running the command, we also automatically moved to the new branch. Then now I will commit the changes. Then add the changes to the staging and commit.

```bash
git add .
git commit -m "fix: grammatical errors in theme switcher page instructions"
```

And now push the new branch with changes to the fork on GitHub.

```bash
git push origin fix/theme-switcher-grammar
```

> For the branch name and commit message, make sure we provide clear naming/message and related to what we change.

### Back to the GitHub

Then if we back to the forked repository, there is will appear a notification like this with the button "**Compare & pull request**", and now let's click the button because we want to make a pull request.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1690125394066/460a8865-426a-4d8c-99b9-f0ee5bf071e0.png)

Then we will get directed to the pull request page, we can fill the pull request title and description well. Make sure we fill in the title according to the context of the changes we make. In my case, I fill the title "Fix grammatical errors in theme switcher page instructions", and would be better if we provide the screenshots for the changes we make. If it's done, then we click the "**Create pull request**" button.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1690128383671/f2418da6-2a6b-447b-84b1-be1a906489db.png)

And done.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1690128462215/28c8df3e-8401-4402-a18a-efab4b8b5aed.png)

Now we need to wait for the review from the project maintainer, if it is approved it will be merged by them, otherwise, if there are still errors or something wrong then usually they will comment and tell us to improve the changes we made.

## Conclusion

Contributing to open source projects is one of the ways that allows we to make a positive impact on the software community. By choosing the right project, engaging with the community, and submitting meaningful contributions, we can become an active part of the open source movement and advance our coding skills to new heights.
