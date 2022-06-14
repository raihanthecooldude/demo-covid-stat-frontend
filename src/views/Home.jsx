import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { client } from "../utils/api-client";

const Home = () => {
  const { isSuccess, data } = useQuery({
    queryKey: "countryInfoList",
    queryFn: () =>
      client("api/").then((data) => {
        return data;
      }),
  });

  const onSave = (id, countryName) => {
    let savedItem = localStorage.getItem("countryList");
    if (savedItem) {
      savedItem = JSON.parse(savedItem);
      const exist = savedItem.find((item) => item.id === id);
      //   console.log(exist);
      if (!exist) {
        localStorage.setItem(
          "countryList",
          JSON.stringify([{ id: id, countryName: countryName }, ...savedItem])
        );
      }
    } else {
      localStorage.setItem(
        "countryList",
        JSON.stringify([{ id: id, countryName: countryName }])
      );
    }
  };

  return (
    <>
      <table border="1">
        <thead>
          <tr>
            <td colSpan="5">
              <strong style={{ color: "red" }}>Alert: </strong>
              <b>
                {isSuccess &&
                  data.maxInfected &&
                  data.maxInfected.length &&
                  data.maxInfected[0].name}{" "}
              </b>
              is infected with Covid, don't go there.
            </td>
          </tr>
          <tr>
            <td>Country Name</td>
            <td>Total Infected</td>
            <td>Total Death</td>
            <td>Total Recovered</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            data.allInfo.map((country) => (
              <tr key={country.countryId}>
                <td>
                  <Link to={`/country/${country.countryId}`}>
                    {country.name}
                  </Link>
                </td>
                <td>{country.infected}</td>
                <td>{country.dead}</td>
                <td>{country.recovered}</td>
                <td>
                  <button
                    onClick={(e) => {
                      onSave(country.countryId, country.name);
                    }}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <Link to={`/saved`}>Saved Countries</Link>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default Home;
