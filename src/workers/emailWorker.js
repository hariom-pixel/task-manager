const { Worker } = require('bullmq')

const worker = new Worker(
  'emailQueue',
  async (job) => {
    console.log('Sending email to:', job.data.email)

    // simulate email
    await new Promise((res) => setTimeout(res, 1000))

    console.log('Email sent')
  },
  {
    connection: {
      url: process.env.REDIS_URL,
    },
  }
)
