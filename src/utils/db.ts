"use server"

import {neon} from '@neondatabase/serverless'

export async function getDbConnection() {
    if(!process.env.NEXT_PUBLIC_DATABASE_URL){
        throw new Error("Failed to connect to the database")
    }
    console.log("Connecting to Neon database with URL:", process.env.NEXT_PUBLIC_DATABASE_URL);
    
  const connection =  neon(process.env.NEXT_PUBLIC_DATABASE_URL)
  return connection;
}