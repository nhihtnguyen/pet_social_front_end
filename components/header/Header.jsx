import Link from "next/link";
import { Navbar } from "react-bootstrap";
import { FiGithub, FiSearch, FiMessageCircle } from "react-icons/fi";
import styles from "./Header.module.scss";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Typeahead, Menu, MenuItem, TypeaheadMenu, Highlighter } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const options = [
  {
    label: 'Alakazam',
    property: ''
  },
  {
    label: 'Ralts',
    property: ''
  },
  {
    label: 'Lucario',
    property: ''
  },
]

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState([]);
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword != '' && keyword) {
      router.push(`/explore?search=${keyword}`);
    }
  }
  let timerid;
  return (
    <div
      className='nav-header bg-white shadow-xs border-0'
      style={{ zIndex: "1000" }}
    >
      <div className='nav-top'>
        <Link href='/'>
          <a>
            <span className='d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0'>
              <i className='display2-size me-3 ms-0'>
                <FiGithub />
              </i>
              Pet's Friend
            </span>
          </a>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className='float-left header-search ms-3'>
        <div className='form-group mb-0 icon-input'>
          <span className='font-sm text-grey-400' style={{ zIndex: 100 }}>
            <FiSearch />
          </span>
          {/*<input
            type='text'
            placeholder='Start typing to search..'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className='bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg'
          />*/}
          <Typeahead
            minLength={1}
            id="basic-typeahead-single"
            labelKey="label"
            onChange={(selected) => {
              setSelected(selected);
              if (selected) {
                setKeyword(selected[0]?.label);
              }
            }}
            options={options}
            placeholder="Start typing to search..."
            selected={selected}
            onInputChange={(text, e) => setKeyword(text)}
            onKeyDown={(e) => {
              // Submit the form when the user hits enter.
              if (e.key === 'Enter') {
                if (timerid) {
                  clearTimeout(timerid);
                }
                timerid = setTimeout(
                  () => {
                    handleSubmit(e)
                  },
                  300
                );
              }
            }}
            inputProps={{
              style: { zIndex: 99 },
              className: 'bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg'
            }}
            renderMenu={(results, menuProps, state) => (
              <Menu {...menuProps} style={{
                width: '100%',
                marginTop: 10,
                borderRadius: 30,
                zIndex: 98,
              }}
                className='bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg'
              >
                {results.map((result, index) => (

                  <MenuItem option={result} position={index} key={index}>
                    <Highlighter search={state.text}>
                      {result.label}
                    </Highlighter>
                  </MenuItem>
                ))}
              </Menu>
            )}

          />
        </div>
      </form >
    </div >
  );
};

export default Header;
