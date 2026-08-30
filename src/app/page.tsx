import {sessionUser} from '@/lib/auth';import {stateFor} from '@/lib/db';import Game from '@/components/Game';import Login from '@/components/Login';
export const dynamic='force-dynamic';export default async function Page(){const id=await sessionUser();const state=id?stateFor(id):null;return state?<Game initial={state}/>:<Login/>}
