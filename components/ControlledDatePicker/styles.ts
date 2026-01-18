import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dateInput: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dateText: { fontSize: 16 },
  errorBorder: { borderColor: "red" },
  errorText: { color: "red", marginBottom: 20 },

  // iOS Modal Stilleri
  iosModalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  iosPickerWrapper: {
    backgroundColor: "white",
    paddingBottom: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  iosHeader: {
    width: "100%",
    padding: 15,
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f9f9f9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iosDoneButton: {
    color: "#007AFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
