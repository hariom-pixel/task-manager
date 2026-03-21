const { client } = require('../config/redis')

const getCache = async (key) => {
  if (!client) return null

  const data = await client.get(key)
  return data ? JSON.parse(data) : null
}

const setCache = async (key, value, ttl = 60) => {
  if (!client) return

  await client.setEx(key, ttl, JSON.stringify(value))
}

const deleteCache = async (pattern) => {
  if (!client) return

  const keys = await client.keys(pattern)
  if (keys.length) {
    await client.del(keys)
  }
}

module.exports = {
  getCache,
  setCache,
  deleteCache,
}
