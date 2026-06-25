import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "framer-motion";

const PROFILE = {
  name: "Shaurya Jain",
  identity: "Second-year CSE student — I design and ship web apps.",
  email: "shauryajm2818@gmail.com",
  github: "https://github.com/Shaurya-900",
};

const PROJECTS = [
  {
    index: "01",
    title: "Audio Transcriber",
    problem:
      "Turning a long recording into usable notes meant slow, manual typing.",
    solution:
      "Upload an audio file and get back a clean, readable transcript in seconds.",
    stack: ["Flask", "Groq Whisper", "Python"],
    demo: "https://audio-transcriber-sa9l.onrender.com/transcribe",
    image: "/audio-transcriber.png",
  },
  {
    index: "02",
    title: "Campus Lost & Found",
    problem:
      "Lost items on campus rarely reach their owners — posts get buried and descriptions never match.",
    solution:
      "Photos of lost and found items are matched automatically with vision AI, so claims surface without manual searching.",
    stack: ["React", "Node", "Gemini Vision"],
    demo: "https://campus-lost-found-serverless-4zq277m5r.vercel.app/",
    image: "/campus-lost-found.png",
  },
];

const EASE = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/* Animated background: faint dot grid + a layer of accent dots that  */
/* light up around the cursor.                                        */
/* ------------------------------------------------------------------ */
function Backdrop() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);

  useEffect(() => {
    if (reduce) return;
    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my, reduce]);

  const mask = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, #000 0%, transparent 70%)`;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      {/* base grid */}
      <div
        className="absolute inset-[-22px] animate-drift opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* accent dots revealed near the cursor */}
      {!reduce && (
        <motion.div
          className="absolute inset-[-22px]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(163,230,53,0.9) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            WebkitMaskImage: mask,
            maskImage: mask,
          }}
        />
      )}
      {/* soft vignette so content stays legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
    </div>
  );
}

/* Top scroll-progress bar */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}

/* Terminal-style typewriter for the identity line */
function useTypewriter(text, { speed = 34, delay = 550 } = {}) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState(reduce ? text : "");

  useEffect(() => {
    if (reduce) {
      setOut(text);
      return;
    }
    let i = 0;
    let t;
    const start = setTimeout(function tick() {
      i += 1;
      setOut(text.slice(0, i));
      if (i < text.length) t = setTimeout(tick, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearTimeout(t);
    };
  }, [text, speed, delay, reduce]);

  return [out, out.length < text.length];
}

/* Scroll-into-view reveal wrapper */
function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* Screenshot frame — shows the real image, falls back to a placeholder
   until the file exists in /public. */
function Screenshot({ src, alt }) {
  const [ok, setOk] = useState(Boolean(src));
  return (
    <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-md border border-zinc-800 bg-zinc-900/40">
      {ok ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setOk(false)}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center border border-dashed border-zinc-800 transition-transform duration-500 group-hover:scale-[1.03]">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-700">
            screenshot
          </span>
        </div>
      )}
    </div>
  );
}

function Tag({ children }) {
  return (
    <li className="font-mono text-xs text-zinc-400 border border-zinc-800 rounded px-2 py-1 leading-none transition-colors duration-200 group-hover:border-zinc-700">
      {children}
    </li>
  );
}

/* Bordered contact button (mono) — clear, tappable, no underline collisions */
function ContactButton({ href, children, external = false }) {
  const extra = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a
      href={href}
      {...extra}
      className="group/btn inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950/40 px-3 py-2 font-mono text-sm text-zinc-300 transition-colors duration-200 hover:border-accent/50 hover:text-white"
    >
      {children}
      <span
        aria-hidden="true"
        className="text-zinc-600 transition-all duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:text-accent"
      >
        {external ? "↗" : "→"}
      </span>
    </a>
  );
}

function InlineLink({ href, children, external = false }) {
  const extra = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a
      href={href}
      {...extra}
      className="text-zinc-200 underline decoration-zinc-700 decoration-1 underline-offset-4 transition-colors hover:decoration-accent hover:text-white"
    >
      {children}
    </a>
  );
}

