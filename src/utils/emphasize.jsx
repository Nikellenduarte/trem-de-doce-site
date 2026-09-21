/**
 * Destaca em itálico (Cormorant, marsala) um trecho do título.
 * emphasize('Quem prova, se apaixona', 'se apaixona')
 * → Quem prova, <em>se apaixona</em>
 * Se o trecho não existir no título, devolve o texto puro.
 */
export function emphasize(title, em) {
  if (!em || !title.includes(em)) return title;
  const i = title.indexOf(em);
  return (
    <>
      {title.slice(0, i)}
      <em>{em}</em>
      {title.slice(i + em.length)}
    </>
  );
}
