import { PropsWithChildren, useEffect, useRef } from "react";
import { Dimensions, PanResponder } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";import * as S from "./style";
import { scheduleOnRN } from "react-native-worklets";

interface Props extends PropsWithChildren {
  isVisible: boolean;
  onAfterClose: () => void;
  onSwipeClose: () => void;
  top: number;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const SWIPE_CLOSE_THRESHOLD = SCREEN_HEIGHT * 0.25;
const SWIPE_VELOCITY_THRESHOLD = 0.5;

const Modal = ({
  children,
  isVisible,
  onAfterClose,
  onSwipeClose,
  top,
}: Props) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const opacity = useSharedValue(0);
  const isDismissing = useRef(false);
  const onSwipeCloseRef = useRef(onSwipeClose);
  onSwipeCloseRef.current = onSwipeClose;

  const dismissRef = useRef(() => {
    if (isDismissing.current) return;
    isDismissing.current = true;
    onSwipeCloseRef.current();
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) =>
        gs.dy > 8 && Math.abs(gs.dy) > Math.abs(gs.dx),
      onPanResponderMove: (_, gs) => {
        if (gs.dy > 0) {
          translateY.value = gs.dy;
          opacity.value = interpolate(gs.dy, [0, SCREEN_HEIGHT], [1, 0]);
        }
      },
      onPanResponderRelease: (_, gs) => {
        const velocity = gs.vy;
        if (
          gs.dy > SWIPE_CLOSE_THRESHOLD ||
          velocity > SWIPE_VELOCITY_THRESHOLD
        ) {
          opacity.value = withTiming(0, { duration: 180 });
          translateY.value = withTiming(
            SCREEN_HEIGHT,
            { duration: 180 },
            (finished) => {
              if (finished) scheduleOnRN(dismissRef.current);
            },
          );
        } else {
          // snap back instantly to 0 without spring bounce
          translateY.value = withTiming(0, { duration: 180 });
          opacity.value = withTiming(1, { duration: 180 });
        }
      },
      onPanResponderTerminate: () => {
        translateY.value = withTiming(0, { duration: 180 });
        opacity.value = withTiming(1, { duration: 180 });
      },
    }),
  ).current;

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
      <Animated.View
        style={[{ width: "100%", flex: 1 }, sheetStyle]}
        {...panResponder.panHandlers}>
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
