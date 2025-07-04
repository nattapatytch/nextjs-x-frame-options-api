import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

interface HeaderResponse {
  status: string
  headers: Record<string, string>
  url: string
  timestamp: string
}

export default function Demo() {
  const router = useRouter()
  const [baseUrl, setBaseUrl] = useState('')
  const [headerData, setHeaderData] = useState<HeaderResponse | null>(null)
  const [isLoadingHeaders, setIsLoadingHeaders] = useState(false)
  const [targetUrl, setTargetUrl] = useState('')
  const [isClient, setIsClient] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    // Get the current domain and port dynamically
    const protocol = window.location.protocol
    const host = window.location.host
    const currentBaseUrl = `${protocol}//${host}`
    setBaseUrl(currentBaseUrl)

    // Get URL from query parameter
    const urlFromQuery = router.query.url as string
    if (urlFromQuery) {
      setTargetUrl(urlFromQuery)
    } else {
      // Default to none endpoint if no URL provided
      setTargetUrl(`${currentBaseUrl}/api/none`)
    }
  }, [router.query.url, isClient])

  // Auto fetch headers when targetUrl changes
  useEffect(() => {
    if (targetUrl && isClient) {
      fetchHeaders()
    }
  }, [targetUrl, isClient])

  const fetchHeaders = async () => {
    if (!targetUrl) return
    
    setIsLoadingHeaders(true)
    try {
      const response = await fetch('/api/curl-headers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: targetUrl
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        setHeaderData(data)
      } else {
        console.error('Failed to fetch headers')
      }
    } catch (error) {
      console.error('Error fetching headers:', error)
    } finally {
      setIsLoadingHeaders(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 p-8">
      <Head>
        <title>X-Frame-Options Demo</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-gray-800">X-Frame-Options Demo</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
              >
                {showInstructions ? '🙈 Hide Instructions' : '📖 Show Instructions'}
              </button>
              <a
                href="/"
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
              >
                📚 Documentation
              </a>
            </div>
          </div>
          <p className="text-gray-600 mb-8">Testing iframe embedding with custom URL</p>

          <div className="space-y-6">
            {/* Usage Instructions */}
            {showInstructions && (
              <div className="bg-blue-50 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">How to Use</h2>
                <div className="space-y-3 text-blue-700">
                  <p><strong>1. Change URL in address bar:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Add <code className="bg-blue-200 px-1 rounded">?url=</code> parameter to test different endpoints</li>
                    <li>Example: <code className="bg-blue-200 px-1 rounded">/demo?url=http://localhost:8080/api/sameorigin</code></li>
                  </ul>
                  
                  <p><strong>2. Test different scenarios:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><code className="bg-blue-200 px-1 rounded">/demo?url=http://localhost:8080/api/deny</code> - Test DENY mode</li>
                    <li><code className="bg-blue-200 px-1 rounded">/demo?url=http://localhost:8080/api/sameorigin</code> - Test SAMEORIGIN mode</li>
                    <li><code className="bg-blue-200 px-1 rounded">/demo?url=http://localhost:8080/api/allow?urls=http://localhost:8080</code> - Test ALLOW mode</li>
                    <li><code className="bg-blue-200 px-1 rounded">/demo?url=http://localhost:8080/api/none</code> - Test NO header mode</li>
                  </ul>
                  
                  <p><strong>3. Watch the iframe:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Iframe will load if X-Frame-Options allows it</li>
                    <li>Iframe will be blocked if X-Frame-Options prevents it</li>
                    <li>Headers will be fetched automatically to show X-Frame-Options value</li>
                  </ul>
                </div>
              </div>
            )}

            {/* URL Input */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Target URL</h2>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="Enter URL to test..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg font-mono text-sm"
                />
                <button
                  onClick={() => {
                    if (isClient) {
                      const newUrl = `${window.location.origin}/demo?url=${encodeURIComponent(targetUrl)}`
                      window.history.pushState({}, '', newUrl)
                      // Update router query to trigger re-render
                      router.push(`/demo?url=${encodeURIComponent(targetUrl)}`, undefined, { shallow: true })
                    }
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Update URL
                </button>
              </div>
              <p className="text-blue-600 mt-2 text-sm">
                Current page URL: {isClient ? decodeURIComponent(window.location.href) : 'Loading...'}
              </p>
            </div>

            {/* Iframe Demo */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Iframe Test</h2>
              <p className="text-gray-600 mb-4">Testing iframe embedding for: <code className="bg-gray-200 px-1 rounded">{targetUrl || 'Loading...'}</code></p>
              
              <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                {isClient && targetUrl && (
                  <iframe 
                    ref={iframeRef}
                    src={targetUrl}
                    className="w-full h-[400px] border border-gray-300 rounded-lg"
                    title="X-Frame-Options Demo"
                  />
                )}
                {(!isClient || !targetUrl) && (
                  <div className="w-full h-[400px] border border-gray-300 rounded-lg bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-500">Loading iframe...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Curl Headers Section */}
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-purple-800">Curl -I Output (JSON)</h2>
                <button
                  onClick={fetchHeaders}
                  disabled={isLoadingHeaders || !targetUrl || !isClient}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoadingHeaders ? 'Loading...' : 'Fetch Headers'}
                </button>
              </div>
              
              {headerData && (
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(headerData, null, 2)}
                  </pre>
                </div>
              )}
              
              {!headerData && !isLoadingHeaders && (
                <div className="bg-gray-100 rounded-lg p-4 text-gray-600">
                  Click "Fetch Headers" to see the curl -I output in JSON format
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
} 

