import { useParams, Link } from 'react-router-dom'
import { blogPosts } from '../data/siteData'

export function BlogPostPage() {
  const { slug } = useParams()
  const post = blogPosts.find((item) => item.id === slug)

  if (!post) {
    return (
      <section className="section section-narrow">
        <div className="container text-center">
          <h1>Post not found</h1>
          <Link to="/blog" className="button button-primary">Back to blog</Link>
        </div>
      </section>
    )
  }

  return (
    <article className="section blog-post-wrap">
      <div className="container blog-post-container">
        <img src={post.image} alt={post.title} className="blog-post-hero" />
        <div className="blog-post-content">
          <p className="eyebrow">{post.category}</p>
          <h1>{post.title}</h1>
          <div className="blog-meta">
            <span>{post.author}</span>
            <span>{post.readTime}</span>
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>

          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <Link to="/blog" className="button button-secondary">Back to articles</Link>
        </div>
      </div>
    </article>
  )
}
