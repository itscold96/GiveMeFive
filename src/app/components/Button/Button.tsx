import S from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  buttonWidth?: 'full';
  buttonColor: 'nomadBlack' | 'white' | 'gray';
  textSize: 'md' | 'lg';
  borderRadius: 'radius6' | 'radius4';
  padding: 'padding8' | 'padding14';
  className?: string;
  children: React.ReactNode;
  isFull?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  // isFull,
  buttonWidth,
  buttonColor,
  textSize,
  borderRadius,
  padding,
  className,
  children,
  ...buttonAttributes
}: ButtonProps) {
  return (
    <button
      className={`${S.button} 
        ${S[`${buttonWidth}ButtonWidth`]}
        ${S[`${buttonColor}ButtonColor`]}
        ${S[`${textSize}TextSize`]}
        ${S[`${borderRadius}BorderRadius`]}
        ${S[padding]}
        ${className || ''}`}
      {...buttonAttributes}
    >
      {children}
    </button>
  );
}
