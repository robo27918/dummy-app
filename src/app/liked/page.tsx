// src/app/liked/page.tsx

import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';
import { prisma } from '../lib/prisma';
import LikeDisplay from '../components/LikesDisplay';

export default async function LikedImagesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <div>Please sign in to view your liked images.</div>;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    // include: {
    //   Like: {
    //     include: { Image: true },
    //   },
    // },
  });

  return (
    <div>
     
          <div className="flex flex-col  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
              <main className="items-center">
                <div className="grid grid-cols-4 gap-4">
                  <LikeDisplay></LikeDisplay>
                </div>
            </main>
          </div>

  
    </div>
  );
}
