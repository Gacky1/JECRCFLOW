import {} from "node-appwrite"
import {commentCollection, db,} from "../name"
import {databases} from "./config"
import { Permission } from "appwrite"

export default async function createAnswerCollection(){
    // create collection
    await databases.createCollection(db,commentCollection,commentCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("Comment collection is created")

    //creating attributes and indexes

    await Promise.all([
        databases.createStringAttribute(db,commentCollection,"content",10000,true),
        databases.createEnumAttribute(db,commentCollection,"type",["answer","question"],true),
        databases.createStringAttribute(db,commentCollection,"authorId",60,true),
        databases.createStringAttribute(db,commentCollection,"typeId",60,false),
    ]);

    console.log("Commments Attributes created")

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


