import { create } from 'zustand'
import { mockPosts } from '../data/mockPosts.js'

export const useFeedStore = create((set, get) => ({
  posts: [],
  queuedPosts: [],
  isLoading: false,
  activePostId: null,
  composerOpen: false,

  loadInitialPosts: () => {
    set({ isLoading: true })
    // simulate tiny async
    setTimeout(() => {
      set({ posts: [...mockPosts], isLoading: false })
    }, 300)
  },

  enqueuePost: (post) => set((s) => ({
    queuedPosts: [post, ...s.queuedPosts],
  })),

  flushQueue: () => set((s) => ({
    posts: [...s.queuedPosts, ...s.posts],
    queuedPosts: [],
  })),

  createPost: (content, authorUser) => {
    const hashtags = (content.match(/#[\w]+/g) || []).map(t => t.slice(1).toLowerCase())
    const newPost = {
      id: `p_user_${Date.now()}`,
      authorId: authorUser.id,
      author: {
        id: authorUser.id,
        username: authorUser.username,
        displayName: authorUser.displayName,
        avatar: authorUser.avatar,
        verified: authorUser.verified,
      },
      content,
      hashtags,
      media: null,
      likes: 0,
      likedBy: [],
      comments: [],
      reposts: 0,
      repostedBy: [],
      createdAt: new Date().toISOString(),
      isLive: false,
    }
    set((s) => ({ posts: [newPost, ...s.posts], composerOpen: false }))
  },

  toggleLike: (postId, userId) => set((s) => ({
    posts: s.posts.map(p => {
      if (p.id !== postId) return p
      const liked = p.likedBy.includes(userId)
      return {
        ...p,
        likes: liked ? p.likes - 1 : p.likes + 1,
        likedBy: liked ? p.likedBy.filter(id => id !== userId) : [...p.likedBy, userId],
      }
    }),
  })),

  addComment: (postId, text, authorUser) => set((s) => ({
    posts: s.posts.map(p => {
      if (p.id !== postId) return p
      const comment = {
        id: `c_${Date.now()}`,
        authorId: authorUser.id,
        author: {
          id: authorUser.id,
          username: authorUser.username,
          displayName: authorUser.displayName,
          avatar: authorUser.avatar,
          verified: authorUser.verified,
        },
        text,
        createdAt: new Date().toISOString(),
        likes: 0,
      }
      return { ...p, comments: [...p.comments, comment] }
    }),
  })),

  toggleRepost: (postId, userId) => set((s) => ({
    posts: s.posts.map(p => {
      if (p.id !== postId) return p
      const reposted = p.repostedBy.includes(userId)
      return {
        ...p,
        reposts: reposted ? p.reposts - 1 : p.reposts + 1,
        repostedBy: reposted ? p.repostedBy.filter(id => id !== userId) : [...p.repostedBy, userId],
      }
    }),
  })),

  setActivePost: (postId) => set((s) => ({
    activePostId: s.activePostId === postId ? null : postId,
  })),

  toggleComposer: () => set((s) => ({ composerOpen: !s.composerOpen })),
}))
