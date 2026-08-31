"use client";

import { gsap } from "gsap";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type CrowdCanvasProps = {
  src: string;
  rows?: number;
  cols?: number;
  className?: string;
  thoughtPrompts?: string[];
};

type Peep = {
  image: CanvasImageSource;
  rect: number[];
  sourceWidth: number;
  sourceHeight: number;
  width: number;
  height: number;
  x: number;
  y: number;
  anchorY: number;
  scaleX: number;
  visibleBounds: { left: number; right: number; top: number; bottom: number } | null;
  walk: gsap.core.Timeline | null;
  render: (context: CanvasRenderingContext2D) => void;
};

type Thought = {
  peep: Peep;
  text: string;
  opacity: number;
};

const defaultThoughtPrompts = [
  "What if this took one less step?",
  "I can’t access my account.",
  "Now I know what to do.",
  "This should be easier to find.",
  "I finally finished it.",
  "Can I save this for later?",
  "That made the next step clear.",
  "I need help, right now.",
  "This feels made for me.",
  "This app is so much better now.",
  "That change made everything clearer.",
  "I found it right away.",
  "Finally, a flow that makes sense.",
  "This feels faster already.",
  "I can finish this without help.",
  "That was easier than before.",
  "Now I know what happens next.",
  "I love how simple this feels.",
  "This works the way I expected.",
];

