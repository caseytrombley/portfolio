import type { Handler } from '@netlify/functions'

const handler: Handler = async (event) => {
  const slug = event.queryStringParameters?.slug

  if (!slug) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing slug' })
    }
  }

  const wpURL = `https://www.blog.caseytrombley.com/wp-json/wp/v2/posts?slug=${slug}`

  try {
    const wpRes = await fetch(wpURL)
    const data = await wpRes.json()

    if (!data.length) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Post not found' })
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data[0])
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch post' })
    }
  }
}

export { handler }
