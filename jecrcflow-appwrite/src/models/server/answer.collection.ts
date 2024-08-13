import {} from "node-appwrite"
import {answerCollection, db,questionCollection} from "../name"
import {databases} from "./config"
import { Permission } from "appwrite"

export default async function createAnswerCollection(){
    // create collection
    await databases.createCollection(db,answerCollection,answerCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("Answer collection is created")

    //creating attributes and indexes

    await Promise.all([
        databases.createStringAttribute(db,answerCollection,"content",10000,true),
        databases.createStringAttribute(db,answerCollection,"authorId",60,true),
        databases.createStringAttribute(db,answerCollection,"questionId",60,false),
    ]);

    console.log("Answers Attributes created")

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

