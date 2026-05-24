import { useState, useEffect, useRef } from "react";
import {
  Code2, Brain, Smartphone, BarChart3, Palette, Server, Zap, Cloud,
  Github, Linkedin, Mail, Phone, MapPin, MessageSquare, ChevronDown,
  ChevronUp, ExternalLink, Star, Menu, X, ArrowRight, Check, Send,
  Loader, Eye, EyeOff, Lock, User, Shield, Cpu, Globe, Layers
} from "lucide-react";

/* ── GLOBAL STYLES ── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Sora:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{background:#060610;color:#E2E8FF;font-family:'Sora',sans-serif;overflow-x:hidden;min-height:100vh;}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-track{background:#060610;}
::-webkit-scrollbar-thumb{background:linear-gradient(#4A8BFF,#9B5CF6);border-radius:4px;}

@keyframes orb-drift{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(35px,-28px) scale(1.08)}66%{transform:translate(-22px,20px) scale(0.94)}}
@keyframes gradient-flow{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes spin-ring{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes pulse-dot{0%,100%{box-shadow:0 0 4px #4A8BFF}50%{box-shadow:0 0 12px #4A8BFF,0 0 24px #4A8BFF55}}
@keyframes fade-in-up{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
@keyframes slide-in{from{opacity:0;transform:translateX(-32px)}to{opacity:1;transform:translateX(0)}}
@keyframes particle-rise{0%{opacity:0;transform:translateY(0) translateX(0) scale(0)}8%{opacity:1}90%{opacity:.7}100%{opacity:0;transform:translateY(-110vh) translateX(var(--px-drift)) scale(1.4)}}
@keyframes progress-in{from{width:0%}to{width:var(--w)}}
@keyframes scan{from{top:0%}to{top:100%}}
@keyframes counter-pop{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}
@keyframes hex-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes glow-breathe{0%,100%{box-shadow:0 0 15px rgba(74,139,255,.25)}50%{box-shadow:0 0 35px rgba(74,139,255,.6),0 0 70px rgba(155,92,246,.25)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
@keyframes shimmer{from{background-position:-200% 0}to{background-position:200% 0}}

.orbitron{font-family:'Orbitron',monospace;}
.gradient-text{background:linear-gradient(135deg,#4A8BFF,#9B5CF6,#06B6D4);background-size:200%;animation:gradient-flow 5s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

.glass{background:rgba(255,255,255,0.038);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);border:1px solid rgba(255,255,255,0.075);border-radius:16px;transition:all .3s ease;}
.glass:hover{background:rgba(255,255,255,0.065);border-color:rgba(74,139,255,0.28);transform:translateY(-4px);box-shadow:0 20px 60px rgba(74,139,255,0.1),0 0 0 1px rgba(74,139,255,0.08);}

.btn-glow{background:linear-gradient(135deg,#4A8BFF,#9B5CF6);background-size:200%;animation:gradient-flow 4s ease infinite;border:none;border-radius:10px;color:#fff;cursor:pointer;font-family:'Sora',sans-serif;font-size:14px;font-weight:600;padding:13px 26px;transition:all .3s ease;display:inline-flex;align-items:center;gap:8px;white-space:nowrap;}
.btn-glow:hover{box-shadow:0 0 28px rgba(74,139,255,.55),0 0 55px rgba(155,92,246,.2);transform:translateY(-2px);}
.btn-outline{background:transparent;border:1px solid rgba(74,139,255,.45);border-radius:10px;color:#E2E8FF;cursor:pointer;font-family:'Sora',sans-serif;font-size:14px;font-weight:500;padding:13px 26px;transition:all .3s ease;display:inline-flex;align-items:center;gap:8px;}
.btn-outline:hover{background:rgba(74,139,255,.08);border-color:#4A8BFF;box-shadow:0 0 18px rgba(74,139,255,.18);}

.tag-chip{display:inline-block;font-size:10px;font-weight:700;padding:4px 11px;border-radius:20px;letter-spacing:.05em;text-transform:uppercase;}
.nav-btn{background:none;border:none;border-radius:8px;color:#6B7A9B;cursor:pointer;font-family:'Sora',sans-serif;font-size:13px;font-weight:500;padding:8px 13px;transition:all .2s;}
.nav-btn:hover{color:#E2E8FF;background:rgba(255,255,255,0.05);}
.nav-btn.active{color:#4A8BFF;background:rgba(74,139,255,.1);}

.field{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);border-radius:10px;color:#E2E8FF;font-family:'Sora',sans-serif;font-size:14px;outline:none;padding:13px 16px;width:100%;transition:all .3s ease;}
.field:focus{border-color:#4A8BFF;box-shadow:0 0 18px rgba(74,139,255,.15);}
.field::placeholder{color:#3A4560;}

.grid-bg{background-image:linear-gradient(rgba(74,139,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(74,139,255,.035) 1px,transparent 1px);background-size:56px 56px;}

@media(max-width:768px){
  .hide-mob{display:none!important;}
  .show-mob{display:flex!important;}
  .mob-stack{flex-direction:column!important;}
  .mob-full{width:100%!important;}
  .mob-center{text-align:center!important;}
}
`;

/* ── DATA ── */
const SERVICES = [
  {icon:Code2,   title:"Web Development",  desc:"Full-stack web apps built with cutting-edge tech — from landing pages to complex SaaS platforms.", color:"#4A8BFF", bg:"rgba(74,139,255,.1)",  tags:["React","Node.js","Next.js"]},
  {icon:Brain,   title:"AI Solutions",     desc:"Custom ML models, NLP pipelines, and intelligent automation that gives your business a competitive edge.", color:"#9B5CF6", bg:"rgba(155,92,246,.1)", tags:["Python","TensorFlow","OpenAI"]},
  {icon:Smartphone,title:"App Development",desc:"Cross-platform mobile apps with native performance and premium UI that users genuinely love.", color:"#06B6D4", bg:"rgba(6,182,212,.1)",   tags:["React Native","Flutter","Expo"]},
  {icon:BarChart3,title:"Dashboard Systems",desc:"Real-time analytics dashboards with interactive charts, KPI tracking, and actionable intelligence.", color:"#F59E0B", bg:"rgba(245,158,11,.1)", tags:["D3.js","Chart.js","Recharts"]},
  {icon:Palette, title:"UI/UX Design",     desc:"Stunning interfaces that balance beauty and function. Figma to production-ready code with pixel precision.", color:"#EC4899", bg:"rgba(236,72,153,.1)", tags:["Figma","Tailwind","Framer"]},
  {icon:Server,  title:"Backend & APIs",   desc:"Robust REST and GraphQL APIs with secure architecture, JWT auth, and scalable microservices design.", color:"#10B981", bg:"rgba(16,185,129,.1)", tags:["Node.js","Express","GraphQL"]},
  {icon:Zap,     title:"Automation Tools", desc:"Workflow automation that eliminates manual drudgery — web scrapers, bots, pipeline orchestration.", color:"#F97316", bg:"rgba(249,115,22,.1)", tags:["Python","Selenium","n8n"]},
  {icon:Cloud,   title:"Cloud Integration",desc:"Seamless cloud deployment and CI/CD pipelines on AWS, GCP, and Azure for bulletproof reliability.", color:"#6366F1", bg:"rgba(99,102,241,.1)",  tags:["AWS","Docker","Kubernetes"]},
];

