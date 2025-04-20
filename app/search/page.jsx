import React from 'react';
import { redirect } from 'next/navigation';
import posts from '@/data/posts';

export default function SearchPage({ searchParams }) {
  const query = searchParams.q || '';

  if (!query) {
    // Optional: Redirect back if no query is provided
    redirect('/');
  }

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.subheader.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      
      {filteredPosts.length > 0 ? (
        <div>
          {filteredPosts.map(post => (
            <div key={post.id} style={{ margin: '20px', padding: '10px', border: '1px solid #ccc' }}>
              <img src={post.image} alt={post.title} width="100" />
              <h3>{post.title}</h3>
              <p>{post.subheader}</p>
              <p>Price: ${post.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found for "{query}"</p>
      )}
    </div>
  );
}