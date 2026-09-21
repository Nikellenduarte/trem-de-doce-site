import SectionHeading from '../ui/SectionHeading.jsx';

const STEPS = [
  { title: 'Escolha', text: 'Bolos, brigadeiros, brownies, mimos ou um kit de festa completa.' },
  { title: 'Personalize', text: 'Adicione quantos itens quiser. Seus sabores favoritos, do seu jeito.' },
  { title: 'Reserve a data', text: 'Informe a data do evento e confira o valor estimado.' },
  { title: 'Envie pelo WhatsApp', text: 'Seu orçamento chega organizado para confirmarmos a disponibilidade da data e os detalhes do pedido.' },
];

export default function HowItWorks() {
  return (
    <section className="section section--surface" id="como-pedir" aria-labelledby="como-title">
      <div className="container">
        <SectionHeading
          id="como-title"
          align="center"
          eyebrow="Como funciona"
          className="how__heading"
          title={
            <>
              Em quatro passos simples, você escolhe o que deseja e envia seu pedido <em>pelo WhatsApp</em>
            </>
          }
        />
        <ol className="how">
          {STEPS.map((s, i) => (
            <li key={s.title} className="how__item reveal" style={{ '--reveal-delay': `${i * 90}ms` }}>
              <span className="how__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="how__title">{s.title}</h3>
              <p className="how__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
