import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled, { css } from "styled-components"
import {
  HiBars3,
  HiChevronDown,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBookmarkSquare,
  HiOutlineBuildingStorefront,
  HiOutlineLockClosed,
  HiOutlineRocketLaunch,
  HiOutlineSparkles,
  HiOutlineSquaresPlus,
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineXMark,
} from "react-icons/hi2"

import { useOutsideClick } from "../hooks/useOutsideClick"
import { useLiff } from "../context/LiffContext"
import { useUser } from "../features/authentication/useUser"
import { useLogout } from "../features/authentication/useLogout"

import { desktop, laptop } from "../styles/device"
import ThemeModeToggle from "./ThemeModeToggle"

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-grey-50);
  box-shadow: var(--shadow-sm);
  z-index: 100;
`

const StyledNavbar = styled.nav`
  padding-inline: 1.5rem;
  height: 4.2rem;

  ${laptop(css`
    height: 6.2rem;
  `)}
`

const StyledData = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledLogo = styled(Link)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  ${laptop(css`
    position: static;
    transform: translateX(0);
  `)}
`

/*========== Toggle ==========*/
const StyledToggle = styled.div<{ $isNavOpen: boolean }>`
  position: relative;
  width: 3.2rem;
  height: 3.2rem;

  transition: transform 0.4s;

  & svg {
    width: 2.6rem;
    height: 2.6rem;
    color: var(--color-brand-600);
    cursor: pointer;

    transition: opacity 0.1s;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ${laptop(css`
    display: none;
  `)}
`

const StyledOpen = styled.div<{ $isNavOpen: boolean }>`
  & svg {
    opacity: ${({ $isNavOpen }) => ($isNavOpen ? 0 : 1)};
  }
`

const StyledClose = styled.div<{ $isNavOpen: boolean }>`
  & svg {
    opacity: ${({ $isNavOpen }) => ($isNavOpen ? 1 : 0)};
  }
`

const StyledTools = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
`

/*========== Profile Dropdown ==========*/
const StyledProfileDropdownContainer = styled.div`
  height: 100%;
  /* padding-block: 1rem; */

  position: relative;

  & input {
    display: none;
  }

  & input:checked ~ ul {
    opacity: 1;
    transform: initial;
    pointer-events: initial;
  }

  & input:checked ~ label .profile-dropdown-arrow {
    opacity: 0;
  }

  & input:checked ~ label .profile-dropdown-close {
    opacity: 1;
  }
`

const StyledProfileLoginBtn = styled.button`
  height: 100%;
  padding: 0 1.6rem;
  color: var(--color-grey-600);
  background-color: var(--color-grey-100);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
`

const StyledProfileDropdown = styled.div`
  width: max-content;
  height: 100%;

  cursor: pointer;

  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  ${laptop(css`
    padding: 0.5rem 1.6rem;
    background-color: var(--color-grey-100);
    border: 1px solid var(--color-grey-200);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
  `)}

  &:focus + ul {
    opacity: 1;
    transform: initial;
    pointer-events: initial;
  }
`

const StyledProfileImg = styled.div`
  width: 2.6rem;
  height: 2.6rem;
  outline: 2px solid var(--color-grey-100);
  border-radius: 50%;
  overflow: hidden;

  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    aspect-ratio: 1 / 1;
  }
`

const StyledName = styled.div`
  max-width: 8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: none;
  font-weight: 600;

  ${laptop(css`
    display: block;
  `)}

  ${desktop(css`
    max-width: 12rem;
  `)}
`

// const StyledIcons = styled.div`
//   display: none;
//   width: 1.5rem;
//   height: 1.5rem;
//   cursor: pointer;

//   position: relative;

//   & svg {
//     width: 100%;
//     height: 100%;
//     color: var(--color-grey-500);

//     position: absolute;
//     top: 0;
//     left: 0;

//     transition: opacity 0.1s, transform 0.4s;
//   }

//   .profile-dropdown-close {
//     opacity: 0;
//   }

//   ${laptop(css`
//     display: block;
//   `)}
// `

const StyledProfileDropdownMenu = styled.ul`
  width: max-content;
  border-radius: 0 0 var(--border-radius-sm) var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  pointer-events: none;
  opacity: 0;

  position: absolute;
  top: 3.4rem;
  right: 0;
  transform: scale(0.1);
  transform-origin: 12.2rem -3rem;

  transition: opacity 0.4s, transform 0.4s;

  &:focus-within {
    opacity: 1;
    transform: initial;
    pointer-events: initial;
  }

  ${laptop(css`
    top: 5rem;
  `)}
`

const StyledProfileDropdownLink = styled(Link)`
  font-weight: 600;
  padding: 1.25rem 3.5rem 1.25rem 1rem;
  background-color: var(--color-grey-0);

  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  & svg {
    width: 2rem;
    height: 2rem;
    font-weight: initial;
  }

  &:focus {
    border: none;
    outline: 2px solid var(--color-brand-600);
  }

  &:hover {
    background-color: var(--color-grey-50);
  }

  &:hover svg,
  &:focus svg {
    color: var(--color-brand-600);
  }
`

