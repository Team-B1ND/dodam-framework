import { colors } from "../../../../colors";
import { shapes } from "../../../../shapes";
import { typoCss } from "../../../../typography";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const fadeIn = keyframes`
	from { opacity: 0; }
	to { opacity: 1; }
`;

const slideUp = keyframes`
	from { opacity: 0; transform: translateY(20px); }
	to { opacity: 1; transform: translateY(0); }
`;

export const Overlay = styled.div<{ $zIndex: number }>`
	position: fixed;
	inset: 0;
	background-color: ${colors.overlay.dim};
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: ${({ $zIndex }) => $zIndex};
	animation: ${fadeIn} 300ms ease-out;
`;

export const Modal = styled.div`
  width: 320px;
	position: relative;
	background: ${colors.background.surface};
	border-radius: ${shapes.extraLarge};
	padding: 18px;
	max-height: 90vh;
	overflow-y: auto;
	animation: ${slideUp} 300ms ease-out;

	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 3px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: rgba(0, 0, 0, 0.3);
	}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 6px;
`;

export const Title = styled.h2`
  ${typoCss("Heading1", "Bold")};
  color: ${colors.text.primary};
`;

export const Message = styled.pre`
  ${typoCss("Body1", "Medium")};
  color: ${colors.text.secondary};
  white-space: pre-wrap;
  font-family: inherit;
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 18px;
`;