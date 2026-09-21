import { useId } from 'react';
import { cn } from '../../utils/cn.js';
import { minEventDate } from '../../utils/validation.js';

function Field({ id, label, optional, hint, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        <span>{label}</span>
        {optional && <em>opcional</em>}
      </label>
      {children}
      {error ? (
        <span className="field__error" id={`${id}-error`} role="alert">
          {error}
        </span>
      ) : (
        hint && <span className="field__hint">{hint}</span>
      )}
    </div>
  );
}

/**
 * Dados da reserva: nome, data do evento e tipo de evento (+ cupom de
 * parceiro e observações, opcionais). O cupom só é informado à confeitaria:
 * o site não aplica desconto. `errors` vem de validateBooking; só são exibidos para campos
 * já tocados ou após tentativa de envio (`showAll`).
 */
export default function BookingForm({ booking, onChange, rules, errors = {}, touched = {}, showAll = false, onBlur }) {
  const uid = useId();
  const id = (f) => `${uid}-${f}`;
  const show = (f) => (showAll || touched[f]) && errors[f];
  const inputProps = (f) => ({
    id: id(f),
    className: cn('input', show(f) && 'input--invalid'),
    'aria-invalid': show(f) ? true : undefined,
    'aria-describedby': show(f) ? `${id(f)}-error` : undefined,
    onBlur: () => onBlur?.(f),
  });

  return (
    <form className="form-grid form-grid--2" onSubmit={(e) => e.preventDefault()} noValidate>
      <div className="field field--full">
        <Field id={id('name')} label="Seu nome" error={show('name')}>
          <input {...inputProps('name')} type="text" autoComplete="name" placeholder="Como podemos te chamar?" value={booking.name} onChange={(e) => onChange({ name: e.target.value })} />
        </Field>
      </div>

      <Field id={id('date')} label="Data do evento" error={show('date')} hint="Sujeita à disponibilidade da agenda.">
        <input {...inputProps('date')} type="date" min={minEventDate(rules)} value={booking.date} onChange={(e) => onChange({ date: e.target.value })} />
      </Field>

      <Field id={id('eventType')} label="Tipo de evento" error={show('eventType')}>
        <select {...inputProps('eventType')} value={booking.eventType} onChange={(e) => onChange({ eventType: e.target.value })}>
          <option value="">Escolha…</option>
          {rules.eventTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <div className="field field--full">
        <Field id={id('coupon')} label="Possui cupom exclusivo de parceiros?" optional hint="O cupom é conferido pela confeitaria na confirmação do pedido.">
          <input
            {...inputProps('coupon')}
            type="text"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            maxLength={40}
            placeholder="Digite aqui"
            value={booking.coupon ?? ''}
            onChange={(e) => onChange({ coupon: e.target.value })}
          />
        </Field>
      </div>

      <div className="field field--full">
        <label htmlFor={id('notes')} className="field__label">
          <span>Observações</span>
          <em>opcional</em>
        </label>
        <textarea {...inputProps('notes')} placeholder={rules.notesPlaceholder} value={booking.notes} onChange={(e) => onChange({ notes: e.target.value })} rows={3} />
      </div>
    </form>
  );
}
