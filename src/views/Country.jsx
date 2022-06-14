import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { client } from "../utils/api-client";

const Country = () => {
  const { id } = useParams();
  const { isSuccess, data: countryInfo } = useQuery({
    queryKey: ["countryInfo", id],
    queryFn: () =>
      client(`api/country/${id}`).then((data) => {
        return data;
      }),
  });

  return (
    <>
      <h1>{isSuccess && countryInfo[0].countryName.name}</h1>
      <table>
        <thead>
          <tr>
            <td>Month</td>
            <td>Infected</td>
            <td>Death</td>
            <td>Recovered</td>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            countryInfo.map((info) => (
              <tr key={info.id}>
                <td>{info.month}</td>
                <td>{info.infected}</td>
                <td>{info.dead}</td>
                <td>{info.recovered}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Country;
