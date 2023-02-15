import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setAnimation } from "../reducer/animation";
import {
  faUser,
  faSearch,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function Header() {
  const [connectedUser, setConnectedUser] = useState(false);
  let menuInfo = (
    <>
      <button
      
        onClick={() => {
          router.push("/signup");
          animationFalse();
        }}
      >
        S'INSCRIRE
      </button>
      <button
        onClick={() => {
          router.push("/signin");
          animationFalse();
        }}
      >
        SE CONNECTER
      </button>
    </>
  );
  const token = useSelector((state) => state.user.value.token);

  useEffect(() => {
    console.log(token);
    if (token != null) {
      setConnectedUser(true);
    }
  }, []);

  if (connectedUser) {
    menuInfo = (
      <>
        <button
          onClick={() => {
            router.push("/signin");
            animationFalse();
          }}
        >
          BOOKMARKS
        </button>
        <button
          onClick={() => {
            router.push("/signup");
            animationFalse();
          }}
        >
          DÉCONNEXION
        </button>
      </>
    );
  }

  const router = useRouter();
  const animation = useSelector((state) => state.animation.value);
  const dispatch = useDispatch();
  let iconSiwtch = faBars;
  const animationFalse = () => {
    dispatch(setAnimation(false));
  };

  let styleAnimation = {};

  if (animation) {
    styleAnimation = {
      transition: "all .5s ease-in-out",
      visibility: "visible",
      opacity: "1",
      padding: "100rem",
    };
  }

  const switchAnimation = () => {
    if (animation) {
      dispatch(setAnimation(false));
      iconSiwtch = faXmark;
      return;
    }
    dispatch(setAnimation(true));

    iconSiwtch = faBars;
  };

  return (
    <ul className={styles.navbar}>
      <li className={styles.navbarItem}>
        <a onClick={switchAnimation}>
          <FontAwesomeIcon icon={iconSiwtch} />
        </a>
      </li>
      <li>
        <a
          onClick={() => {
            router.push("/");
          }}
        >
          OUSSNEWS
        </a>
      </li>
      <li className={styles.navbarItem}>
        <a>
          <FontAwesomeIcon icon={faSearch} />
        </a>
      </li>
      <div className={styles.roundAnimation} style={styleAnimation}>
        {menuInfo}
        <button>À PROPOS</button>
        <button>MODE SOMBRE</button>
        <button onClick={animationFalse}>FERMER</button>
      </div>
    </ul>
  );
}

export default Header;

//install redux with yarn add redux react-redux
