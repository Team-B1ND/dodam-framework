export interface IconProps {
  size?: number;
  onClick?: () => void;
  pointer?: boolean;
}

export interface IconWithColorProps extends IconProps {
  color?: string;
};