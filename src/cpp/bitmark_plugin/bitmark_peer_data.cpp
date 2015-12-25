#include <string>
#include <stdio.h>
#include <stdlib.h>
#include <sstream>
#include <iostream>
#include <iomanip>
#include <map>
#include <time.h>
#include <sys/timeb.h>

#ifdef WIN32
	#include <windows.h>
#else // Unix based system specific
	#include <sys/time.h>
#endif

#include <curl/curl.h>
#include <json/json.h>

#include "bitmark_peer_data.hpp"


namespace bitmark
{
	//==============internal function
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

	std::string sign_detach(std::string message, std::string scrKey) {

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
		int length_sign_detach = 64;
		return convert2HexString(sm, length_sign_detach);
	}

	size_t write_function(void *contents, size_t size, size_t nmemb, void *userp) {
	    ((std::string*)userp)->append((char*)contents, size * nmemb);
	    return size *nmemb;
	}

	std::string callServerAPI(std::string serverUrlAPI, std::string dataString) {
		CURL *curl;
		CURLcode res;
		std::string result("");
		curl_global_init(CURL_GLOBAL_ALL);
		curl = curl_easy_init();
		if(curl) {
			curl_easy_setopt(curl, CURLOPT_URL, serverUrlAPI.c_str());
			curl_easy_setopt(curl, CURLOPT_POSTFIELDS, dataString.c_str());
			curl_easy_setopt(curl, CURLOPT_WRITEDATA, &result);
			curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_function);
			res = curl_easy_perform(curl);
			if(res != CURLE_OK) {
		  		result = std::string("");
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


	std::string bitmark_peer_data::create_plugin_message(std::string info_hash, std::string peer_ip) {
		std::string peer_pubkey = get_public_key(peer_ip);
		std::string bitmark_id = get_bitmark_id(info_hash);

		if (peer_pubkey.empty() || bitmark_id.empty()) {
			return std::string("");
		}

		timeb timer_msec;
		ftime(&timer_msec);
		long long int timestamp_msec =
			((long long int) timer_msec.time) * 1000ll + (long long int) timer_msec.millitm;
		std::string timestamp;
		std::stringstream strstream;
		strstream << timestamp_msec;
		strstream >> timestamp;
		std::string message = timestamp + bitmark_id + peer_pubkey;

		message = convert2HexString((unsigned char *)message.c_str(), message.size());
		std::string signedMessage = sign_detach(message, secret_key);

		json_object * jsonObj = json_object_new_object();
		json_object * jsonTS = json_object_new_string(timestamp.c_str());
		json_object * jsonSM = json_object_new_string(signedMessage.c_str());
		json_object * jsonDP = json_object_new_string(public_key.c_str());
		json_object * jsonBI = json_object_new_string(bitmark_id.c_str());
		json_object_object_add(jsonObj, "signature", jsonSM);
		json_object_object_add(jsonObj, "downloadPubkey", jsonDP);
		json_object_object_add(jsonObj, "timestamp", jsonTS);
		json_object_object_add(jsonObj, "bitmarkId", jsonBI);

		std::string extensionData = json_object_to_json_string(jsonObj);
		return extensionData;
	}

	bool bitmark_peer_data::check_plugin_message(std::string signData, std::string info_hash) {
		// return true;
		json_object * joExtMsg = json_tokener_parse(signData.c_str());
		json_object * joExtMsgSM = json_object_object_get(joExtMsg, "signature");
		json_object * joExtMsgDP = json_object_object_get(joExtMsg, "downloadPubkey");
		json_object * joExtMsgTS = json_object_object_get(joExtMsg, "timestamp");
		json_object * joExtMsgBI = json_object_object_get(joExtMsg, "bitmarkId");

		std::string signedMessage(json_object_get_string(joExtMsgSM));
		std::string downloadPubkey(json_object_get_string(joExtMsgDP));
		std::string timestamp(json_object_get_string(joExtMsgTS));
		std::string bitmark_id(json_object_get_string(joExtMsgBI));

		std::string postData("timestamp=");
		postData = postData + timestamp.c_str();
		postData = postData + "&my_pubkey=" + public_key.c_str();
		postData = postData + "&pubkey=" + downloadPubkey.c_str();
		postData = postData + "&bitmark=" + bitmark_id.c_str();
		postData = postData + "&signature=" + signedMessage.c_str();

		std::string resultCheck = callServerAPI(server_url, postData);
		if (resultCheck.empty() || resultCheck == "Not Found") {
			return false;
		}

		json_object * joRC = json_tokener_parse(resultCheck.c_str());
		json_object * joRCOK = json_object_object_get(joRC, "ok");
		json_type typeOK = json_object_get_type(joRCOK);
		if (typeOK == json_type_boolean) {
			bool ok = json_object_get_boolean(joRCOK);
			if (ok) {
				json_object * joRCRS = json_object_object_get(joRC, "result");
				json_object * joRAL = json_object_object_get(joRCRS, "allow");
				json_type typeAL = json_object_get_type(joRAL);
				if (typeAL == json_type_boolean) {
					bool allow = json_object_get_boolean(joRAL);
					if (allow) {
						return true;
					// } else {
					// 	json_object * joRRA = json_object_object_get(joRCRS, "reason");
						// std::cout << "check download failed because " << json_object_get_string(joRRA) << std::endl;
					}
				}
			}
		}
		return false;
	}
}