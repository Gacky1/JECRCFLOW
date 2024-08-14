import {} from "node-appwrite"
import {db,questionCollection} from "../name"
import {databases} from "./config"
import { Permission } from "appwrite"

export default async function createQuestionCollection(){
    // create collection
    await databases.createCollection(db,questionCollection,questionCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("Question collection is created")

    //creating attributes and indexes

    await Promise.all([
        databases.createStringAttribute(db,questionCollection,"title",100,true),
        databases.createStringAttribute(db,questionCollection,"content",10000,true),
        databases.createStringAttribute(db,questionCollection,"authorId",60,true),
        databases.createStringAttribute(db,questionCollection,"tags",60,true,undefined,true),
        databases.createStringAttribute(db,questionCollection,"attachmentId",60,false),
    ]);

    console.log("Question Attributes created")

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

