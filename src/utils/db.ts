import mongoose from 'mongoose'
import config from 'config'

class DatabaseConnection {
  private static _instance: DatabaseConnection

  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection._instance) {
      DatabaseConnection._instance = new DatabaseConnection()
    }
    return DatabaseConnection._instance
  }

  async open() {
    try {
      const dbUri: string = config.get("dbUri")

      await mongoose.connect(dbUri)
      console.log('DB connected')
    }
    catch (error) {
      console.log(`DB open error: ${String(error)}`)
      process.exit(1)
    }
  }

  async close(): Promise<void> {
    try {
      await mongoose.disconnect()
    } catch (error) {
      console.error(`DB close error: ${String(error)}`)
      process.exit(1)
    }
  }
}

export default DatabaseConnection.getInstance() // Singleton design pattern
