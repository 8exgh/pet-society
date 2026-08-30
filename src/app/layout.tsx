import './globals.css';import type {Metadata} from 'next';
export const metadata:Metadata={title:'Pawborough — Your cozy pet world',description:'Design a pet, decorate a home, and play with friends.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
