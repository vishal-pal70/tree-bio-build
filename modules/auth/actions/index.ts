"use server";

import { db } from "@/lib/database";
import { currentUser } from "@clerk/nextjs/server";
import { error } from "console";


export const onBoardUser = async ()=>{
        try {
            const user = await currentUser()

            if(!user){
                return {
                    success: false, error: "No authenticate User found"
                }
            }

            const {id, firstName, lastName, imageUrl, emailAddresses} = user

            const newUser = await db.user.upsert({
                where:{
                    clerkId:id
                },
                update:{
                    firstName:firstName || null,
                    lastName:lastName || null,
                    imageUrl:imageUrl || null,
                    email:emailAddresses[0]?.emailAddress || ""
                },
                create:{
                    clerkId:id,
                    firstName:firstName || null,
                    lastName:lastName || null,
                    imageUrl:imageUrl || null,
                    email:emailAddresses[0]?.emailAddress || ""
                }
            })

            return{
                success: true,
                user: newUser,
                message: "User onboarded Successfully"
            }

        } catch (error) {
            console.error("Error onboarding user:", error);
            return{
                success: false,
                error: "Failed to onboard user"
            };
        }
}