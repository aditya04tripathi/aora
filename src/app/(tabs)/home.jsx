import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../constants";
import SearchInput from "components/SearchInput";
import Trending from "components/Trending";
import EmptyState from "components/EmptyState";
import { getLatestPosts, getPosts } from "lib/appwrite";
import useAppwrite from "lib/useAppwrite";
import VideoCard from "components/VideoCard";

const Home = () => {
	const [refreshing, setRefreshing] = useState(false);

	const { data: posts, refetch } = useAppwrite(getPosts);
	const { data: latestPosts } = useAppwrite(getLatestPosts);

	const onRefresh = async () => {
		setRefreshing(true);
		refetch();
		setRefreshing(false);
	};

	return (
		<SafeAreaView className="h-full bg-primary">
			<FlatList
				refreshing={refreshing}
				onRefresh={onRefresh}
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <VideoCard video={item} />}
				ListHeaderComponent={() => (
					<View className="px-4 my-6 space-y-6">
						<View className="flex-row items-start justify-between mb-6">
							<View>
								<Text className="text-sm text-gray-100 font-pmedium">
									Welcome back.
								</Text>
								<Text className="text-2xl text-gray-100 font-psemibold">
									Aditya
								</Text>
							</View>

							<View className="mt-1.5">
								<Image
									source={images.logoSmall}
									className="h-10 w-9"
									resizeMode="contain"
								/>
							</View>
						</View>
						<SearchInput />

						<View className="flex-1 w-full pt-5 pb-8">
							<Text className="mb-3 text-lg text-gray-100 font-pregular">
								Latest Videos
							</Text>

							<Trending posts={latestPosts} />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title="No videos found"
						subtitle="Be the first to upload a video."
					/>
				)}
			/>
		</SafeAreaView>
	);
};

export default Home;
