import style from './style.module.css'

export default function Counter({ value, onChange }: { value: number, onChange: (value : number) => void }) {
  return (
    <div className={style.counterContainer}>
      <button className='button b-purple white' onClick={() => value > 1 && onChange(value - 1)}>-</button>
      <p>{value}</p>
      <button className='button b-purple white' onClick={() => onChange(value + 1)}>+</button>
    </div>
  )
}
