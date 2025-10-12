import Image from "next/image";
import Hero from './Hero/page'
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
   <>
    <Toaster />
     <div>
        
        <Hero />
     </div>
   </>
  );
}
