import {
  type StackCardStyleInterpolator,
  type StackNavigationOptions,
} from "@react-navigation/stack";

const cardStyleInterpolator: StackCardStyleInterpolator = ({ current, layouts }) => ({
  cardStyle: {
    transform: [
      {
        translateX: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [layouts.screen.width, 0],
        }),
      },
    ],
  },
  overlayStyle: {
    opacity: current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.3],
    }),
  },
});

const springSpec = {
  animation: "spring" as const,
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
  },
};

export const iosSlideTransition: StackNavigationOptions = {
  gestureEnabled: true,
  gestureDirection: "horizontal",
  cardOverlayEnabled: true,
  cardStyleInterpolator,
  transitionSpec: {
    open: springSpec,
    close: springSpec,
  },
};