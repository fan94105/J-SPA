import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled, { css } from "styled-components"
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineBars3BottomRight,
  HiOutlineCalendarDays,
  HiOutlineCog8Tooth,
  HiOutlineUser,
  HiOutlineXMark,
} from "react-icons/hi2"
import { useLiff } from "react-liff"
import ButtonIcon from "./ButtonIcon"
import Footer from "./Footer"
import { useOutsideClick } from "../hooks/useOutsideClick"
import useProfile from "../hooks/useProfile"

const StyledHeader = styled.header`
  background-color: var(--color-grey-200);
  padding: 1rem 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: sticky;
  top: 0;
  z-index: 999;
`

const StyledNav = styled.nav<{
  $isNavOpen: boolean
}>`
  ${(props) =>
    props.$isNavOpen
      ? css`
          opacity: 1;
          transform: translateX(0);
        `
      : css`
          opacity: 0;
          transform: translateX(100%);
        `}

  height: 100dvh;
  transition: all 350ms ease-out;

  position: fixed;
  inset: 0 0 0 20%;
`

const StyledList = styled.ul`
  color: var(--color-grey-700);
  background-color: #fff;
  padding: 12rem 5rem;
  height: 100%;

  position: relative;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  & li {
    padding: 1rem;
  }

  & a {
    display: flex;
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);

    margin-right: 1rem;
  }
`

const StyledToggleBtn = styled.div`
  position: relative;
`

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const ref = useOutsideClick(() => setIsNavOpen(false))

  const navigate = useNavigate()

  const { liff, isLoggedIn } = useLiff()

  const { profile } = useProfile()

  const handleToggleNav = () => {
    setIsNavOpen((isNavOpen) => !isNavOpen)
  }

  const handleLogout = () => {
    liff.logout()

    sessionStorage.clear()

    setIsNavOpen(false)

    navigate("/")
  }

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isNavOpen])

  return (
    <StyledHeader ref={ref}>
      <Link to="/" onClick={() => setIsNavOpen(false)}>
        <div>J~SPA</div>
      </Link>

      <StyledNav $isNavOpen={isNavOpen}>
        <StyledList>
          <li>
            <Link
              to="appointment"
              onClick={() => {
                sessionStorage.clear()
                sessionStorage.setItem("redirectPath", "/appointment")
                setIsNavOpen(false)
              }}
            >
              <HiOutlineCalendarDays />
              <span>線上預約</span>
            </Link>
          </li>

          <li>
            <Link
              to="appointments"
              onClick={() => {
                sessionStorage.clear()
                sessionStorage.setItem("redirectPath", "/appointments")
                setIsNavOpen(false)
              }}
            >
              <HiOutlineUser />
              <span>我的預約</span>
            </Link>
          </li>

          {isLoggedIn && (
            <li>
              <ButtonIcon onClick={handleLogout}>
                <HiOutlineArrowRightOnRectangle />
                <span>登出</span>
              </ButtonIcon>
            </li>
          )}
        </StyledList>
        <Footer />
      </StyledNav>

      <StyledToggleBtn>
        <ButtonIcon onClick={handleToggleNav}>
          {isNavOpen ? <HiOutlineXMark /> : <HiOutlineBars3BottomRight />}
        </ButtonIcon>
      </StyledToggleBtn>
    </StyledHeader>
  )
}

export default Navbar
