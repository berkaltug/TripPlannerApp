import { isAndroid, isIos } from "@/lib/helper";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React from "react";
import { Controller } from "react-hook-form";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export interface ControlledDatePickerProps {
  control: any;
  name: string;
  errors?: any;
  minimumDate?: Date;
  maximumDate?: Date;
}

const ControlledDatePicker: React.FC<ControlledDatePickerProps> = ({
  control,
  name,
  errors,
  minimumDate = new Date(),
  maximumDate,
}) => {
  const [showPicker, setShowPicker] = React.useState(false);
  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
    onChange: Function,
  ) => {
    if (isAndroid()) {
      setShowPicker(false);
    }
    if (selectedDate) {
      onChange(selectedDate);
    }
  };
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: "Tarih seçimi zorunludur" }}
      render={({ field: { onChange, value } }) => (
        <View>
          {/* Tetikleyici Alan (Input Görünümlü) */}
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={[styles.dateInput, errors?.[name] && styles.errorBorder]}
          >
            <Text style={styles.dateText}>
              {value
                ? new Date(value).toLocaleDateString("tr-TR")
                : "Tarih Seçiniz"}
            </Text>
          </TouchableOpacity>

          {showPicker && isAndroid() && (
            <DateTimePicker
              value={new Date(value) || new Date()}
              mode="date"
              display="default"
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              onChange={(e, date) => handleDateChange(e, date, onChange)}
            />
          )}

          {isIos() && (
            <Modal
              transparent={true}
              animationType="slide"
              visible={showPicker}
              onRequestClose={() => setShowPicker(false)}
            >
              <View style={styles.iosModalContainer}>
                <View style={styles.iosPickerWrapper}>
                  {/* iOS'a özel "Bitti" Butonu */}
                  <View style={styles.iosHeader}>
                    <TouchableOpacity onPress={() => setShowPicker(false)}>
                      <Text style={styles.iosDoneButton}>Select</Text>
                    </TouchableOpacity>
                  </View>

                  <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                    display="spinner"
                    onChange={(e, date) => handleDateChange(e, date, onChange)}
                    textColor="black"
                  />
                </View>
              </View>
            </Modal>
          )}
        </View>
      )}
    />
  );
};

export default ControlledDatePicker;
