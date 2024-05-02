import React from 'react';
import headerStyles from "./header.module.scss"
import Image from 'next/image';
import logoSmall from "../../assets/logoSmall.png"

const Header: React.FC = () => {
  return (
    <header>
      <nav className={headerStyles.parent}>
        <div className={headerStyles.logo__div}>
        <Image src={logoSmall} alt="Logo" className={headerStyles.logo__image}/>
        <p>Weekday</p>
        </div>
      </nav>
    </header>
  );
}

export default Header;
