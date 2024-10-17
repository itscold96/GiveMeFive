import S from './category.module.scss';

export default function Category() {
  const categoryList = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

  return (
    <div className={S.categoryContainer}>
      {categoryList.map(category => (
        <div key={category} className={S.category}>
          {category}
        </div>
      ))}
    </div>
  );
}
