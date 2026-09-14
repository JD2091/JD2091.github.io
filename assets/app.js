/* ============================================================
   Renders index.html from window.PROFILE.
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
    if (P.identity.workMode) {
      $("railPlace").appendChild(el("span", "rail__mode", P.identity.workMode));
    }

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
    $("foot").textContent = P.identity.name + " · " + P.identity.location +
      (P.identity.lastUpdated ? " · last updated " + P.identity.lastUpdated : "");
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
