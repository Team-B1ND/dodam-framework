import { PropsWithChildren, useEffect } from "react";
import { Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as S from "./style";
import { scheduleOnRN } from "react-native-worklets";

interface Props extends PropsWithChildren {
  isVisible: boolean;
  onAfterClose: () => void;
  top: number;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Modal = ({ children, isVisible, onAfterClose, top }: Props) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, { duration: 320 });
      translateY.value = withSpring(0, {
        stiffness: 220,
        mass: 0.9,
        overshootClamping: false,
      });
    } else {
      opacity.value = withTiming(0, { duration: 180 });
      translateY.value = withTiming(
        SCREEN_HEIGHT,
        { duration: 180 },
        (finished) => {
          if (finished) scheduleOnRN(onAfterClose);
        },
      );
    }
  }, [isVisible]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <S.Modal $top={top} pointerEvents={isVisible ? "auto" : "none"}>
      <Animated.View style={[{ ...absoluteFill }, backdropStyle]}>
        <S.Backdrop />
      </Animated.View>
      <Animated.View style={[{ width: "100%", flex: 1 }, sheetStyle]}>
        <S.ModalContent>{children}</S.ModalContent>
      </Animated.View>
    </S.Modal>
  );
};

const absoluteFill = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export default Modal;
