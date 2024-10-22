import S from './Search.module.scss';
import Input from '../../../components/@shared/input/Input';
import Button from '../../../components/@shared/button/Button';
import { useForm } from 'react-hook-form';
interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const { register, watch } = useForm<{ searchTerm: string }>();
  const searchTerm = watch('searchTerm');

  const handleSearch = () => {
    onSearch(searchTerm);
    console.log('검색 성공:', searchTerm);
  };

  return (
    <div className={S.inputContainer}>
      <span className={S.inputText}>무엇을 체험하고 싶으신가요?</span>
      <div className={S.searchInputContainer}>
        <Input className={S.searchInput} placeholder="내가 원하는 체험은" register={register('searchTerm')} />
        <Button
          buttonColor="nomadBlack"
          textSize="lg"
          borderRadius="radius4"
          padding="padding8"
          className={S.buttonWidth}
          onClick={handleSearch}
        >
          검색하기
        </Button>
      </div>
    </div>
  );
}
