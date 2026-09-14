/* ============================================================
   Rendering + cover letter generation.
   Content lives in assets/data.js — edit there, not here.
   ============================================================ */

(function () {
  "use strict";

  var P = window.PROFILE;
  var $ = function (id) { return document.getElementById(id); };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function link(href, text, cls) {
    var a = el("a", cls, text);
    a.href = href;
    if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }

  /* ---------------- render ---------------- */

  function renderRail() {
    if (!$("railName")) return;
    $("railName").textContent = P.identity.name;
    $("railRole").textContent = P.identity.role + ", " + P.identity.org;
    $("railPlace").textContent = P.identity.location;

    var wrap = $("railLinks");
    var L = P.identity.links;
    wrap.appendChild(link(L.linkedin, "LinkedIn"));
    wrap.appendChild(link(L.hashnode, "Articles"));
    wrap.appendChild(link(L.github, "GitHub"));
    wrap.appendChild(link("mailto:" + P.identity.email, "Email"));
  }

  function renderHero() {
    var body = $("heroBody");
    if (!body) return;
    if ($("heroKicker")) $("heroKicker").textContent = P.identity.kicker || "";
    if ($("heroLine")) $("heroLine").textContent = P.identity.headline || "";
    P.positioning.forEach(function (para) { body.appendChild(el("p", null, para)); });

    var rec = $("heroRecord");
    if (!rec) return;
    P.now.items.forEach(function (item) {
      var row = el("div", "metric");
      row.appendChild(el("div", "metric__v", item.value));
      row.appendChild(el("div", "metric__l", item.label));
      if (item.note) row.appendChild(el("div", "metric__n", item.note));
      rec.appendChild(row);
    });
  }

  function renderExperience() {
    var trail = $("trail");
    if (!trail) return;
    P.experience.forEach(function (job) {
      var d = el("article", "job" + (job.current ? " job--current" : "") + (job.older ? " job--older" : ""));
      d.appendChild(el("div", "job__when", job.start + " — " + job.end));
      d.appendChild(el("h3", "job__title", job.title));
      var org = job.org + (job.location ? " · " + job.location : "") + (job.mode ? " · " + job.mode : "");
      d.appendChild(el("div", "job__org", org));
      if (job.highlight) d.appendChild(el("div", "job__flag", job.highlight));
      var ul = el("ul");
      job.bullets.forEach(function (b) { ul.appendChild(el("li", null, b)); });
      d.appendChild(ul);
      trail.appendChild(d);
    });
  }

  function renderProjects() {
    var list = $("projectList");
    if (!list || !P.projects) return;
    P.projects.forEach(function (pr) {
      var art = el("article", "card");
      art.appendChild(el("div", "card__meta", pr.stack.join(" / ")));
      art.appendChild(el("h3", "card__title", pr.name));
      if (pr.kind) art.appendChild(el("div", "card__sub", pr.kind));
      art.appendChild(el("p", null, pr.blurb));
      var row = el("div", "card__links");
      if (pr.repo) {
        var r = link(pr.repo, "Repository");
        r.setAttribute("aria-label", "Repository: " + pr.name);
        row.appendChild(r);
      }
      if (pr.article) {
        var a = link(pr.article, "Write-up");
        a.setAttribute("aria-label", "Write-up: " + pr.name);
        row.appendChild(a);
      }
      if (row.childNodes.length) art.appendChild(row);
      list.appendChild(art);
    });
  }

  function renderWriting() {
    var list = $("writingList");
    if (!list) return;
    P.writing.forEach(function (w) {
      var art = el("article", "card");
      art.appendChild(el("div", "card__meta", w.tags.join(" / ")));
      art.appendChild(el("h3", "card__title", w.title));
      art.appendChild(el("p", null, w.blurb));
      var row = el("div", "card__links");
      var read = link(w.url, "Read the article");
      read.setAttribute("aria-label", "Read the article: " + w.title);
      row.appendChild(read);
      if (w.repo) {
        var src = link(w.repo, "Source");
        src.setAttribute("aria-label", "Source code: " + w.title);
        row.appendChild(src);
      }
      art.appendChild(row);
      list.appendChild(art);
    });
  }

  function renderTalks() {
    var list = $("talkList");
    if (!list) return;
    P.speaking.forEach(function (t) {
      var art = el("article", "card");
      art.appendChild(el("div", "card__meta", t.date));
      art.appendChild(el("h3", "card__title", t.event));
      art.appendChild(el("div", "card__sub", t.host + " · " + t.format));
      art.appendChild(el("p", null, t.detail));
      if (t.links && t.links.length) {
        var row = el("div", "card__links");
        t.links.forEach(function (l) { row.appendChild(link(l.url, l.label)); });
        art.appendChild(row);
      }
      list.appendChild(art);
    });
  }

  function renderSkills() {
    var grid = $("skillGrid");
    if (!grid) return;
    var colA = el("div"), colB = el("div");
    P.skills.forEach(function (s, i) {
      var box = el("div", "skillset");
      box.appendChild(el("h3", null, s.group));
      box.appendChild(el("p", null, s.items.join(", ")));
      (i % 2 === 0 ? colA : colB).appendChild(box);
    });
    grid.appendChild(colA);
    grid.appendChild(colB);
  }

  function renderCredentials() {
    if (!$("certList")) return;
    P.certifications.forEach(function (c) {
      var li = el("li");
      li.appendChild(el("div", null, c.name + " — " + c.issuer));
      li.appendChild(el("span", null, c.year));
      $("certList").appendChild(li);
    });
    P.education.forEach(function (e) {
      var li = el("li");
      li.appendChild(el("div", null, e.qualification + " — " + e.institute));
      li.appendChild(el("span", null, e.year));
      $("eduList").appendChild(li);
    });
    P.awards.forEach(function (a) {
      var li = el("li");
      li.appendChild(el("div", null, a.name + " — " + a.org));
      li.appendChild(el("span", null, a.year));
      $("awardList").appendChild(li);
    });
  }

  function renderContact() {
    if (!$("contactList")) return;

    var C = P.closing;
    if (C && $("ctaHead")) {
      $("ctaEyebrow").textContent = C.eyebrow;
      $("ctaHead").textContent = C.heading;
      $("ctaBody").textContent = C.body;
      $("ctaMail").href = "mailto:" + P.identity.email;
    }

    var rows = [
      ["Email", link("mailto:" + P.identity.email, P.identity.email)],
      ["Phone", link("tel:" + P.identity.phone.replace(/\s/g, ""), P.identity.phone)],
      ["LinkedIn", link(P.identity.links.linkedin, "jeet-doshi-28408071")],
      ["Articles", link(P.identity.links.hashnode, "jdoshi2091.hashnode.dev")],
      ["Based in", el("span", null, P.identity.location)]
    ];
    rows.forEach(function (r) {
      var li = el("li");
      li.appendChild(el("span", null, r[0]));
      var v = el("div");
      v.appendChild(r[1]);
      li.appendChild(v);
      $("contactList").appendChild(li);
    });
    $("foot").textContent = P.identity.name + " · " + P.identity.location + " · last updated " +
      new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  }

  /* ---------------- nav highlight ---------------- */

  function navSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    if (!("IntersectionObserver" in window)) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.removeAttribute("aria-current"); });
          if (map[e.target.id]) map[e.target.id].setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-10% 0px -70% 0px" });
    document.querySelectorAll("main section").forEach(function (s) { obs.observe(s); });
  }

  /* ---------------- key storage ---------------- */

  var STORE = "jd_cover_letter_settings";

  function loadSettings() {
    if (!$("provider")) return;
    var s = {};
    try { s = JSON.parse(localStorage.getItem(STORE) || "{}"); } catch (e) { s = {}; }
    $("provider").value = s.provider || "anthropic";
    $("apikey").value = s.key || "";
    setModelPlaceholder();
    $("model").value = s.model || "";
    reportKey();
  }

  function saveSettings() {
    var data = {
      provider: $("provider").value,
      model: $("model").value.trim(),
      key: $("apikey").value.trim()
    };
    try { localStorage.setItem(STORE, JSON.stringify(data)); } catch (e) {}
    reportKey("Saved to this browser.");
  }

  function reportKey(msg) {
    var p = $("provider").value;
    if (msg) { $("keyStatus").textContent = msg; return; }
    if (p === "none") { $("keyStatus").textContent = "Offline template — no key needed."; return; }
    $("keyStatus").textContent = $("apikey").value.trim() ? "Key present." : "No key saved yet.";
  }

  var DEFAULT_MODEL = {
    anthropic: "claude-sonnet-5",
    openai: "gpt-4o",
    gemini: "gemini-2.0-flash"
  };

  function setModelPlaceholder() {
    var p = $("provider").value;
    $("model").placeholder = DEFAULT_MODEL[p] || "not used";
    $("model").disabled = (p === "none");
    $("apikey").disabled = (p === "none");
  }

  /* ---------------- prompt ---------------- */

  function buildPrompt() {
    var jd = $("jd").value.trim();
    var company = $("company").value.trim();
    var role = $("jobtitle").value.trim();
    var emphasis = $("emphasis").value.trim();
    var C = P.coverLetter;

    var system = [
      "You write job application cover letters on behalf of a named candidate.",
      "Rules you must not break:",
      "1. Use only the candidate facts supplied. Never invent an employer, a metric, a technology, a certification or a date.",
      "2. If the role asks for something the candidate cannot evidence, do not claim it. Either omit it or frame honestly as an area being built on.",
      "3. Write continuous prose in " + C.tone + " register. No bullet points, no headings, no markdown.",
      "4. Aim for " + C.targetWords + " words, plus or minus 25.",
      "5. Open with a greeting line and close with '" + C.signOff + "' followed by the candidate's name.",
      "6. Name the company and role in the first paragraph when they are known.",
      "7. Plain text only. No placeholders in square brackets — if a detail is unknown, write around it."
    ].join("\n");

    var user = [
      "CANDIDATE",
      "Name: " + P.identity.name,
      "Current role: " + P.identity.role + " at " + P.identity.org + ", " + P.identity.location,
      "Contact: " + P.identity.email + " · " + P.identity.phone,
      "",
      "EVIDENCE THE LETTER MAY DRAW ON",
      C.evidence.map(function (e, i) { return (i + 1) + ". " + e; }).join("\n"),
      "",
      "SKILLS",
      P.skills.map(function (s) { return s.group + ": " + s.items.join(", "); }).join("\n"),
      "",
      "TARGET ROLE",
      (company ? "Company: " + company : "Company: read it from the description below"),
      (role ? "Role: " + role : "Role: read it from the description below"),
      (emphasis ? "The candidate wants to emphasise: " + emphasis : ""),
      "",
      "JOB DESCRIPTION",
      jd,
      "",
      "Write the letter now."
    ].filter(Boolean).join("\n");

    return { system: system, user: user };
  }

  /* ---------------- providers ---------------- */

  function callAnthropic(key, model, p) {
    return fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 1500,
        system: p.system,
        messages: [{ role: "user", content: p.user }]
      })
    }).then(readJson).then(function (d) {
      return (d.content || []).filter(function (b) { return b.type === "text"; })
        .map(function (b) { return b.text; }).join("\n").trim();
    });
  }

  function callOpenAI(key, model, p) {
    return fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", "authorization": "Bearer " + key },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: p.system },
          { role: "user", content: p.user }
        ]
      })
    }).then(readJson).then(function (d) {
      return ((d.choices || [])[0] || {}).message.content.trim();
    });
  }

  function callGemini(key, model, p) {
    return fetch("https://generativelanguage.googleapis.com/v1beta/models/" +
      encodeURIComponent(model) + ":generateContent", {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: p.system }] },
        contents: [{ role: "user", parts: [{ text: p.user }] }],
        generationConfig: { maxOutputTokens: 1600, temperature: 0.6 }
      })
    }).then(readJson).then(function (d) {
      var c = (d.candidates || [])[0];
      return ((c && c.content && c.content.parts) || []).map(function (x) { return x.text; }).join("").trim();
    });
  }

  function readJson(res) {
    return res.text().then(function (t) {
      var data;
      try { data = JSON.parse(t); } catch (e) { data = null; }
      if (!res.ok) {
        var msg = (data && data.error && (data.error.message || data.error.type)) || t.slice(0, 200);
        throw new Error("Provider returned " + res.status + ": " + msg);
      }
      if (!data) throw new Error("Could not read the provider response.");
      return data;
    });
  }

  /* ---------------- offline template ---------------- */

  var MATCHERS = [
    { re: /(uipath|orchestrator|studio)/i, line: "I have worked inside the UiPath platform since 2018 — Studio, Orchestrator, Action Center, Data Fabric and Coded Apps — first as a developer and now as the person accountable for how customers use it." },
    { re: /\b(rpa|robotic process)/i, line: "Across NHS England and its secondary trusts I delivered more than twenty live automated processes, spanning ServiceNow, Oracle SBS, HealthRoster, SystmOne, Lorenzo, ESR and eRS." },
    { re: /(azure|cloud)/i, line: "I built UiPath infrastructure on Azure from ARM templates, hosting a multi-tenant environment for several providers, and wrote the PowerShell that provisioned it." },
    { re: /(devops|ci\/?cd|pipeline)/i, line: "I set up Azure DevOps pipelines that take automation packages from repository to Orchestrator, a cloud VM or a local machine without manual steps." },
    { re: /(agent|llm|genai|generative|\bai\b|copilot)/i, line: "Most of my current work is agentic: using Claude Code and OpenAI Codex as coding agents to build automations and utilities, standing up MCP servers, and writing reusable agent skills that keep those agents governed." },
    { re: /(stakeholder|customer success|account manage|client facing|consult)/i, line: "As a Technical Account Manager I own the technical relationship end to end, and I spent a year on client site in Reading as the client-facing development lead." },
    { re: /(lead|mentor|manage|team)/i, line: "I line-manage a technical team and have mentored junior developers throughout, alongside code review and impact analysis on live estates." },
    { re: /(c#|\.net|asp\.net)/i, line: "Before automation I spent several years in C# and .NET, building products in ASP.NET MVC over SQL Server and Oracle." },
    { re: /(python)/i, line: "I use Python alongside automation work, including a log-bridging pattern that pulls external Python execution logs back into the UiPath job trail." },
    { re: /(react|typescript|front.?end|javascript)/i, line: "I build browser applications in React and TypeScript, most recently a claims-intake app running as a UiPath Coded App." },
    { re: /(health|nhs|clinical)/i, line: "My longest engagement was healthcare: several years delivering automation for NHS England and secondary trusts under real governance constraints." },
    { re: /(governance|compliance|audit|security)/i, line: "I treat governance as part of the build — narrowest scopes first, platform-owned authorisation, and documentation that a support team can actually run from." },
    { re: /(sql|database|data)/i, line: "I am comfortable across SQL Server, Oracle and SQLite, and have built data migration tooling for UiPath Data Fabric." },
    { re: /(present|demo|workshop|training|enable)/i, line: "I run client demos and community sessions regularly, including a three-day UiPath Mumbai series and a first in-person talk in Ahmedabad." }
  ];

  function offlineLetter() {
    var jd = $("jd").value.trim();
    var company = $("company").value.trim();
    var role = $("jobtitle").value.trim() || "the role you have advertised";
    var emphasis = $("emphasis").value.trim();

    var matched = MATCHERS.filter(function (m) { return m.re.test(jd); })
      .map(function (m) { return m.line; });
    if (matched.length < 3) {
      matched = matched.concat([
        MATCHERS[0].line, MATCHERS[1].line, MATCHERS[4].line
      ]);
    }
    matched = matched.filter(function (v, i, a) { return a.indexOf(v) === i; }).slice(0, 6);

    var to = company ? "the team at " + company : "your team";
    var greeting = "Dear Hiring Manager,";

    var p1 = "I am writing to apply for " + role + (company ? " at " + company : "") +
      ". I am currently a Technical Account Manager at WonderBotz in Bengaluru, where I own the technical " +
      "relationship for enterprise automation customers, and I have spent eleven years in software with the " +
      "last eight of those in intelligent automation. The description you have published lines up closely with " +
      "the work I do now, which is why I wanted to write to " + to + " directly.";

    var p2 = matched.slice(0, 3).join(" ");
    var p3 = matched.slice(3).join(" ");
    if (!p3) {
      p3 = "Alongside delivery I write long-form technical articles and publish open-source utilities for the " +
        "UiPath community, which keeps me honest about what actually works in production rather than in a demo.";
    }
    if (emphasis) {
      p3 += " I would particularly welcome the chance to talk about " + emphasis + ".";
    }

    var p4 = "What I would bring is a habit of staying accountable past go-live: designing solutions that a support " +
      "team can run at two in the morning, documenting them properly, and being the person the customer calls when " +
      "something behaves unexpectedly. I would be glad to discuss how that fits what you are building, and I am " +
      "happy to walk through any of the work above in more detail.\n\nThank you for considering my application.";

    return [greeting, "", p1, "", p2, "", p3, "", p4, "",
      P.coverLetter.signOff + ",", P.identity.name,
      P.identity.email + " · " + P.identity.phone].join("\n");
  }

  /* ---------------- generate ---------------- */

  function setStatus(text, isError) {
    var s = $("status");
    s.textContent = text;
    s.className = "status" + (isError ? " status--error" : "");
  }

  function countWords() {
    var t = $("letter").value.trim();
    var n = t ? t.split(/\s+/).length : 0;
    $("wordcount").textContent = n ? n + " words" : "";
  }

  function generate() {
    var jd = $("jd").value.trim();
    if (jd.length < 60) {
      setStatus("Paste the job description first — a line or two is not enough to work from.", true);
      $("jd").focus();
      return;
    }

    var provider = $("provider").value;
    var key = $("apikey").value.trim();
    var model = $("model").value.trim() || DEFAULT_MODEL[provider];

    if (provider === "none" || !key) {
      $("letter").value = offlineLetter();
      countWords();
      setStatus(provider === "none"
        ? "Written from the offline template. Edit freely."
        : "No API key set, so this came from the offline template. Add a key under model settings for a sharper draft.");
      return;
    }

    var p = buildPrompt();
    var call = provider === "anthropic" ? callAnthropic
             : provider === "openai" ? callOpenAI
             : callGemini;

    $("generate").disabled = true;
    setStatus("Writing…");

    call(key, model, p).then(function (text) {
      if (!text) throw new Error("The provider returned an empty response.");
      $("letter").value = text;
      countWords();
      setStatus("Draft ready. Read it before you send it.");
    }).catch(function (err) {
      var m = String(err && err.message || err);
      if (/Failed to fetch|NetworkError|CORS|Load failed/i.test(m)) {
        m = "The browser blocked the request. This usually happens when the page is opened straight from disk — " +
            "run 'python -m http.server 8000' in this folder and open http://localhost:8000 instead.";
      }
      setStatus(m, true);
      if (!$("letter").value.trim()) {
        $("letter").value = offlineLetter();
        countWords();
      }
    }).then(function () {
      $("generate").disabled = false;
    });
  }

  /* ---------------- output actions ---------------- */

  function copyLetter() {
    var t = $("letter").value;
    if (!t.trim()) { setStatus("Nothing to copy yet.", true); return; }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(t).then(function () { setStatus("Copied."); },
        function () { fallbackCopy(); });
    } else { fallbackCopy(); }
  }
  function fallbackCopy() {
    $("letter").select();
    try { document.execCommand("copy"); setStatus("Copied."); }
    catch (e) { setStatus("Copy failed — select the text and copy manually.", true); }
  }

  function downloadLetter() {
    var t = $("letter").value;
    if (!t.trim()) { setStatus("Nothing to download yet.", true); return; }
    var company = $("company").value.trim().replace(/[^\w\-]+/g, "-");
    var name = "Cover-letter" + (company ? "-" + company : "") + ".txt";
    var blob = new Blob([t], { type: "text/plain;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    setStatus("Downloaded " + name + ".");
  }

  /* ---------------- wire up ---------------- */

  function init() {
    renderRail();
    renderHero();
    renderProjects();
    renderExperience();
    renderWriting();
    renderTalks();
    renderSkills();
    renderCredentials();
    renderContact();
    navSpy();

    loadSettings();

    if ($("generate")) {
      $("provider").addEventListener("change", function () { setModelPlaceholder(); reportKey(); });
      $("saveKey").addEventListener("click", saveSettings);
      $("clearKey").addEventListener("click", function () {
        $("apikey").value = "";
        try { localStorage.removeItem(STORE); } catch (e) {}
        reportKey("Key cleared from this browser.");
      });

      $("generate").addEventListener("click", generate);
      $("clearAll").addEventListener("click", function () {
        ["jd", "company", "jobtitle", "emphasis", "letter"].forEach(function (id) { $(id).value = ""; });
        countWords();
        setStatus("");
      });
      $("copy").addEventListener("click", copyLetter);
      $("download").addEventListener("click", downloadLetter);
      $("printLetter").addEventListener("click", function () {
        if (!$("letter").value.trim()) { setStatus("Write the letter first.", true); return; }
        $("letterPrint").textContent = $("letter").value;
        window.print();
      });
      $("letter").addEventListener("input", countWords);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
