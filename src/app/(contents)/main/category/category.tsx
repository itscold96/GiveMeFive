export default function Category() {
  const categoryList = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

  return (
    <div>
      {categoryList.map(category => (
        <div key={category}>{category}</div>
      ))}
    </div>
  );
}
