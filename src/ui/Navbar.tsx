import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled, { css } from "styled-components"
import {
  HiOutlineArrowRightEndOnRectangle,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBars3BottomRight,
  HiOutlineBookmarkSquare,
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineRocketLaunch,
  HiOutlineSparkles,
  HiOutlineSquaresPlus,
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineXMark,
} from "react-icons/hi2"

import ButtonIcon from "./ButtonIcon"

import { useOutsideClick } from "../hooks/useOutsideClick"
import { useLiff } from "../context/LiffContext"
import { useUser } from "../features/authentication/useUser"
import { useLogout } from "../features/authentication/useLogout"
import { clearSessionFormData } from "../utils/helpers"

import { tablet } from "../styles/device"

const StyledHeader = styled.header`
  width: 100%;
  background-color: var(--color-grey-200);
  padding: 1.4rem 4rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
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
  background-color: var(--color-grey-0);

  transition: all 350ms ease-out;

  position: fixed;
  inset: 0 0 0 20%;

  ${tablet(css`
    opacity: 1;
    transform: translateX(0);
    height: 100%;
    position: relative;
    inset: unset;

    display: flex;
    justify-content: space-between
    align-items: center;

    background-color: var(--color-grey-200);
  `)}
`

const StyledUserInfo = styled.div`
  padding: 1.6rem 4rem 1.1rem;
  border-bottom: 1px solid var(--color-grey-300);

  display: flex;
  align-items: center;
  gap: 0.8rem;

  ${tablet(css`
    border-bottom: none;
    border-left: 1px solid var(--color-grey-300);
    padding: 0 0 0 1.2rem;
    order: 2;
  `)}
`

const StyledUserImg = styled.div`
  width: 3rem;
  height: 3rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 50%;
  overflow: hidden;

  img {
    display: block;
    object-fit: cover;
    object-position: center;
  }
`

const StyledUserName = styled.div`
  color: var(--color-grey-700);
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.4rem;
`

const StyledList = styled.ul`
  color: var(--color-grey-700);

  padding: 2.4rem 4rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  position: relative;

  ${tablet(css`
    flex-direction: row;
    padding: 0;
    background-color: transparent;
  `)}

  & a {
    background-color: transparent;
    border: none;
    padding: 0.4rem 1rem;
    border-radius: var(--border-radius-sm);
    cursor: pointer;

    display: flex;
    align-items: center;

    &:hover {
      background-color: var(--color-grey-100);

      svg {
        color: var(--color-brand-600);
      }
    }
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-500);

    margin-right: 1rem;
  }
`

const StyledBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;

  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--color-grey-100);

    svg {
      color: var(--color-brand-600);
    }
  }
`

const StyledToggleBtn = styled.div`
  position: relative;

  ${tablet(css`
    display: none;
  `)}
`

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const { isLoggedIn, profile, login, logout } = useLiff()

  const { isAuthenticated } = useUser()

  const { authLogout, isPendingLogout } = useLogout()

  const ref = useOutsideClick(() => setIsNavOpen(false))

  const navigate = useNavigate()

  const handleToggleNav = () => {
    setIsNavOpen((isNavOpen) => !isNavOpen)
  }

  const handleChangeUrl = () => {
    clearSessionFormData()

    setIsNavOpen(false)
  }

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
        <StyledUserInfo>
          <StyledUserImg>
            {isLoggedIn && profile ? (
              <img
                src={profile.pictureUrl}
                alt={`${profile.displayName} 的頭像`}
              />
            ) : null}
          </StyledUserImg>
          <StyledUserName>
            {isLoggedIn && profile ? profile.displayName : "未登入"}
          </StyledUserName>
        </StyledUserInfo>

        <StyledList>
          {isLoggedIn && (
            <>
              <li>
                <Link to="appointment" onClick={handleChangeUrl}>
                  <HiOutlineCalendarDays />
                  <span>線上預約</span>
                </Link>
              </li>
              <li>
                <Link to="appointments" onClick={handleChangeUrl}>
                  <HiOutlineUser />
                  <span>我的預約</span>
                </Link>
              </li>
            </>
          )}

          {isLoggedIn && !isAuthenticated && (
            <li>
              <Link to="login" onClick={handleChangeUrl}>
                <HiOutlineCog6Tooth />
                <span>管理員登入</span>
              </Link>
            </li>
          )}

          {isAuthenticated && (
            <>
              <li>
                <Link to="dashboard" onClick={handleChangeUrl}>
                  <HiOutlineSquaresPlus />
                  <span>總覽</span>
                </Link>
              </li>

              <li>
                <Link to="dashboard/appointments" onClick={handleChangeUrl}>
                  <HiOutlineBookmarkSquare />
                  <span>全部預約</span>
                </Link>
              </li>

              <li>
                <Link to="dashboard/services" onClick={handleChangeUrl}>
                  <HiOutlineRocketLaunch />
                  <span>全部服務</span>
                </Link>
              </li>

              <li>
                <Link to="dashboard/options" onClick={handleChangeUrl}>
                  <HiOutlineSparkles />
                  <span>全部加選</span>
                </Link>
              </li>

              <li>
                <Link to="dashboard/settings" onClick={handleChangeUrl}>
                  <HiOutlineCog6Tooth />
                  <span>設定</span>
                </Link>
              </li>

              <li>
                <Link to="dashboard/users" onClick={handleChangeUrl}>
                  <HiOutlineUsers />
                  <span>管理員</span>
                </Link>
              </li>
            </>
          )}

          {!isLoggedIn && (
            <li>
              <StyledBtn onClick={handleLogin}>
                <HiOutlineArrowRightEndOnRectangle />
                <span>登入</span>
              </StyledBtn>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <StyledBtn onClick={handleLogout}>
                <HiOutlineArrowRightOnRectangle />
                <span>登出</span>
              </StyledBtn>
            </li>
          )}
        </StyledList>
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
