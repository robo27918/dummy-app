import CatGallery from "./components/CatGallery";
export default function Home() {


  return (
    <div>
      
          <div className="flex flex-col  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="items-center">
              <CatGallery/>
            </main>
          </div>
 
    </div>

  );
}
