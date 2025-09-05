import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

export async function getServerSession(){
 return await auth.api.getSession({
  headers: await headers(),
 });
}

export async function getSessionFromRequest(req: NextRequest) {
 return await auth.api.getSession({
  headers: req.headers,
 });
}

export async function protectRoute() {
 const session = await getServerSession();

 if(!session) redirect("/");

 return session;
}