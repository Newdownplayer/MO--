import s from './WelcomeLayout.module.scss';
export const Forth = () => (
  <div class={s.card}>
    <svg>
      <use xlinkHref='#cloud'></use>
    </svg>
    <h2>云备份<br />再也不担心数据丢失</h2>
  </div>
)

Forth.displayName = 'Forth'