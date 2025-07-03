import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { url } = req.body

    if (!url) {
      return res.status(400).json({ error: 'URL is required' })
    }

    // Fetch headers only (HEAD request)
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'curl/7.68.0'
      }
    })

    // Convert headers to plain object
    const headers: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      headers[key] = value
    })

    const headerData = {
      status: response.statusText,
      statusCode: response.status,
      headers,
      url,
      timestamp: new Date().toISOString()
    }

    res.status(200).json(headerData)
  } catch (error) {
    console.error('Error fetching headers:', error)
    res.status(500).json({ 
      error: 'Failed to fetch headers',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 