import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"

import Spinner from "../../ui/Spinner"
import Button from "../../ui/Button"
import ButtonText from "../../ui/ButtonText"
import Modal from "../../ui/Modal"
import ConfirmDelete from "../../ui/ConfirmDelete"
import CreateEditServiceForm from "./CreateEditServiceForm"

import { useService } from "./useService"
import { useDeleteService } from "./useDeleteService"

const StyledServiceDetail = styled.div`
  margin-top: 1rem;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 2rem;
`

const StyledImage = styled.div`
  img {
    display: block;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`

const StyledContent = styled.div`
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

const StyledRow = styled.div`
  display: flex;

  align-items: flex-start;
  gap: 1.2rem;
`

const StyledTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-500);
  white-space: nowrap;
`

const StyledBtnRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`

function ServiceDetail() {
  const navigate = useNavigate()

  const { deleteService, isDeletingService } = useDeleteService()

  const { serviceId } = useParams()

  const { service, isPendingService } = useService(+serviceId!)

  if (isPendingService) return <Spinner />

  return (
    <Modal>
      <StyledBtnRow>
        <ButtonText onClick={() => navigate(-1)}>&larr; 返回</ButtonText>
      </StyledBtnRow>

      <StyledServiceDetail>
        <StyledImage>
          <img src={service?.image!} alt={service?.name!} />
        </StyledImage>

        <StyledContent>
          <StyledRow>
            <StyledTitle>服務</StyledTitle>
            <div>{service?.name}</div>
          </StyledRow>

          <StyledRow>
            <StyledTitle>描述</StyledTitle>
            <div>{service?.description}</div>
          </StyledRow>

          <StyledRow>
            <StyledTitle>時長</StyledTitle>
            <div>{service?.duration}</div>
          </StyledRow>

          <StyledRow>
            <StyledTitle>原價</StyledTitle>
            <div>{service?.regularPrice}</div>
          </StyledRow>

          <StyledRow>
            <StyledTitle>折扣</StyledTitle>
            <div>{service?.discount}</div>
          </StyledRow>

          <StyledRow>
            <StyledTitle>價格</StyledTitle>
            <div>
              {service?.discount
                ? service?.regularPrice! - service?.discount
                : service?.regularPrice}
            </div>
          </StyledRow>

          <StyledBtnRow>
            <Modal.Open name="edit">
              <Button $variation="secondary">修改</Button>
            </Modal.Open>

            <Modal.Open name="delete">
              <Button $variation="danger">刪除</Button>
            </Modal.Open>
          </StyledBtnRow>

          <Modal.Window name="edit">
            <CreateEditServiceForm serviceToEdit={service} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={service?.name!}
              onConfirm={() =>
                deleteService(+serviceId!, {
                  onSuccess: () => navigate(-1),
                })
              }
              disabled={isDeletingService}
            />
          </Modal.Window>
        </StyledContent>
      </StyledServiceDetail>
    </Modal>
  )
}

export default ServiceDetail
