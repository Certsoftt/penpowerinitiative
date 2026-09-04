import { Link } from 'react-router-dom'
import { blogPosts } from '../data/siteData'

export function BlogPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Insights & stories</p>
          <h1>Blog</h1>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <img src={post.image} alt={post.title} />
              <div className="blog-card-body">
                <span className="blog-tag">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="blog-meta">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
                <Link to={`/blog/${post.id}`} className="text-link">Read more</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
