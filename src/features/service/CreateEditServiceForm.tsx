import styled from "styled-components"
import { SubmitHandler, useForm } from "react-hook-form"

import FormRow from "../../ui/FormRow"
import Button from "../../ui/Button"

import { useCreateService } from "./useCreateService"
import { useEditService } from "./useEditService"

import { TablesInsert, TablesUpdate } from "../../supabase"

const StyledCreateEditServiceForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

const StyledFileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`

const StyledBtnRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

type CreateEditServiceFormProps = {
  serviceToEdit?: TablesUpdate<"services">
  onCloseModal?: () => void
}

function CreateEditServiceForm({
  serviceToEdit = {},
  onCloseModal,
}: CreateEditServiceFormProps) {
  const { id: editId } = serviceToEdit

  const isEditSession = Boolean(editId)

  const { createService, isCreatingService } = useCreateService()

  const { editService, isEditingService } = useEditService()

  const isWorking = isCreatingService || isEditingService

  const { register, handleSubmit, formState, reset } = useForm<
    TablesUpdate<"services"> | TablesInsert<"services">
  >({
    defaultValues: isEditSession ? serviceToEdit : {},
  })

  const { errors } = formState

  const onSubmit: SubmitHandler<
    TablesUpdate<"services"> | TablesInsert<"services">
  > = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image![0]

    if (isEditSession) {
      editService(
        { newService: { ...data, image }, id: editId! },
        {
          onSuccess: () => {
            reset()

            onCloseModal?.()
          },
        }
      )
    } else {
      createService(
        { ...data, image },
        {
          onSuccess: () => {
            reset()

            onCloseModal?.()
          },
        }
      )
    }
  }

  return (
    <StyledCreateEditServiceForm onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="服務名稱" error={errors.name?.message}>
        <input
          {...register("name", {
            required: "請輸入服務名稱",
          })}
          type="text"
          id="name"
          placeholder=""
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="描述" error={errors.description?.message}>
        <input
          {...register("description", {
            required: "請輸入服務描述",
          })}
          type="text"
          id="description"
          placeholder=""
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="價格" error={errors.regularPrice?.message}>
        <input
          {...register("regularPrice", {
            required: "請輸入服務價格",
            min: {
              value: 0,
              message: "請輸入正確的服務價格",
            },
            valueAsNumber: true,
          })}
          type="number"
          id="regularPrice"
          placeholder=""
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="折扣" error={errors.discount?.message}>
        <input
          {...register("discount", {
            required: "請輸入服務折扣",
            min: {
              value: 0,
              message: "請輸入正確的服務折扣",
            },
            valueAsNumber: true,
          })}
          type="number"
          id="discount"
          placeholder=""
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="時長" error={errors.duration?.message}>
        <input
          {...register("duration", {
            required: "請輸入服務時長",
            min: {
              value: 0,
              message: "請輸入正確的服務時長",
            },
            valueAsNumber: true,
          })}
          type="number"
          id="duration"
          placeholder=""
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="圖片" error={errors.image?.message}>
        <StyledFileInput
          {...register("image", {
            required: isEditSession ? false : "請選擇圖片",
          })}
          type="file"
          accept="image/*"
          id="image"
          disabled={isWorking}
        />
      </FormRow>

      <StyledBtnRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isWorking}
        >
          取消
        </Button>

        <Button type="submit" disabled={isWorking}>
          {isEditSession ? "確認修改" : "新增服務"}
        </Button>
      </StyledBtnRow>
    </StyledCreateEditServiceForm>
  )
}

export default CreateEditServiceForm
