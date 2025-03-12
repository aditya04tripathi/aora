import {
	Text,
	FlatList,
	TouchableOpacity,
	ImageBackground,
	Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

const zoomIn = {
	0: {
		scale: 0.9,
	},
	1: {
		scale: 1,
	},
};

const zoomOut = {
	0: {
		scale: 1,
	},
	1: {
		scale: 0.9,
	},
};

const TrendingItem = ({ activeItem, item }) => {
	const player = useVideoPlayer(item.video, (player) => {
		player.pause();
	});

	const { isPlaying } = useEvent(player, "playingChange", {
		isPlaying: player.playing,
	});

	useEffect(() => {
		if (!isPlaying) {
			// Reset the player position when video stops playing
			player.currentTime = 0;
		}
	}, [isPlaying]);

	return (
		<Animatable.View
			className="mr-5 justify-center items-center rounded-[35px] w-52 h-72 overflow-hidden"
			animation={activeItem === item.$id ? zoomIn : zoomOut}
			duration={500}
		>
			{isPlaying ? (
				<VideoView
					nativeControls
					player={player}
					style={{
						width: 208,
						height: 288,
						borderRadius: 35,
						zIndex: 1,
						backgroundColor: "#ffffff10",
					}}
					contentFit="contain"
				/>
			) : (
				<TouchableOpacity
					className="relative items-center justify-center"
					activeOpacity={0.7}
					onPress={() => {
						if (player.playing) {
							player.pause();
						} else {
							player.play();
						}
					}}
				>
					<ImageBackground
						resizeMode={"cover"}
						source={{ uri: item.thumbnail }}
						className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
					/>
					<Image source={icons.play} className="absolute w-12 h-12" />
				</TouchableOpacity>
			)}
		</Animatable.View>
	);
};

const Trending = ({ posts }) => {
	const [activeItem, setActiveItem] = useState(posts[1]);

	const viewableItemsChange = ({ viewableItems }) => {
		if (viewableItems.length > 0) {
			setActiveItem(viewableItems[0].key);
		}
	};

	return (
		<FlatList
			showsHorizontalScrollIndicator={false}
			horizontal
			data={posts}
			keyExtractor={(item) => item.$id}
			renderItem={({ item }) => (
				<TrendingItem activeItem={activeItem} item={item} />
			)}
			viewabilityConfig={{
				itemVisiblePercentThreshold: 70,
			}}
			contentOffset={{ x: 170 }}
			onViewableItemsChanged={viewableItemsChange}
		/>
	);
};

export default Trending;
