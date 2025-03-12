import {
	Client,
	Account,
	ID,
	Avatars,
	Databases,
	Query,
} from "react-native-appwrite";

export const appwriteConf = {
	projectId: "67cfaf68000ffcce7b2d",
	databaseId: "67cfb100001c3fba4e66",
	usersCollectionId: "67cfb1080024c0ec03ee",
	videosCollectionId: "67cfb1390008ce552239",
	storageId: "67cfb225002689adc337",
};
const client = new Client()
	.setProject(appwriteConf.projectId)
	.setPlatform("com.adityatripathi.aora");

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		);

		if (!newAccount) throw Error;

		const avatarUrl = avatars.getInitials(username);
		await signIn(email, password);

		const newUser = await databases.createDocument(
			appwriteConf.databaseId,
			appwriteConf.usersCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email,
				username,
				avatar: avatarUrl,
			}
		);

		return newUser;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const signIn = async (email, password) => {
	try {
		const session = await account.createEmailPasswordSession(email, password);

		return session;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();

		if (!currentAccount) throw Error;

		console.log(
			appwriteConf.databaseId,
			appwriteConf.usersCollectionId,
			currentAccount.$id
		);

		const currentUser = await databases.listDocuments(
			appwriteConf.databaseId,
			appwriteConf.usersCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);

		if (!currentUser) throw Error;

		return currentUser.documents[0];
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getPosts = async () => {
	try {
		const posts = await databases.listDocuments(
			appwriteConf.databaseId,
			appwriteConf.videosCollectionId
		);

		console.log(posts, "posts");

		return posts.documents;
	} catch (error) {
		return null;
	}
};

export const getLatestPosts = async () => {
	try {
		const posts = await databases.listDocuments(
			appwriteConf.databaseId,
			appwriteConf.videosCollectionId,
			[Query.orderDesc("$createdAt", Query.limit(7))]
		);

		console.log(posts, "posts");

		return posts.documents;
	} catch (error) {
		return null;
	}
};
