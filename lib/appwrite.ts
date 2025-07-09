import {Account, Avatars, Client, Databases, ID, Query} from "react-native-appwrite";
import {CreateUserParams, SignInParams} from "@/types";

console.log("✅ ENV - ENDPOINT: ", process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT);
console.log("✅ ENV - PROJECT_ID: ", process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform: "com.jsm.foodordering",
    databaseId: "686b6709001c41fde6ea",
    userCollectionId: "686b67310005959e2b55"
};

console.log("Appwrite endpoint:", appwriteConfig.endpoint); // Should print a valid URL

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client)

console.log("✅ Loading Appwrite config");
export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        console.log("📨 createUser called");

        const newAccount = await account.create(ID.unique(), email, password, name);

        if(!newAccount) throw Error;
        await signIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                email,
                accountId: newAccount.$id,
                avatar: avatarUrl,
                name
            }
        );
    } catch (e: any) {
        throw new Error(e?.message || "Failed to create user");
    }
};

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        await account.createEmailPasswordSession(email, password);
    } catch (e: any) {
        throw new Error(e?.message || "Sign in failed");
    }
};

//getuser function

export const getUser = async () => {

    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)],
        )

        if(!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (e) {
        console.log(e);
        throw new Error(e as string || "Failed to get User")
    }
}
