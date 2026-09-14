/* ============================================================
   PROFILE DATA — single source of truth.
   Edit this file to correct anything. Both the site and
   the printed PDF render from here. Nothing else to touch.
   ============================================================ */

window.PROFILE = {

  identity: {
    name: "Jeet V. Doshi",
    shortName: "Jeet Doshi",
    role: "Technical Account Manager",
    org: "WonderBotz",
    linkedinHeadline:
      "Technical Account Manager at UiPath | Representing WonderBotz | Agentic Automation | AI Agents | Enterprise Automation Strategist",
    location: "Bengaluru, Karnataka, India",
    // Small badge beside the location in the rail. Set to "" to hide it.
    workMode: "Remote",
    // Hero kicker (the territory) and headline (the stance). Both render
    // from here — nothing in index.html hard-codes them.
    kicker: "Technical account ownership / Agentic automation / Enterprise adoption",
    headline: "I advise enterprises on what I've shipped.",
    pronouns: "He/Him",
    email: "jeet.doshi2091@gmail.com",
    phone: "+91 8080318584",
    experienceYears: "11+",
    // Shown in the footer. Bump this when you change the content —
    // it used to be generated from new Date(), which meant the site
    // always claimed to be current no matter how stale it was.
    lastUpdated: "September 2026",
    links: {
      linkedin: "https://www.linkedin.com/in/jeet-doshi-28408071",
      hashnode: "https://jdoshi2091.hashnode.dev",
      github: "https://github.com/jd2091"
    }
  },

  // Opening statement on the site. Written from the LinkedIn headline,
  // posts and delivery history — review the wording.
  positioning: [
    "I sit between the customer and the platform. Day to day that means owning the technical relationship for enterprise automation programmes at WonderBotz — shaping what gets built, proving it works, and staying accountable for whether the customer is still running it a year later.",
    "None of that is advice from the sidelines. The nine years before this role were hands-on: automation across NHS trusts, UiPath infrastructure and CI/CD on Azure, and a stretch on client site in Reading as RPA development lead.",
    "Most of my current attention goes to agentic automation — coding agents that write automations, MCP servers, Coded Apps, and the governance that decides whether an enterprise can actually put them into production."
  ],

  // Headline metrics beside the introduction. Keep these to six —
  // the numeral is what a reader takes away, the note is the proof.
  now: {
    heading: "Currently",
    items: [
      { value: "6+", label: "Customer accounts managed",
        note: "Technical account ownership across enterprise UiPath programmes." },
      { value: "$20M+", label: "ARR supported",
        note: "Technical support for renewal and adoption across the account portfolio." },
      { value: "20+", label: "NHS processes automated",
        note: "Live across ServiceNow, Oracle SBS, HealthRoster, SystmOne, ESR and eRS." },
      { value: "11", label: "Years in software",
        note: "From C# product engineering to agentic automation." },
      { value: "8", label: "Years in automation",
        note: "RPA delivery, Azure platform engineering, now agentic patterns." },
      { value: "5", label: "Professional certifications",
        note: "Anthropic, UiPath and Microsoft." }
    ]
  },

  // Closing call to action, above the contact table.
  closing: {
    eyebrow: "Open to the next challenge",
    heading: "Let's talk about what you're automating.",
    body: "Enterprise automation programmes, agentic patterns on the UiPath platform, or a community session \u2014 I am happy to start a conversation."
  },

  /* ---------- EXPERIENCE (dates per LinkedIn) ---------- */
  experience: [
    {
      org: "WonderBotz",
      title: "Line Manager — Technical Account Manager",
      start: "Apr 2025",
      end: "Present",
      location: "Bengaluru, India",
      mode: "On-site",
      current: true,
      bullets: [
        "Own the technical account relationship for enterprise intelligent automation customers, from solution shaping through delivery and ongoing platform health.",
        "Line management for the technical team alongside hands-on solution work.",
        "Design and prove agentic patterns on the UiPath platform — coding agents, MCP servers, Coded Apps and reusable agent skills.",
        "Solve platform engineering problems that surface in live programmes, including bridging external Python and PowerShell execution logs into the UiPath job trail for support teams.",
        "Publish open-source utilities and long-form technical writing that the wider UiPath community uses."
      ]
    },
    {
      org: "WonderBotz",
      title: "Senior Consultant — Technical Account Manager, Intelligent Automation",
      start: "Jan 2024",
      end: "Apr 2025",
      location: "India",
      mode: "Hybrid",
      bullets: [
        "Technical account ownership across intelligent automation engagements: feasibility, solution design, estimation and delivery assurance.",
        "Ran client demos, technical workshops and show-and-tell sessions to move opportunities from idea to signed scope.",
        "Set delivery standards and reviewed automation designs against UiPath best practice."
      ]
    },
    {
      org: "Mastek",
      title: "Software Specialist I — Delivery",
      start: "Sep 2023",
      end: "Jan 2024",
      location: "Navi Mumbai, India",
      mode: "Hybrid",
      bullets: [
        "Continued NHS and secondary trust automation delivery from India after the UK deployment.",
        "Code review, impact analysis and Go-Live documentation across the process estate."
      ]
    },
    {
      org: "Mastek",
      title: "Software Specialist I — Delivery (client site)",
      start: "Jul 2022",
      end: "Aug 2023",
      location: "Reading, England, United Kingdom",
      mode: "Client facing",
      highlight: "Deployed to client site as client-facing RPA development lead.",
      bullets: [
        "Led RPA development on site for NHS England and secondary trusts, working directly with business and IT stakeholders.",
        "Produced Automation Solution Designs, test approaches and operational manuals for processes entering support."
      ]
    },
    {
      org: "Mastek",
      title: "Senior Software Engineer",
      start: "May 2018",
      end: "Jul 2022",
      location: "Mahape, Navi Mumbai, India",
      older: true,
      bullets: [
        "Delivered 20+ automated processes across NHS trusts, building UiPath infrastructure on Azure for a multi-tenant RPA environment across multiple providers.",
        "Created Azure DevOps CI/CD pipelines deploying automation packages straight to Orchestrator, cloud VMs or local machines."
      ]
    },
    {
      org: "Symtrax Software",
      title: "Software Developer",
      start: "Jan 2016",
      end: "May 2018",
      location: "Mumbai, India",
      older: true,
      bullets: [
        "Built Chorus Manager, an invoice upload and management utility for France's mandatory Chorus Pro B2G portal, and StarQuery Suite, a BI tool for querying multiple databases under central governance."
      ]
    },
    {
      org: "CMC / Tata Consultancy Services",
      title: "Software Developer",
      start: "Jan 2015",
      end: "Jan 2016",
      location: "Vashi, Navi Mumbai, India",
      older: true,
      bullets: [
        "Worked on Genisys Configurator for ICICI Lombard, the platform underwriters use to generate insurance products, policies and customer schedules."
      ]
    }
  ],

  /* ---------- PROJECTS (things built, as opposed to things written) ---------- */
  projects: [
    {
      name: "Data Fabric Migration Tool",
      kind: "Open-source utility",
      blurb:
        "Exports, packages and imports UiPath Data Fabric entities and records across Dev, Test, UAT and Production, with logs and reports in place of a manual checklist. Built with Codex as a study in AI-assisted engineering.",
      stack: ["PowerShell", "UiPath CLI", "Data Fabric"],
      repo: "https://github.com/JD2091/DataFabric-migration-tool",
      article: "https://jdoshi2091.hashnode.dev/data-fabric-migration-tool"
    },
    {
      name: "AddPythonCustomLogs",
      kind: "Open-source pattern",
      blurb:
        "Returns external Python and PowerShell execution logs to the UiPath job trail — structured JSON, a cursor to avoid replays, severity preserved — so support teams keep observability when a robot calls out to another runtime.",
      stack: ["Python", "PowerShell", "UiPath", "RobotOps"],
      repo: "https://github.com/UiPathRepositories/AddPythonCustomLogs",
      article: "https://jdoshi2091.hashnode.dev/making-external-script-execution-observable-in-uipath"
    },
    {
      name: "ClaimDesk",
      kind: "UiPath Coded App",
      blurb:
        "A two-screen claims intake application built pro-code on the UiPath platform — the reference build behind the end-to-end walkthrough of architecture, lifecycle, ready-made widgets and OAuth.",
      stack: ["React", "TypeScript", "Coded Apps", "OAuth"],
      repo: "https://github.com/JD2091/uipath-clain-desk-app",
      article: "https://jdoshi2091.hashnode.dev/uipath-coded-web-apps-a-hands-on-guide-for-developers"
    },
    {
      name: "ExpenseFlow",
      kind: "UiPath Coded App",
      blurb:
        "An expense tracker built live against the UiPath SDK during the three-day Mumbai community series, starting from a React and Vite fundamentals build and ending as a deployed Coded App.",
      stack: ["React", "Vite", "TypeScript", "UiPath SDK"],
      repo: "https://github.com/JD2091/expenseflow"
    }
  ],

  /* ---------- WRITING ---------- */
  writing: [
    {
      title: "Coded Apps on UiPath, end to end",
      blurb:
        "A pro-code path to browser apps on the UiPath platform. Built ClaimDesk, a two-screen claims intake app, then documented the architecture, the six-step lifecycle, the ready-made widgets, every bug that cost an afternoon, and the security habits worth adopting on day one.",
      tags: ["Coded Apps", "React", "TypeScript", "OAuth"],
      url: "https://jdoshi2091.hashnode.dev/uipath-coded-web-apps-a-hands-on-guide-for-developers"
    },
    {
      title: "Can one prompt build an entire application?",
      blurb:
        "Yes, but the prompt has to read like an engineering contract. Breaks down the six layers behind a coding-agent system, how a master prompt becomes a dependency-aware task graph, and why verification is what separates 'completed' from 'working'.",
      tags: ["Coding agents", "Prompt engineering"],
      url: "https://jdoshi2091.hashnode.dev/how-a-single-prompt-can-generate-an-entire-application"
    },
    {
      title: "Agent skills: the operating manual for an AI worker",
      blurb:
        "A capable model is not a reliable digital worker. What a SKILL.md actually is, how skills differ from prompts, tools and MCP, and the governance questions enterprises hit when agents move from experiment to production.",
      tags: ["Agentic AI", "Governance", "MCP"],
      url: "https://jdoshi2091.hashnode.dev/agent-skills"
    },
    {
      title: "A migration tool for UiPath Data Fabric",
      blurb:
        "Moving entities and records across Dev, Test, UAT and Production should not be a manual checklist. An open-source utility that exports, packages and imports Data Fabric objects with logs and reports — built with Codex as a study in AI-assisted engineering.",
      tags: ["Data Fabric", "Open source", "PowerShell"],
      url: "https://jdoshi2091.hashnode.dev/data-fabric-migration-tool"
    },
    {
      title: "External execution shouldn't mean external observability",
      blurb:
        "A customer's robot launched a Python script and the logs vanished from the execution trail. A log-bridging pattern — structured JSON, a cursor to avoid replays, severity preserved — that puts external application logs back inside UiPath job logs.",
      tags: ["Observability", "Python", "RobotOps"],
      url: "https://jdoshi2091.hashnode.dev/making-external-script-execution-observable-in-uipath"
    }
  ],

  /* ---------- SPEAKING ---------- */
  speaking: [
    {
      event: "Master Coded Apps: From Fundamentals to Advance",
      host: "UiPath Community Mumbai",
      date: "24–26 Aug 2026",
      format: "Three-day virtual series, co-hosted with Parth Doshi",
      detail:
        "Day 1 fundamentals and first deploy, Day 2 a real app built live against the SDK, Day 3 two complete apps shipped by coding agents from a plain-language prompt.",
      links: [
        { label: "Recordings", url: "https://community.uipath.com/events/details/uipath-mumbai-presents-master-coded-apps-from-fundamentals-to-advance/" },
        { label: "Hello World repo", url: "https://github.com/JD2091/uipath-react-vite-hello-world" },
        { label: "Expense Tracker repo", url: "https://github.com/JD2091/expenseflow" }
      ]
    },
    {
      event: "UiPath for Coding Agents: Building Automations with Claude Code / OpenAI Codex",
      host: "UiPath Community Ahmedabad",
      date: "4 Jul 2026",
      format: "In-person at the WonderBotz Ahmedabad office",
      detail:
        "First community talk. Generating UiPath workflows, agents, Maestro processes and apps with coding agents, live, without a slide-heavy deck.",
      links: []
    }
  ],

  /* ---------- SKILLS ---------- */
  skills: [
    {
      group: "Automation platform",
      items: ["UiPath Studio", "Orchestrator", "Action Center", "Coded Apps", "Data Fabric", "Computer Vision", "SAP automation", "Microsoft Power Platform"]
    },
    {
      group: "AI and agents",
      items: ["Claude Code", "OpenAI Codex", "MCP servers", "Agent skills", "Prompt engineering", "Agentic workflow design", "Human-in-the-loop patterns"]
    },
    {
      group: "Cloud and DevOps",
      items: ["Azure IaaS and PaaS", "Azure Functions", "ARM templates", "Azure DevOps CI/CD", "YAML", "PowerShell", "GitHub", "TFS"]
    },
    {
      group: "Engineering",
      items: ["C#", ".NET Framework", "ASP.NET MVC", "ADO.NET", "LINQ", "WinForms", "WCF", "TypeScript", "React", "Vite", "JavaScript", "Python", "SQL Server", "SQLite", "Oracle"]
    },
    {
      group: "Delivery",
      items: ["Automation solution design", "Test approach and operational manuals", "Technical feasibility", "Client demos", "Code review", "Impact analysis", "Mentoring", "Line management"]
    }
  ],

  /* ---------- CREDENTIALS ---------- */
  certifications: [
    { name: "Claude Certified Associate — Foundations", issuer: "Anthropic", year: "2026" },
    { name: "UiPath Agentic Automation Associate", issuer: "UiPath", year: "2025" },
    { name: "UiPath Certified Advanced RPA Developer v1.0", issuer: "UiPath", year: "2021" },
    { name: "UiPath Certified RPA Developer", issuer: "UiPath", year: "2019" },
    { name: "Microsoft .NET Platform Certification", issuer: "CMC", year: "2014" }
  ],

  awards: [
    { name: "Customer Delight, UK/NL — delivery at NHS England", org: "Mastek", year: "Sep 2023" },
    { name: "Customer Delight, UK/NL — delivery at NGH trusts", org: "Mastek", year: "Jan 2023" },
    { name: "Service line award — NHS RPA infrastructure on Azure and COVID-19 PPE supply automation", org: "Mastek", year: "Jun 2020" },
    { name: "Service line award — Azure DevOps CI/CD and UiPath cloud infrastructure", org: "Mastek", year: "Sep 2019" },
    { name: "TechGig RPA Hackathon — 4th nationally", org: "TechGig", year: "Dec 2019" },
    { name: "Out of the Box award", org: "Symtrax", year: "2017" }
  ],

  education: [
    { qualification: "B.E. Computer Science", institute: "Gujarat Technological University", year: "2014" },
    { qualification: "HSC Science", institute: "Gujarat State Board", year: "2010" }
  ]
};
