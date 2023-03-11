import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import * as Clipboard from "expo-clipboard";

const ChatLayout = () => {
	const [message, setMessage] = useState("");
	const [chatMessages, setChatMessages] = useState([]);
	const [loading, setloading] = useState(false);

	const handleSendMessage = () => {
		// Add the message to the chatMessages state
		setloading(true);

		const data = new FormData();
		data.append("message", message);
		const method = {
			method: "post",
			body: data,
		};
		const url = "https://veseninternal.co.ke/doctor4u/chat_request.php";
		fetch(url, method)
			.then((res) => res.json())
			.then((res) => {
				setChatMessages([...chatMessages, res]);
				setloading(false);
			})
			.catch((e) => {
				console.log(e);
				setloading(false);
			});

		// Clear the input field
		setMessage("");
	};

	const copyToClipboard = (text) => {
		Clipboard.setStringAsync(text).then(() => {
			alert("data copied to clipboard");
		});
	};

	return (
		<>
			{loading ? (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<Text>Fetching data, please wait...</Text>
				</View>
			) : (
				<View style={styles.container}>
					<View style={styles.chatContainer}>
						{chatMessages.map((chatMessage, index) => (
							<View key={index}>
								<View style={styles.messageContainer}>
									<Text style={styles.message}>{chatMessage.send_message}</Text>
								</View>
								<View style={styles.messageContainer2}>
									<Text style={styles.message2}>{chatMessage.response}</Text>
									<FontAwesome
										style={{ alignSelf: "flex-end", margin: 10 }}
										name="clipboard"
										size={24}
										color="white"
										onPress={copyToClipboard.bind(this, chatMessage.response)}
									/>
								</View>
							</View>
						))}
					</View>

					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							placeholder="Type your message here..."
							value={message}
							onChangeText={setMessage}
						/>
						<TouchableOpacity style={styles.button} onPress={handleSendMessage}>
							<Text style={styles.buttonText}>Send</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-end",
		padding: 10,
	},
	chatContainer: {
		flex: 1,
	},
	messageContainer: {
		backgroundColor: "#e5e5e5",
		borderRadius: 10,
		padding: 10,
		marginVertical: 5,
		width: Dimensions.get("window").width / 1.3,
	},
	messageContainer2: {
		backgroundColor: "#001fff",
		borderRadius: 10,
		padding: 10,
		marginVertical: 5,
		width: Dimensions.get("window").width / 1.3,
		alignSelf: "flex-end",
	},
	message: {
		fontSize: 16,
	},
	message2: {
		fontSize: 16,
		color: "white",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	input: {
		flex: 1,
		backgroundColor: "#fff",
		borderRadius: 20,
		paddingHorizontal: 15,
		paddingVertical: 10,
		marginRight: 10,
	},
	button: {
		backgroundColor: "#00bfff",
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
	},
});

export default ChatLayout;
