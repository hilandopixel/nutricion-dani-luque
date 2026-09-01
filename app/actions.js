'use server';

import { createPost, updatePost, deletePost } from '@/lib/postsService';
import { revalidatePath } from 'next/cache';

export async function handleCreatePost(formData) {
  const title = formData.get('title');
  const slug = formData.get('slug');
  const excerpt = formData.get('excerpt');
  const content = formData.get('content');

  await createPost({ title, slug, excerpt, content });

  revalidatePath('/');
  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
}

export async function handleUpdatePost(formData) {
  const id = formData.get('id');
  const title = formData.get('title');
  const slug = formData.get('slug');
  const excerpt = formData.get('excerpt');
  const content = formData.get('content');

  await updatePost(id, { title, slug, excerpt, content });

  revalidatePath('/');
  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
}

export async function handleDeletePost(id) {
  await deletePost(id);
  revalidatePath('/');
  revalidatePath('/blog');
}
