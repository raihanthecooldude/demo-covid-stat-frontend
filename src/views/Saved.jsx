import { useState } from "react";
import { Link } from "react-router-dom";

const Saved = () => {
  const [saved, setSaved] = useState(() =>
    JSON.parse(localStorage.getItem("countryList"))
  );

  console.log(saved);

  return (
    <table>
      <thead>
        <tr>
          <td>Country</td>
        </tr>
      </thead>
      <tbody>
        {saved &&
          saved.map((country) => (
            <tr>
              <td>
                <Link to={`/country/${country.id}`}>{country.countryName}</Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Saved;
