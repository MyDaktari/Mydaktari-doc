import { AES, enc, SHA256 } from "crypto-js";
import { SECRET } from "./variables.json";

export default (message) => {
	const IV_MESSAGE = "a";
	const API_SECRET = SECRET + "\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0";
	const iv = SHA256(IV_MESSAGE).toString(enc.Hex).substring(0, 16);
	const encrypted = AES.encrypt(message, enc.Utf8.parse(API_SECRET), {
		iv: enc.Utf8.parse(iv),
	});
	return encrypted.toString();
};
