#include <string>
#include <stdio.h>
#include <stdlib.h>
#include <sstream>
#include <iomanip>
#include <map>
#include <ctime>

#include <curl/curl.h>
#include <json/json.h>

#include "bitmark_peer_data.hpp"


namespace bitmark
{
	//==============internal function
	const static int box_zero_byte_length = 16;
	const static int zero_byte_length = 32;
	const static int crypto_sign_length = 64;
	extern "C" {
		typedef unsigned char u8;
		typedef unsigned long long u64;

		int crypto_sign_keypair(u8 *pk, u8 *sk);
		int crypto_sign(u8 *sm,u64 *smlen,const u8 *m,u64 n,const u8 *sk);
		int crypto_sign_open(u8 *m,u64 *mlen,const u8 *sm,u64 n,const u8 *pk);
	}
	std::string sign(std::string message, std::string scrKey) {

		int length;
		//using mLength as temp
		u8* sk = convert2ByteArray(scrKey, &length);
		u8* m = convert2ByteArray(message, &length);
		u64 mLength = (u64)length;

		u64 smLength = (u64)(crypto_sign_length + length);
		u8* sm = (u8*)malloc (sizeof (u8) * smLength);

		if (crypto_sign(sm, &smLength, m, mLength, sk) != 0) {
			std::string temp("");
			return temp;
		}
		return convert2HexString(sm, smLength);
	}

	std::string sign_open(std::string signedMessage, std::string pubKey) {

		int length;
		//using mLength as temp
		u8* pk = convert2ByteArray(pubKey, &length);
		u8* sm = convert2ByteArray(signedMessage, &length);

		u64 smLength = length;

		u64 mLength;
		u8* m = (u8*)malloc (sizeof (u8) * length);

		if (crypto_sign_open(m, &mLength, sm, smLength, pk) != 0) {
			std::string temp("");
			return temp;
		}
		return convert2HexString(m, mLength);
	}
	size_t write_function(void *contents, size_t size, size_t nmemb, void *userp) {
	    ((std::string*)userp)->append((char*)contents, size * nmemb);
	    return size *nmemb;
	}

	std::string callServerAPI(std::string serverUrlAPI, std::string dataString) {
		CURL *curl;
		CURLcode res;
		std::string result;
		curl_global_init(CURL_GLOBAL_ALL);
		curl = curl_easy_init();
		if(curl) {
			curl_easy_setopt(curl, CURLOPT_URL, serverUrlAPI.c_str());
			curl_easy_setopt(curl, CURLOPT_POSTFIELDS, dataString.c_str());
			curl_easy_setopt(curl, CURLOPT_WRITEDATA, &result);
			curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_function);
			res = curl_easy_perform(curl);
			if(res != CURLE_OK) {
		  		std::string temp("");
		  		return temp;
			}
			curl_easy_cleanup(curl);
		}
		curl_global_cleanup();
		return result;
	}

	//==============common function
	std::string convert2HexString(unsigned char *data, int len) {
		std::stringstream ss;
		ss << std::hex;
		for (int i = 0; i < len; ++i) {
			ss << std::setw(2) << std::setfill('0') << (int)data[i];
		}
		return ss.str();
	}

	unsigned char* convert2ByteArray(std::string hexStr, int * resultLenght){
		*resultLenght = hexStr.length() / 2;
		unsigned char* result = (unsigned char*)malloc (sizeof (unsigned char) * *resultLenght);

		for(int count = 0; count < *resultLenght; count ++) {
	        sscanf(hexStr.substr(count * 2, 2).c_str(), "%2hhx", &result[count]);
	    }

	    return result;
	}

	//Temp
	void sign_keypair(std::string *publicKey, std::string *secretKey)	 {
		u8* pk = (u8*)malloc (sizeof (u8) * 32);
		u8* sk = (u8*)malloc (sizeof (u8) * 64);
		crypto_sign_keypair(pk, sk);

		*publicKey = convert2HexString(pk, 32);
		*secretKey = convert2HexString(sk, 64);
	}


	std::string bitmark_peer_data::create_plugin_message() {
		std::time_t t = time(0);
    	std::tm * now = localtime( & t );
		std::string timestamp;
		std::stringstream strstream;
		strstream << (long)now;
		strstream >> timestamp;

		std::string token_timestamp =
			convert2HexString((unsigned char *)timestamp.c_str(), strlen((char*)timestamp.c_str()));
		std::string signedMessage = sign(token_timestamp, secret_key);

		// unsigned char * timestamp = (unsigned char *)"BachlX-Bitmark";
		// std::string token_timestamp = convert2HexString(timestamp, strlen((char*)timestamp));
		// std::string signedMessage = sign(token_timestamp, secret_key);

		json_object * jsonObj = json_object_new_object();
		json_object * jsonSM = json_object_new_string(signedMessage.c_str());
		json_object * jsonDP = json_object_new_string(public_key.c_str());
		json_object_object_add(jsonObj, "signature", jsonSM);
		json_object_object_add(jsonObj, "publicKey", jsonDP);
		std::string extensionData = json_object_to_json_string(jsonObj);

		return extensionData;
	}


	std::string create_confirm_message(std::string signData, std::string info_hash)
	{
		json_object * joExtMsg = json_tokener_parse(signData.c_str());
		json_object * joExtMsgSM = json_object_object_get(joExtMsg, "signature");
		json_object * joExtMsgDP = json_object_object_get(joExtMsg, "publicKey");

		std::string signedMessage(json_object_get_string(joExtMsgSM));
		std::string downPubkey(json_object_get_string(joExtMsgDP));

		std::string token_timestamp = sign_open(signedMessage, downPubkey);

		if (token_timestamp.empty()) {
	  		return std::string("");
		}

		json_object * joCfrMsg = json_object_new_object();
		json_object * joCfrMsgTM = json_object_new_string(token_timestamp.c_str());
		json_object * joCfrMsgPK = json_object_new_string(downPubkey.c_str());
		json_object * joCfrMsgIH = json_object_new_string(info_hash.c_str());
		json_object_object_add(joCfrMsg, "timestamp", joCfrMsgTM);
		json_object_object_add(joCfrMsg, "publicKey", joCfrMsgPK);
		json_object_object_add(joCfrMsg, "infoHash", joCfrMsgIH);

		std::string dataConfirm(json_object_to_json_string(joCfrMsg));
		return dataConfirm;
	}

	bool bitmark_peer_data::check_plugin_message(std::string signData, std::string info_hash) {
		// return true;
		std::string dataConfirm = create_confirm_message(signData, info_hash);
		if (dataConfirm.empty()) {
			return false;
		}

		std::string postData("dataExtension=");
		postData = postData + dataConfirm;

		std::string resultCheck = callServerAPI(server_url, postData);
		if (resultCheck.empty()) {
			return false;
		}

		// std::cout<< "resultCheck : " << resultCheck.c_str() << "\n";
		// std::cout.flush();
		json_object * joRC = json_tokener_parse(resultCheck.c_str());
		json_object * joRCOK = json_object_object_get(joRC, "ok");
		json_object * joRCRS = json_object_object_get(joRC, "result");

		json_type typeOK = json_object_get_type(joRCOK);
		json_type typeRS = json_object_get_type(joRCRS);
		if ((typeOK == json_type_boolean) && (typeRS == json_type_boolean)) {
			bool ok = json_object_get_boolean(joRCOK);
			bool result = json_object_get_boolean(joRCRS);
			if (ok && result) {
				return true;
			}
			return false;
		}
		return false;
	}
}