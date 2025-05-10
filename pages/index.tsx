import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 p-8">
      <Head>
        <title>X-Frame-Options API Documentation</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">X-Frame-Options API Documentation</h1>
          <p className="text-gray-600 mb-8">API for testing X-Frame-Options and Content Security Policy (CSP)</p>

          {/* API Endpoints */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available API Endpoints</h2>
            
            <div className="space-y-6">
              {/* SAMEORIGIN */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">1. /api/sameorigin</h3>
                <p className="text-gray-600 mb-4">Sets X-Frame-Options to SAMEORIGIN to allow iframes only from the same domain</p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-700 font-medium mb-1">Basic usage:</p>
                    <div className="bg-gray-100 p-3 rounded">
                      <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                        http://localhost:3000/api/sameorigin
                      </pre>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-700 font-medium mb-1">With default-src 'self' (before encode):</p>
                    <div className="bg-gray-100 p-3 rounded overflow-x-auto">
                      <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                        http://localhost:3000/api/sameorigin?csp=default-src 'self'
                      </pre>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-700 font-medium mb-1">With default-src 'self' (after encode):</p>
                    <div className="bg-gray-100 p-3 rounded overflow-x-auto">
                      <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                        http://localhost:3000/api/sameorigin?csp=default-src%20'self'
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* DENY */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-red-600 mb-2">2. /api/deny</h3>
                <p className="text-gray-600 mb-4">Sets X-Frame-Options to DENY to prevent any iframe embedding</p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-700 font-medium mb-1">Basic usage:</p>
                    <div className="bg-gray-100 p-3 rounded">
                      <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                        http://localhost:3000/api/deny
                      </pre>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-700 font-medium mb-1">With default-src 'self' (before encode):</p>
                    <div className="bg-gray-100 p-3 rounded overflow-x-auto">
                      <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                        http://localhost:3000/api/deny?csp=default-src 'self'
                      </pre>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-700 font-medium mb-1">With default-src 'self' (after encode):</p>
                    <div className="bg-gray-100 p-3 rounded overflow-x-auto">
                      <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                        http://localhost:3000/api/deny?csp=default-src%20'self'
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* ALLOW */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-green-600 mb-2">3. /api/allow</h3>
                <p className="text-gray-600 mb-4">Allows iframe embedding from specified domains</p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-700 font-medium mb-1">Basic usage:</p>
                    <div className="bg-gray-100 p-3 rounded">
                      <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                        http://localhost:3000/api/allow
                      </pre>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-700 font-medium mb-1">With default-src 'self' (before encode):</p>
                    <div className="bg-gray-100 p-3 rounded overflow-x-auto">
                      <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                        http://localhost:3000/api/allow?csp=default-src 'self'
                      </pre>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-700 font-medium mb-1">With default-src 'self' (after encode):</p>
                    <div className="bg-gray-100 p-3 rounded overflow-x-auto">
                      <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                        http://localhost:3000/api/allow?csp=default-src%20'self'
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* NONE */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-purple-600 mb-2">4. /api/none</h3>
                <p className="text-gray-600 mb-4">No X-Frame-Options header, but allows CSP configuration</p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-700 font-medium mb-1">Basic usage:</p>
                    <div className="bg-gray-100 p-3 rounded">
                      <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                        http://localhost:3000/api/none
                      </pre>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-700 font-medium mb-1">With default-src 'self' (before encode):</p>
                    <div className="bg-gray-100 p-3 rounded overflow-x-auto">
                      <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                        http://localhost:3000/api/none?csp=default-src 'self'
                      </pre>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-700 font-medium mb-1">With default-src 'self' (after encode):</p>
                    <div className="bg-gray-100 p-3 rounded overflow-x-auto">
                      <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                        http://localhost:3000/api/none?csp=default-src%20'self'
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Simple CSP for Testing */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Simple CSP for Testing</h2>
            
            <div className="bg-yellow-50 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-2">
                <span className="text-yellow-800 text-xl">⚠️</span>
                <div>
                  <p className="text-yellow-800 font-semibold">For testing purposes only!</p>
                  <p className="text-yellow-700">Not recommended for production use due to security risks</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Simplest CSP:</h3>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                  default-src * 'unsafe-inline'
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">After URL encode:</h3>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                  default-src%20*%20'unsafe-inline'
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">Common CSP Examples:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>
                    <code className="bg-gray-200 px-1 rounded">default-src 'self'</code>
                    <span className="ml-2">- Only allow resources from the same origin</span>
                  </li>
                  <li>
                    <code className="bg-gray-200 px-1 rounded">default-src * 'unsafe-inline'</code>
                    <span className="ml-2">- Allow resources from any source (less secure, for testing only)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Additional Notes */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Notes</h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-gray-600">• Use Browser Developer Tools (F12) to check Response Headers</p>
              <p className="text-gray-600">• Test iframe embedding using a separate test page</p>
              <p className="text-gray-600">• Check Console for X-Frame-Options and CSP related errors</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 