const StyledProfileDropdownBtn = styled.button`
  width: 100%;
  font-weight: 600;
  padding: 1.25rem 3.5rem 1.25rem 1rem;
  background-color: var(--color-grey-0);

  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  & svg {
    width: 2rem;
    height: 2rem;
    font-weight: initial;
  }

  &:hover {
    background-color: var(--color-grey-50);
  }

  &:hover svg,
  &:focus svg {
    color: var(--color-brand-600);
  }
`

/*========== Menu ==========*/
const StyledMenu = styled.div<{ $isNavOpen: boolean }>`
  width: 100%;
  height: calc(100vh - 4.2rem);
  overflow: auto;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  position: absolute;
  top: ${({ $isNavOpen }) => ($isNavOpen ? "4.2rem" : "3.2rem")};
  left: 0;
  pointer-events: ${({ $isNavOpen }) => ($isNavOpen ? "initial" : "none")};
  opacity: ${({ $isNavOpen }) => ($isNavOpen ? 1 : 0)};

  transition: top 0.4s, opacity 0.3s;

  &::state(webkit-scrollbar) {
    width: 0;
  }

  &:focus-within {
    top: 4.2rem;
    pointer-events: initial;
    opacity: 1;
  }

  ${laptop(css`
    width: auto;
    height: 100%;
    top: 0 !important;
    right: 25%;
    left: unset;
    pointer-events: initial !important;
    opacity: 1 !important;
    overflow: initial;
  `)}

  ${desktop(css`
    right: 22%;
  `)}
`

const StyledList = styled.ul`
  background-color: var(--color-grey-50);
  padding-top: 1rem;

  ${laptop(css`
    height: 100%;
    display: flex;
    column-gap: 3rem;
    padding-block: 1rem;
  `)}
`

const StyledBaseLink = css`
  color: var(--color-grey-600);
  font-weight: 600;
  padding: 1.25rem 1.5rem;
  transition: background-color 0.3s;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover,
  &:focus-within {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
  }

  ${laptop(css`
    height: 100%;
    padding: 0;
    justify-content: initial;
    column-gap: 0.25rem;

    &:hover,
    &:focus-within {
      background-color: transparent;
    }
  `)}
`

const StyledLink = styled(Link)`
  ${StyledBaseLink}
`

/*========== Dropdown Menu ==========*/
const StyledDropdownItem = styled.li`
  cursor: pointer;

  @media (hover: hover) {
    &:hover ul,
    &:focus-within ul {
      max-height: 1000px;

      transition: max-height 0.4s ease-in;
    }

    &:hover div svg,
    &:focus-within label svg {
      transform: rotate(-180deg);
    }
  }

  & input {
    display: none;
    pointer-events: none;
  }

  ${laptop(css`
    position: relative;
  `)}
`

const StyledDivLink = styled.div`
  ${StyledBaseLink}

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-brand-600);
    font-weight: initial;

    transition: transform 0.4s;
  }

  &:focus-within ~ ul {
    max-height: 1000px;

    transition: max-height 0.4s ease-in;
  }

  &:focus svg {
    transform: rotate(180deg);
  }
`

const StyledDropdownMenu = styled.ul`
  max-height: 0;
  overflow: hidden;

  transition: max-height 0.4s ease-out;

  &:focus-within {
    max-height: 1000px;

    transition: max-height 0.4s ease-in;
  }

  ${laptop(css`
    width: max-content;
    border-radius: 0 0 var(--border-radius-sm) var(--border-radius-sm);

    position: absolute;
    top: 5.2rem;
    left: 0;
  `)}
`

