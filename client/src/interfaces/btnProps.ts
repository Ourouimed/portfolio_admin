import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";

interface BaseBtnProps {
  fullWidth?: boolean;
  variant?: string;
  size?: string;
  btnStyle?: string;
}

type ButtonProps = BaseBtnProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type AnchorProps = BaseBtnProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type BtnProps = ButtonProps | AnchorProps;