import React from "react";
import PropTypes from "prop-types";

import OptionItem from "./OptionItem/OptionItem.jsx";

import options from "../../../data/options/options.jsx";

function Options({ onChangeOption }) {
   return (
      <div>
         {options.map((item) => (
            <OptionItem
               key={item.id}
               title={item.title}
               img={item.img}
               name={item.name}
               onChangeOption={onChangeOption}
            />
         ))}
      </div>
   );
}

Options.propTypes = {
   onChangeOption: PropTypes.func.isRequired,
};

export default Options;
