import CatGallery from "./components/CatGallery";
import {v4 as uuidv4} from 'uuid';
export default function Home() {
  const imageCount = 60;
  const images = Array.from({length:imageCount},()=>uuidv4());
  return (
    <div>
      
          <div className="flex flex-col  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="items-center">
                {/* <div className="grid grid-cols-4 gap-4">
                  {images.map((uuid)=>(<CatImage key={uuid}catId={uuid}/>))}</div> */}
                <CatGallery/>
            </main>
          </div>
 
    </div>

  );
}
