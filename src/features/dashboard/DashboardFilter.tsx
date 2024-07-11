import Filter from "../../ui/Filter"

function DashboardFilter() {
  return (
    <>
      <Filter
        filterField="last"
        options={[
          { label: "最近 7 天", value: "7" },
          { label: "最近 30 天", value: "30" },
          { label: "最近 90 天", value: "90" },
        ]}
      />
    </>
  )
}

export default DashboardFilter
