import {
	Button,
	IndexPath,
	Input,
	Layout,
	Select,
	SelectItem,
	Spinner,
	Text,
} from "@ui-kitten/components";
import { Image, StatusBar, StyleSheet, View } from "react-native";
import * as React from "react";
import Encrypt from "../Encrypt";
import { link } from "../link.json";
import * as SecureStore from "expo-secure-store";
export default (props) => {
	const [loading, setloading] = React.useState(false);
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const SendData = () => {
		setloading(true);
		let body = {
			email: email,
			password: password,
		};
		body = Encrypt(JSON.stringify(body));
		const data = new FormData();
		data.append("body", body);
		let url = link + "login_doc.php";
		let method = {
			method: "post",
			body: data,
		};
		fetch(url, method)
			.then((res) => res.json())
			.then((res) => {
				if (res.status == true) {
					global.user = res.data;
					let result = res.data;
					SecureStore.setItemAsync("user", JSON.stringify(res.data)).then(
						() => {
							if (result.location != null) {
								props.navigation.replace("Main");
							} else {
								props.navigation.replace("Location");
							}
						}
					);
				} else {
					alert("It seems that email exists please login ");
				}
				setloading(false);
			})
			.catch((e) => {
				console.log(e);
				setloading(false);
			});
	};

	return (
		<Layout style={styles.parent}>
			<Image
				source={require("../assets/icon.png")}
				style={{ height: 200, width: 200, alignSelf: "center" }}
			/>
			<Text style={styles.title} category="h4">
				Hi, Login to your account
			</Text>
			<Text appearance="hint" style={styles.subtitle}>
				You are two inputs away from connecting with your clients
			</Text>

			<Input
				keyboardType="email-address"
				onChangeText={(text) => {
					setEmail(text);
				}}
				value={email}
				placeholder="Email"
				style={styles.input}
			/>

			<Input
				placeholder="password"
				secureTextEntry
				onChangeText={(text) => {
					setPassword(text);
				}}
				value={password}
				style={styles.input}
			/>
			{loading ? (
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						marginTop: 10,
					}}
				>
					<Spinner />
				</View>
			) : (
				<Button onPress={SendData} style={styles.input}>
					Login
				</Button>
			)}
			<Text style={styles.input}>
				Don't have an account?{" "}
				<Text
					onPress={() => {
						props.navigation.navigate("Signup");
					}}
					style={{ color: "blue" }}
				>
					Sign up
				</Text>
			</Text>
		</Layout>
	);
};

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
	title: {
		textAlign: "center",
		marginTop: 20,
	},
	subtitle: {
		textAlign: "center",
	},
	input: {
		margin: 10,
	},
});
