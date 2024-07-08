import { useSearchParams } from "react-router-dom"
import styled from "styled-components"

const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  padding: 1.15rem 0.6rem;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
`

type SortByProps = {
  options: Record<string, string>[]
}

function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortBy = searchParams.get("sortBy") || ""

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("first")

    searchParams.set("sortBy", e.target.value)

    setSearchParams(searchParams)
  }

  return (
    <StyledSelect value={sortBy} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  )
}

export default SortBy
