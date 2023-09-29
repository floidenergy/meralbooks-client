import style from './style.module.css'
export default function LoadingAnimation({ className }: { className?: string }) {
  // document.addEventListener('scroll', function (e) {
  //   e.preventDefault();

  //   console.log("hello");
    
  // }, { passive: false });

  // window.addEventListener('scroll', (e) => e.preventDefault())
  return (
    <div className={`${style.container} ${className && className}`}>
      <div className={style.bookshelf_wrapper}>
        <ul className={style.books_list}>
          <li className={`${style.book_item} ${style.first}`}></li>
          <li className={`${style.book_item} ${style.second}`}></li>
          <li className={`${style.book_item} ${style.third}`}></li>
          <li className={`${style.book_item} ${style.fourth}`}></li>
          <li className={`${style.book_item} ${style.fifth}`}></li>
          <li className={`${style.book_item} ${style.sixth}`}></li>
        </ul>
        <div className={style.shelf}></div>
      </div>
    </div>
  )
}
