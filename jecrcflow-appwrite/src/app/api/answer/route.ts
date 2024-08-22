import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(request: NextRequest){
    try {
        const {questionId,answer,authorId}=await request.json();

        const response=await databases.createDocument(db,answerCollection,ID.unique(),{
            content:answer,
            authorId:authorId,
            questionId:questionId,
        })

        //Increasing the author reputation 
        const prefs=await users.getPrefs<UserPrefs>(authorId)

        await users.updatePrefs(authorId, {
            reputation: Number(prefs.reputation) + 1,
        })

        return NextResponse.json(response,{status:201})

    } catch (error:any) {
        return NextResponse.json(
            { error:error?.message|| "Error creating answer jecrcian!" },
            {
                status:error?.status||error?.code||500
            }
        )
    }
}

export async function DELETE(request:NextRequest){
    try {
        const {answerId}=await request.json();

        const answer=await databases.getDocument(db,answerCollection,answerId)

        const response=await databases.deleteDocument(db,answerCollection,answerId)

        //decreasing tthe reputation
        const prefs=await users.getPrefs<UserPrefs>(answer.authorId)

        await users.updatePrefs(answer.authorId, {
            reputation: Number(prefs.reputation) - 1,
        })

        return NextResponse.json({
            data:response
        },
        {
            status:200
        }
    )
        
    } catch (error:any) {
        return NextResponse.json(
            {message: error?.message|| "Error deleting the answer Jecrcian :/"},
            {status:error?.status||error?.code||500}
        )
    }
}