const PROJECTS = [
  {title:"Smart GUI Calculator",   desc:"Futuristic calculator with glassmorphism UI, scientific functions, history log, and theming engine.", tech:["Python","CustomTkinter","Tkinter"], color:"#4A8BFF", status:"Live"},
  {title:"AI Analytics Dashboard", desc:"Real-time analytics platform with ML-powered insight cards, predictive trend charts, and export tools.", tech:["React","FastAPI","TensorFlow"],    color:"#9B5CF6", status:"Live"},
  {title:"Student Management System",desc:"Full-stack CRUD portal — attendance tracking, grade sheets, parent reports, and admin dashboard.", tech:["Node.js","MongoDB","React"],        color:"#06B6D4", status:"Live"},
  {title:"E-Commerce Platform",    desc:"Scalable store with Stripe payments, inventory manager, dynamic product catalog, and seller portal.", tech:["Next.js","Stripe","PostgreSQL"],  color:"#10B981", status:"In Dev"},
  {title:"AI Chatbot Assistant",   desc:"Context-aware conversational AI with memory, multi-language support, and custom knowledge base.", tech:["Python","OpenAI","FastAPI"],       color:"#F59E0B", status:"Live"},
  {title:"Portfolio CMS",          desc:"Drag-and-drop content management system with live preview, SEO tools, and media asset library.", tech:["React","Node.js","MySQL"],          color:"#EC4899", status:"Live"},
];

const TESTIMONIALS = [
  {name:"Arjun Sharma",  role:"CTO, TechVision India",  text:"Nexvora delivered our platform ahead of schedule with exceptional quality. The AI integration exceeded all expectations — truly world-class engineering.", rating:5, av:"AS"},
  {name:"Priya Mehta",   role:"Founder, StartupEdge",   text:"Sam transformed our rough idea into a stunning product. The UI/UX is on par with top SaaS companies and the code is clean, documented, and maintainable.", rating:5, av:"PM"},
  {name:"Ravi Patel",    role:"Product Manager, InnovateCo",text:"Working with Nexvora felt like having a Silicon Valley team in Nashik. Incredible attention to detail, responsive communication, and they genuinely care.", rating:5, av:"RP"},
];

const TECHS = ["React.js","Node.js","Python","MongoDB","TypeScript","Next.js","TensorFlow","AWS","Docker","PostgreSQL","GraphQL","Redis","Flutter","FastAPI","Kubernetes","Figma"];

const STATS = [
  {val:50,  suf:"+", label:"Projects Delivered"},
  {val:30,  suf:"+", label:"Happy Clients"},
  {val:3,   suf:"+", label:"Years Building"},
  {val:100, suf:"%", label:"Satisfaction Rate"},
];

const SKILLS = [
  {name:"React / Next.js",    lvl:92},
  {name:"Node.js / Express",  lvl:88},
  {name:"Python & AI/ML",     lvl:85},
  {name:"UI/UX & Design",     lvl:83},
  {name:"Database Architecture",lvl:87},
  {name:"Cloud & DevOps",     lvl:75},
];

const TIMELINE = [
  {year:"2022",title:"Nexvora Founded",       desc:"Launched as a freelance dev studio with a mission to make AI-powered digital products accessible to every business."},
  {year:"2023",title:"First 15+ Projects",    desc:"Delivered full-stack platforms and automation tools for startups and SMBs across India. Expanded into AI consulting."},
  {year:"2024",title:"AI Innovation Focus",   desc:"Launched dedicated AI/ML service line, integrating LLMs, computer vision, and intelligent automation into client products."},
  {year:"2025",title:"Global Reach",          desc:"Serving clients across India, UAE & UK. Building enterprise SaaS and scaling operations with a team of specialist engineers."},
];

const FAQS = [
  {q:"How long does a typical project take?",           a:"Project timelines scale with complexity. A standard web build takes 2–4 weeks; AI/ML integrations typically 4–8 weeks. You'll always get a detailed milestone timeline before we start."},
  {q:"What's your development process?",               a:"Discovery → Architecture → Build → QA → Deploy. We use agile sprints with weekly demos so you always see live progress and can course-correct early."},
  {q:"Do you provide post-launch support?",            a:"Every project includes 30 days of complimentary post-launch support. We also offer flexible monthly maintenance and enhancement packages."},
  {q:"How do you handle project communication?",       a:"Slack/Discord for async updates, weekly Loom videos for progress demos, and a shared Notion board for transparency on every task and decision."},
  {q:"Can you work with international clients?",       a:"Absolutely. We operate primarily in IST but schedule overlap calls across EU, US, and Gulf time zones. Payment via wire, PayPal, or Stripe."},
];

/* ── HOOKS ── */
function useTypewriter(strings, speed = 90) {
  const [txt, setTxt] = useState("");
  const state = useRef({si:0, ci:0, del:false});
  useEffect(() => {
    const s = state.current;
    const cur = strings[s.si];
    const id = setTimeout(() => {
      if (!s.del) {
        if (s.ci < cur.length) { s.ci++; setTxt(cur.slice(0, s.ci)); }
        else setTimeout(() => { s.del = true; }, 2200);
      } else {
        if (s.ci > 0) { s.ci--; setTxt(cur.slice(0, s.ci)); }
        else { s.del = false; s.si = (s.si + 1) % strings.length; }
      }
    }, s.del ? speed / 2 : speed);
    return () => clearTimeout(id);
  });
  return txt;
}

function useAnimCounter(target, active) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let v = 0;
    const step = target / 55;
    const id = setInterval(() => {
      v = Math.min(v + step, target);
      setN(Math.round(v));
      if (v >= target) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [active, target]);
  return n;
}

/* ── NEXVORA LOGO SVG ── */
function Logo({ w = 140 }) {
  return (
    <svg width={w} height={w * 0.25} viewBox="0 0 140 35" fill="none">
      <defs>
        <linearGradient id="nlg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4A8BFF"/>
          <stop offset="50%" stopColor="#9B5CF6"/>
          <stop offset="100%" stopColor="#06B6D4"/>
        </linearGradient>
      </defs>
      <polygon points="4,29 16,5 28,29 22,29 16,15 10,29" fill="url(#nlg)"/>
      <polygon points="16,5 28,29 34,29 22,5" fill="#9B5CF6" opacity=".55"/>
      <text x="40" y="24" fontFamily="Orbitron, monospace" fontSize="15" fontWeight="800" fill="url(#nlg)" letterSpacing="1">NEXVORA</text>
    </svg>
  );
}

