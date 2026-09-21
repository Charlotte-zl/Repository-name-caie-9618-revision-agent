import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath, pathToFileURL } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const playwright = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(path.join(process.env.PLAYWRIGHT_MODULE, 'index.js')).href : 'playwright');
const { chromium } = playwright.default ?? playwright;
const course = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/caie9618.json'), 'utf8'));
const root = path.resolve(__dirname, '../out');
for (const t of course.topics) {
  assert(t.source.pdfPage === t.source.printedPage + 16, `${t.id}: page reference`);
  assert(t.practice.markScheme.length === t.practice.markSchemeChinese.length);
  for (const q of t.quiz) assert(q.options.includes(q.answer), `${t.id}: answer missing from options`);
}
assert.equal(new Set(course.topics.map(t => t.source.chapter)).size, 20);
const server = http.createServer((req, res) => {
  let name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  let target = path.resolve(root, '.' + name);
  if (!target.startsWith(root + path.sep) && target !== root) { res.writeHead(403).end(); return; }
  if (fs.existsSync(target + '.html')) target += '.html';
  else if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
  if (!fs.existsSync(target)) target += '.html';
  if (!fs.existsSync(target)) { res.writeHead(404).end('Not found'); return; }
  const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.woff2': 'font/woff2' };
  res.setHeader('Content-Type', mime[path.extname(target)] || 'application/octet-stream');
  fs.createReadStream(target).pipe(res);
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'msedge' });
    const context = await browser.newContext(); const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const t of course.topics) {
      const response = await page.goto(origin + t.href);
      assert.equal(response.status(), 200, t.id);
      await page.getByRole('heading', { level: 1 }).waitFor();
      assert((await page.locator('main').innerText()).includes(t.source.section));
    }
    await page.goto(origin + '/topics');
    await page.getByLabel('搜索主题或术语').fill('递归');
    assert.equal(await page.locator('article').count(), 1);
    await page.getByLabel('学习阶段').selectOption('AS');
    await page.getByText('没有匹配主题，请更换关键词或学习阶段。').waitFor();
    await page.goto(origin + '/revision/recursion');
    await page.getByLabel('我已阅读本节讲解').check();
    await page.getByRole('button', { name: 'Infinite loop', exact: true }).click();
    await page.getByText('已加入待复习 / Review needed').waitFor();
    await page.getByLabel('英文作答 / Your answer').fill('The base case is factorial(0) = 1.');
    await page.getByRole('button', { name: '查看评分点并自评', exact: true }).click();
    await page.locator('#practice input[type=checkbox]').nth(1).check();
    await page.getByRole('button', { name: '保存自评结果', exact: true }).click();
    await page.reload();
    assert.equal(await page.getByLabel('英文作答 / Your answer').inputValue(), 'The base case is factorial(0) = 1.');
    await page.getByText('自评：1 / 3', { exact: true }).waitFor();
    await page.goto(origin + '/progress');
    await page.getByText('factorial(0)=1 在递归阶乘中是什么？', { exact: true }).waitFor();
    const recursion = page.locator('article').filter({ hasText: '递归与问题求解' });
    assert((await recursion.innerText()).includes('简答自评：1/3'));
    await page.goto(origin + '/revision/recursion');
    await page.getByRole('button', { name: '重新作答', exact: true }).click();
    await page.getByRole('button', { name: 'Base case', exact: true }).click();
    await page.goto(origin + '/progress');
    await page.getByText('当前没有待复习错题。到主题页作答后，这里会显示答错的题目。').waitFor();
    await page.goto(origin + '/revision/programming');
    assert.equal(await page.getByLabel('英文作答 / Your answer').inputValue(), '');
    assert.equal(await page.getByLabel('我已阅读本节讲解').isChecked(), false);
    await page.evaluate(() => localStorage.setItem('caie9618-progress-v1', '{bad json'));
    await page.reload();
    assert.equal(await page.getByLabel('英文作答 / Your answer').inputValue(), '');
    // A second tab must reflect storage changes.
    const second = await page.context().newPage();
    await second.goto(origin + '/revision/programming');
    await page.getByLabel('我已阅读本节讲解').check();
    await second.waitForFunction(() => document.querySelector('input[type=checkbox]').checked);
    await second.close();
    await page.setViewportSize({ width: 390, height: 844 });
    fs.mkdirSync(path.resolve(__dirname, '../tmp/qa'), { recursive: true });
    for (const route of ['/topics', '/revision/recursion', '/progress']) {
      await page.goto(origin + route);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${route}: mobile overflow`);
      await page.screenshot({ path: path.resolve(__dirname, '../tmp/qa/' + route.replaceAll('/', '-') + '.png'), fullPage: true });
    }
    const restricted = await browser.newContext();
    await restricted.addInitScript(() => { Object.defineProperty(Storage.prototype, 'setItem', { value() { throw new DOMException('Blocked', 'SecurityError'); } }); });
    const blocked = await restricted.newPage();
    await blocked.goto(origin + '/revision/programming');
    await blocked.getByLabel('我已阅读本节讲解').check();
    await blocked.getByText('无法持久保存；当前记录仅保留在此页面会话。').waitFor();
    await restricted.close();
    assert.deepEqual(errors, [], 'Browser errors');
    console.log(`PASS: ${course.topics.length} routes, 20 chapter references, filtering, quiz correction, draft/self-assessment persistence, isolation, corrupt storage, cross-tab sync, blocked storage, mobile layout; no browser errors.`);
  } finally {
    if (browser) await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });



