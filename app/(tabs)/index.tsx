import { Text, View, StyleSheet, SafeAreaView, ImageSourcePropType, Platform } from "react-native";
import ImageViewer from '../components/ImageViewer';
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useState, useRef, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import IconButton from "../components/IconButton";
import CircleButton from "../components/CircleButton";
import EmojiPicker from "../components/EmojiPicker";
import EmojiList from "../components/EmojiList";
import EmojiSticker from "../components/EmojiSticker";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image';

const PlaceholderImage = require('@/assets/images/i.jpg');

export default function Index() {
  const imageRef = useRef<View>(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

  useEffect(() => {
    if (!status?.granted) {
      requestPermission();
    }
  }, [status]);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('Você deve selecionar uma imagem.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
    setPickedEmoji(undefined);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    try {
      if (Platform.OS !== 'web') {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        alert('Imagem salva na galeria!');
      } else {
        const node = imageRef.current;
        if (!node) return;

        const dataUrl = await domtoimage.toJpeg(node, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        const link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();

        alert('Imagem salva com sucesso no navegador!');
      }
    } catch (e) {
      console.log("Erro ao salvar imagem:", e);
    }
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <View ref={imageRef} collapsable={false} style={Platform.OS === 'web' ? { width: 320, height: 440 } : undefined}>
              <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
              {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
            </View>
          </View>

          {showAppOptions ? (
            <View style={styles.optionsContainer}>
              <View style={styles.optionsRow}>
                <IconButton icon="refresh" label="Resetar" onPress={onReset} />
                <CircleButton onPress={onAddSticker} />
                <IconButton icon="save-alt" label="Salvar" onPress={onSaveImageAsync} />
              </View>
            </View>
          ) : (
            <View style={styles.footerContainer}>
              <Button theme="primary" label="Escolher uma foto" onPress={pickImageAsync} />
              <Button label="Usar essa foto" onPress={() => setShowAppOptions(true)} />
            </View>
          )}

          <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
            <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
          </EmojiPicker>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "gray",
  },
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
