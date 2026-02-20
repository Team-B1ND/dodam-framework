import { PropsWithChildren, useEffect, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Animated, Dimensions } from "react-native";
import * as S from "./style";

interface Props extends PropsWithChildren {
  isVisible: boolean;
  onAfterClose: () => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Modal = ({ children, isVisible, onAfterClose }: Props) => {
  const { top } = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 0,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onAfterClose();
      });
    }
  }, [isVisible]);

  return (
    <S.Modal $top={top} pointerEvents={isVisible ? "auto" : "none"}>
      <S.Backdrop style={{ opacity }} />
      <S.ModalContent style={{ transform: [{ translateY }] }}>
        {children}
      </S.ModalContent>
    </S.Modal>
  );
};

export default Modal;
