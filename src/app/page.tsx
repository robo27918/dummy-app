
import Image from "next/image";
import CatImage from "./components/CatImg";
export default function Home() {
  const imageCount = 60;
  const images = Array.from({length:imageCount})
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="items-center">
         <div className="grid grid-cols-4 gap-4">
      
             {images.map((_,index)=>(<CatImage key={index}/>))}
       
        </div>
       </main>
   

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
       FOOTER
      </footer>
    </div>
  );
}
