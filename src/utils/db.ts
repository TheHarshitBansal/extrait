"use server"

import {neon} from '@neondatabase/serverless'

export async function getDbConnection() {
    if(!process.env.DATABASE_URL){
        throw new Error("Failed to connect to the database")
    }
    console.log("Connecting to Neon database with URL:", process.env.DATABASE_URL);
    
  const connection =  neon(process.env.DATABASE_URL)
  return connection;
}