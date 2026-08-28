# TraceHanami Research — Cybersecurity Research Journal & Threat Intelligence Platform

> **Cybersecurity Researcher • Blue Team • Red Team • Threat Intelligence • Detection Engineering**

A modern, minimalist, content-focused cybersecurity research website inspired by the clean aesthetics, typography, spacing, and user experience of *mycatpets.me*, blended with the technical rigor of *The DFIR Report*, *Troy Hunt*, and *Microsoft Threat Intelligence*.

---

## 🛡️ Brand Identity & Mission

- **Name:** TraceHanami Research
- **Mission:** Document cybersecurity research, threat hunting methodologies, detection engineering experiments, red team techniques, DFIR investigations, laboratory findings, and ongoing learning progress.
- **Aesthetic:** Dark theme with elegant contrast, large whitespace, glassmorphism used sparingly, clean modern typography, and zero hacker clichés (no matrix rain, no neon green terminals, no anonymous masks).

---

## ✨ Features & Architecture

### 1. 🏠 Homepage Layout
- **Hero Section:** Dynamic subtle animated network canvas simulation with interactive nodes and connections, research telemetry status pills, role badges, and primary calls to action.
- **Research Statistics Dashboard:** 6 interactive operational metric cards (Research Articles, Sigma Rules, YARA Rules, Threat Hunts, Labs Built, CTF Challenges Solved).
- **Featured Research:** Large high-contrast threat investigation cards with MITRE ATT&CK tags, reading times, and publication dates.
- **Research Domains Hub:** 4 structured security pillars (🔵 Blue Team, 🔴 Red Team, 🟣 Purple Team, 🌐 Threat Intelligence) with direct discipline drill-downs.
- **MITRE ATT&CK Matrix Preview:** Interactive tactic coverage selector linking directly to research and detections.
- **Current Research Kanban Board:** Live pipeline tracking investigations through *Researching*, *Writing*, and *Published* stages.
- **Laboratory Showcase:** Architectural overviews and detection opportunities across 5 dedicated research environments.

### 2. 📑 Threat-Report Style Research Articles (`/research/:slug`)
- **Sticky Table of Contents (TOC):** Dynamic scroll-spy navigation for seamless long-form reading.
- **Reading Progress Bar:** Smooth top progress indicator.
- **Comprehensive Sections:**
  1. Executive Summary
  2. Attack Overview & Protocol Mechanics
  3. Lab Environment & Ingestion Telemetry
  4. Detection Logic & Field-Level Telemetry (Windows Event IDs, Sysmon, Auditd, Zeek)
  5. Validated Sigma Rules (v2.0 standard with syntax highlighting & copy support)
  6. In-Memory & Binary YARA Rules
  7. Multi-SIEM Query Translation (Splunk SPL & Microsoft Sentinel KQL)
  8. MITRE ATT&CK Enterprise Matrix Mapping
  9. Mitigation & Hardening Playbook
  10. References, PGP verification & IOC Hash Tables
- **Downloadable PDF & Print View:** Clean print stylesheet for offline technical briefings.

### 3. 🔬 Laboratory Ranges (`/labs` & `/labs/:slug`)
1. **Active Directory Enterprise Range:** 3 DCs, AD CS PKI, Exchange, Tier 0/1/2 segmentation, Sysmon & Elastic SIEM.
2. **Hybrid SOC Detection & Telemetry Lab:** Proxmox VE cluster, Splunk Enterprise 9.2, Zeek Network Monitor, Suricata IDS, Velociraptor DFIR.
3. **Isolated Malware Reverse Engineering Lab:** FlareVM, REMnux, CAPE Sandbox, Ghidra, INetSim.
4. **Cloud Security & Threat Hunting Range:** Multi-account AWS environment, CloudTrail, GuardDuty, Athena SQL hunting.
5. **Purple Team Simulation Lab:** Atomic Red Team, Caldera C2, VECTR scoring, CI/CD automated validation.

### 4. 🎯 MITRE ATT&CK® Enterprise Matrix Explorer (`/matrix`)
- Interactive coverage matrix spanning 11 tactics and 40+ techniques.
- Instant search filter by Technique ID or name.
- Direct links from tactics to verified Sigma rules and threat reports.

### 5. 📋 Active Research Pipeline (`/pipeline`)
- Dedicated Kanban board tracking active telemetry experiments, drafts, and published investigations.

### 6. 👤 Researcher Profile & About (`/about`)
- Biography, research philosophy, certifications (CRTP, OSCP, CCD, BTL1, AWS Security), CTF achievements, publications, speaking engagements, GitHub repositories, and PGP key verification.

### 7. 📡 RSS 2.0 Syndication (`/rss`)
- Standard XML generation and live feed viewer for automated subscription.

### 8. 🔍 Instant Global Search (`⌘K` / `Ctrl+K` / `/`)
- Multi-field search across titles, summaries, tags, Sigma YAMLs, labs, and MITRE techniques with keyboard arrow navigation.

---

## 🎨 Color Palette & Design Tokens

- **Background:** Deep Charcoal / Near-Black (`#090d16`, `#0e1424`, `#141c30`)
- **Primary Accent:** Electric Blue (`#38bdf8`, `#0284c7`)
- **Secondary Accent:** Purple (`#a855f7`, `#7e22ce`)
- **Red Team Accent:** Rose (`#f43f5e`)
- **Threat Intel Accent:** Cyan (`#06b6d4`)
- **Success / Operational:** Muted Emerald (`#10b981`)
- **Warning / Syndication:** Amber (`#f59e0b`)
- **Typography:** Inter, Plus Jakarta Sans, JetBrains Mono

---

## 🚀 Getting Started

### Development Server
```bash
npm run dev
```
Runs the Vite development server on `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Compiles and optimizes assets into the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 🔒 Security Disclaimer

All offensive techniques, adversary emulation scripts, and attack simulations documented in this research were executed strictly within isolated, private, and authorized laboratory networks.
