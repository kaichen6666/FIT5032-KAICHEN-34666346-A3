// src/db.js

// 管理员账号，写死，不允许注册
export const adminUsers = [{ username: 'admin', password: 'Admin123!' }]

// 普通用户账号，注册时会加入这里
export const normalUsers = [{ username: 'user1', password: 'User123!' }]

// 评论数据，开始为空，用户提交时会 push 进来
export const reviews = []

// 页面加载时，从 localStorage 读取已有评论
const savedReviews = localStorage.getItem('reviews')
if (savedReviews) {
  reviews.push(...JSON.parse(savedReviews))
}