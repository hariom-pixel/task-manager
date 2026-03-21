const { client } = require('../config/redis')

const isRedisReady = () => {
  return client && client.isOpen
}

const getCache = async (key) => {
  try {
    if (!isRedisReady()) return null

    const data = await client.get(key)
    return data ? JSON.parse(data) : null
  } catch (err) {
    console.error('Redis GET error:', err.message)
    return null
  }
}

const setCache = async (key, value, ttl = 60) => {
  try {
    if (!isRedisReady()) return

    await client.setEx(key, ttl, JSON.stringify(value))
  } catch (err) {
    console.error('Redis SET error:', err.message)
  }
}

const deleteCache = async (pattern) => {
  try {
    if (!isRedisReady()) return

    const keys = await client.keys(pattern)
    if (keys.length) {
      await client.del(keys)
    }
  } catch (err) {
    console.error('Redis DEL error:', err.message)
  }
}

module.exports = {
  getCache,
  setCache,
  deleteCache,
}
