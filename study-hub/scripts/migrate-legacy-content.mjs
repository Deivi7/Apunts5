/**
 * Extrae contenido didáctico desde Apuntes.html (repo raíz) hacia Vue:
 *  - study-hub/frontend/public/content/{subject}/{topic}/  (solo PDFs/medios)
 *  - study-hub/content-packages/topics/{subject}/{topic}/manifest.json + panels/*.html
 *  - NO publica Apuntes.html (la UI es 100% Vue)
 *
 * Uso: npm run migrate:content
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const studyHubRoot = path.resolve(__dirname, '..')
const repoRoot = path.resolve(studyHubRoot, '..')
const publicContent = path.join(studyHubRoot, 'frontend', 'public', 'content')
const packagesRoot = path.join(studyHubRoot, 'content-packages', 'topics')
const subjectsPath = path.join(studyHubRoot, 'content-packages', 'catalog', 'subjects.json')

const THEORY_HINTS = /^(apuntes|apunts|teoria|theory|tab-teoria|comunicacion)$/i
const DOCS_HINTS = /^(docs|fitxes|documentos|archivos|tab-docs|tab-print|tab-fitxes|tab-documents)$/i

const EMBED_BRIDGE = `
<!-- Study Hub embed bridge (auto) -->
<style id="studyhub-embed-style">
html.studyhub-embed .top-navbar,
html.studyhub-embed header.top-navbar,
html.studyhub-embed .module-hero,
html.studyhub-embed .site-header,
html.studyhub-embed .app-sidebar,
html.studyhub-embed aside.app-sidebar,
html.studyhub-embed .mobile-sidebar-toggle-bar {
  display: none !important;
}
html.studyhub-embed .app-layout {
  display: block !important;
  grid-template-columns: 1fr !important;
  min-height: auto !important;
}
html.studyhub-embed .app-main,
html.studyhub-embed .app-main-content,
html.studyhub-embed main {
  width: 100% !important;
  max-width: none !important;
  margin: 0 !important;
  padding: 1rem 1.25rem 2rem !important;
}
html.studyhub-embed body {
  background: transparent !important;
}
</style>
<script id="studyhub-embed-bridge">
(function () {
  var params = new URLSearchParams(location.search);
  if (params.get('embed') === '1') {
    document.documentElement.classList.add('studyhub-embed');
  }

  function resolveTabId(raw) {
    if (!raw) return null;
    var id = String(raw);
    var aliases = {
      theory: ['apuntes', 'apunts', 'teoria', 'tab-teoria'],
      docs: ['docs', 'fitxes', 'tab-print', 'documentos']
    };
    if (aliases[id]) {
      for (var i = 0; i < aliases[id].length; i++) {
        if (document.getElementById('panel-' + aliases[id][i]) ||
            document.getElementById(aliases[id][i]) ||
            document.getElementById('tab-' + aliases[id][i].replace(/^tab-/, ''))) {
          return aliases[id][i];
        }
      }
    }
    return id;
  }

  function gotoTab(raw) {
    var tabId = resolveTabId(raw);
    if (!tabId) return;
    try {
      if (typeof switchSidebarTab === 'function') {
        switchSidebarTab(tabId, null);
        return;
      }
    } catch (e) {}
    try {
      if (typeof switchTab === 'function') {
        switchTab(tabId);
        return;
      }
    } catch (e) {}
    // Fallback: activar paneles manualmente
    var candidates = [
      'panel-' + tabId,
      'view-' + tabId,
      tabId,
      tabId.indexOf('tab-') === 0 ? tabId : 'tab-' + tabId
    ];
    var panels = document.querySelectorAll('.tab-panel, .tab-content-panel, .view-section, [id^="panel-"], [id^="tab-"], [id^="view-"]');
    panels.forEach(function (p) { p.classList.remove('active'); });
    for (var c = 0; c < candidates.length; c++) {
      var el = document.getElementById(candidates[c]);
      if (el) {
        el.classList.add('active');
        el.style.display = '';
        break;
      }
    }
  }

  window.addEventListener('message', function (ev) {
    var data = ev && ev.data;
    if (!data || data.type !== 'studyhub:goto') return;
    gotoTab(data.tab);
  });

  var initial = params.get('panel');
  if (initial) {
    setTimeout(function () { gotoTab(initial); }, 50);
    setTimeout(function () { gotoTab(initial); }, 300);
  }

  window.__studyhubGoto = gotoTab;
})();
</script>
`

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest))
  fs.copyFileSync(src, dest)
}

function copyDirContents(srcDir, destDir) {
  ensureDir(destDir)
  if (!fs.existsSync(srcDir)) return []
  const copied = []
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const from = path.join(srcDir, entry.name)
    const to = path.join(destDir, entry.name)
    if (entry.isDirectory()) {
      copied.push(...copyDirContents(from, to).map((p) => path.join(entry.name, p)))
    } else {
      copyFile(from, to)
      copied.push(entry.name)
    }
  }
  return copied
}

function stripTags(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function decodeBasic(html) {
  return String(html || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function extractSidebarSections(html) {
  const sections = []
  const seen = new Set()
  const patterns = [
    /onclick="switchSidebarTab\('([^']+)'[^"]*"[\s\S]*?<span class="sidebar-btn-title">([\s\S]*?)<\/span>\s*<span class="sidebar-btn-desc">([\s\S]*?)<\/span>/gi,
    /onclick="switchTab\('([^']+)'[^"]*"[\s\S]*?<span class="sidebar-btn-title">([\s\S]*?)<\/span>\s*<span class="sidebar-btn-desc">([\s\S]*?)<\/span>/gi,
    /onclick="switchTab\('([^']+)'\)"[\s\S]*?<div class="tab-btn-content">[\s\S]*?<span>([^<]*)<\/span>\s*<span>([\s\S]*?)<\/span>/gi,
    /onclick="switchTab\('([^']+)'\)">\s*<div class="sidebar-btn-left">[\s\S]*?<span class="sidebar-btn-title">([\s\S]*?)<\/span>/gi,
  ]

  for (const re of patterns) {
    let m
    while ((m = re.exec(html)) !== null) {
      const id = m[1]
      if (seen.has(id)) continue
      seen.add(id)
      const title = stripTags(m[2] || id)
      const desc = stripTags(m[3] || '')
      sections.push({
        id,
        title: title || id,
        desc,
        role: THEORY_HINTS.test(id) ? 'theory' : DOCS_HINTS.test(id) ? 'docs' : 'interactive',
      })
    }
  }

  // Fallback: panel ids
  if (!sections.length) {
    const panelRe = /id="((?:panel|tab)-[^"]+)"/gi
    let m
    while ((m = panelRe.exec(html)) !== null) {
      const raw = m[1]
      const id = raw.replace(/^panel-/, '')
      if (seen.has(id) || seen.has(raw)) continue
      seen.add(id)
      sections.push({
        id: raw.startsWith('tab-') ? raw : id,
        title: id,
        desc: '',
        role: THEORY_HINTS.test(id) || THEORY_HINTS.test(raw) ? 'theory' : DOCS_HINTS.test(id) ? 'docs' : 'interactive',
      })
    }
  }

  return sections
}

function extractPanelHtml(html, panelIds) {
  for (const id of panelIds) {
    const re = new RegExp(
      `<section[^>]*id="${id}"[^>]*>([\\s\\S]*?)<\\/section>`,
      'i',
    )
    const m = html.match(re)
    if (m) return m[1].trim()
  }
  return ''
}

function extractResourceTitle(inner) {
  const patterns = [
    /resource-card-title"[^>]*>\s*(?:<span[^>]*>[\s\S]*?<\/span>\s*)?([\s\S]*?)<\/span>/i,
    /resource-card-title"[^>]*>([\s\S]*?)<\/(?:span|div)>/i,
  ]
  for (const re of patterns) {
    const m = inner.match(re)
    if (m) {
      const t = stripTags(m[1] || m[0])
      if (t && t.length > 1) return t.slice(0, 140)
    }
  }
  return stripTags(inner).slice(0, 120)
}

function extractResources(html) {
  const resources = []
  const seen = new Set()
  const cardRe = /<a\s+([^>]*href="([^"]+)"[^>]*)>([\s\S]*?)<\/a>/gi
  let m
  while ((m = cardRe.exec(html)) !== null) {
    const attrs = m[1]
    const url = m[2]
    const inner = m[3]
    if (!/resource-card/i.test(attrs) && !/resource-card/i.test(inner) && !/class="[^"]*resource-card/i.test(attrs)) {
      // also accept if parent context — check class on <a>
      if (!/\bresource-card\b/i.test(attrs)) continue
    }
    if (!url || url.startsWith('#') || url.startsWith('javascript:')) continue
    const descMatch = inner.match(/resource-card-desc"[^>]*>([\s\S]*?)<\/p>/i)
    const title = extractResourceTitle(inner) || url
    const key = url + '|' + title
    if (seen.has(key)) continue
    seen.add(key)
    resources.push({
      title,
      subtitle: stripTags(descMatch?.[1] || '').slice(0, 160),
      url,
    })
  }
  return resources
}

function toContentLocalUrl(contentBase, href) {
  if (!href) return null
  if (/^https?:/i.test(href) || href.startsWith('/')) return href
  return `${contentBase}/${href.split('/').map((p) => encodeURIComponent(p)).join('/')}`
}

function extractDocuments(html, contentBase) {
  const docs = []
  const seen = new Set()

  // Estrategia: cada pdf-name + ventana de ~900 chars hacia delante (Local/Drive)
  const nameRe = /class="pdf-name"[^>]*>([\s\S]*?)<\/div>/gi
  let m
  while ((m = nameRe.exec(html)) !== null) {
    const title = stripTags(m[1])
    if (!title || seen.has(title)) continue
    const window = html.slice(m.index, m.index + 1200)
    const desc = stripTags((window.match(/class="pdf-desc"[^>]*>([\s\S]*?)<\/div>/i) || [])[1] || '')
    const local = (window.match(/href="([^"]+\.pdf)"/i) || [])[1] || ''
    const drive = (window.match(/href="(https:\/\/drive\.google\.com[^"]+)"/i) || [])[1] || null
    seen.add(title)
    docs.push({
      title,
      desc,
      localUrl: toContentLocalUrl(contentBase, local),
      driveUrl: drive,
    })
  }

  // Fallback: PDFs relativos en la carpeta
  if (!docs.length) {
    const pdfRe = /href="([^"]+\.pdf)"/gi
    while ((m = pdfRe.exec(html)) !== null) {
      const href = m[1]
      if (/^https?:/i.test(href)) continue
      const title = decodeURIComponent(href.split('/').pop())
      if (seen.has(title)) continue
      seen.add(title)
      docs.push({
        title,
        desc: '',
        localUrl: toContentLocalUrl(contentBase, href),
        driveUrl: null,
      })
    }
  }

  return docs
}

function rewriteHtml(html, { subjectId, topicId }) {
  let out = html

  out = out.replace(
    /href="\.\.\/\.\.\/assets\/css\/common\.css"/g,
    'href="/content/_shared/common.css"',
  )
  out = out.replace(
    /href="\.\.\/\.\.\/index\.html"/g,
    'href="/"',
  )

  // Cross-topic relative Apuntes links → Vue routes
  out = out.replace(
    /href="\.\.\/([a-z0-9_-]+)\/Apuntes\.html"/gi,
    (_, otherTopic) => `href="/subjects/${subjectId}/topics/${otherTopic}"`,
  )

  // Self links
  out = out.replace(
    /href="Apuntes\.html"/g,
    `href="/content/${subjectId}/${topicId}/Apuntes.html"`,
  )

  // Inject bridge before </body>
  if (/<\/body>/i.test(out)) {
    out = out.replace(/<\/body>/i, `${EMBED_BRIDGE}\n</body>`)
  } else {
    out += EMBED_BRIDGE
  }

  return out
}

function buildTheoryHtml(panelInner) {
  if (!panelInner) return ''
  // Quitar resource hub duplicado (Vue lo renderiza aparte)
  return panelInner
    .replace(/<div class="resource-hub-container">[\s\S]*?<\/div>\s*(?=<div class="resource-group|<section|<div class="theory|<article|<div class="section)/i, '')
    .trim()
}

function migrateTopic(topic, subject) {
  const subjectId = subject.id
  const topicId = topic.id
  const sourceRel = topic.vueModule
    ? `${topic.vueModule}/Apuntes.html`
    : `${subjectId}/${topicId}/Apuntes.html`
  const absHtml = path.join(repoRoot, sourceRel)
  if (!fs.existsSync(absHtml)) {
    return { skipped: true, reason: `no existe ${sourceRel}` }
  }

  const topicDir = path.dirname(absHtml)
  const destDir = path.join(publicContent, subjectId, topicId)
  const pkgDir = path.join(packagesRoot, subjectId, topicId)
  const contentBase = `/content/${subjectId}/${topicId}`

  ensureDir(destDir)
  ensureDir(pkgDir)

  // Solo medios (PDF, imágenes, audio…) — nunca publicar Apuntes.html
  const copied = []
  for (const entry of fs.readdirSync(topicDir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      copied.push(...copyDirContents(path.join(topicDir, entry.name), path.join(destDir, entry.name)).map((p) => path.join(entry.name, p)))
      continue
    }
    const name = entry.name
    if (/^Apuntes\.(html|css)$/i.test(name)) continue
    copyFile(path.join(topicDir, name), path.join(destDir, name))
    copied.push(name)
  }
  const rawHtml = fs.readFileSync(absHtml, 'utf8')

  const sections = extractSidebarSections(rawHtml)
  // Curie y similares: si no hay teoría en sidebar, se mantiene role interactive

  const theoryPanelIds = [
    'panel-apuntes',
    'panel-apunts',
    'panel-teoria',
    'panel-theory',
    'panel-comunicacion',
    'view-apuntes',
    'view-teoria',
    'tab-teoria',
    'tab-apuntes',
    'tab-apunts',
  ]
  // Añadir primer section con role theory
  for (const s of sections) {
    if (s.role === 'theory') {
      theoryPanelIds.unshift(`panel-${s.id}`, `view-${s.id}`, s.id)
    }
  }
  const theoryInner = extractPanelHtml(rawHtml, [...new Set(theoryPanelIds)])
  const theoryHtml = buildTheoryHtml(theoryInner)

  const resources = extractResources(rawHtml)
  let documents = extractDocuments(rawHtml, contentBase)

  // Completar estantería con PDFs presentes en carpeta si faltan
  if (documents.length === 0) {
    for (const name of copied) {
      if (!/\.pdf$/i.test(name) || name.includes('/') || name.includes('\\')) continue
      documents.push({
        title: name,
        desc: 'Documento local del tema',
        localUrl: toContentLocalUrl(contentBase, name),
        driveUrl: null,
      })
    }
  }

  // Guardar HTML de cada panel para consumo futuro
  const panelsDir = path.join(pkgDir, 'panels')
  ensureDir(panelsDir)
  const panelIdRe = /<section[^>]*id="((?:panel|tab|view)-[^"]+)"[^>]*>/gi
  let pm
  const panelIds = []
  while ((pm = panelIdRe.exec(rawHtml)) !== null) {
    panelIds.push(pm[1])
  }
  for (const pid of panelIds) {
    const inner = extractPanelHtml(rawHtml, [pid])
    if (inner) {
      fs.writeFileSync(path.join(panelsDir, `${pid}.html`), inner, 'utf8')
    }
  }

  if (theoryHtml) {
    fs.writeFileSync(path.join(pkgDir, 'theory.html'), theoryHtml, 'utf8')
  }

  const manifest = {
    version: 1,
    subjectId,
    topicId,
    title: topic.title,
    language: topic.language || 'es',
    contentBase,
    sections,
    resources,
    documents,
    theoryHtml,
    panelIds,
    copiedFiles: copied,
    migratedAt: new Date().toISOString(),
  }

  fs.writeFileSync(
    path.join(pkgDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8',
  )

  return {
    skipped: false,
    subjectId,
    topicId,
    sections: sections.length,
    resources: resources.length,
    documents: documents.length,
    files: copied.length,
    hasTheory: Boolean(theoryHtml),
  }
}

function main() {
  const catalog = JSON.parse(fs.readFileSync(subjectsPath, 'utf8'))

  // Shared CSS
  const sharedCssSrc = path.join(repoRoot, 'assets', 'css', 'common.css')
  const sharedCssDest = path.join(publicContent, '_shared', 'common.css')
  if (fs.existsSync(sharedCssSrc)) {
    copyFile(sharedCssSrc, sharedCssDest)
  }

  const results = []
  for (const subject of catalog.subjects || []) {
    for (const topic of subject.topics || []) {
      const result = migrateTopic(topic, subject)
      results.push({ subject: subject.id, topic: topic.id, ...result })
      if (result.skipped) {
        console.log(`SKIP  ${subject.id}/${topic.id} — ${result.reason}`)
      } else {
        console.log(
          `OK    ${subject.id}/${topic.id} — sections=${result.sections} resources=${result.resources} docs=${result.documents} files=${result.files} theory=${result.hasTheory}`,
        )
      }
    }
  }

  const index = {
    version: 1,
    generatedAt: new Date().toISOString(),
    topics: results.filter((r) => !r.skipped).map((r) => ({
      key: `${r.subjectId}/${r.topicId}`,
      subjectId: r.subjectId,
      topicId: r.topicId,
      sections: r.sections,
      resources: r.resources,
      documents: r.documents,
      hasTheory: r.hasTheory,
    })),
  }
  ensureDir(packagesRoot)
  fs.writeFileSync(
    path.join(packagesRoot, 'index.json'),
    JSON.stringify(index, null, 2),
    'utf8',
  )

  console.log('\nResumen:', index.topics.length, 'temas migrados')
}

main()
