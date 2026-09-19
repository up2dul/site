"use client";

import { Dialog } from "@base-ui/react/dialog";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  XIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export type LightboxItem = {
  src: string;
  alt: string;
  trigger: HTMLAnchorElement;
};

export function getLightboxItems(root: ParentNode = document): LightboxItem[] {
  return Array.from(
    root.querySelectorAll<HTMLAnchorElement>("a[data-lightbox-trigger]")
  ).flatMap((trigger) => {
    const image = trigger.querySelector<HTMLImageElement>(
      "img:not([aria-hidden='true'])"
    );
    const src = trigger.href || image?.currentSrc || image?.src;

    return image && src ? [{ src, alt: image.alt.trim(), trigger }] : [];
  });
}

export function getAdjacentIndex(
  currentIndex: number,
  direction: -1 | 1,
  itemCount: number
): number {
  if (itemCount < 1) return 0;
  return (currentIndex + direction + itemCount) % itemCount;
}

export function getSwipeDirection(
  start: { x: number; y: number },
  end: { x: number; y: number },
  threshold = 50
): -1 | 0 | 1 {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  if (Math.abs(deltaX) < threshold || Math.abs(deltaX) <= Math.abs(deltaY)) {
    return 0;
  }
  return deltaX > 0 ? -1 : 1;
}

export function getAnimationDuration(reduceMotion: boolean | null): number {
  return reduceMotion ? 0 : 0.18;
}

