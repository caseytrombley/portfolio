import type { Handler } from '@netlify/functions'

const handler: Handler = async (event) => {
  const page = event.queryStringParameters?.page || '1'
  const perPage = event.queryStringParameters?.per_page || '5'

  const wpURL = `https://www.blog.caseytrombley.com/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}`

  try {
    const wpRes = await fetch(wpURL)
    const data = await wpRes.json()
    const total = wpRes.headers.get('X-WP-Total') || '0'

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Total': total
      },
      body: JSON.stringify(data)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch posts.' })
    }
  }
}

export { handler }
