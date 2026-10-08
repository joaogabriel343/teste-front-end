import type { CustomerProfile } from '../../types/store'
import { formatPhone, formatZipCode, PHONE_PATTERN, ZIP_CODE_PATTERN } from '../../utils/formatInput'
import { TextField } from '../Form/TextField'
import styles from './CustomerFields.module.scss'

interface CustomerFieldsProps {
  value: CustomerProfile
  onChange: (value: CustomerProfile) => void
}

export function CustomerFields({ value, onChange }: CustomerFieldsProps) {
  function update<Field extends keyof CustomerProfile>(field: Field, fieldValue: CustomerProfile[Field]) {
    onChange({ ...value, [field]: fieldValue })
  }

  return (
    <div className={styles.grid}>
      <TextField
        className={styles.fullRow}
        label="Nome completo"
        name="name"
        autoComplete="name"
        required
        value={value.name}
        onChange={(event) => update('name', event.target.value)}
      />
      <TextField
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={value.email}
        onChange={(event) => update('email', event.target.value)}
      />
      <TextField
        label="Telefone"
        name="phone"
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="(11) 91234-5678"
        pattern={PHONE_PATTERN}
        required
        value={value.phone}
        onChange={(event) => update('phone', formatPhone(event.target.value))}
      />
      <TextField
        label="CEP"
        name="zipCode"
        inputMode="numeric"
        autoComplete="postal-code"
        placeholder="00000-000"
        pattern={ZIP_CODE_PATTERN}
        required
        value={value.zipCode}
        onChange={(event) => update('zipCode', formatZipCode(event.target.value))}
      />
      <TextField
        label="Cidade"
        name="city"
        autoComplete="address-level2"
        required
        value={value.city}
        onChange={(event) => update('city', event.target.value)}
      />
      <TextField
        className={styles.fullRow}
        label="Endereço com número"
        name="address"
        autoComplete="street-address"
        placeholder="Rua, número e complemento"
        required
        value={value.address}
        onChange={(event) => update('address', event.target.value)}
      />
    </div>
  )
}
