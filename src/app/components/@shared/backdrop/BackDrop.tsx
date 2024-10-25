import S from './BackDrop.module.scss';

interface BackdropProps {
  onClose: () => void;
}

export default function BackDrop({ onClose }: BackdropProps) {
  return <div className={S.backdrop} onClick={onClose} />;
}
