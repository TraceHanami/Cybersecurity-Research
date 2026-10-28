export const tornadoAdvisory = {
  id: 'res-advisory-tornado-static-url',
  slug: 'tornado-static-url-path-traversal',
  type: 'advisory',
  title: 'static_url()/get_version() hashes files outside static_path on traversal input',
  category: 'Vulnerability Advisory',
  subCategory: 'Tornado',
  tags: ['Vulnerability Advisory', 'Tornado'],
  advisoryId: 'GHSA-v8g8-cp5j-42fg',
  packageName: 'tornado (pip)',
  affected: '<6.6',
  patched: '6.6.0',
  severity: 'Low',
  cve: 'No known CVE',
  weaknesses: ['CWE-22', 'CWE-400'],
  credit: 'Reported by TraceHanami. Published by bdarnell (maintainer).',
  dates: ['opened 3 weeks ago', 'published 5 days ago'],
  headerNote: 'Based on the public GitHub Security Advisory',
  sections: [
    {
      id: 'summary',
      title: 'Summary',
      paragraphs: [
        'RequestHandler.static_url() computes a version hash by reading the named file but did not check that the path stays inside static_path. If an application passes untrusted input to static_url(), an attacker can make Tornado read and hash files elsewhere on the filesystem using ../ in the path. The SHA-512 digest appears in the generated URL. A path that resolves to a device such as /dev/zero makes the hash calculation run indefinitely, blocking the event loop.'
      ]
    },
    {
      id: 'impact',
      title: 'Impact',
      paragraphs: [
        'Only applications that pass a value derived from untrusted input (for example a query parameter) as the path argument to static_url() (or StaticFileHandler.make_static_url() / get_version()) are affected. Applications that pass only fixed asset names, as in {{ static_url("site.css") }}, are not affected. For affected apps: an attacker can obtain the SHA-512 hash of any file readable by the server process, which does not reveal contents but can confirm a file\'s existence or guesses about its contents; and can block the server indefinitely by naming a file that never ends, such as /dev/zero. Requests served by StaticFileHandler itself are not affected; they already reject these paths.'
      ]
    },
    {
      id: 'maintainer-assessment',
      title: 'Maintainer assessment (three separate issues)',
      items: [
        '(1) escape from the root via directory traversal (../), which should be fixed;',
        '(2) escape via symlink, a bug that is difficult to exploit and difficult to fix as structured, because allowed_symlink_directory is not accessible in static_url, so an attacker who can place a symlink in the static directory can extract hashes of files not meant to be exposed;',
        '(3) infinite device files can block the IOLoop forever and very large regular files can block for a long time, so reading from anything but a regular file should be prohibited and a size cap added.'
      ]
    },
    {
      id: 'patches',
      title: 'Patches',
      paragraphs: [
        'Fixed in Tornado 6.6: paths that lead outside static_path (such as ../secret) now raise HTTPError (403) from static_url(); files that are not regular files (devices, FIFOs, and special filenames such as NUL on Windows) are no longer read and get no version; version hashing stops after StaticFileHandler.MAX_VERSION_CONTENT_SIZE (64 MiB by default), and larger files get no version.',
        'Symlinks inside the static directory are still followed when computing a version, even if they point outside it, because static_url() cannot see allowed_symlink_directory; their targets are never served this way, but their hash is revealed. Only trusted users should be able to create symlinks in the static directory.',
        'static_url() is still not intended for untrusted input; applications should map untrusted input to a known set of asset names before calling it.'
      ]
    },
    {
      id: 'workarounds',
      title: 'Workarounds',
      paragraphs: [
        'validate or allowlist any path passed to static_url(), or avoid passing request-derived values to it.'
      ]
    },
    {
      id: 'credit',
      title: 'Credit',
      paragraphs: ['Reported by TraceHanami.']
    }
  ]
};
