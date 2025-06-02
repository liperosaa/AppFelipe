import { StyleSheet, View, Pressable, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type Props = {
  label: string;
  theme?: 'primary';
  onPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
};

export default function Button({
  label,
  theme,
  onPress,
  backgroundColor = '#808080',
  textColor = '#FFFFFF', 
}: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={[
          styles.button,
          { backgroundColor },
          theme === 'primary' && styles.primaryButton,
        ]}
        onPress={onPress}
      >
        {theme === 'primary' && (
          <FontAwesome
            name="picture-o"
            size={18}
            color={textColor}
            style={styles.buttonIcon}
          />
        )}
        <Text style={[styles.buttonLabel, { color: textColor }]}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#000000', 
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: '#000000', 
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
});
