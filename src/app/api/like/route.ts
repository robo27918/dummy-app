import {NextResponse} from "next/server";
import {getServerSession} from 'next-auth';
import {authOptions} from '../../lib/auth';
import {prisma} from '../../lib/prisma';

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

        //get the user from DB: NEON
        const user = await prisma.user.findUnique({
            where:{email:session.user.email}
        });

        if(!user){
            return NextResponse.json({error:"User not found"}, {status:404})
        }
        //create a like if it doesnt already exits
        const like = await prisma.like.upset({
            where:{
                userId_image_id:{
                    userId: user.id,
                    imageId: image.id,
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
        console.error("Error liking iamge", error);
        return NextResponse.json({error: 'Internal Server Error'},{status:500})
    }
}
