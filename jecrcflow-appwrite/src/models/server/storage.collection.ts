import {db,questionCollection,questionAttachmentBucket} from "../name"
import {databases, storage} from "./config"
import { Permission } from "appwrite"

export default async function getOrCreateStorage(){
    try{
        await storage.getBucket(questionAttachmentBucket);
        console.log("Storage Connected");
    }catch(error){
        try{
            await storage.createBucket(questionAttachmentBucket,questionAttachmentBucket,
                [
                    Permission.read("any"),
                    Permission.read("users"),
                    Permission.create("users"),
                    Permission.update("users"),
                    Permission.delete("users"),
                ],
                false,undefined,undefined,["jpg","png","gif","jpeg","webp","heic"]
            );
            console.log("Storage Created")
            console.log("Storage Connected");
        }catch(error){
            console.log("Error creating Storage");
        }
    }
}
    // create collection


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

