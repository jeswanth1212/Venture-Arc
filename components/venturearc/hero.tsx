'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Fractal parameters
    const params = {
      primaryColor: [44, 0, 255],
      secondaryColor: [165, 0, 0],
      fractalScale: 0.95,
      fractalX: 0.0,
      fractalY: 0.0,
      fractalLightIntensity: 1.0,
      fractalSpeed: 0.4,
      iTime: 0.0
    };

    // Store mouse position and smooth it over time
    const mouse = new THREE.Vector2(0, 0);
    const smoothedMouse = new THREE.Vector2(0, 0);

    // Shader Material
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight)
        },
        iTime: { value: params.iTime },
        smoothedMouse: { value: new THREE.Vector2(0, 0) },
        primaryColor: {
          value: new THREE.Color().fromArray(
            params.primaryColor.map((c) => c / 255)
          )
        },
        secondaryColor: {
          value: new THREE.Color().fromArray(
            params.secondaryColor.map((c) => c / 255)
          )
        },
        fractalScale: { value: params.fractalScale },
        fractalOffset: {
          value: new THREE.Vector2(params.fractalX, params.fractalY)
        },
        fractalLightIntensity: { value: params.fractalLightIntensity },
        fractalSpeed: { value: params.fractalSpeed }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec2 iResolution;
        uniform float iTime;
        uniform vec3 primaryColor;
        uniform vec3 secondaryColor;
        uniform vec2 smoothedMouse;
        uniform float fractalScale;
        uniform vec2 fractalOffset;
        uniform float fractalLightIntensity;
        uniform float fractalSpeed;


        // Original fractal function to restore previous look
        float originalFractal(vec2 uv, float time, float speed) {
          uv = (uv * 2.0 - 1.0); // Adjust UV to be from -1 to 1
          uv.x *= iResolution.x / iResolution.y; // Maintain aspect ratio
          uv *= fractalScale; // Apply fractal scale
          uv += fractalOffset; // Apply position offset

          vec2 p, v;
          float z = 0.0, o = 0.0, d = 0.0;

          for (float i = 0.0; i < 1.0; i += 0.01) {
            p = uv.xy * i;
            z = max(1.0 - dot(p, p), 0.0);
            p /= 0.2 + sqrt(z) * 0.2;
            p.x = p.x / 0.9 + time * speed; // Adjust movement speed
            p.y += fract(ceil(p.x) * 0.5) + time * 0.2 * speed; // Adjust movement speed

            v = abs(fract(p) - 0.5);
            d = (1.0 - length(v)) * z / 5.0;
            o += 0.0015 * z / (abs(max(v.x * 1.5 + v, 2.0 * v).y - 1.0) + 0.1 - i * 0.09);
          }

          o = tanh(pow(o, 2.0));
          return o;
        }

        void main() {
          // Normalize UV coordinates
          vec2 uv = gl_FragCoord.xy / iResolution.xy;

          // Call the original fractal function to restore the previous look
          float result = originalFractal(uv, iTime, fractalSpeed);

          // Calculate light intensity based on distance from mouse
          float distToMouse = distance(uv, smoothedMouse / iResolution);
          float light = fractalLightIntensity / (distToMouse + 0.2); // Adjust light falloff based on mouse

          // Fractal light emission effect: increase brightness of fractals, but only emit light dynamically
          vec3 fractalColor = mix(primaryColor, secondaryColor, result);
          fractalColor *= light * result; // Light changes but the fractal remains static

          // Set the final color of the fragment
          gl_FragColor = vec4(fractalColor, 1.0);
        }
      `
    });

    // Create a fullscreen plane
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial);
    scene.add(plane);

    // Smooth mouse movement logic
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = event.clientX / window.innerWidth;
      const mouseY = 1.0 - event.clientY / window.innerHeight; // Flip Y axis
      mouse.set(mouseX, mouseY);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Animation Loop
    const animate = (time: number) => {
      shaderMaterial.uniforms.iTime.value = time * 0.001;

      // Smooth out the mouse movement
      smoothedMouse.lerp(mouse, 0.1); // 0.1 controls the smoothness (lower value = smoother)

      shaderMaterial.uniforms.smoothedMouse.value.set(
        smoothedMouse.x * window.innerWidth,
        smoothedMouse.y * window.innerHeight
      );

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    // Start animation; after a couple of frames, signal ready so splash can hide
    let frames = 0;
    const wrappedAnimate = (time: number) => {
      shaderMaterial.uniforms.iTime.value = time * 0.001;
      smoothedMouse.lerp(mouse, 0.1);
      shaderMaterial.uniforms.smoothedMouse.value.set(
        smoothedMouse.x * window.innerWidth,
        smoothedMouse.y * window.innerHeight
      );
      renderer.render(scene, camera);
      frames++;
      if (frames === 2) {
        try {
          const event = new CustomEvent('app-ready', { detail: { source: 'hero' } });
          window.dispatchEvent(event);
        } catch {}
      }
      requestAnimationFrame(wrappedAnimate);
    };

    wrappedAnimate(0);

    // Handle Window Resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      shaderMaterial.uniforms.iResolution.value.set(width, height);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
    }

    // Cleanup
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Scroll-driven shrink effect for the hero container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const radius = useTransform(scrollYProgress, [0, 0.5], ['0px', '40px']);
  const inverseScale = useTransform(scale, (v) => 1 / v);

  return (
    <section ref={sectionRef} className="relative h-[200vh]">
      <motion.div style={{ scale }} className="sticky top-16 md:top-0 h-screen">
        <motion.div className="relative w-full h-full overflow-hidden" style={{ borderRadius: radius }}>
          {/* Content wrapper with inverse scale so inner content doesn't shrink */}
          <motion.div className="absolute inset-0" style={{ scale: inverseScale }}>
            {/* Three.js Canvas Container */}
            <div ref={mountRef} className="absolute inset-0" />

            {/* Centered logo + tagline only */}
            <div className="absolute inset-0 z-10 p-5 flex items-center justify-center text-center">
              <div className="flex flex-col items-center gap-4">
                <img
                  src="/images/logo.png"
                  alt="VentureArc Logo"
                  className="w-[85vw] md:w-[520px] lg:w-[640px] xl:w-[720px] h-auto max-w-none"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "/images/Picsart_25-08-30_17-42-16-910.png";
                  }}
                />
                <p className="text-2xl sm:text-3xl md:text-[2rem] text-white/90 font-[family-name:var(--font-xeroda)]" style={{ letterSpacing: '0.09em' }}>The Social Innovation Tech Championship</p>
              </div>
            </div>

            {/* Grain overlay removed */}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}