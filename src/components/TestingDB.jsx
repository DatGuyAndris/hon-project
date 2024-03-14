'use client'
import React from 'react'
import prisma from '../lib/prisma';

async function getPost() {

    const post = await prisma.testmodel.findMany({
      where: {
        published: true,
      },
    });
    return post;
  }

export const TestingDB = async () => {

   const posts = await getPost()
   console.log({posts})

  return (


    <div>
        {/* {posts?.map((post) => {
        return (
          <div key={post.id} className="bg-blue">
            {post.title}
          </div>
        );
      })} */}
      </div>
  )
}
