import css from 'styled-jsx/css';
import theme from 'config/theme';

// language=CSS
export default css`
  body {
    font-size: ${theme.font.size};
    font-family: ${theme.font.family};
    color: ${theme.font.color};
  }

  .button,
  button,
  input[type="submit"],
  input[type="reset"],
  input[type="button"],
  input[type="email"],
  input[type="number"],
  input[type="search"],
  input[type="text"],
  input[type="tel"],
  input[type="url"],
  input[type="password"],
  textarea,
  select,
  code {
    border-radius: ${theme.button.borderRadius};
    transition: background-color 150ms ease-in, border-color 150ms ease-in;
    color: ${theme.colors.defaultTextColor};
    background-color: ${theme.colors.default};
    border-color: ${theme.colors.defaultBorder};
  }

  .modal {
    border-radius: ${theme.box.borderRadius};
    border: solid 1px ${theme.colors.defaultBorder};
  }
  
  .box {
    border-radius: ${theme.box.borderRadius};
    border: solid 1px ${theme.colors.defaultBorder};
    padding: 10px 20px;
    display: inline-block;
  }
  
  a {
    color: ${theme.colors.link};
    transition: color 150ms ease-in;
  }

  a:hover {
    color: ${theme.colors.linkHover};
  }
    
  .button:hover,
  button:hover,
  input[type="submit"]:hover,
  input[type="reset"]:hover,
  input[type="button"]:hover,
  .button:focus,
  button:focus,
  input[type="submit"]:focus,
  input[type="reset"]:focus,
  input[type="button"]:focus {
    color: ${theme.colors.defaultTextColorHover};
    border-color: ${theme.colors.defaultBorderHover};
  }
  
  .button.button-primary,
  button.button-primary,
  input[type="submit"].button-primary,
  input[type="reset"].button-primary,
  input[type="button"].button-primary {
    color: ${theme.colors.primaryTextColor};
    background-color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
  }
  
  .button.button-primary:hover,
  button.button-primary:hover,
  input[type="submit"].button-primary:hover,
  input[type="reset"].button-primary:hover,
  input[type="button"].button-primary:hover,
  .button.button-primary:focus,
  button.button-primary:focus,
  input[type="submit"].button-primary:focus,
  input[type="reset"].button-primary:focus,
  input[type="button"].button-primary:focus {
    color: ${theme.colors.primaryTextColor};
    background-color: ${theme.colors.primaryHover};
    border-color: ${theme.colors.primaryHover};
  }
  
`;