const StyledDropdownLink = styled(StyledProfileDropdownLink)`
  padding: 1.25rem 1.25rem 1.25rem 4.5rem;

  /* &:focus {
    border: none;
    outline: 2px solid var(--color-brand-600);
  } */

  &:hover svg,
  &:focus svg {
    color: var(--color-brand-600);
  }

  ${laptop(css`
    padding-inline: 1rem 3.5rem;
  `)}
`

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const navigate = useNavigate()

  const ref = useOutsideClick(() => setIsNavOpen(false), false)

  const { isLoggedIn, profile, login, logout } = useLiff()

  const { isAuthenticated } = useUser()

  const { authLogout } = useLogout()

  const handleLogin = () => {
    login?.()
  }

  const handleLogout = () => {
    if (isAuthenticated) {
      authLogout?.()
    }

    logout?.()

    sessionStorage.clear()

    setIsNavOpen(false)

    navigate("/", { replace: true })
  }

  const handleCloseDropdown = (e: any) => {
    setIsNavOpen(false)

    e.target.blur()
  }

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = "initial"
    }
  }, [isNavOpen])

  return (
    <StyledHeader>
      <StyledNavbar>
        <StyledData>
          <StyledToggle
            className={`${isNavOpen ? "show-icon" : ""}`}
            $isNavOpen={isNavOpen}
            onClick={(e) => {
              e.stopPropagation()

              setIsNavOpen((isNavOpen) => !isNavOpen)
            }}
          >
            <StyledOpen $isNavOpen={isNavOpen}>
              <HiBars3 />
            </StyledOpen>

            <StyledClose $isNavOpen={isNavOpen}>
              <HiOutlineXMark />
            </StyledClose>
          </StyledToggle>

          <StyledLogo to="/">Logo</StyledLogo>

          <StyledTools>
            <StyledProfileDropdownContainer>
              {!isLoggedIn && (
                <StyledProfileLoginBtn onClick={handleLogin}>
                  登入
                </StyledProfileLoginBtn>
              )}
              {isLoggedIn && profile && (
                <StyledProfileDropdown tabIndex={0}>
                  <StyledProfileImg>
                    <img
                      src={profile.pictureUrl}
                      alt={`${profile.displayName}的照片`}
                    />
                  </StyledProfileImg>
                  <StyledName>{profile.displayName}</StyledName>
                  {/* <StyledIcons>
                  <HiChevronDown className="profile-dropdown-arrow" />
                  <HiOutlineXMark className="profile-dropdown-close" />
                </StyledIcons> */}
                </StyledProfileDropdown>
              )}
              <StyledProfileDropdownMenu onClick={handleCloseDropdown}>
                {isLoggedIn && !isAuthenticated && (
                  <li>
                    <StyledProfileDropdownLink to="login">
                      <HiOutlineUser />
                      管理員登入
                    </StyledProfileDropdownLink>
                  </li>
                )}
                {isAuthenticated && (
                  <li>
                    <StyledProfileDropdownLink to="dashboard/account">
                      <HiOutlineLockClosed />
                      帳號設定
                    </StyledProfileDropdownLink>
                  </li>
                )}
                {isLoggedIn && (
                  <li>
                    <StyledProfileDropdownBtn onClick={handleLogout}>
                      <HiOutlineArrowRightOnRectangle />
                      登出
                    </StyledProfileDropdownBtn>
                  </li>
                )}
              </StyledProfileDropdownMenu>
            </StyledProfileDropdownContainer>

            <ThemeModeToggle />
          </StyledTools>
        </StyledData>

        <StyledMenu $isNavOpen={isNavOpen}>
          <StyledList ref={ref}>
            {isLoggedIn && (
              <>
                <li>
                  <StyledLink to="appointment" onClick={handleCloseDropdown}>
                    線上預約
                  </StyledLink>
                </li>

                <li>
                  <StyledLink to="appointments" onClick={handleCloseDropdown}>
                    我的預約
                  </StyledLink>
                </li>
              </>
            )}

            {isLoggedIn && isAuthenticated && (
              <>
                <StyledDropdownItem>
                  <StyledDivLink tabIndex={1}>
                    控制台
                    <HiChevronDown />
                  </StyledDivLink>

                  <StyledDropdownMenu>
                    <li>
                      <StyledDropdownLink
                        to="dashboard"
                        onClick={handleCloseDropdown}
                      >
                        <HiOutlineSquaresPlus />
                        總覽
                      </StyledDropdownLink>
                    </li>

                    <li>
                      <StyledDropdownLink
                        to="dashboard/appointments"
                        onClick={handleCloseDropdown}
                      >
                        <HiOutlineBookmarkSquare />
                        全部預約
                      </StyledDropdownLink>
                    </li>

                    <li>
                      <StyledDropdownLink
                        to="dashboard/services"
                        onClick={handleCloseDropdown}
                      >
                        <HiOutlineRocketLaunch />
                        全部服務
                      </StyledDropdownLink>
                    </li>

                    <li>
                      <StyledDropdownLink
                        to="dashboard/options"
                        onClick={handleCloseDropdown}
                      >
                        <HiOutlineSparkles />
                        全部加選
                      </StyledDropdownLink>
                    </li>
                  </StyledDropdownMenu>
                </StyledDropdownItem>

                <StyledDropdownItem>
                  <StyledDivLink tabIndex={2}>
                    管理
                    <HiChevronDown />
                  </StyledDivLink>

                  <StyledDropdownMenu>
                    <li>
                      <StyledDropdownLink
                        to="dashboard/users"
                        onClick={handleCloseDropdown}
                      >
                        <HiOutlineUsers />
                        新增管理員
                      </StyledDropdownLink>
                    </li>

                    <li>
                      <StyledDropdownLink
                        to="dashboard/settings"
                        onClick={handleCloseDropdown}
                      >
                        <HiOutlineBuildingStorefront />
                        營業設定
                      </StyledDropdownLink>
                    </li>
                  </StyledDropdownMenu>
                </StyledDropdownItem>
              </>
            )}
          </StyledList>
        </StyledMenu>
      </StyledNavbar>
    </StyledHeader>
  )
}

export default Navbar
