import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import * as Crypto from "expo-crypto";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher"; // ✅ adjust path if needed

export default function Login() {
  const router = useRouter();
  const { t } = useTranslation(); // ✅ ONLY t, no i18n

  const [fullName, setFullName] = useState("");
  const [acc, setAcc] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [mobile, setMobile] = useState("");

  const hashValue = async (value: string) => {
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      value
    );
  };

  const handleLogin = async () => {
    if (!fullName || !acc || !aadhaar || !mobile) {
      Alert.alert(t("error"), t("allFieldsRequired"));
      return;
    }

    if (acc.length !== 11) {
      Alert.alert(t("error"), t("invalidACC"));
      return;
    }

    if (aadhaar.length !== 12) {
      Alert.alert(t("error"), t("invalidAadhaar"));
      return;
    }

    if (mobile.length !== 10) {
      Alert.alert(t("error"), t("invalidMobile"));
      return;
    }

    router.push("./details");
  };

  return (
    <View style={styles.container}>

      {/* 🌐 Language Switcher (SAFE) */}
      <View style={styles.languageContainer}>
        <LanguageSwitcher />
      </View>

      <Text style={styles.title}>{t("healthWorkerLogin")}</Text>

      <TextInput
        style={styles.input}
        placeholder={t("fullName")}
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder={t("accCode")}
        keyboardType="numeric"
        maxLength={11}
        value={acc}
        onChangeText={setAcc}
      />

      <TextInput
        style={styles.input}
        placeholder={t("aadhaar")}
        keyboardType="numeric"
        maxLength={12}
        value={aadhaar}
        onChangeText={setAadhaar}
      />

      <TextInput
        style={styles.input}
        placeholder={t("mobile")}
        keyboardType="numeric"
        maxLength={10}
        value={mobile}
        onChangeText={setMobile}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{t("login")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 20, 
    backgroundColor: "#f5f7fa", 
  },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginBottom: 25, 
  }, 
  input: { 
    backgroundColor: "#fff", 
    borderWidth: 1, 
    borderColor: "#ddd", 
    borderRadius: 8, 
    padding: 14, 
    marginBottom: 15, 
    fontSize: 16, 
  }, 
  button: { 
    backgroundColor: "#2563eb", 
    padding: 15, 
    borderRadius: 8, 
    alignItems: "center", 
    marginTop: 10, 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold", 
  }, 
  languageContainer: { 
    position: "absolute", 
    top: 50, 
    left: 15, 
    zIndex: 10, 
  },
  languageButton: { 
    paddingVertical: 6, 
    paddingHorizontal: 10, 
    backgroundColor: "#e5e7eb", 
    borderRadius: 6, 
  },
  languageText: { 
    fontSize: 14, 
    fontWeight: "600", 
  }, 
});