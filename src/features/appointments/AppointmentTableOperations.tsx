import styled from "styled-components"
import Filter from "../../ui/Filter"
import SortBy from "../../ui/SortBy"

const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem;
`

function AppointmentTableOperations() {
  return (
    <StyledRow>
      <Filter
        filterField="status"
        options={[
          { label: "全部預約", value: "all" },
          { label: "已確認", value: "confirmed" },
          { label: "已完成", value: "completed" },
        ]}
      />

      <SortBy
        options={[
          { label: "依日期排序 (最近)", value: "date-desc" },
          {
            label: "依日期排序 (最遠)",
            value: "date-asc",
          },
        ]}
      />
    </StyledRow>
  )
}

export default AppointmentTableOperations
