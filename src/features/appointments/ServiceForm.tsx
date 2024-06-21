import FormWrapper from "../../ui/FormWrapper"
import SelectableCard from "../../ui/SelectableCard"
import Select from "react-select"
import { Control, Controller, UseFormRegister } from "react-hook-form"
import FormErrorMsg from "../../ui/FormErrorMsg"
import { useOptions } from "../option/useOptions"
import { FormValues } from "../../types/global"

type ServiceFormProps = {
  register: UseFormRegister<FormValues>
  control: Control<FormValues>
  error: string | undefined
}

function ServiceForm({ register, control, error }: ServiceFormProps) {
  const { options, isPendingOptions } = useOptions()

  const selectOptions = options?.map((option) => ({
    value: String(option.id),
    label: `${option.name} (${option.duration} 分鐘) ${option.price} 元`,
  }))

  return (
    <FormWrapper title="服務項目">
      <SelectableCard name="serviceId" register={register} />

      {error && <FormErrorMsg>{error}</FormErrorMsg>}

      <Controller
        control={control}
        name="option"
        render={({ field: { onChange, ...field } }) => (
          <Select
            {...field}
            onChange={(e) => {
              sessionStorage.setItem("option", JSON.stringify(e))
              onChange(e)
            }}
            options={selectOptions}
            isClearable
            isSearchable={false}
            placeholder="需要加選服務嗎?"
            isLoading={isPendingOptions}
          />
        )}
      />
    </FormWrapper>
  )
}

export default ServiceForm
