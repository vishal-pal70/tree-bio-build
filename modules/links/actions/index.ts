"use server"

import { db } from "@/lib/database";
import { currentUser } from "@clerk/nextjs/server";
import { LinkFormData } from "../components/link-form";






// interface LinkFormData{
//     data: string
// }



export const createLinkByUser = async(data:LinkFormData)=>{
    const user = await currentUser();

    if(!user) return {success: false, error: "No Authenticate user found"}

    const link = await db.link.create({
        data:{
            title:data.title,
            url:data.url,
            description:data.description,
            clickCount:0,
            user:{
                connect:{
                    clerkId:user.id
                }
            }
        }
    })

    return{
        success:true,
        message:"Link create successfully",
        data:link
    }
};


export const getAllLinkForUser = async ()=>{
    const user = await currentUser();

    const links = await db.link.findMany({
        where:{
            user:{
                clerkId:user?.id
            }
        },
        select:{
            id:true,
            title:true,
            description:true,
            url:true,
            clickCount:true,
            createdAt:true,
        }
    })

    return{
        success:true,
        message:"Gets All Link successfully",
        data: links
    }
};

export const editLink = async(data:LinkFormData,linkId:string)=>{
    const user = await currentUser();

    if (!user) return { success: false, error: "No authenticated user found" };

    await db.link.update({where:{id:linkId , user:{clerkId:user.id}},data:data});
    return {sucess:true, message:"Link updated successfully!"}
}