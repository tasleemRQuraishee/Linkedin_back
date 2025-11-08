const express = require('express')
const Post = require('../models/Post')
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = express.Router()

// GET /api/posts - public feed (latest first)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(200)
    res.json(posts)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/posts - create post (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const { text } = req.body
    if (!text || !text.trim()) return res.status(400).json({ error: 'Text required' })

    const user = await User.findById(req.userId)
    if (!user) return res.status(401).json({ error: 'User not found' })

    const post = await Post.create({ author: user._id, authorName: user.name, text: text.trim() })
    res.json(post)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
