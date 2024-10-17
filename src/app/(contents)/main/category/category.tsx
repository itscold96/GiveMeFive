import S from './Category.module.scss';

const categoryList = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

export default function Category() {
  return (
    <div className={S.categoryContainer}>
      {categoryList.map(category => (
        <button key={category} className={S.category}>
          {category}
        </button>
      ))}
    </div>
  );
}
