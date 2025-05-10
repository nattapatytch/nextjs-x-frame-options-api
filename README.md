# X-Frame-Options API Demo

This is a Next.js API demonstration project that shows different X-Frame-Options header settings.

## API Endpoints

1. `/api/sameorigin` - Returns response with `X-Frame-Options: SAMEORIGIN`
   - Only allows the page to be displayed in a frame on the same origin as the page itself
   
2. `/api/deny` - Returns response with `X-Frame-Options: DENY`
   - Prevents any domain from displaying the page in a frame
   
3. `/api/allow` - Returns response with no X-Frame-Options header
   - Allows any domain to display the page in a frame

## Response Format

All endpoints return JSON in the following format:

```json
{
  "status": "ok",
  "mode": "[SAMEORIGIN|DENY|ALLOW]"
}
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Access the API endpoints at:
   - http://localhost:3000/api/sameorigin
   - http://localhost:3000/api/deny
   - http://localhost:3000/api/allow 