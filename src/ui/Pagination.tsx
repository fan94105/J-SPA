import { useSearchParams } from "react-router-dom"
import styled from "styled-components"

import { PAGE_SIZE } from "../utils/constants"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2"

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledP = styled.p`
  & span {
    font-weight: 600;
  }
`

const StyledBtnRow = styled.div`
  display: flex;
  gap: 0.6rem;
`

const PaginationBtn = styled.button`
  background-color: var(--color-grey-50);
  color: inherit;
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`

type PaginationProps = {
  count: number
}

function Pagination({ count }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1

  const pageCount = Math.ceil(count / PAGE_SIZE)

  const prevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1

    searchParams.set("page", String(prev))
    setSearchParams(searchParams)
  }

  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1

    searchParams.set("page", String(next))
    setSearchParams(searchParams)
  }

  if (pageCount <= 1) return null

  return (
    <StyledPagination>
      <StyledP>
        <span>{currentPage}</span> / <span>{pageCount}</span>
      </StyledP>

      <StyledBtnRow>
        <PaginationBtn onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>上一頁</span>
        </PaginationBtn>

        <PaginationBtn onClick={nextPage} disabled={currentPage === pageCount}>
          <span>下一頁</span>
          <HiChevronRight />
        </PaginationBtn>
      </StyledBtnRow>
    </StyledPagination>
  )
}

export default Pagination