export function ImageLightbox(): React.ReactElement {
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const activeTriggerRef = useRef<HTMLAnchorElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogActionsRef = useRef<Dialog.Root.Actions | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const didSwipeRef = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const nextItems = getLightboxItems();
    setItems(nextItems);

    const cleanups = nextItems.map((item, index) => {
      const accessibleName = item.alt || `Open image ${index + 1}`;
      if (!item.trigger.hasAttribute("aria-label") && !item.alt) {
        item.trigger.setAttribute("aria-label", accessibleName);
      }

      const openItem = () => {
        activeTriggerRef.current = item.trigger;
        setLoading(true);
        setFailed(false);
        setActiveIndex(index);
        setOpen(true);
      };

      const handleClick = (event: MouseEvent) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        event.preventDefault();
        openItem();
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== " ") return;
        event.preventDefault();
        openItem();
      };

      item.trigger.addEventListener("click", handleClick);
      item.trigger.addEventListener("keydown", handleKeyDown);
      return () => {
        item.trigger.removeEventListener("click", handleClick);
        item.trigger.removeEventListener("keydown", handleKeyDown);
      };
    });

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  }, []);

  const navigate = useCallback(
    (direction: -1 | 1) => {
      setLoading(true);
      setFailed(false);
      setActiveIndex((current) =>
        getAdjacentIndex(current, direction, items.length)
      );
    },
    [items.length]
  );

  useEffect(() => {
    if (!open || items.length < 2) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigate(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        navigate(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length, navigate, open]);

  const handleOpenChange = (
    nextOpen: boolean,
    details: Dialog.Root.ChangeEventDetails
  ) => {
    if (!nextOpen && !reduceMotion) details.preventUnmountOnClose();
    setOpen(nextOpen);
  };

  const handlePointerDown = (event: ReactPointerEvent) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: ReactPointerEvent) => {
    if (!pointerStartRef.current || items.length < 2) return;
    const direction = getSwipeDirection(pointerStartRef.current, {
      x: event.clientX,
      y: event.clientY,
    });
    pointerStartRef.current = null;
    if (direction) {
      didSwipeRef.current = true;
      navigate(direction);
    }
  };

  const handleBackdropClick = (event: ReactMouseEvent) => {
    if (didSwipeRef.current) {
      didSwipeRef.current = false;
      return;
    }

    const target = event.target;
    if (
      target instanceof Element &&
      !target.closest("[data-lightbox-content]")
    ) {
      dialogActionsRef.current?.close();
    }
  };

  const activeItem = items[activeIndex];
  const itemNumber = activeIndex + 1;
  const itemStatus = `Image ${itemNumber} of ${items.length}`;
  const caption = activeItem?.alt;
  const duration = getAnimationDuration(reduceMotion);

  return (
    <Dialog.Root
      actionsRef={dialogActionsRef}
      onOpenChange={handleOpenChange}
      open={open}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-transparent">
          <motion.div
            animate={{ opacity: open ? 1 : 0 }}
            className="absolute inset-0 bg-black/88 backdrop-blur-sm"
            initial={false}
            transition={{ duration }}
          />
        </Dialog.Backdrop>
        <Dialog.Viewport className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          <Dialog.Popup
            className="relative flex size-full touch-pan-y flex-col items-center justify-center overflow-hidden rounded-xl outline-none"
            finalFocus={() => activeTriggerRef.current}
            initialFocus={closeButtonRef}
            onClick={handleBackdropClick}
          >
            <Dialog.Title className="sr-only">Image lightbox</Dialog.Title>
            <Dialog.Description className="sr-only">
              {caption || itemStatus}. Use the arrow keys to browse images.
            </Dialog.Description>

            <motion.div
              animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.98 }}
              className="flex size-full flex-col items-center justify-center gap-3"
              initial={false}
              onAnimationComplete={() => {
                if (!open) dialogActionsRef.current?.unmount();
              }}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              transition={{ duration, ease: [0.2, 0, 0, 1] }}
            >
              <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
                {activeItem && !failed && (
                  <img
                    alt={activeItem.alt}
                    className="max-h-full max-w-full select-none object-contain"
                    data-lightbox-content
                    draggable={false}
                    key={activeItem.src}
                    onError={() => {
                      setLoading(false);
                      setFailed(true);
                    }}
                    onLoad={() => setLoading(false)}
                    src={activeItem.src}
                  />
                )}

                {loading && !failed && (
                  <div
                    aria-label="Loading image"
                    className="absolute inset-0 grid place-items-center text-white"
                    role="status"
                  >
                    <Spinner className="size-6" />
                  </div>
                )}

                {failed && activeItem && (
                  <div
                    className="flex flex-col items-center gap-4 text-center text-white"
                    data-lightbox-content
                  >
                    <p>We couldn’t load this image.</p>
                    <a
                      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/24 px-4 font-medium outline-none hover:bg-white/12 focus-visible:ring-2 focus-visible:ring-white"
                      href={activeItem.src}
                    >
                      Open original image
                      <ExternalLinkIcon aria-hidden="true" className="size-4" />
                    </a>
                  </div>
                )}
              </div>

              <div
                className="min-h-12 max-w-3xl text-center text-white"
                data-lightbox-content
              >
                {caption && <p className="text-sm">{caption}</p>}
                <p aria-live="polite" className="text-white/64 text-xs">
                  {itemStatus}
                </p>
              </div>
            </motion.div>

            <Dialog.Close
              aria-label="Close image lightbox"
              className="absolute top-2 right-2 sm:top-3 sm:right-3"
              ref={closeButtonRef}
              data-lightbox-content
              render={
                <Button
                  className="border-white/20 bg-black/40 text-white hover:bg-black/64"
                  size="icon-xl"
                  variant="outline"
                />
              }
            >
              <XIcon aria-hidden="true" />
            </Dialog.Close>

            {items.length > 1 && (
              <>
                <Button
                  aria-label="Previous image"
                  className="absolute left-2 border-white/20 bg-black/40 text-white hover:bg-black/64 sm:left-3"
                  data-lightbox-content
                  onClick={() => navigate(-1)}
                  size="icon-xl"
                  variant="outline"
                >
                  <ChevronLeftIcon aria-hidden="true" />
                </Button>
                <Button
                  aria-label="Next image"
                  className="absolute right-2 border-white/20 bg-black/40 text-white hover:bg-black/64 sm:right-3"
                  data-lightbox-content
                  onClick={() => navigate(1)}
                  size="icon-xl"
                  variant="outline"
                >
                  <ChevronRightIcon aria-hidden="true" />
                </Button>
              </>
            )}
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
