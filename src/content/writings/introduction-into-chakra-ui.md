---
title: Introduction into Chakra UI
subtitle: Get to know about Chakra UI, why to use it, and how to use it on React project
createdAt: 2023-05-03
tags:
  - tutorial
---

> Want to read in **Bahasa Indonesia** version? here you go: [https://medium.com/@up2dul/chakra-ui-0-perkenalan-b493f059ebe1](https://medium.com/@up2dul/chakra-ui-0-perkenalan-b493f059ebe1)

## What is Chakra UI?

From the official website, this is what we get about Chakra UI:

> Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.

So Chakra UI is one of the most popular React UI Component libraries. Chakra UI provides some built-in components that are ready to use, so this is a solution for those who don't want to create React components manually from scratch.

There are some other React UI components such as [Material UI](https://mui.com/), [Mantine](https://mantine.dev), and [Ant Design](https://ant.design/), but in this article, we will only learn about Chakra UI and not compare them.

## Why use Chakra UI for React project?

### Built-in accessibility

Chakra UI provides components that are designed with accessibility in mind and provides built-in support for common accessibility features such as screen reader compatibility and keyboard navigation. This makes it easier for developers to create accessible interfaces without having to implement these features from scratch. Get to know more about website accessibility: [https://chakra-ui.com/blog/the-beginners-guide-to-building-an-accessible-web](https://chakra-ui.com/blog/the-beginners-guide-to-building-an-accessible-web).

### Custom hooks

When developing a website using React, we are always faced with a situation where we need custom hooks, and the great thing is, Chakra UI also provides utility custom hooks that are so useful, such as `useBoolean`, `useClickOutside`, and `useClipboard`. We don't need to install anything more, so just import the hooks that we want from `'@chakra-ui/react'`.

![Chakra UI custom hooks](https://cdn.hashnode.com/res/hashnode/image/upload/v1683023357691/c860c04e-dae1-41c4-a524-76e7488f7e1e.png)

### Active community

Chakra UI has an active and supportive community of developers who contribute to the development and provide support. This makes it easier to get help and find solutions to common problems.

## Start using Chakra UI on the project

> I don't provide the step for generating React project from scratch in this part, so if want to follow make sure you already have a React project using [CRA](https://create-react-app.dev/), [Vite](https://vitejs.dev/), [Next.js](https://nextjs.org), or anything else.

So in the project directory, open the terminal and install Chakra UI along with some additional libraries. We can use [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/) to install it.

```bash
# npm
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion

# yarn
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion

# pnpm
pnpm add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

After that, we can add the Chakra UI component provider to the root of the application project, for example here is a file called `App.jsx` as an application root in the `src` folder.

```javascript
// ~/src/App.jsx
import { ChakraProvider } from '@chakra-ui/react';

const App = () => {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
};
```

If we use Next.js, then will be like this:

```javascript
// ~/pages/_app.jsx
import { ChakraProvider } from '@chakra-ui/react';

const MyApp = ({ Component, pageProps }) => (
  <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default MyApp;
```

So in essence, please adjust it according to the project folder structure used.

And then we can import the component that we want from Chakra UI. This is the example if we use Next.js:

```javascript
// ~/pages/index.jsx
import Head from 'next/head';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

const Home = () => (
  <>
    <Head>
      <title>Hello Chakra UI</title>
      <meta name="description" content="Hello Chakra UI" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Box as="section" mt="40px" textAlign="center">
      <Heading fontSize="4xl">Hello world</Heading>
      <Text mt="4px">Welcome to Chakra UI</Text>
      <Button mt="20px">Button from Chakra</Button>
    </Box>
  </>
);

export default Home;
```

> Go to [https://chakra-ui.com/docs/components](https://chakra-ui.com/docs/components) to see the component list.

So the result will be like this:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1683117978118/eeb85714-39ee-4e96-9a73-d42899260f1c.png)

## Conclusion

Finally, we got to know what is Chakra UI, and why to use it, and we have had success installing it to our project. You can explore the other components and or even implement them in your React project. With such good documentation and active community from the developers and the users, so we don't need to worry about using it.

## References

- [https://chakra-ui.com/](https://chakra-ui.com/)
- [https://chakra-ui.com/blog/the-beginners-guide-to-building-an-accessible-web](https://chakra-ui.com/blog/the-beginners-guide-to-building-an-accessible-web)
