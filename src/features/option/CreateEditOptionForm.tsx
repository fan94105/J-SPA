import React from "react"
import styled from "styled-components"
import FormRow from "../../ui/FormRow"
import Button from "../../ui/Button"
import { SubmitHandler, useForm } from "react-hook-form"
import { TablesInsert, TablesUpdate } from "../../supabase"
import { useCreateOption } from "./useCreateOption"
import { useEditOption } from "./useEditOption"

const StyledCreateEditOptionForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

type CreateEditOptionFormProps = {
  optionToEdit?: TablesInsert<"options"> | TablesUpdate<"options">
  onCloseModal?: () => void
}

function CreateEditOptionForm({
  optionToEdit = {},
  onCloseModal,
}: CreateEditOptionFormProps) {
  const { id: editId } = optionToEdit

  const isEditSession = Boolean(editId)

  const { createOption, isCreatingOption } = useCreateOption()

  const { editOption, isEditingOption } = useEditOption()

  const isWorking = isCreatingOption || isEditingOption

  const { register, handleSubmit, formState, reset } = useForm<
    TablesUpdate<"options">
  >({
    defaultValues: isEditSession ? optionToEdit : {},
  })

  const { errors } = formState

  const onSubmit: SubmitHandler<TablesUpdate<"options">> = (data) => {
    if (isEditSession) {
      editOption(
        { newOption: data, id: editId! },
        {
          onSuccess: () => {
            reset()

            onCloseModal?.()
          },
        }
      )
    } else {
      createOption(data, {
        onSuccess: () => {
          reset()

          onCloseModal?.()
        },
      })
    }
  }

  return (
    <StyledCreateEditOptionForm onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="項目名稱" error={errors.name?.message}>
        <input
          {...register("name", {
            required: "請輸入項目名稱",
          })}
          type="text"
          id="name"
          placeholder=""
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="價格" error={errors.price?.message}>
        <input
          {...register("price", {
            required: "請輸入項目價格",
            min: {
              value: 0,
              message: "請輸入正確的價格",
            },
            valueAsNumber: true,
          })}
          type="number"
          id="price"
          placeholder=""
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="時長" error={errors.duration?.message}>
        <input
          {...register("duration", {
            required: "請輸入項目時長",
            min: {
              value: 0,
              message: "請輸入正確的時長",
            },
            valueAsNumber: true,
          })}
          type="number"
          id="duration"
          placeholder=""
          disabled={isWorking}
        />
      </FormRow>
      {/* <FormRow label="描述">
        <textarea
          {...register("description")}
          id="description"
          placeholder=""
          rows={1}
          disabled={isWorking}
        />
      </FormRow> */}

      <Button type="submit" disabled={isWorking}>
        {isEditSession ? "確認修改" : "新增項目"}
      </Button>
    </StyledCreateEditOptionForm>
  )
}

export default CreateEditOptionForm
