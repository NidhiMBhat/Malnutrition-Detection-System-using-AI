
import { Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <TouchableOpacity
      onPress={() =>
        i18n.changeLanguage(i18n.language === "en" ? "kn" : "en")
      }
    >
      <Text>
        {i18n.language === "en" ? "ಕನ್ನಡ" : "English"}
      </Text>
    </TouchableOpacity>
  );
}
