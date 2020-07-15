import { useState } from 'react'

export const useInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue)

  const onChange = (e) => setValue(e.target.value)

  return { value, setValue, onChange }
}
