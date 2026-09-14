/* ============================================================
   Renders index.html from window.PROFILE.
   Content lives in assets/data.js — edit there, not here.

   The page is built from PROFILE.sections: that array decides which sections
   exist, their order, their ids, their headings, and the rail nav. index.html
   holds no visible copy, so personalising the site means editing data.js only.

   ES5-compatible syntax and browser APIs only, so the project opens directly
   from disk with no compilation, package manager, or build step.

   To add a section: add its data, add an entry to PROFILE.sections, add a
   function to RENDERERS below, and add its styles in styles.css.
   ============================================================ */

// The IIFE keeps helper and renderer names out of the global browser namespace.
(function () {
  "use strict";

  // data.js must be loaded first. P is a short, read-only-by-convention alias.
  var P = window.PROFILE;
  var $ = function (id) { return document.getElementById(id); };

  // Build nodes with textContent rather than innerHTML. Besides keeping rendering
  // predictable, this prevents profile text from being interpreted as markup.
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function link(href, text, cls) {
    var a = el("a", cls, text);
    a.href = href;
    // Only web URLs open a new tab; mailto:, tel:, and fragment links stay local.
    if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }
  // Container with an id, so sections remain addressable for debugging and tests.
  function box(tag, cls, id) {
    var n = el(tag, cls);
    if (id) n.id = id;
    return n;
  }
  // "https://www.linkedin.com/in/abc/" -> "linkedin.com/in/abc". Deriving the
  // visible label from the URL means the two can never disagree.
  function prettyUrl(u) {
    return String(u || "").replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
  }
  function ui(path, fallback) {
    var node = P.ui || {}, parts = String(path).split("."), i;
    for (i = 0; i < parts.length; i++) {
      if (node == null) return fallback;
      node = node[parts[i]];
    }
    return node == null ? fallback : node;
  }

  /* ---------------- section renderers ----------------
     Each receives the <section> element it should fill, plus its manifest entry.
     Names here are what PROFILE.sections `render` values refer to. */

  var RENDERERS = {

    hero: function (sec) {
      sec.appendChild(el("p", "eyebrow", P.identity.kicker || "")).id = "heroKicker";
      sec.appendChild(el("h1", null, P.identity.headline || "")).id = "heroLine";

      var body = box("div", null, "heroBody");
      // One array entry becomes one paragraph; no newline parsing is required.
      P.positioning.forEach(function (para) { body.appendChild(el("p", null, para)); });
      sec.appendChild(body);

      if (!P.now || !P.now.items) return;
      var rec = box("div", "record", "heroRecord");
      P.now.items.forEach(function (item) {
        var row = el("div", "metric");
        row.appendChild(el("div", "metric__v", item.value));
        row.appendChild(el("div", "metric__l", item.label));
        if (item.note) row.appendChild(el("div", "metric__n", item.note));
        rec.appendChild(row);
      });
      sec.appendChild(rec);
    },

    projects: function (sec) {
      var list = box("div", "cardgrid", "projectList");
      (P.projects || []).forEach(function (pr) {
        var art = el("article", "card");
        art.appendChild(el("div", "card__meta", (pr.stack || []).join(" / ")));
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
      sec.appendChild(list);
    },

    experience: function (sec) {
      var trail = box("div", "trail", "trail");
      (P.experience || []).forEach(function (job) {
        // State flags become modifier classes; CSS owns their visual treatment.
        var d = el("article", "job" + (job.current ? " job--current" : "") + (job.older ? " job--older" : ""));
        d.appendChild(el("div", "job__when", job.start + " — " + job.end));
        d.appendChild(el("h3", "job__title", job.title));
        var org = job.org + (job.location ? " · " + job.location : "") + (job.mode ? " · " + job.mode : "");
        d.appendChild(el("div", "job__org", org));
        if (job.highlight) d.appendChild(el("div", "job__flag", job.highlight));
        var ul = el("ul");
        (job.bullets || []).forEach(function (b) { ul.appendChild(el("li", null, b)); });
        d.appendChild(ul);
        trail.appendChild(d);
      });
      sec.appendChild(trail);
    },

    writing: function (sec) {
      var list = box("div", "cardgrid", "writingList");
      (P.writing || []).forEach(function (w) {
        var art = el("article", "card");
        art.appendChild(el("div", "card__meta", (w.tags || []).join(" / ")));
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
      sec.appendChild(list);
    },

    talks: function (sec) {
      var list = box("div", "cardgrid", "talkList");
      (P.speaking || []).forEach(function (t) {
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
      sec.appendChild(list);
    },

    skills: function (sec) {
      var grid = box("div", "grid2", "skillGrid");
      var colA = el("div"), colB = el("div");
      (P.skills || []).forEach(function (s, i) {
        var group = el("div", "skillset");
        group.appendChild(el("h3", null, s.group));
        group.appendChild(el("p", null, s.items.join(", ")));
        // Alternating by index balances groups without needing column data fields.
        (i % 2 === 0 ? colA : colB).appendChild(group);
      });
      grid.appendChild(colA);
      grid.appendChild(colB);
      sec.appendChild(grid);
    },

    credentials: function (sec, entry) {
      var titles = entry.columns || ["Certifications", "Education"];
      var grid = el("div", "grid2");

      function column(title, id, rows) {
        var wrap = el("div");
        wrap.appendChild(el("h3", "credhead", title));
        var ul = box("ul", "credlist", id);
        rows.forEach(function (r) {
          var li = el("li");
          li.appendChild(el("div", null, r[0]));
          li.appendChild(el("span", null, r[1]));
          ul.appendChild(li);
        });
        wrap.appendChild(ul);
        grid.appendChild(wrap);
      }

      column(titles[0], "certList", (P.certifications || []).map(function (c) {
        return [c.name + (c.issuer ? " — " + c.issuer : ""), c.year];
      }));
      column(titles[1], "eduList", (P.education || []).map(function (e) {
        return [e.qualification + " — " + e.institute, e.year];
      }));
      sec.appendChild(grid);
    },

    awards: function (sec) {
      var ul = box("ul", "credlist", "awardList");
      (P.awards || []).forEach(function (a) {
        var li = el("li");
        li.appendChild(el("div", null, a.name + (a.org ? " — " + a.org : "")));
        li.appendChild(el("span", null, a.year));
        ul.appendChild(li);
      });
      sec.appendChild(ul);
    },

    contact: function (sec) {
      var I = P.identity, C = P.closing;

      if (C) {
        var cta = el("div", "cta");
        cta.appendChild(el("p", "eyebrow", C.eyebrow));
        cta.appendChild(el("p", "cta__head", C.heading));
        cta.appendChild(el("p", "cta__body", C.body));
        var actions = el("div", "cta__actions");
        var mail = link("mailto:" + I.email, ui("emailButton", "Email me"), "btn");
        mail.id = "ctaMail";
        actions.appendChild(mail);
        actions.appendChild(printButton("btn btn--ghost"));
        cta.appendChild(actions);
        sec.appendChild(cta);
      }

      // Labels come from ui.contact; the values beside them are derived from
      // identity, so neither can drift from the other.
      var rows = [
        [ui("contact.email", "Email"), link("mailto:" + I.email, I.email)],
        [ui("contact.phone", "Phone"), link("tel:" + String(I.phone).replace(/\s/g, ""), I.phone)],
        [ui("contact.linkedin", "LinkedIn"), link(I.links.linkedin, prettyUrl(I.links.linkedin))],
        [ui("contact.articles", "Articles"), link(I.links.hashnode, prettyUrl(I.links.hashnode))],
        [ui("contact.location", "Based in"), el("span", null, I.location)]
      ];
      var list = box("ul", "contact__list", "contactList");
      rows.forEach(function (r) {
        var li = el("li");
        li.appendChild(el("span", null, r[0]));
        var v = el("div");
        v.appendChild(r[1]);
        li.appendChild(v);
        list.appendChild(li);
      });
      sec.appendChild(list);

      var foot = box("footer", null, "foot");
      foot.textContent = I.name + " · " + I.location +
        (I.lastUpdated ? " · last updated " + I.lastUpdated : "");
      sec.appendChild(foot);
    }
  };

  /* ---------------- page assembly ---------------- */

  function printButton(cls) {
    var b = el("button", cls + " js-print", ui("printButton", "Download PDF"));
    b.type = "button";
    return b;
  }

  function buildRail() {
    if (!$("railName")) return;
    var I = P.identity;
    $("railName").textContent = I.name;
    $("railRole").textContent = I.role + ", " + I.org;
    $("railPlace").textContent = I.location;
    if (I.workMode) $("railPlace").appendChild(el("span", "rail__mode", I.workMode));

    var wrap = $("railLinks");
    if (wrap) {
      wrap.appendChild(link(I.links.linkedin, ui("railLinks.linkedin", "LinkedIn")));
      wrap.appendChild(link(I.links.hashnode, ui("railLinks.hashnode", "Articles")));
      wrap.appendChild(link(I.links.github, ui("railLinks.github", "GitHub")));
      wrap.appendChild(link("mailto:" + I.email, ui("railLinks.email", "Email")));
    }

    var foot = $("railFoot");
    if (foot) foot.appendChild(printButton("rail__cv"));

    var skip = $("skipLink");
    if (skip) skip.textContent = ui("skip", "Skip to content");
  }

  // One pass over PROFILE.sections builds both the nav and the sections, so the
  // two cannot disagree about what exists or what order it is in.
  function buildPage() {
    var main = $("main"), nav = $("nav");
    if (!main) return;
    if (nav) nav.setAttribute("aria-label", ui("navLabel", "Sections"));
    var navList = nav ? el("ul") : null;

    (P.sections || []).forEach(function (entry) {
      var fn = RENDERERS[entry.render];
      if (!fn) return;

      var sec = el("section", entry.class || null);
      sec.id = entry.id;
      if (entry.heading) sec.appendChild(el("h2", "sec-head", entry.heading));
      fn(sec, entry);
      main.appendChild(sec);

      if (navList && entry.nav) {
        var li = el("li");
        li.appendChild(link("#" + entry.id, entry.nav));
        navList.appendChild(li);
      }
    });

    if (navList) nav.appendChild(navList);
  }

  // Favicon is drawn from the initials and the live theme colours, so it needs
  // no hand-editing and stays consistent if the palette changes.
  function setFavicon() {
    var I = P.identity;
    var initials = I.initials || String(I.name || "")
      .split(/\s+/).filter(Boolean)
      .filter(function (w, i, a) { return i === 0 || i === a.length - 1; })
      .map(function (w) { return w.charAt(0); }).join("").toUpperCase();
    if (!initials) return;

    var cs = getComputedStyle(document.documentElement);
    var bg = (cs.getPropertyValue("--paper") || "#14181C").trim();
    var fg = (cs.getPropertyValue("--signal") || "#FF7A45").trim();

    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<rect width="64" height="64" rx="14" fill="' + bg + '"/>' +
      '<text x="32" y="43" font-family="Arial,Helvetica,sans-serif" font-size="26" ' +
      'font-weight="700" fill="' + fg + '" text-anchor="middle">' + initials + '</text></svg>';

    var l = document.querySelector('link[rel="icon"]');
    if (!l) { l = document.createElement("link"); l.rel = "icon"; document.head.appendChild(l); }
    l.type = "image/svg+xml";
    l.href = "data:image/svg+xml," + encodeURIComponent(svg);
  }

  /* ---------------- progressive enhancement ---------------- */

  function navSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    // Navigation remains fully usable on older browsers; it only loses the live
    // highlight when IntersectionObserver is unavailable.
    if (!("IntersectionObserver" in window)) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.removeAttribute("aria-current"); });
          if (map[e.target.id]) map[e.target.id].setAttribute("aria-current", "true");
        }
      });
    // The narrow active band near the top changes the marker soon after a section
    // enters the reading area instead of waiting for most of it to be visible.
    }, { rootMargin: "-10% 0px -70% 0px" });
    document.querySelectorAll("main section").forEach(function (s) { obs.observe(s); });
  }

  function printPage() {
    Array.prototype.forEach.call(document.querySelectorAll(".js-print"), function (b) {
      // The browser print dialog plus @media print is the PDF export mechanism.
      b.addEventListener("click", function () { window.print(); });
    });
  }

  /* ---------------- validation ----------------
     Driving the page from a manifest means a typo would otherwise drop a section
     silently. These checks turn that into a console message naming the problem. */

  function validate() {
    var problems = [];
    if (!P) { console.error("[profile] window.PROFILE is missing — is data.js loaded first?"); return false; }

    ["identity", "sections"].forEach(function (k) {
      if (!P[k]) problems.push("PROFILE." + k + " is missing");
    });
    if (P.identity) {
      ["name", "role", "org", "email", "location"].forEach(function (k) {
        if (!P.identity[k]) problems.push("PROFILE.identity." + k + " is empty");
      });
      if (!P.identity.links) problems.push("PROFILE.identity.links is missing");
    }

    var seen = {};
    (P.sections || []).forEach(function (s, i) {
      var at = "PROFILE.sections[" + i + "]";
      if (!s.id) problems.push(at + " has no id");
      else if (seen[s.id]) problems.push(at + ' duplicates the id "' + s.id + '"');
      else seen[s.id] = true;
      if (!s.render) problems.push(at + " has no render");
      else if (!RENDERERS[s.render]) {
        problems.push(at + ' render "' + s.render + '" is unknown. Valid: ' +
          Object.keys(RENDERERS).join(", "));
      }
    });

    problems.forEach(function (m) { console.error("[profile] " + m); });
    return problems.length === 0;
  }

  function init() {
    validate();
    setFavicon();
    buildRail();
    buildPage();
    navSpy();
    printPage();
  }

  // Usually the scripts run after the DOM because they sit at the end of body.
  // This guard also supports moving them into head later with `defer` omitted.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
