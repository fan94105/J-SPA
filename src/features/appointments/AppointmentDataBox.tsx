import styled, { css } from "styled-components"
import moment from "moment"
import {
  HiOutlineBookmark,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCurrencyDollar,
  HiOutlinePhone,
  HiOutlineSparkles,
  HiOutlineUser,
} from "react-icons/hi2"

import DataItem from "../../ui/DataItem"
import { Appointment, Option, Service } from "../../types/global"
import { laptop, tablet } from "../../styles/device"

const StyledAppointmentDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;

  ${laptop(css`
    flex-direction: row;
  `)}

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`

const StyledDate = styled.div`
  ${laptop(css`
    margin-left: auto;
  `)}
`

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: var(--color-green-100);
  color: var(--color-green-700);

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`

type AppointmentDataBoxProps = {
  appointment: Appointment
  service: Service
  option?: Option
}

function AppointmentDataBox({
  appointment,
  service,
  option,
}: AppointmentDataBoxProps) {
  return (
    <StyledAppointmentDataBox>
      <Header>
        <div>
          <HiOutlineBookmark />
          <p>{service.name}</p>
        </div>

        <StyledDate>
          {moment(appointment.date).format("YYYY/MM/DD ddd")}{" "}
        </StyledDate>

        <p>
          {appointment.startTime?.slice(0, 5)}-
          {appointment.endTime?.slice(0, 5)}
        </p>
      </Header>

      <Section>
        <DataItem icon={<HiOutlineUser />} label="名稱">
          {appointment.displayName}
        </DataItem>

        <DataItem icon={<HiOutlinePhone />} label="電話">
          {appointment.phone}
        </DataItem>

        {option && (
          <DataItem icon={<HiOutlineSparkles />} label="加選">
            {option?.name}
          </DataItem>
        )}

        {appointment.observations && (
          <DataItem icon={<HiOutlineChatBubbleBottomCenterText />} label="備註">
            {appointment.observations}
          </DataItem>
        )}

        <Price>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`總金額`}>
            {appointment.totalPrice} 元
          </DataItem>
        </Price>
      </Section>

      <Footer>
        <p>
          {moment(appointment.created_at).format("YYYY/MM/DD HH:mm")} 建立預約
        </p>
      </Footer>
    </StyledAppointmentDataBox>
  )
}

export default AppointmentDataBox