export function CrowdCanvas({ src, rows = 15, cols = 7, className, thoughtPrompts = defaultThoughtPrompts }: CrowdCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const stage = { width: 0, height: 0 };
    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];
    let isVisible = true;
    let isTicking = false;
    let targetCrowdSize = 10;
    let thoughtHeadroom = 56;
    let activeThought: Thought | null = null;
    let thoughtIndex = 0;
    let thoughtInterval: number | null = null;
    let thoughtTween: gsap.core.Tween | null = null;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

    const random = (min: number, max: number) => min + Math.random() * (max - min);
    const takeRandom = <T,>(items: T[]) => items.splice(Math.floor(Math.random() * items.length), 1)[0];

    const getVisiblePeepBounds = (peep: Peep) => {
      if (!peep.visibleBounds) return null;
      const scaleX = peep.width / peep.sourceWidth;
      const scaleY = peep.height / peep.sourceHeight;
      const leftInset = peep.visibleBounds.left * scaleX;
      const rightInset = peep.visibleBounds.right * scaleX;
      const frameLeft = peep.scaleX === 1 ? peep.x : peep.x - peep.width;
      const left = frameLeft + (peep.scaleX === 1 ? leftInset : peep.width - rightInset);
      const right = frameLeft + (peep.scaleX === 1 ? rightInset : peep.width - leftInset);
      return { left, right, top: peep.y + peep.visibleBounds.top * scaleY, bottom: peep.y + peep.visibleBounds.bottom * scaleY };
    };

    const isThoughtCandidate = (peep: Peep) => {
      const visibleBounds = getVisiblePeepBounds(peep);
      return Boolean(
        visibleBounds &&
        visibleBounds.left > 12 &&
        visibleBounds.right < stage.width - 12 &&
        visibleBounds.top >= 48 &&
        visibleBounds.bottom < stage.height - 4,
      );
    };

    const drawThought = () => {
      if (!activeThought || activeThought.opacity <= 0 || !isThoughtCandidate(activeThought.peep)) return;
      const { peep, text, opacity } = activeThought;
      const visibleBounds = getVisiblePeepBounds(peep);
      if (!visibleBounds) return;
      const fontSize = stage.width < 540 ? 10 : 11;
      context.font = `700 ${fontSize}px "Manrope Variable", sans-serif`;
      const bubbleWidth = Math.min(224, Math.max(142, context.measureText(text).width + 28));
      const bubbleHeight = 34;
      const centerX = Math.max(
        bubbleWidth / 2 + 8,
        Math.min(stage.width - bubbleWidth / 2 - 8, (visibleBounds.left + visibleBounds.right) / 2),
      );
      const bubbleX = centerX - bubbleWidth / 2;
      const bubbleY = Math.max(8, visibleBounds.top - bubbleHeight - 14);

      context.save();
      context.globalAlpha = opacity;
      context.fillStyle = "#f5f2ea";
      context.strokeStyle = "#102d27";
      context.lineWidth = 1.25;
      context.beginPath();
      context.roundRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 14);
      context.fill();
      context.stroke();
      context.beginPath();
      context.arc(centerX - 8, bubbleY + bubbleHeight + 7, 3, 0, Math.PI * 2);
      context.arc(centerX - 3, bubbleY + bubbleHeight + 13, 1.7, 0, Math.PI * 2);
      context.fill();
      context.stroke();
      context.fillStyle = "#102d27";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(text, centerX, bubbleY + bubbleHeight / 2 + .5);
      context.restore();
    };

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.scale(pixelRatio, pixelRatio);
      crowd.forEach(peep => peep.render(context));
      drawThought();
      context.restore();
    };

    const startTicker = () => {
      if (!isTicking && !shouldReduceMotion) { gsap.ticker.add(render); isTicking = true; }
    };
    const stopTicker = () => {
      if (isTicking) { gsap.ticker.remove(render); isTicking = false; }
    };

    const rotateThought = () => {
      if (!isVisible || document.hidden) return;
      const candidates = crowd.filter(isThoughtCandidate);
      const alternatives = candidates.filter(peep => peep !== activeThought?.peep);
      const peep = alternatives[Math.floor(Math.random() * alternatives.length)] ?? candidates[0];
      if (!peep) return;

      const revealThought = () => {
        activeThought = {
          peep,
          text: thoughtPrompts[thoughtIndex % thoughtPrompts.length],
          opacity: shouldReduceMotion ? 1 : 0,
        };
        thoughtIndex += 1;
        if (!shouldReduceMotion) {
          thoughtTween = gsap.to(activeThought, {
            duration: .3,
            opacity: 1,
            ease: "power2.out",
          });
        }
      };

      thoughtTween?.kill();
      if (activeThought && !shouldReduceMotion) {
        thoughtTween = gsap.to(activeThought, {
          duration: .2,
          opacity: 0,
          ease: "power2.in",
          onComplete: revealThought,
        });
      } else {
        revealThought();
      }
    };

    const resetPeep = (peep: Peep) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const topInset = thoughtHeadroom;
      const bottomInset = Math.max(6, stage.height * .04);
      const availableY = Math.max(0, stage.height - peep.height - topInset - bottomInset);
      const startY = topInset + Math.random() * availableY;
      peep.x = direction === 1 ? -peep.width : stage.width + peep.width;
      peep.y = startY;
      peep.anchorY = startY;
      peep.scaleX = direction;
      return { endX: direction === 1 ? stage.width : 0, startY };
    };

    const addPeep = (placeInViewport = false) => {
      const peep = takeRandom(availablePeeps);
      if (!peep) return;
      const { endX, startY } = resetPeep(peep);
      peep.walk = gsap.timeline({ onComplete: () => {
        crowd.splice(crowd.indexOf(peep), 1);
        availablePeeps.push(peep);
        if (isVisible && !shouldReduceMotion && crowd.length < targetCrowdSize) {
          addPeep();
        }
      } });
      peep.walk.to(peep, { duration: 10, x: endX, ease: "none" }, 0);
      peep.walk.to(peep, { duration: .25, repeat: 40, yoyo: true, y: Math.max(0, startY - 4), ease: "sine.inOut" }, 0);
      peep.walk.timeScale(random(.55, 1.25));
      if (shouldReduceMotion) peep.walk.pause(0);
      else if (placeInViewport) peep.walk.progress(Math.random());
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
    };

    const populateCrowd = () => {
      while (availablePeeps.length && crowd.length < targetCrowdSize) addPeep(true);
    };

    const resize = () => {
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      thoughtHeadroom = Math.min(76, Math.max(56, stage.height * .2));
      canvas.width = Math.round(stage.width * pixelRatio);
      canvas.height = Math.round(stage.height * pixelRatio);
      allPeeps.forEach(peep => {
        const scale = Math.min(1, Math.max(.38, (stage.height - thoughtHeadroom - 16) / peep.sourceHeight));
        peep.width = peep.sourceWidth * scale;
        peep.height = peep.sourceHeight * scale;
      });
      targetCrowdSize = Math.min(
        allPeeps.length,
        Math.max(8, Math.min(14, Math.ceil(stage.width / 220) + 3)),
      );
      crowd.forEach(peep => peep.walk?.kill());
      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);
      populateCrowd();
      render();
    };

    const image = new Image();
    image.onload = () => {
      const frameWidth = image.naturalWidth / rows;
      const frameHeight = image.naturalHeight / cols;
      const processingCanvas = document.createElement("canvas");
      processingCanvas.width = image.naturalWidth;
      processingCanvas.height = image.naturalHeight;
      const processingContext = processingCanvas.getContext("2d", { willReadFrequently: true });
      if (!processingContext) return;
      processingContext.drawImage(image, 0, 0);
      const pixels = processingContext.getImageData(0, 0, processingCanvas.width, processingCanvas.height);
      const framePixelWidth = Math.floor(frameWidth);
      const framePixelHeight = Math.floor(frameHeight);
      const floodQueue = new Int32Array(framePixelWidth * framePixelHeight);
      const isWhite = (pixel: number) => (
        pixels.data[pixel] > 248 &&
        pixels.data[pixel + 1] > 248 &&
        pixels.data[pixel + 2] > 248
      );

      const clearFrameBackground = (frameX: number, frameY: number) => {
        let head = 0;
        let tail = 0;
        const visit = (x: number, y: number) => {
          if (x < 0 || x >= framePixelWidth || y < 0 || y >= framePixelHeight) return;
          const pixel = ((frameY + y) * processingCanvas.width + frameX + x) * 4;
          if (!isWhite(pixel) || pixels.data[pixel + 3] === 0) return;
          pixels.data[pixel + 3] = 0;
          floodQueue[tail] = y * framePixelWidth + x;
          tail += 1;
        };

        for (let x = 0; x < framePixelWidth; x += 1) {
          visit(x, 0);
          visit(x, framePixelHeight - 1);
        }
        for (let y = 1; y < framePixelHeight - 1; y += 1) {
          visit(0, y);
          visit(framePixelWidth - 1, y);
        }
        while (head < tail) {
          const point = floodQueue[head];
          head += 1;
          const x = point % framePixelWidth;
          const y = Math.floor(point / framePixelWidth);
          visit(x + 1, y);
          visit(x - 1, y);
          visit(x, y + 1);
          visit(x, y - 1);
        }
      };

      for (let row = 0; row < cols; row += 1) {
        for (let column = 0; column < rows; column += 1) {
          clearFrameBackground(column * framePixelWidth, row * framePixelHeight);
        }
      }

      for (let pixel = 0; pixel < pixels.data.length; pixel += 4) {
        if (pixels.data[pixel + 3] === 0) continue;
        if (isWhite(pixel)) {
          pixels.data[pixel] = 245;
          pixels.data[pixel + 1] = 242;
          pixels.data[pixel + 2] = 234;
          continue;
        }
        const shade = Math.max(
          pixels.data[pixel],
          pixels.data[pixel + 1],
          pixels.data[pixel + 2],
        );
        if (shade >= 210) continue;
        const strength = (210 - shade) / 210;
        pixels.data[pixel] = Math.round(245 + (16 - 245) * strength);
        pixels.data[pixel + 1] = Math.round(242 + (45 - 242) * strength);
        pixels.data[pixel + 2] = Math.round(234 + (39 - 234) * strength);
      }
      processingContext.putImageData(pixels, 0, 0);
      const spriteCanvas = document.createElement("canvas");
      spriteCanvas.width = processingCanvas.width;
      spriteCanvas.height = processingCanvas.height;
      const spriteContext = spriteCanvas.getContext("2d");
      if (!spriteContext) return;
      spriteContext.drawImage(processingCanvas, 0, 0);
      for (let index = 0; index < rows * cols; index += 1) {
        const rect = [(index % rows) * frameWidth, Math.floor(index / rows) * frameHeight, frameWidth, frameHeight];
        const frameX = (index % rows) * framePixelWidth;
        const frameY = Math.floor(index / rows) * framePixelHeight;
        let left = framePixelWidth;
        let right = 0;
        let top = framePixelHeight;
        let bottom = 0;
        for (let y = 0; y < framePixelHeight; y += 1) {
          for (let x = 0; x < framePixelWidth; x += 1) {
            const alpha = pixels.data[((frameY + y) * processingCanvas.width + frameX + x) * 4 + 3];
            if (alpha < 24) continue;
            left = Math.min(left, x);
            right = Math.max(right, x + 1);
            top = Math.min(top, y);
            bottom = Math.max(bottom, y + 1);
          }
        }
        const visibleBounds = left < right && top < bottom
          ? { left: left * (frameWidth / framePixelWidth), right: right * (frameWidth / framePixelWidth), top: top * (frameHeight / framePixelHeight), bottom: bottom * (frameHeight / framePixelHeight) }
          : null;
        const peep: Peep = {
          image: spriteCanvas, rect, sourceWidth: frameWidth, sourceHeight: frameHeight, width: frameWidth, height: frameHeight, x: 0, y: 0, anchorY: 0, scaleX: 1, visibleBounds, walk: null,
          render: (drawContext) => {
            drawContext.save();
            drawContext.translate(peep.x, peep.y);
            drawContext.scale(peep.scaleX, 1);
            drawContext.drawImage(spriteCanvas, rect[0], rect[1], rect[2], rect[3], 0, 0, peep.width, peep.height);
            drawContext.restore();
          },
        };
        allPeeps.push(peep);
      }
      resize();
      rotateThought();
      if (!shouldReduceMotion) thoughtInterval = window.setInterval(rotateThought, 2400);
      syncAnimationState();
    };
    image.src = src;

    const syncAnimationState = () => {
      const canAnimate = isVisible && !document.hidden;
      if (!shouldReduceMotion) {
        crowd.forEach(peep => canAnimate ? peep.walk?.resume() : peep.walk?.pause());
      }
      if (canAnimate) startTicker(); else stopTicker();
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = Boolean(entry?.isIntersecting);
      syncAnimationState();
      if (isVisible && !activeThought) rotateThought();
    }, { threshold: .05 });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", syncAnimationState);
    window.addEventListener("resize", resize);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncAnimationState);
      window.removeEventListener("resize", resize);
      stopTicker();
      if (thoughtInterval !== null) window.clearInterval(thoughtInterval);
      thoughtTween?.kill();
      crowd.forEach(peep => peep.walk?.kill());
    };
  }, [cols, rows, shouldReduceMotion, src, thoughtPrompts]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

export function Skiper39() {
  return <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} className="skiper39-canvas" />;
}
