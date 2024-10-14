import S from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  buttonColor: 'nomadBlack' | 'white' | 'gray';
  textSize: 'md' | 'lg'; //md : 14px, lg : 16px
  borderRadius: 'radius6' | 'radius4';
  padding: 'padding8' | 'padding14';
  className?: string;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
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
