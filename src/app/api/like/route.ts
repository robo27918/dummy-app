import {getServerSession} from 'next-auth';
import {authOptions} from '../../lib/auth';
import {prisma} from '../../lib/prisma';
import { NextResponse } from 'next/server';
export async function GET(){
    try{
        const session = await getServerSession(authOptions);

        if(!session || !session.user?.email){
            return NextResponse.json({error:"Unauthorized"},{status:401});
        }

        // const {searchParams} = new URL(req.url);
        // const userId = searchParams.get('userId')

        
        //Fetch the likes based on the authenticated user's ID
        const likes = await prisma.like.findMany({
            where:{
                user:session?.user,
                
            },
            include:{
                image:{
                    select:{
                        id:true,
                        url:true,
                    }
                }
            }
        })
       
        return NextResponse.json(likes,{status:200});
    }catch(error){
        console.error("Error fetching likes",error);
        return NextResponse.json(
            {message:'Internal Server Error'},
            {status:500}
        );
    }
}
export async function POST(req:Request){
    const session = await getServerSession(authOptions);

    if(!session|| !session.user?.email){
        return NextResponse.json({
            error:'Unauthorized'},{
                status:401
            });
    }

    const {imageId, imageUrl} = await req.json();

    if(!imageId||!imageUrl){
        return NextResponse.json({
            error:"Missing image data"
        },{
            status:400
        });
    }

    try{
        //make sure the image exists in the DB
        let image = await prisma.image.findUnique({
            where: {id:imageId},
        });

        if(!image){
            //then create the image
            image = await prisma.image.create({
                data:{
                    id:imageId,
                    url: imageUrl,
                },
            });
        }
        console.log("session email f")
        //get the user from DB: NEON
        const user = await prisma.user.findUnique({
            where:{email:session.user.email}
        });

        if(!user){
            return NextResponse.json({error:"User not found"}, {status:404})
        }
        //create a like if it doesnt already exits
        const like = await prisma.like.upsert({
            where:{
                userId_imageId:{
                    userId: user.id,
                    imageId: imageId,
                },
            },
            update:{},//do nothing if it already exits
            create:{
                userId:user.id,
                imageId:image.id
            },
        });
        return NextResponse.json({message:"Image liked",like});
    }catch(error){
        console.error("Error liking image...", error);
        return NextResponse.json({error: 'Internal Server Error'},{status:500})
    }
}
