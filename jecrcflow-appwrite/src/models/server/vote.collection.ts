import {} from "node-appwrite"
import {voteCollection, db,} from "../name"
import {databases} from "./config"
import { Permission } from "appwrite"

export default async function createVoteCollection(){
    // create collection
    await databases.createCollection(db,voteCollection,voteCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("Vote collection is created")

    //creating attributes and indexes

    await Promise.all([
        databases.createEnumAttribute(db,voteCollection,"type",["question","answer"],true),
        databases.createStringAttribute(db,voteCollection,"votedById",60,true),
        databases.createStringAttribute(db,voteCollection,"typeId",60,true),
        databases.createEnumAttribute(db,voteCollection,"voteStatus",["upvoted","downvoted"],true),
    ]);

    console.log("Vote Attributes created")

    //create indexes
/*
    await Promise.all([
        databases.createIndex(
            db,
            questionCollection,
            "title",
            IndexType.FullText,
            [title],
            ['asc']
        
        ),
        databases.createIndex(
            db,
            questionCollection,
            "content",
            IndexType.FullText,
            [content],
            ['asc']
        )
    ]) */
}


