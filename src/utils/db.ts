"use server"

import {neon} from '@neondatabase/serverless'

export async function getDbConnection() {
    if(!process.env.NEXT_PUBLIC_DATABASE_URL){
        throw new Error("Failed to connect to the database")
    }
  const connection =  neon(process.env.NEXT_PUBLIC_DATABASE_URL)
  return connection;
}