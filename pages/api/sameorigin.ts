import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

type ResponseData = {
  status: string
  mode: string
  csp?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | string>
) {
  const { csp } = req.query
  const acceptHeader = req.headers.accept || '';
  const wantsHtml = acceptHeader.includes('text/html');

  res.setHeader('X-Frame-Options', 'SAMEORIGIN')

  if (typeof csp === 'string' && csp.trim()) {
    res.setHeader('Content-Security-Policy', csp);
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
      mode: 'SAMEORIGIN',
      csp: typeof csp === 'string' ? csp : 'Not set'
    })
  }
} 