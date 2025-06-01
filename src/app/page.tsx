
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        MAIN SECTION
        <Image
          className="dark:invert"
          src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200"
          alt="cat pic"
          width={280}
          height={100}
          priority
        />

        <Image
          className="dark:invert"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/960px-Cat_August_2010-4.jpg"
          alt="cat pic"
          width={280}
          height={100}
          priority
        />
     

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          Hello world
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
       FOOTER
      </footer>
    </div>
  );
}
