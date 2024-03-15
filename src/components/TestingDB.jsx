'use client'
import prisma from '@/lib/prisma'
import React, { useEffect, useState } from 'react';

async function getPost() {
  const post = await prisma.testmodel.findMany();
  return post;
}

export const TestingDB = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    getPost().then(data => {
      setPosts(data);
    });
  }, []);

  if (!posts) return <div>Loading...</div>;

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default TestingDB;