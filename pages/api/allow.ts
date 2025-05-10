import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

type ResponseData = {
  status: string
  mode: string
  allowedUrls?: string[]
  csp?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | string>
) {
  const { urls, csp } = req.query
  const acceptHeader = req.headers.accept || '';
  const wantsHtml = acceptHeader.includes('text/html');
  let allowedUrls: string[] = []

  if (typeof urls === 'string') {
    allowedUrls = urls.split(',')
  } else if (Array.isArray(urls)) {
    allowedUrls = urls
  }

  // Set CSP header
  if (typeof csp === 'string' && csp.trim()) {
    // Use custom CSP from query parameter
    res.setHeader('Content-Security-Policy', csp);
  } else {
    // Set frame-ancestors based on allowedUrls
    const frameAncestors = allowedUrls.length > 0 ? allowedUrls.join(' ') : '*';
    res.setHeader('Content-Security-Policy', `frame-ancestors ${frameAncestors};`);
  }

  // Set X-Frame-Options
  if (allowedUrls.length > 0) {
    res.setHeader('X-Frame-Options', 'ALLOWALL');
  } else {
    res.removeHeader('X-Frame-Options');
  }

  if (wantsHtml) {
    // Read and serve the HTML content
    const htmlPath = path.join(process.cwd(), 'pages', 'api', 'content.html')
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(htmlContent)
  } else {
    // Serve JSON response
    res.status(200).json({ 
      status: 'ok', 
      mode: 'ALLOW',
      allowedUrls: allowedUrls.length > 0 ? allowedUrls : ['*'],
      csp: typeof csp === 'string' ? csp : `frame-ancestors ${allowedUrls.length > 0 ? allowedUrls.join(' ') : '*'};`
    })
  }
} 