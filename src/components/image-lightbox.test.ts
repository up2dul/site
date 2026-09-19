import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { createElement } from "react";
import { afterEach, describe, expect, it } from "vitest";
import {
  getAdjacentIndex,
  getAnimationDuration,
  getLightboxItems,
  getSwipeDirection,
  ImageLightbox,
} from "./image-lightbox";

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

describe("image lightbox helpers", () => {
  it("discovers eligible image links and ignores decorative images", () => {
    document.body.innerHTML = `
      <a href="/one.png" data-lightbox-trigger><img src="/preview.png" alt="First image"></a>
      <a href="/two.png" data-lightbox-trigger><img src="/preview.png" alt=""></a>
      <a href="/decorative.png" data-lightbox-trigger><img src="/preview.png" alt="" aria-hidden="true"></a>
      <a href="/ordinary.png"><img src="/preview.png" alt="Ordinary link"></a>
    `;

    expect(getLightboxItems()).toEqual([
      expect.objectContaining({
        src: "http://localhost:3000/one.png",
        alt: "First image",
      }),
      expect.objectContaining({
        src: "http://localhost:3000/two.png",
        alt: "",
      }),
    ]);
  });

  it("wraps gallery navigation at both boundaries", () => {
    expect(getAdjacentIndex(0, -1, 3)).toBe(2);
    expect(getAdjacentIndex(2, 1, 3)).toBe(0);
  });

  it("recognizes horizontal swipes but leaves vertical gestures alone", () => {
    expect(getSwipeDirection({ x: 100, y: 20 }, { x: 20, y: 24 })).toBe(1);
    expect(getSwipeDirection({ x: 20, y: 20 }, { x: 100, y: 24 })).toBe(-1);
    expect(getSwipeDirection({ x: 20, y: 20 }, { x: 30, y: 100 })).toBe(0);
  });

  it("disables animation when reduced motion is preferred", () => {
    expect(getAnimationDuration(true)).toBe(0);
    expect(getAnimationDuration(false)).toBe(0.18);
  });

  it("opens from a discovered trigger and navigates with arrow keys", async () => {
    document.body.innerHTML = `
      <main>
        <a href="/one.png" data-lightbox-trigger><img src="/one.png" alt="First image"></a>
        <a href="/two.png" data-lightbox-trigger><img src="/two.png" alt="Second image"></a>
      </main>
      <div id="lightbox-root"></div>
    `;
    const root = document.querySelector("#lightbox-root");
    if (!(root instanceof HTMLElement)) throw new Error("Missing test root");

    render(createElement(ImageLightbox), { container: root });
    fireEvent.click(screen.getByRole("link", { name: "First image" }));

    expect(await screen.findByText("Image 1 of 2")).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(await screen.findByText("Second image")).toBeInTheDocument();
    expect(screen.getByText("Image 2 of 2")).toBeInTheDocument();
  });

  it("adds fallback names and restores focus when closed", async () => {
    document.body.innerHTML = `
      <main><a href="/one.png" data-lightbox-trigger><img src="/one.png" alt=""></a></main>
      <div id="lightbox-root"></div>
    `;
    const root = document.querySelector("#lightbox-root");
    if (!(root instanceof HTMLElement)) throw new Error("Missing test root");

    render(createElement(ImageLightbox), { container: root });
    const trigger = screen.getByRole("link", { name: "Open image 1" });
    fireEvent.click(trigger);
    fireEvent.click(
      await screen.findByRole("button", { name: "Close image lightbox" })
    );

    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("opens an image link with Space", async () => {
    document.body.innerHTML = `
      <main><a href="/one.png" data-lightbox-trigger><img src="/one.png" alt="First image"></a></main>
      <div id="lightbox-root"></div>
    `;
    const root = document.querySelector("#lightbox-root");
    if (!(root instanceof HTMLElement)) throw new Error("Missing test root");

    render(createElement(ImageLightbox), { container: root });
    fireEvent.keyDown(screen.getByRole("link", { name: "First image" }), {
      key: " ",
    });

    expect(await screen.findByText("Image 1 of 1")).toBeInTheDocument();
  });

  it("keeps failure recovery and backdrop dismissal usable", async () => {
    document.body.innerHTML = `
      <main><a href="/broken.png" data-lightbox-trigger><img src="/broken.png" alt="Broken image"></a></main>
      <div id="lightbox-root"></div>
    `;
    const root = document.querySelector("#lightbox-root");
    if (!(root instanceof HTMLElement)) throw new Error("Missing test root");

    render(createElement(ImageLightbox), { container: root });
    fireEvent.click(screen.getByRole("link", { name: "Broken image" }));
    const dialogImage = await screen.findByRole("img", {
      name: "Broken image",
    });
    fireEvent.error(dialogImage);

    expect(
      screen.getByText("We couldn’t load this image.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Open original image/ })
    ).toHaveAttribute("href", "http://localhost:3000/broken.png");

    fireEvent.click(screen.getByRole("dialog"));
    await waitFor(() =>
      expect(
        screen.queryByRole("button", { name: "Close image lightbox" })
      ).not.toBeInTheDocument()
    );
  });
});