/* ── PARTICLES ── */
function Particles() {
  const pts = useRef([...Array(28)].map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 12,
    dur: 9 + Math.random() * 13,
    size: 1 + Math.random() * 2.2,
    drift: (Math.random() - .5) * 110,
    color: i % 3 === 0 ? "#4A8BFF" : i % 3 === 1 ? "#9B5CF6" : "#06B6D4",
  }))).current;
  return (
    <div style={{position:"fixed",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
      {pts.map((p, i) => (
        <div key={i} style={{
          position:"absolute", bottom:-6, left:`${p.left}%`,
          width:`${p.size}px`, height:`${p.size}px`, borderRadius:"50%",
          background:p.color, boxShadow:`0 0 5px ${p.color}`,
          "--px-drift":`${p.drift}px`,
          animation:`particle-rise ${p.dur}s ${p.delay}s ease-in infinite`,
        }}/>
      ))}
    </div>
  );
}

/* ── LOADING SCREEN ── */
function LoadingScreen({ onDone }) {
  const [prog, setProg] = useState(0);
  const [label, setLabel] = useState("INITIALIZING...");
  useEffect(() => {
    let p = 0;
    const labels = ["INITIALIZING...","LOADING MODULES...","CONNECTING AI...","LAUNCHING...","READY"];
    const id = setInterval(() => {
      p += 1.6;
      setProg(Math.min(p, 100));
      if (p >= 20) setLabel(labels[1]);
      if (p >= 55) setLabel(labels[2]);
      if (p >= 80) setLabel(labels[3]);
      if (p >= 95) setLabel(labels[4]);
      if (p >= 100) { clearInterval(id); setTimeout(onDone, 500); }
    }, 28);
    return () => clearInterval(id);
  }, [onDone]);
  return (
    <div style={{position:"fixed",inset:0,background:"#060610",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:9999,gap:28}}>
      <div style={{position:"relative",width:96,height:96}}>
        <div style={{position:"absolute",inset:0,border:"2px solid transparent",borderRadius:"50%",borderTopColor:"#4A8BFF",borderRightColor:"#9B5CF6",animation:"spin-ring 1.4s linear infinite"}}/>
        <div style={{position:"absolute",inset:10,border:"1px solid rgba(6,182,212,.35)",borderRadius:"50%",animation:"spin-ring 2.2s linear reverse infinite"}}/>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Logo w={60}/>
        </div>
      </div>
      <div style={{textAlign:"center",gap:8,display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div className="orbitron" style={{fontSize:26,fontWeight:900,letterSpacing:3}}>
          <span style={{color:"#4A8BFF"}}>NEX</span><span style={{color:"#9B5CF6"}}>VORA</span>
        </div>
        <div className="orbitron" style={{fontSize:9,color:"#4A8BFF",letterSpacing:"0.35em"}}>{label}</div>
      </div>
      <div style={{width:260,background:"rgba(255,255,255,0.05)",borderRadius:4,height:3,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${prog}%`,background:"linear-gradient(90deg,#4A8BFF,#9B5CF6,#06B6D4)",borderRadius:4,transition:"width .05s linear"}}/>
      </div>
      <div className="orbitron" style={{fontSize:10,color:"rgba(255,255,255,.22)",letterSpacing:"0.12em"}}>{Math.round(prog)}%</div>
    </div>
  );
}

/* ── NAVBAR ── */
function Navbar({ page, nav, menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const items = ["home","about","services","portfolio","contact","support"];
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:scrolled?"rgba(6,6,16,0.88)":"transparent",backdropFilter:scrolled?"blur(22px)":"none",borderBottom:scrolled?"1px solid rgba(255,255,255,0.055)":"none",transition:"all .3s ease",padding:"0 20px"}}>
      <div style={{maxWidth:1200,margin:"0 auto",height:66,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={() => nav("home")} style={{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",alignItems:"center"}}>
          <Logo w={130}/>
        </button>
        <div className="hide-mob" style={{display:"flex",gap:2}}>
          {items.map(it => (
            <button key={it} className={`nav-btn ${page===it?"active":""}`} onClick={() => nav(it)}>
              {it.charAt(0).toUpperCase()+it.slice(1)}
            </button>
          ))}
        </div>
        <div className="hide-mob" style={{display:"flex",gap:10,alignItems:"center"}}>
          <button className="nav-btn" onClick={() => nav("auth")}>Login</button>
          <button className="btn-glow" style={{padding:"10px 18px",fontSize:13}} onClick={() => nav("contact")}>
            Get Started <ArrowRight size={13}/>
          </button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{background:"none",border:"none",cursor:"pointer",color:"#E2E8FF",padding:6,display:"none"}} className="show-mob">
          {menuOpen ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>
      {menuOpen && (
        <div style={{background:"rgba(6,6,16,.97)",backdropFilter:"blur(22px)",borderTop:"1px solid rgba(255,255,255,.06)",padding:"18px 20px 22px",display:"flex",flexDirection:"column",gap:4}}>
          {[...items,"auth"].map(it => (
            <button key={it} className={`nav-btn ${page===it?"active":""}`} style={{textAlign:"left",padding:"13px 14px"}} onClick={() => { nav(it); setMenuOpen(false); }}>
              {it==="auth"?"Login / Signup":it.charAt(0).toUpperCase()+it.slice(1)}
            </button>
          ))}
          <button className="btn-glow" style={{marginTop:10,justifyContent:"center"}} onClick={() => { nav("contact"); setMenuOpen(false); }}>
            Get Started <ArrowRight size={14}/>
          </button>
        </div>
      )}
    </nav>
  );
}

/* ── STAT CARD ── */
function StatCard({ val, suf, label }) {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  const count = useAnimCounter(val, on);
  useEffect(() => {
    const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) setOn(true); });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="glass" style={{padding:"22px 28px",textAlign:"center",minWidth:148}}>
      <div className="orbitron gradient-text" style={{fontSize:38,fontWeight:900,lineHeight:1}}>{count}{suf}</div>
      <div style={{color:"#6B7A9B",fontSize:12,marginTop:6,fontWeight:500}}>{label}</div>
    </div>
  );
}

/* ── HOME PAGE ── */
function HomePage({ nav }) {
  const typed = useTypewriter(["Web Applications","AI Systems","Mobile Apps","SaaS Platforms","Digital Products"]);
  return (
    <div>
      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"110px 24px 70px",position:"relative",overflow:"hidden"}} className="grid-bg">
        <div style={{position:"absolute",top:"14%",left:"8%",width:520,height:520,borderRadius:"50%",background:"radial-gradient(circle,rgba(74,139,255,.1) 0%,transparent 68%)",animation:"orb-drift 14s ease infinite",filter:"blur(50px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"45%",right:"4%",width:380,height:380,borderRadius:"50%",background:"radial-gradient(circle,rgba(155,92,246,.09) 0%,transparent 68%)",animation:"orb-drift 18s 4s ease infinite",filter:"blur(45px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"12%",left:"40%",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(6,182,212,.07) 0%,transparent 68%)",animation:"orb-drift 11s 7s ease infinite",filter:"blur(35px)",pointerEvents:"none"}}/>
        <div style={{maxWidth:880,textAlign:"center",position:"relative",zIndex:1}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(74,139,255,.1)",border:"1px solid rgba(74,139,255,.22)",borderRadius:24,padding:"6px 16px",marginBottom:32}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#4A8BFF",animation:"pulse-dot 2s ease infinite"}}/>
            <span style={{fontSize:11,color:"#4A8BFF",fontWeight:600,letterSpacing:".05em"}}>AI-POWERED SOFTWARE STUDIO • NASHIK, INDIA</span>
          </div>
          <h1 className="orbitron" style={{fontSize:"clamp(34px,6vw,70px)",fontWeight:900,lineHeight:1.1,marginBottom:22,animation:"fade-in-up .9s ease both"}}>
            <span style={{color:"#E2E8FF"}}>Transforming Ideas Into</span><br/>
            <span className="gradient-text">Intelligent Digital</span><br/>
            <span style={{color:"#E2E8FF"}}>Solutions</span>
          </h1>
          <div style={{fontSize:17,color:"#6B7A9B",marginBottom:10,minHeight:26}}>
            We Engineer Premium <span style={{color:"#4A8BFF",fontWeight:600}}>{typed}</span>
            <span style={{color:"#4A8BFF",animation:"blink 1s ease infinite",marginLeft:1}}>|</span>
          </div>
          <p style={{fontSize:15,color:"#4A5570",maxWidth:560,margin:"0 auto 38px",lineHeight:1.85,animation:"fade-in-up .9s .2s ease both"}}>
            Nexvora is a next-generation software studio crafting AI-powered platforms, automation systems, and intelligent digital experiences for startups and enterprises worldwide.
          </p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",animation:"fade-in-up .9s .35s ease both"}}>
            <button className="btn-glow" style={{fontSize:15,padding:"14px 30px"}} onClick={() => nav("portfolio")}>
              View Our Work <ArrowRight size={16}/>
            </button>
            <button className="btn-outline" style={{fontSize:15,padding:"14px 30px"}} onClick={() => nav("contact")}>
              Start a Project
            </button>
          </div>
          <div style={{display:"flex",gap:28,justifyContent:"center",marginTop:52,flexWrap:"wrap"}}>
            {["React","Node.js","Python","AI/ML","MongoDB"].map(t => (
              <div key={t} style={{fontSize:11,color:"#3A4560",fontWeight:700,display:"flex",alignItems:"center",gap:6,letterSpacing:".05em"}}>
                <div style={{width:4,height:4,borderRadius:"50%",background:"#4A8BFF",boxShadow:"0 0 6px #4A8BFF"}}/>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:5,opacity:.4}}>
          <div className="orbitron" style={{fontSize:9,color:"#4A5570",letterSpacing:".2em"}}>SCROLL</div>
          <div style={{width:1,height:36,background:"linear-gradient(#4A8BFF,transparent)"}}/>
        </div>
      </section>

      {/* STATS */}
      <section style={{padding:"52px 24px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"}}>
          {STATS.map(s => <StatCard key={s.label} {...s}/>)}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section style={{padding:"72px 24px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:52}}>
          <span className="tag-chip" style={{background:"rgba(155,92,246,.1)",color:"#9B5CF6",border:"1px solid rgba(155,92,246,.22)",marginBottom:14}}>WHAT WE BUILD</span>
          <h2 className="orbitron gradient-text" style={{fontSize:"clamp(26px,4vw,44px)",fontWeight:800,marginBottom:12}}>Core Services</h2>
          <p style={{color:"#4A5570",maxWidth:480,margin:"0 auto"}}>End-to-end digital solutions crafted with precision, powered by AI.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(258px,1fr))",gap:20}}>
          {SERVICES.slice(0,4).map((s,i) => (
            <div key={s.title} className="glass" style={{padding:"28px",animation:`fade-in-up .7s ${i*.1}s both`}}>
              <div style={{width:50,height:50,borderRadius:14,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18,border:`1px solid ${s.color}20`}}>
                <s.icon size={22} color={s.color}/>
              </div>
              <h3 className="orbitron" style={{fontSize:14,fontWeight:700,color:"#E2E8FF",marginBottom:10}}>{s.title}</h3>
              <p style={{color:"#4A5570",fontSize:13,lineHeight:1.75,marginBottom:16}}>{s.desc}</p>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {s.tags.map(t => <span key={t} style={{fontSize:10,background:`${s.color}14`,color:s.color,border:`1px solid ${s.color}20`,borderRadius:6,padding:"3px 8px",fontWeight:700}}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:32}}>
          <button className="btn-outline" onClick={() => nav("services")}>Explore All Services <ArrowRight size={14}/></button>
        </div>
      </section>

      {/* TECH STRIP */}
      <section style={{padding:"44px 24px",background:"rgba(74,139,255,.018)",borderTop:"1px solid rgba(255,255,255,.038)",borderBottom:"1px solid rgba(255,255,255,.038)"}}>
        <div style={{maxWidth:980,margin:"0 auto",textAlign:"center"}}>
          <p className="orbitron" style={{fontSize:9,color:"#3A4560",letterSpacing:".25em",marginBottom:24}}>TECHNOLOGIES WE MASTER</p>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
            {TECHS.map(t => (
              <div key={t} className="glass" style={{padding:"7px 16px",fontSize:12,fontWeight:500,color:"#6B7A9B",borderRadius:8,cursor:"default"}}
                onMouseEnter={e=>{e.currentTarget.style.color="#E2E8FF";e.currentTarget.style.borderColor="rgba(74,139,255,.3)";}}
                onMouseLeave={e=>{e.currentTarget.style.color="#6B7A9B";e.currentTarget.style.borderColor="";}}
              >{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{padding:"72px 24px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:50}}>
          <span className="tag-chip" style={{background:"rgba(6,182,212,.1)",color:"#06B6D4",border:"1px solid rgba(6,182,212,.2)",marginBottom:14}}>CLIENT LOVE</span>
          <h2 className="orbitron" style={{fontSize:"clamp(24px,3.5vw,40px)",fontWeight:800}}>
            What <span className="gradient-text">Clients Say</span>
          </h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20}}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="glass" style={{padding:"28px"}}>
              <div style={{display:"flex",gap:3,marginBottom:16}}>
                {[...Array(t.rating)].map((_,i) => <Star key={i} size={13} style={{color:"#F59E0B",fill:"#F59E0B"}}/>)}
              </div>
              <p style={{color:"#A0AABB",fontSize:14,lineHeight:1.82,marginBottom:22,fontStyle:"italic"}}>"{t.text}"</p>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#4A8BFF,#9B5CF6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff"}}>{t.av}</div>
                <div>
                  <div style={{fontWeight:600,fontSize:14,color:"#E2E8FF"}}>{t.name}</div>
                  <div style={{color:"#4A5570",fontSize:12}}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{padding:"48px 24px 80px",maxWidth:880,margin:"0 auto"}}>
        <div className="glass" style={{padding:"48px 40px",textAlign:"center",background:"linear-gradient(135deg,rgba(74,139,255,.07),rgba(155,92,246,.07))",border:"1px solid rgba(74,139,255,.18)",position:"relative",overflow:"hidden",animation:"glow-breathe 4s ease infinite"}}>
          <div style={{position:"absolute",top:-50,right:-50,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(74,139,255,.12) 0%,transparent 70%)",filter:"blur(20px)",pointerEvents:"none"}}/>
          <h2 className="orbitron" style={{fontSize:"clamp(22px,3vw,34px)",fontWeight:900,marginBottom:14}}>
            Ready to Build <span className="gradient-text">Something Amazing?</span>
          </h2>
          <p style={{color:"#6B7A9B",maxWidth:480,margin:"0 auto 32px",lineHeight:1.8}}>Free consultation, zero commitment. Let's turn your vision into a production-ready digital product.</p>
          <button className="btn-glow" style={{fontSize:15,padding:"14px 32px"}} onClick={() => nav("contact")}>
            Start Your Project <ArrowRight size={16}/>
          </button>
        </div>
      </section>
    </div>
  );
}

/* ── ABOUT PAGE ── */
function AboutPage() {
  return (
    <div style={{minHeight:"100vh",paddingTop:100}}>
      <section style={{padding:"58px 24px 44px",maxWidth:1100,margin:"0 auto",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:600,height:300,background:"radial-gradient(circle,rgba(155,92,246,.07) 0%,transparent 70%)",filter:"blur(50px)",pointerEvents:"none"}}/>
        <span className="tag-chip" style={{background:"rgba(74,139,255,.1)",color:"#4A8BFF",border:"1px solid rgba(74,139,255,.2)",marginBottom:14}}>ABOUT NEXVORA</span>
        <h1 className="orbitron gradient-text" style={{fontSize:"clamp(28px,4.5vw,52px)",fontWeight:900,marginBottom:16}}>Who We Are</h1>
        <p style={{color:"#6B7A9B",maxWidth:580,margin:"0 auto",lineHeight:1.85}}>Nexvora is a modern software studio at the intersection of design, engineering, and artificial intelligence — building digital products that genuinely move the needle.</p>
      </section>

      {/* MISSION / VISION / VALUES */}
      <section style={{padding:"32px 24px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:18}}>
          {[
            {emoji:"🎯",title:"Our Mission",text:"To democratize access to cutting-edge software solutions, empowering businesses of every size with AI-powered tools that drive real growth and competitive advantage.",color:"#4A8BFF"},
            {emoji:"🔭",title:"Our Vision", text:"A world where every company — regardless of size or budget — has access to enterprise-grade technology. We bridge the gap between innovative ideas and production-ready digital realities.",color:"#9B5CF6"},
            {emoji:"💡",title:"Our Values", text:"Innovation-first thinking, radical transparency, craftsmanship in every line of code, genuine partnership over transactions, and relentless improvement. Quality is never optional.",color:"#06B6D4"},
          ].map(item => (
            <div key={item.title} className="glass" style={{padding:"30px"}}>
              <div style={{fontSize:28,marginBottom:12}}>{item.emoji}</div>
              <h3 className="orbitron" style={{fontSize:15,fontWeight:700,color:item.color,marginBottom:12}}>{item.title}</h3>
              <p style={{color:"#6B7A9B",fontSize:13,lineHeight:1.82}}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <section style={{padding:"56px 24px",maxWidth:900,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:38}}>
          <h2 className="orbitron" style={{fontSize:"clamp(24px,3.5vw,38px)",fontWeight:800}}>Meet the <span className="gradient-text">Founder</span></h2>
        </div>
        <div className="glass" style={{padding:"38px",display:"flex",gap:36,alignItems:"center",flexWrap:"wrap",background:"linear-gradient(135deg,rgba(74,139,255,.05),rgba(155,92,246,.05))"}}>
          <div style={{flexShrink:0,textAlign:"center"}}>
            <div style={{width:116,height:116,borderRadius:"50%",background:"linear-gradient(135deg,#4A8BFF,#9B5CF6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,fontWeight:900,fontFamily:"Orbitron,monospace",color:"#fff",boxShadow:"0 0 44px rgba(74,139,255,.4)",margin:"0 auto"}}>SG</div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:12}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:"#10B981",boxShadow:"0 0 8px #10B981",animation:"pulse-dot 2s ease infinite"}}/>
              <span style={{fontSize:10,color:"#10B981",fontWeight:700,letterSpacing:".05em"}}>AVAILABLE</span>
            </div>
          </div>
          <div style={{flex:1,minWidth:220}}>
            <span className="tag-chip" style={{background:"rgba(74,139,255,.1)",color:"#4A8BFF",border:"1px solid rgba(74,139,255,.2)",marginBottom:10,display:"inline-block"}}>FOUNDER & CEO</span>
            <h3 className="orbitron" style={{fontSize:24,fontWeight:900,color:"#E2E8FF",marginBottom:4}}>Sanskar Gavali</h3>
            <p style={{color:"#9B5CF6",fontSize:14,marginBottom:18}}>aka <strong style={{color:"#06B6D4"}}>"Sam"</strong> — Full-Stack Developer & AI Engineer</p>
            <p style={{color:"#6B7A9B",fontSize:14,lineHeight:1.85,marginBottom:18}}>
              Passionate software engineer with deep expertise in full-stack development, AI integration, and modern UI/UX design. Sam founded Nexvora with the belief that premium software should be within reach of every visionary founder — not just the well-funded ones.
            </p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {["Full-Stack Dev","AI Engineer","UI Designer","Open Source"].map(tag => (
                <span key={tag} style={{fontSize:11,background:"rgba(155,92,246,.1)",color:"#9B5CF6",border:"1px solid rgba(155,92,246,.2)",borderRadius:6,padding:"4px 10px",fontWeight:700}}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section style={{padding:"36px 24px 52px",maxWidth:720,margin:"0 auto"}}>
        <h2 className="orbitron" style={{fontSize:26,fontWeight:800,textAlign:"center",marginBottom:36}}>Technical <span className="gradient-text">Expertise</span></h2>
        <div style={{display:"flex",flexDirection:"column",gap:18}}>
          {SKILLS.map(s => (
            <div key={s.name}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontSize:14,fontWeight:500,color:"#C4CFDF"}}>{s.name}</span>
                <span style={{fontSize:12,color:"#4A8BFF",fontWeight:700}}>{s.lvl}%</span>
              </div>
              <div style={{height:4,background:"rgba(255,255,255,0.05)",borderRadius:4,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${s.lvl}%`,background:"linear-gradient(90deg,#4A8BFF,#9B5CF6)",borderRadius:4}}/>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{padding:"36px 24px 80px",maxWidth:760,margin:"0 auto"}}>
        <h2 className="orbitron" style={{fontSize:26,fontWeight:800,textAlign:"center",marginBottom:36}}>Our <span className="gradient-text">Journey</span></h2>
        <div style={{position:"relative"}}>
          <div style={{position:"absolute",left:20,top:0,bottom:0,width:1,background:"linear-gradient(to bottom,#4A8BFF,#9B5CF6,transparent)"}}/>
          {TIMELINE.map((item,i) => (
            <div key={item.year} style={{display:"flex",gap:28,marginBottom:32}}>
              <div style={{flexShrink:0,width:40,height:40,borderRadius:"50%",background:i%2===0?"rgba(74,139,255,.15)":"rgba(155,92,246,.15)",border:`1px solid ${i%2===0?"#4A8BFF":"#9B5CF6"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontFamily:"Orbitron,monospace",fontWeight:800,color:i%2===0?"#4A8BFF":"#9B5CF6",zIndex:1}}>
                {item.year.slice(2)}
              </div>
              <div className="glass" style={{flex:1,padding:"20px 22px"}}>
                <div className="orbitron" style={{fontSize:10,color:i%2===0?"#4A8BFF":"#9B5CF6",marginBottom:4,fontWeight:700,letterSpacing:".1em"}}>{item.year}</div>
                <h4 style={{fontWeight:700,fontSize:15,color:"#E2E8FF",marginBottom:8}}>{item.title}</h4>
                <p style={{color:"#6B7A9B",fontSize:13,lineHeight:1.75}}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ── SERVICES PAGE ── */
function ServicesPage() {
  return (
    <div style={{minHeight:"100vh",paddingTop:100,padding:"100px 24px 80px",maxWidth:1200,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:58}}>
        <span className="tag-chip" style={{background:"rgba(74,139,255,.1)",color:"#4A8BFF",border:"1px solid rgba(74,139,255,.2)",marginBottom:14}}>SERVICES</span>
        <h1 className="orbitron gradient-text" style={{fontSize:"clamp(26px,4.5vw,50px)",fontWeight:900,marginBottom:14}}>What We Build</h1>
        <p style={{color:"#4A5570",maxWidth:480,margin:"0 auto"}}>Premium digital solutions engineered for performance, scalability, and stunning user experiences.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:22}}>
        {SERVICES.map((s,i) => (
          <div key={s.title} className="glass" style={{padding:"30px",animation:`fade-in-up .6s ${i*.08}s both`}}>
            <div style={{width:54,height:54,borderRadius:16,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20,border:`1px solid ${s.color}1A`,boxShadow:`0 0 18px ${s.color}1A`}}>
              <s.icon size={24} color={s.color}/>
            </div>
            <h3 className="orbitron" style={{fontSize:14,fontWeight:700,color:"#E2E8FF",marginBottom:10}}>{s.title}</h3>
            <p style={{color:"#4A5570",fontSize:13,lineHeight:1.78,marginBottom:16}}>{s.desc}</p>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>
              {s.tags.map(t => <span key={t} style={{fontSize:10,background:`${s.color}14`,color:s.color,border:`1px solid ${s.color}1F`,borderRadius:6,padding:"3px 8px",fontWeight:700}}>{t}</span>)}
            </div>
            <button style={{background:"none",border:`1px solid ${s.color}35`,borderRadius:8,color:s.color,cursor:"pointer",fontSize:12,fontFamily:"Sora,sans-serif",fontWeight:600,padding:"8px 16px",display:"flex",alignItems:"center",gap:6,transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=`${s.color}14`;}}
              onMouseLeave={e=>{e.currentTarget.style.background="none";}}>
              Learn More <ArrowRight size={12}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── PORTFOLIO PAGE ── */
function PortfolioPage() {
  return (
    <div style={{minHeight:"100vh",paddingTop:100,padding:"100px 24px 80px",maxWidth:1200,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:58}}>
        <span className="tag-chip" style={{background:"rgba(155,92,246,.1)",color:"#9B5CF6",border:"1px solid rgba(155,92,246,.2)",marginBottom:14}}>PORTFOLIO</span>
        <h1 className="orbitron" style={{fontSize:"clamp(26px,4.5vw,50px)",fontWeight:900,marginBottom:14}}>Our <span className="gradient-text">Work</span></h1>
        <p style={{color:"#4A5570",maxWidth:480,margin:"0 auto"}}>Real projects, real impact — from concept to production-ready digital products.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:22}}>
        {PROJECTS.map((p,i) => (
          <div key={p.title} className="glass" style={{padding:"26px",animation:`fade-in-up .6s ${i*.09}s both`}}>
            <div style={{height:154,borderRadius:12,background:`linear-gradient(135deg,${p.color}14,rgba(0,0,0,.25))`,marginBottom:20,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${p.color}18`,position:"relative",overflow:"hidden"}} className="grid-bg">
              <div className="orbitron" style={{fontSize:13,fontWeight:700,color:p.color,textAlign:"center",padding:"0 16px",zIndex:1}}>{p.title}</div>
              <div style={{position:"absolute",top:10,right:10}}>
                <span style={{fontSize:10,background:p.status==="Live"?"rgba(16,185,129,.2)":"rgba(245,158,11,.2)",color:p.status==="Live"?"#10B981":"#F59E0B",borderRadius:6,padding:"3px 8px",fontWeight:700}}>{p.status}</span>
              </div>
            </div>
            <h3 style={{fontWeight:700,fontSize:16,color:"#E2E8FF",marginBottom:8}}>{p.title}</h3>
            <p style={{color:"#4A5570",fontSize:13,lineHeight:1.75,marginBottom:16}}>{p.desc}</p>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>
              {p.tech.map(t => <span key={t} style={{fontSize:10,background:`${p.color}12`,color:p.color,borderRadius:6,padding:"3px 8px",fontWeight:700}}>{t}</span>)}
            </div>
            <div style={{display:"flex",gap:10}}>
              <button style={{flex:1,background:`${p.color}14`,border:`1px solid ${p.color}2A`,borderRadius:8,color:p.color,cursor:"pointer",fontSize:12,fontFamily:"Sora,sans-serif",fontWeight:600,padding:"9px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:6,transition:"all .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.background=`${p.color}22`;}}
                onMouseLeave={e=>{e.currentTarget.style.background=`${p.color}14`;}}>
                <ExternalLink size={12}/> Live Demo
              </button>
              <button style={{flex:1,background:"transparent",border:"1px solid rgba(255,255,255,.09)",borderRadius:8,color:"#6B7A9B",cursor:"pointer",fontSize:12,fontFamily:"Sora,sans-serif",fontWeight:600,padding:"9px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:6,transition:"all .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.color="#E2E8FF";e.currentTarget.style.borderColor="rgba(255,255,255,.18)";}}
                onMouseLeave={e=>{e.currentTarget.style.color="#6B7A9B";e.currentTarget.style.borderColor="rgba(255,255,255,.09)";}}>
                <Github size={12}/> GitHub
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── CONTACT PAGE ── */
function ContactPage() {
  const [form, setForm] = useState({name:"",email:"",subject:"",msg:""});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const send = () => { setSending(true); setTimeout(() => { setSending(false); setSent(true); }, 2000); };
  return (
    <div style={{minHeight:"100vh",paddingTop:100,padding:"100px 24px 80px",maxWidth:1100,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:58}}>
        <span className="tag-chip" style={{background:"rgba(6,182,212,.1)",color:"#06B6D4",border:"1px solid rgba(6,182,212,.2)",marginBottom:14}}>CONTACT</span>
        <h1 className="orbitron" style={{fontSize:"clamp(26px,4vw,46px)",fontWeight:900,marginBottom:14}}>Let's <span className="gradient-text">Work Together</span></h1>
        <p style={{color:"#4A5570",maxWidth:460,margin:"0 auto"}}>Have a project in mind? Let's discuss how Nexvora can bring your vision to life.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:36,alignItems:"start"}}>
        <div className="glass" style={{padding:"34px"}}>
          {sent ? (
            <div style={{textAlign:"center",padding:"36px 0"}}>
              <div style={{width:58,height:58,borderRadius:"50%",background:"rgba(16,185,129,.18)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}>
                <Check size={26} style={{color:"#10B981"}}/>
              </div>
              <h3 className="orbitron" style={{fontSize:18,marginBottom:8}}>Message Sent!</h3>
              <p style={{color:"#6B7A9B",fontSize:14,marginBottom:24}}>We'll respond within 24 hours.</p>
              <button className="btn-outline" onClick={() => setSent(false)}>Send Another</button>
            </div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <h3 className="orbitron" style={{fontSize:17,marginBottom:4}}>Send a Message</h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <input className="field" placeholder="Your Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                <input className="field" type="email" placeholder="Email Address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
              </div>
              <input className="field" placeholder="Subject" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}/>
              <textarea className="field" placeholder="Tell us about your project..." rows={5} value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} style={{resize:"vertical"}}/>
              <button className="btn-glow" onClick={send} disabled={sending} style={{justifyContent:"center"}}>
                {sending ? <><Loader size={14} style={{animation:"spin-ring 1s linear infinite"}}/> Sending...</> : <><Send size={14}/> Send Message</>}
              </button>
            </div>
          )}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {[
            {icon:Mail,       label:"Email",    value:"sam@nexvora.dev",              color:"#4A8BFF"},
            {icon:MessageSquare,label:"WhatsApp",value:"+91 XXXXX XXXXX",             color:"#25D366"},
            {icon:MapPin,     label:"Location", value:"Nashik, Maharashtra, India",   color:"#9B5CF6"},
          ].map(item => (
            <div key={item.label} className="glass" style={{padding:"18px 22px",display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:42,height:42,borderRadius:12,background:`${item.color}14`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <item.icon size={18} color={item.color}/>
              </div>
              <div>
                <div style={{fontSize:11,color:"#3A4560",fontWeight:700,marginBottom:2,letterSpacing:".05em"}}>{item.label.toUpperCase()}</div>
                <div style={{fontSize:14,color:"#C4CFDF",fontWeight:500}}>{item.value}</div>
              </div>
            </div>
          ))}
          <div className="glass" style={{padding:"22px"}}>
            <p className="orbitron" style={{fontSize:9,color:"#3A4560",letterSpacing:".2em",marginBottom:16}}>FIND US ON</p>
            <div style={{display:"flex",gap:10}}>
              {[{icon:Github,c:"#E2E8FF"},{icon:Linkedin,c:"#0A66C2"},{icon:MessageSquare,c:"#25D366"}].map(({icon:Icon,c},i) => (
                <button key={i} style={{width:42,height:42,borderRadius:10,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:c,transition:"all .2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.09)";e.currentTarget.style.transform="translateY(-2px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.04)";e.currentTarget.style.transform="";}}>
                  <Icon size={17}/>
                </button>
              ))}
            </div>
          </div>
          <div className="glass" style={{padding:"22px",background:"linear-gradient(135deg,rgba(74,139,255,.06),rgba(155,92,246,.06))"}}>
            <p style={{fontSize:12,color:"#4A5570",lineHeight:1.8}}>📍 Based in <strong style={{color:"#E2E8FF"}}>Nashik, Maharashtra</strong><br/>Serving clients globally. Typical response time: <strong style={{color:"#4A8BFF"}}>under 12 hours.</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SUPPORT PAGE ── */
function SupportPage() {
  const [open, setOpen] = useState(null);
  const [tkt, setTkt] = useState({name:"",email:"",cat:"",desc:""});
  return (
    <div style={{minHeight:"100vh",paddingTop:100,padding:"100px 24px 80px",maxWidth:980,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:56}}>
        <span className="tag-chip" style={{background:"rgba(155,92,246,.1)",color:"#9B5CF6",border:"1px solid rgba(155,92,246,.2)",marginBottom:14}}>SUPPORT</span>
        <h1 className="orbitron" style={{fontSize:"clamp(24px,4vw,46px)",fontWeight:900,marginBottom:14}}>How Can We <span className="gradient-text">Help?</span></h1>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:14,marginBottom:58}}>
        {[
          {icon:Mail,        title:"Email Support",  desc:"≤24h response",         color:"#4A8BFF"},
          {icon:MessageSquare,title:"Live Chat",     desc:"Instant help",          color:"#10B981"},
          {icon:Phone,       title:"Phone Support",  desc:"Mon-Fri 9AM-6PM IST",   color:"#9B5CF6"},
          {icon:Layers,      title:"Documentation",  desc:"Full guides & API ref", color:"#F59E0B"},
        ].map(item => (
          <div key={item.title} className="glass" style={{padding:"22px",textAlign:"center"}}>
            <div style={{width:46,height:46,borderRadius:13,background:`${item.color}14`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",border:`1px solid ${item.color}20`}}>
              <item.icon size={20} color={item.color}/>
            </div>
            <h4 style={{fontSize:13,fontWeight:700,color:"#E2E8FF",marginBottom:4}}>{item.title}</h4>
            <p style={{fontSize:11,color:"#4A5570"}}>{item.desc}</p>
          </div>
        ))}
      </div>
      <h2 className="orbitron" style={{fontSize:24,fontWeight:800,textAlign:"center",marginBottom:28}}>
        Frequently Asked <span className="gradient-text">Questions</span>
      </h2>
      <div style={{marginBottom:56}}>
        {FAQS.map((faq,i) => (
          <div key={i} style={{borderBottom:"1px solid rgba(255,255,255,0.055)",marginBottom:2}}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:open===i?"rgba(74,139,255,.045)":"none",border:"none",borderRadius:open===i?"12px 12px 0 0":"10px",color:"#E2E8FF",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",fontFamily:"Sora,sans-serif",fontSize:14,fontWeight:600,padding:"17px 18px",textAlign:"left",transition:"all .2s",gap:12}}>
              <span>{faq.q}</span>
              {open===i ? <ChevronUp size={15} style={{color:"#4A8BFF",flexShrink:0}}/> : <ChevronDown size={15} style={{color:"#4A5570",flexShrink:0}}/>}
            </button>
            {open===i && (
              <div style={{background:"rgba(74,139,255,.025)",border:"1px solid rgba(74,139,255,.09)",borderRadius:"0 0 12px 12px",padding:"15px 18px"}}>
                <p style={{color:"#6B7A9B",fontSize:13,lineHeight:1.82}}>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="glass" style={{padding:"34px"}}>
        <h3 className="orbitron" style={{fontSize:18,marginBottom:22}}>Submit a Support <span className="gradient-text">Ticket</span></h3>
        <div style={{display:"grid",gap:12}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <input className="field" placeholder="Your Name" value={tkt.name} onChange={e=>setTkt({...tkt,name:e.target.value})}/>
            <input className="field" type="email" placeholder="Email" value={tkt.email} onChange={e=>setTkt({...tkt,email:e.target.value})}/>
          </div>
          <input className="field" placeholder="Category (Bug / Feature Request / Billing / Other)" value={tkt.cat} onChange={e=>setTkt({...tkt,cat:e.target.value})}/>
          <textarea className="field" placeholder="Describe your issue in detail..." rows={4} value={tkt.desc} onChange={e=>setTkt({...tkt,desc:e.target.value})} style={{resize:"vertical"}}/>
          <button className="btn-glow" style={{width:"fit-content",justifyContent:"center"}}>
            <Send size={14}/> Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── AUTH PAGE ── */
function AuthPage() {
  const [mode, setMode] = useState("login");
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({name:"",email:"",pw:"",cpw:""});
  const f = k => v => setForm({...form,[k]:v});
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"80px 24px",position:"relative"}}>
      <div style={{position:"absolute",top:"18%",left:"20%",width:380,height:380,borderRadius:"50%",background:"radial-gradient(circle,rgba(74,139,255,.07) 0%,transparent 70%)",filter:"blur(60px)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"18%",right:"18%",width:320,height:320,borderRadius:"50%",background:"radial-gradient(circle,rgba(155,92,246,.07) 0%,transparent 70%)",filter:"blur(55px)",pointerEvents:"none"}}/>
      <div className="glass" style={{width:"100%",maxWidth:430,padding:"42px 38px",background:"linear-gradient(135deg,rgba(74,139,255,.045),rgba(155,92,246,.045))"}}>
        <div style={{textAlign:"center",marginBottom:30}}>
          <Logo w={130}/>
          <p style={{color:"#4A5570",fontSize:13,marginTop:10}}>
            {mode==="login"?"Welcome back to Nexvora":mode==="signup"?"Create your Nexvora account":"Reset your password"}
          </p>
        </div>
        {mode!=="forgot" && (
          <div style={{display:"flex",background:"rgba(255,255,255,.04)",borderRadius:10,padding:3,marginBottom:26}}>
            {["login","signup"].map(m => (
              <button key={m} onClick={()=>setMode(m)} style={{flex:1,background:mode===m?"rgba(74,139,255,.18)":"none",border:mode===m?"1px solid rgba(74,139,255,.28)":"1px solid transparent",borderRadius:8,color:mode===m?"#4A8BFF":"#4A5570",cursor:"pointer",fontFamily:"Sora,sans-serif",fontSize:13,fontWeight:600,padding:"9px",transition:"all .2s"}}>
                {m==="login"?"Login":"Sign Up"}
              </button>
            ))}
          </div>
        )}
        <div style={{display:"flex",flexDirection:"column",gap:13}}>
          {mode==="signup" && <input className="field" placeholder="Full Name" value={form.name} onChange={e=>f("name")(e.target.value)}/>}
          <input className="field" type="email" placeholder="Email Address" value={form.email} onChange={e=>f("email")(e.target.value)}/>
          {mode!=="forgot" && (
            <div style={{position:"relative"}}>
              <input className="field" type={showPw?"text":"password"} placeholder="Password" value={form.pw} onChange={e=>f("pw")(e.target.value)} style={{paddingRight:46}}/>
              <button onClick={()=>setShowPw(!showPw)} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#3A4560",cursor:"pointer",padding:0,display:"flex",alignItems:"center"}}>
                {showPw?<EyeOff size={15}/>:<Eye size={15}/>}
              </button>
            </div>
          )}
          {mode==="signup" && <input className="field" type="password" placeholder="Confirm Password" value={form.cpw} onChange={e=>f("cpw")(e.target.value)}/>}
          {mode==="login" && (
            <div style={{textAlign:"right"}}>
              <button onClick={()=>setMode("forgot")} style={{background:"none",border:"none",color:"#4A8BFF",cursor:"pointer",fontSize:12,fontFamily:"Sora,sans-serif"}}>Forgot Password?</button>
            </div>
          )}
          {mode==="login" && (
            <div style={{display:"flex",gap:8,alignItems:"center",margin:"2px 0"}}>
              <input type="checkbox" id="rem" style={{width:14,height:14,accentColor:"#4A8BFF"}}/>
              <label htmlFor="rem" style={{fontSize:12,color:"#4A5570",cursor:"pointer"}}>Remember me</label>
            </div>
          )}
          <button className="btn-glow" style={{justifyContent:"center",marginTop:6,padding:"14px",fontSize:14}}>
            {mode==="login"?"Sign In to Nexvora":mode==="signup"?"Create Account":"Send Reset Link"}
            <ArrowRight size={15}/>
          </button>
          {mode==="forgot" && (
            <button onClick={()=>setMode("login")} style={{background:"none",border:"none",color:"#4A5570",cursor:"pointer",fontSize:12,fontFamily:"Sora,sans-serif",textAlign:"center",padding:"4px"}}>← Back to Login</button>
          )}
          {mode!=="forgot" && (
            <p style={{textAlign:"center",fontSize:12,color:"#3A4560",marginTop:4}}>
              {mode==="login"?"Don't have an account? ":"Already have an account? "}
              <button onClick={()=>setMode(mode==="login"?"signup":"login")} style={{background:"none",border:"none",color:"#4A8BFF",cursor:"pointer",fontSize:12,fontFamily:"Sora,sans-serif"}}>
                {mode==="login"?"Sign Up Free":"Sign In"}
              </button>
            </p>
          )}
        </div>
        <div style={{marginTop:24,padding:"16px",background:"rgba(74,139,255,.04)",borderRadius:10,border:"1px solid rgba(74,139,255,.1)"}}>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <Shield size={14} style={{color:"#4A8BFF",flexShrink:0}}/>
            <span style={{fontSize:11,color:"#4A5570",lineHeight:1.6}}>Your data is encrypted end-to-end with JWT authentication & industry-standard security practices.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── FOOTER ── */
function Footer({ nav }) {
  return (
    <footer style={{borderTop:"1px solid rgba(255,255,255,.05)",padding:"58px 24px 30px",background:"rgba(0,0,0,.25)",position:"relative",zIndex:2}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:38,marginBottom:44}}>
          <div>
            <Logo w={130}/>
            <p style={{color:"#4A5570",fontSize:13,lineHeight:1.82,marginTop:16,maxWidth:230}}>
              AI-powered software studio building intelligent digital products. Est. 2022, Nashik, India.
            </p>
            <div style={{display:"flex",gap:9,marginTop:20}}>
              {[Github,Linkedin,MessageSquare].map((Icon,i) => (
                <button key={i} style={{width:35,height:35,borderRadius:9,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#4A5570",transition:"all .2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.color="#E2E8FF";e.currentTarget.style.background="rgba(74,139,255,.1)";}}
                  onMouseLeave={e=>{e.currentTarget.style.color="#4A5570";e.currentTarget.style.background="rgba(255,255,255,.04)";}}>
                  <Icon size={15}/>
                </button>
              ))}
            </div>
          </div>
          {[
            {title:"Company",  links:[["About","about"],["Services","services"],["Portfolio","portfolio"],["Contact","contact"]]},
            {title:"Services", links:[["Web Development","services"],["AI Solutions","services"],["Mobile Apps","services"],["Dashboards","services"]]},
            {title:"Support",  links:[["Help Center","support"],["FAQ","support"],["Report Issue","support"],["Login","auth"]]},
          ].map(col => (
            <div key={col.title}>
              <h4 className="orbitron" style={{fontSize:9,fontWeight:700,color:"#4A8BFF",letterSpacing:".18em",marginBottom:16}}>{col.title.toUpperCase()}</h4>
              <div style={{display:"flex",flexDirection:"column",gap:9}}>
                {col.links.map(([label,pg]) => (
                  <button key={label} onClick={()=>nav(pg)} style={{background:"none",border:"none",color:"#4A5570",cursor:"pointer",fontSize:13,fontFamily:"Sora,sans-serif",textAlign:"left",padding:0,transition:"color .2s"}}
                    onMouseEnter={e=>{e.target.style.color="#C4CFDF";}}
                    onMouseLeave={e=>{e.target.style.color="#4A5570";}}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:22,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <p style={{color:"#2A3050",fontSize:12}}>© 2025 Nexvora. Designed & built by <span style={{color:"#4A8BFF"}}>Sanskar Gavali</span>. All rights reserved.</p>
          <div style={{display:"flex",gap:20}}>
            {["Privacy Policy","Terms of Service"].map(t => (
              <span key={t} style={{color:"#2A3050",fontSize:12,cursor:"pointer",transition:"color .2s"}}
                onMouseEnter={e=>{e.target.style.color="#6B7A9B";}}
                onMouseLeave={e=>{e.target.style.color="#2A3050";}}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── ROOT APP ── */
export default function App() {
  const [page, setPage] = useState("home");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = pg => {
    setPage(pg);
    setMenuOpen(false);
    try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch(_){}
  };

  if (loading) return (
    <>
      <style>{STYLES}</style>
      <LoadingScreen onDone={() => setLoading(false)}/>
    </>
  );

  const PAGES = {
    home:      <HomePage nav={nav}/>,
    about:     <AboutPage/>,
    services:  <ServicesPage/>,
    portfolio: <PortfolioPage/>,
    contact:   <ContactPage/>,
    support:   <SupportPage/>,
    auth:      <AuthPage/>,
  };

  return (
    <>
      <style>{STYLES}</style>
      <Particles/>
      <Navbar page={page} nav={nav} menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <main style={{position:"relative",zIndex:1}}>
        {PAGES[page] || PAGES.home}
      </main>
      <Footer nav={nav}/>
    </>
  );
}
