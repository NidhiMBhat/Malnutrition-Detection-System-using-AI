import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export default function Details() {
  const router = useRouter();
  const { t } = useTranslation(); // ✅ ONLY once, inside component

  const [formData, setFormData] = useState({
    childName: "",
    age: "",
    gender: "", // male | female (stable value)
    placeName: "",
    height: "",
    weight: "",
  });

  const handleSubmit = () => {
    const { childName, age, height, weight, gender } = formData;

    if (!childName || !age || !height || !weight || !gender) {
      Alert.alert(t("missingInfo"), t("fillAllFields"));
      return;
    }

    router.push({
      pathname: "/result",
      params: { ...formData },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: t("childDetails") }} />

      <View style={styles.formCard}>
        <Text style={styles.label}>{t("childName")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("childName")}
          value={formData.childName}
          onChangeText={(val) =>
            setFormData({ ...formData, childName: val })
          }
        />

        <Text style={styles.label}>{t("age")}</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.age}
          onChangeText={(val) => setFormData({ ...formData, age: val })}
        />

        <Text style={styles.label}>{t("gender")}</Text>
        <View style={styles.genderContainer}>
          {["male", "female"].map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.genderButton,
                formData.gender === key && styles.selectedGender,
              ]}
              onPress={() =>
                setFormData({ ...formData, gender: key })
              }
            >
              <Text
                style={
                  formData.gender === key
                    ? styles.selectedText
                    : styles.unselectedText
                }
              >
                {t(key)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>{t("place")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("place")}
          value={formData.placeName}
          onChangeText={(val) =>
            setFormData({ ...formData, placeName: val })
          }
        />

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>{t("height")}</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={formData.height}
              onChangeText={(val) =>
                setFormData({ ...formData, height: val })
              }
            />
          </View>

          <View style={styles.halfInput}>
            <Text style={styles.label}>{t("weight")}</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={formData.weight}
              onChangeText={(val) =>
                setFormData({ ...formData, weight: val })
              }
            />
          </View>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>{t("detectFitness")}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#f5f5f5', padding: 15 }, formCard: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 3 }, label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8, marginTop: 10 }, input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, fontSize: 16, backgroundColor: '#fafafa' }, row: { flexDirection: 'row', justifyContent: 'space-between' }, halfInput: { width: '48%' }, genderContainer: { flexDirection: 'row', marginBottom: 10 }, genderButton: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#ddd', alignItems: 'center', borderRadius: 8, marginRight: 5 }, selectedGender: { backgroundColor: '#007AFF',borderColor: '#007AFF' }, selectedText: { color: '#fff', fontWeight: 'bold' }, unselectedText: { color: '#333' }, submitBtn: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, marginTop: 30, alignItems: 'center' }, submitText: { color: '#fff', fontSize: 18, fontWeight: 'bold' } });