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
import { Alert, StatusBar, StyleSheet, View } from "react-native";
import * as React from "react";
import { link } from "../link.json";
import Encrypt from "../Encrypt";
import * as SecureStore from "expo-secure-store";

export default (props) => {
	const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

	React.useEffect(() => {
		SecureStore.getItemAsync("user").then((res) => {
			if (res) {
				let result = JSON.parse(res);
				global.user = JSON.parse(res);
				if (result.location != null) {
					props.navigation.replace("Main");
				} else {
					props.navigation.replace("Location");
				}
			}
		});
	}, []);

	const options = [
		"Select Specialist",
		"Neurologist",
		"Gastroenterologist",
		"Orthopedic",
		"Dentist",
		"Pulmonologist",
		"Specialist",
	];
	const hiddenoptions = [
		"",
		"Brain, Nerves and Spinal cord",
		"Stomach, Liver and GastroInternal tract",
		"Muscle, Bone and Joints",
		"Mouth",
		"Lung and Airway",
		"Ear,Nose and Throat ENT",
	];
	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [phone, setPhone] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [loading, setloading] = React.useState(false);

	const SendData = () => {
		setloading(true);
		let body = {
			name: name,
			email: email,
			phone: phone,
			password: password,
			speciality: hiddenoptions[selectedIndex.row],
		};
		body = Encrypt(JSON.stringify(body));
		const data = new FormData();
		data.append("body", body);
		let url = link + "register_doctor.php";
		let method = {
			method: "post",
			body: data,
		};
		fetch(url, method)
			.then((res) => res.json())
			.then((res) => {
				if (res.status == true) {
					global.user = res.data;
					SecureStore.setItemAsync("user", JSON.stringify(res.data)).then(
						() => {
							props.navigation.navigate("Location");
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
			<Text style={styles.title} category="h4">
				Create an account
			</Text>
			<Text appearance="hint" style={styles.subtitle}>
				Connect with your clients today
			</Text>
			<Input
				onChangeText={(text) => {
					setName(text);
				}}
				value={name}
				placeholder="Full Name"
				style={styles.input}
			/>
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
				keyboardType="number-pad"
				onChangeText={(text) => {
					setPhone(text);
				}}
				placeholder="Phone"
				style={styles.input}
			/>
			<Select
				style={styles.input}
				onSelect={(index) => setSelectedIndex(index)}
				value={options[selectedIndex.row]}
			>
				{options.map((element, index) => {
					return <SelectItem key={index} title={element} />;
				})}
			</Select>
			<Input
				placeholder="password"
				secureTextEntry
				onChangeText={(text) => {
					setPassword(text);
				}}
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
					Create Account
				</Button>
			)}
			<Text style={styles.input}>
				Already have an account?{" "}
				<Text
					onPress={() => {
						props.navigation.navigate("Login");
					}}
					style={{ color: "blue" }}
				>
					Login
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