/* Project card with cursor-tracking 3D tilt + glow */
function ProjectCard({ project, delay }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), spring);

  // glow position in px
  const gx = useMotionValue(0);
  const gy = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${gx}px ${gy}px, rgba(163,230,53,0.10), transparent 60%)`;

  function onMove(e) {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    gx.set(e.clientX - r.left);
    gy.set(e.clientY - r.top);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, ease: EASE, delay }}
      style={{ perspective: 1000 }}
    >
      <motion.article
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/50 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-accent/40 sm:p-8"
      >
        {/* cursor glow */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glow }}
        />

        <div className="relative">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-accent">{project.index}</span>
            <h3 className="font-mono text-xl font-medium tracking-tight text-zinc-100">
              {project.title}
            </h3>
          </div>

          <p className="mt-4 max-w-prose leading-relaxed text-zinc-400">
            <span className="text-zinc-500">{project.problem}</span>{" "}
            <span className="text-zinc-200">{project.solution}</span>
          </p>

          <Screenshot src={project.image} alt={`${project.title} screenshot`} />

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </ul>

          <div className="mt-6">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-zinc-200 transition-colors hover:text-accent"
            >
              <span className="underline decoration-zinc-700 decoration-1 underline-offset-4 transition-colors group-hover:decoration-accent">
                live demo
              </span>
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

/* Infinite tech marquee */
function Marquee() {
  const items = ["React", "Node", "Flask", "Python", "Gemini Vision", "Groq Whisper", "Tailwind", "Vite"];
  const row = [...items, ...items];
  return (
    <div className="relative mt-20 overflow-hidden border-y border-zinc-900 py-4 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
      <div className="flex w-max animate-marquee gap-8">
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-mono text-sm text-zinc-600"
          >
            {t}
            <span className="text-accent/60">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function App() {
  const [typed, typing] = useTypewriter(PROFILE.identity);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <>
      <Backdrop />
      <ScrollProgress />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:font-mono focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <div className="mx-auto w-full max-w-2xl px-6 py-20 sm:py-28">
        {/* ---- header ---- */}
        <motion.header variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              Available for work
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-5 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-zinc-50 [font-optical-sizing:auto] sm:text-7xl"
          >
            {PROFILE.name}
          </motion.h1>

          <motion.p
            variants={item}
            className={`mt-5 min-h-[3.5rem] max-w-md text-lg leading-relaxed text-zinc-400 sm:min-h-0 ${
              typing ? "caret" : ""
            }`}
          >
            {typed}
          </motion.p>

          <motion.nav
            variants={item}
            aria-label="Contact links"
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <ContactButton href={PROFILE.github} external>
              GitHub
            </ContactButton>
            <ContactButton href={`mailto:${PROFILE.email}`}>
              {PROFILE.email}
            </ContactButton>
          </motion.nav>
        </motion.header>

        <motion.hr
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          className="mt-12 h-px origin-left border-0 bg-gradient-to-r from-accent/60 to-transparent"
        />

        {/* ---- projects ---- */}
        <main id="main">
          <section className="mt-16" aria-labelledby="projects-heading">
            <Reveal>
              <div className="flex items-baseline justify-between">
                <h2
                  id="projects-heading"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500"
                >
                  Selected work
                </h2>
                <span className="font-mono text-xs text-zinc-700">
                  {String(PROJECTS.length).padStart(2, "0")} projects
                </span>
              </div>
            </Reveal>

            <div className="mt-6 grid gap-6">
              {PROJECTS.map((project, i) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </section>

          {/* ---- work with me ---- */}
          <Reveal className="mt-20">
            <section
              className="relative overflow-hidden rounded-lg border border-zinc-800 p-6 sm:p-8"
              aria-labelledby="work-heading"
            >
              <h2 id="work-heading">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Work with me
                </span>
              </h2>
              <p className="mt-4 max-w-prose text-lg leading-relaxed text-zinc-300">
                I build <span className="text-zinc-50">landing pages</span> and{" "}
                <span className="text-zinc-50">web tools</span> for small
                businesses — fast, responsive, and built to ship.{" "}
                <InlineLink href={`mailto:${PROFILE.email}`}>
                  Get in touch
                </InlineLink>
                .
              </p>
            </section>
          </Reveal>

          <Marquee />
        </main>

        {/* ---- footer ---- */}
        <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-900 pt-8 font-mono text-xs text-zinc-600">
          <span>© {new Date().getFullYear()} Shaurya Jain</span>
          <span>Built with React + Tailwind</span>
        </footer>
      </div>
    </>
  );
}
