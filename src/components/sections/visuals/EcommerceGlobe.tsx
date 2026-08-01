"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { PARTNER_BRANDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type EcommerceGlobeProps = {
  className?: string;
};

const GLOBE_RADIUS = 1.05;
const WIDE_LOGOS = new Set(["amazon", "walmart", "gohighlevel"]);

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function createGlobeGrid(radius: number) {
  const grid = new THREE.Group();
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x2b2b2b,
    transparent: true,
    opacity: 0.16,
  });

  for (let lat = -75; lat <= 75; lat += 25) {
    const points: THREE.Vector3[] = [];
    for (let lon = 0; lon <= 360; lon += 4) {
      points.push(latLonToVector3(lat, lon - 180, radius));
    }
    const ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMat);
    grid.add(ring);
  }

  for (let lon = 0; lon < 360; lon += 30) {
    const points: THREE.Vector3[] = [];
    for (let lat = -90; lat <= 90; lat += 3) {
      points.push(latLonToVector3(lat, lon - 180, radius));
    }
    const meridian = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMat);
    grid.add(meridian);
  }

  const wire = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(radius, 3)),
    new THREE.LineBasicMaterial({
      color: 0x1a1a1a,
      transparent: true,
      opacity: 0.08,
    }),
  );
  grid.add(wire);

  return grid;
}

function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius,
      ),
    );
  }

  return points;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

async function createBrandSprite(slug: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unsupported");

  ctx.clearRect(0, 0, 256, 256);

  roundRect(ctx, 18, 18, 220, 220, 52);
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(0,0,0,0.14)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 6;
  ctx.fill();
  ctx.shadowColor = "transparent";

  roundRect(ctx, 18, 18, 220, 220, 52);
  ctx.strokeStyle = "rgba(0,0,0,0.06)";
  ctx.lineWidth = 2;
  ctx.stroke();

  const img = new Image();
  img.src = `/brands/${slug}.svg`;
  await img.decode();

  const wide = WIDE_LOGOS.has(slug);
  const logoW = wide ? 168 : 96;
  const logoH = wide ? 52 : 96;
  ctx.drawImage(img, (256 - logoW) / 2, (256 - logoH) / 2, logoW, logoH);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: true,
    depthWrite: false,
  });

  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.36, 0.36, 1);
  sprite.userData.texture = texture;

  return sprite;
}

export default function EcommerceGlobe({ className }: EcommerceGlobeProps = {}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let disposed = false;
    const textures: THREE.Texture[] = [];

    const isMobile = window.innerWidth < 1024;
    const sphereSegments = isMobile ? 32 : 48;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.35 : 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 3.35;

    const globe = new THREE.Group();
    scene.add(globe);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS * 0.92, sphereSegments, sphereSegments),
      new THREE.MeshBasicMaterial({
        color: 0x111111,
        transparent: true,
        opacity: 0.07,
      }),
    );
    globe.add(sphere);

    const gloss = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS * 0.925, sphereSegments, sphereSegments),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.03,
        wireframe: true,
      }),
    );
    globe.add(gloss);

    const grid = createGlobeGrid(GLOBE_RADIUS * 0.9);
    globe.add(grid);

    let width = 0;
    let height = 0;
    const resize = () => {
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();

    const drag = { active: false, x: 0, y: 0 };
    const rotation = { x: 0.15, y: 0 };
    const velocity = { x: 0, y: 0.006 };
    const pointer = { x: 0, y: 0 };
    let visible = true;
    let raf = 0;

    const onPointerDown = (e: PointerEvent) => {
      drag.active = true;
      drag.x = e.clientX;
      drag.y = e.clientY;
      velocity.x = 0;
      velocity.y = 0;
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;

      if (!drag.active) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      drag.x = e.clientX;
      drag.y = e.clientY;
      rotation.y += dx * 0.006;
      rotation.x += dy * 0.005;
      rotation.x = THREE.MathUtils.clamp(rotation.x, -0.85, 0.85);
      velocity.y = dx * 0.00035;
      velocity.x = dy * 0.00025;
    };

    const onPointerUp = (e: PointerEvent) => {
      drag.active = false;
      canvas.releasePointerCapture(e.pointerId);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerUp);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.08 },
    );
    observer.observe(wrap);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible || disposed) return;

      if (!drag.active) {
        rotation.y += velocity.y;
        rotation.x += velocity.x;
        rotation.x += (0.15 - rotation.x) * 0.025;
        velocity.y = THREE.MathUtils.lerp(velocity.y, 0.006, 0.04);
        velocity.x *= 0.9;
      }

      globe.rotation.x = rotation.x + pointer.y * 0.05;
      globe.rotation.y = rotation.y + pointer.x * 0.06;

      renderer.render(scene, camera);
    };

    const boot = async () => {
      const positions = fibonacciSphere(PARTNER_BRANDS.length, GLOBE_RADIUS);
      const sprites = await Promise.all(
        PARTNER_BRANDS.map((brand) => createBrandSprite(brand.slug)),
      );

      if (disposed) {
        sprites.forEach((sprite) => {
          textures.push(sprite.userData.texture as THREE.Texture);
          sprite.material.dispose();
        });
        return;
      }

      sprites.forEach((sprite, index) => {
        sprite.position.copy(positions[index]);
        textures.push(sprite.userData.texture as THREE.Texture);
        globe.add(sprite);
      });

      animate();
    };

    boot();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerUp);
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={cn(
        "ecommerce-globe relative h-[min(260px,42vw)] w-[min(260px,42vw)] sm:h-[min(320px,48vw)] sm:w-[min(320px,48vw)] lg:h-[min(380px,52vh)] lg:w-[min(380px,52vh)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.04)_0%,transparent_72%)]"
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className="relative z-10 h-full w-full cursor-grab touch-none active:cursor-grabbing"
        aria-label="Interactive product globe with marketplace and platform logos"
      />
      <p className="pointer-events-none absolute -bottom-5 left-1/2 z-20 -translate-x-1/2 text-[9px] tracking-[0.28em] text-black/30 uppercase">
        Drag to browse platforms
      </p>
    </div>
  );
}
