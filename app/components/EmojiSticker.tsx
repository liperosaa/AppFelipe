import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Image, ImageSourcePropType } from 'react-native';

const AnimatedImage = Animated.createAnimatedComponent(Image);

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = imageSize * 2;
      } else {
        scaleImage.value = imageSize;
      }
    });

  const drag = Gesture.Pan()
    .onChange(event => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { position: 'absolute' }]}>
        <GestureDetector gesture={doubleTap}>
          <AnimatedImage
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
