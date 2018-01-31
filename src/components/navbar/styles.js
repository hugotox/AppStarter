import css from 'styled-jsx/css'

const navbarHeight = '50px'

export default css
  // language=CSS
  `
  .navbar-wrapper {
    background-color: #222222;
    color: white;
    height: ${navbarHeight};
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
  }

  .title {
    font-size: 22px;
    height: ${navbarHeight};
    cursor: pointer;
    color: #b5b5b5;
    transition: color 200ms;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .title:hover {
    color: white;
  }

  .links {
    margin-left: 20px;
  }

  .link {
    margin-left: 15px;
    padding-top: 5px;
    height: ${navbarHeight};
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  a.link {
    color: #b5b5b5;
    text-decoration: none;
    transition: color 200ms;
  }

  a.link:hover {
    color: white;
  }

  .menu {
    display: none;
  }

  @media screen and (max-width: 750px) {
    .links, .link {
      display: none;
    }

    .flex-row {
      flex-direction: row-reverse;
    }

    .menu {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
  }
  `