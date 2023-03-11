import { Fontisto } from "@expo/vector-icons";
import { Button, Layout, List, Spinner, Text } from "@ui-kitten/components";
import * as React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Encrypt from "../Encrypt";
import { URL } from "../variables.json";
import * as SecureStore from "expo-secure-store";
export default (props) => {
	const [place_id, set_place_id] = React.useState([]);
	const [proceed, setproceed] = React.useState(true);
	const [doctors, setdoctors] = React.useState([]);
	const [show, setshow] = React.useState(false);
	const [loading, setloading] = React.useState(false);

	const FindDocs = () => {
		setloading(true);
		let body = {
			id: global.user.id,
			...place_id,
		};
		body = JSON.stringify(body);
		console.log(body);
		body = Encrypt(body);
		const data = new FormData();
		data.append("body", body);
		let method = {
			method: "post",
			body: data,
		};
		let url = URL + "update_doc.php";
		fetch(url, method)
			.then((res) => res.json())
			.then((res) => {
				global.user = res;
				SecureStore.setItemAsync("user", JSON.stringify(res)).then(() => {
					props.navigation.navigate("Main");
				});
				setloading(false);
			})
			.catch((e) => {
				console.log(e);
				setloading(false);
			});
	};

	return (
		<Layout style={styles.parent}>
			<>
				<Text style={{ margin: 10 }}>
					Start by searching a location near you
				</Text>
				<GooglePlacesAutocomplete
					placeholder="Search"
					fetchDetails={true}
					onPress={(data, details = null) => {
						// 'details' is provided when fetchDetails = true
						let dt = {
							location: data.description,
							lat: details.geometry.location.lat,
							lng: details.geometry.location.lng,
							place_id: data.place_id,
						};
						setproceed(false);
						set_place_id(dt);
					}}
					query={{
						key: "AIzaSyCSwMLb1EmWg4SvEVyiL7l5DbZzUO4llCo",
						language: "en",
						components: "country:ken",
					}}
					GooglePlacesDetailsQuery={{ fields: "geometry" }}
				/>
				<View style={{ justifyContent: "flex-end" }}>
					{loading ? (
						<View
							style={{
								justifyContent: "center",
								alignItems: "center",
								marginVertical: 10,
							}}
						>
							<Spinner />
						</View>
					) : (
						<Button
							onPress={FindDocs}
							disabled={proceed}
							style={{ margin: 10 }}
							status="primary"
						>
							Proceed
						</Button>
					)}
				</View>
			</>
		</Layout>
	);
};

const styles = StyleSheet.create({
	parent: {
		flex: 1,
	},
	doctorContent: {
		width: Dimensions.get("screen").width - 20,
		height: 130,
		borderRadius: 20,
		borderColor: "rgba(206,206,206,255)",
		borderWidth: 1,
		flexDirection: "row",
		alignItems: "center",
		margin: 10,
		padding: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: "700",
	},
});
