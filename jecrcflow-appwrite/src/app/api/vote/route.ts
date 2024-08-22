import { answerCollection, db, questionCollection, voteCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import { NextRequest,NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function POST(request:NextRequest){
    try {
        //Grabbing the data
        const {voteById,voteStatus,type,typeId}=await request.json()

        const response=await databases.listDocuments(
            db,voteCollection,[
                Query.equal("type",type),
                Query.equal("typeId",typeId),
                Query.equal("votedById",voteById),
            ]
        )
        if(response.documents.length>0){
            await databases.deleteDocument(db,voteCollection,
                response.documents[0].$id
            )

            //decrease the reputation
            const QuestionOrAnswer=await databases.getDocument(
                db,
                type==="question"?questionCollection:answerCollection,
                typeId
            )
        }
        //Previous vote does not exits or vote status changes
        if(response.documents[0]?.voteStatus!==voteStatus){
            //
        }

        const [upvotes,downvotes]= await Promise.all([
            databases.listDocuments(db,voteCollection,[
                Query.equal("type",type),
                Query.equal("typeId",typeId),
                Query.equal("voteStatus","upvoted"),
                Query.equal("votedById",voteById),
                Query.limit(1)
            ]),
            databases.listDocuments(db,voteCollection,[
                Query.equal("type",type),
                Query.equal("typeId",typeId),
                Query.equal("voteStatus","downvoted"),
                Query.equal("votedById",voteById),
                Query.limit(1)
            ])
        ])

        return NextResponse.json({
            data:{
                document:null,voteResult:upvotes.total=
                downvotes.total
            },
            message:"Vote managed succesfully!"
        },
    {
        status:200
    })


    } catch (error:any) {
        return NextResponse.json(
            { error:error?.message|| "Error in voting jecrcian!" },
            {
                status:error?.status||error?.code||500
            }
        )
    }
}