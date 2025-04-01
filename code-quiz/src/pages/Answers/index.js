import { useEffect, useState } from "react";
import { getAnswersByUserId } from "../../services/answersService";
import { getListTopic } from "../../services/topicService";
import { Link } from "react-router-dom";
import "../Topic/Topic.scss";

function Answers() {
  const [dataAnswers, setDataAnswers] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const answersByUserId = await getAnswersByUserId();
      const topics = await getListTopic();

      let result = [];
      for (let i = 0; i < answersByUserId.length; i++) {
        result.push({
          ...topics.find((item) => item.id == answersByUserId[i].topicId),
          ...answersByUserId[i],
        });
      }
      setDataAnswers(result.reverse());
    };
    fetchApi();
  }, []);
  console.log("dataanswer", dataAnswers);
  return (
    <>
      <div className="topic-list">
        <h2 className="topic-list__heading">Practiced Quiz List</h2>
        {dataAnswers.length > 0 && (
          <table className="topic-list__table">
            <thead>
              <tr>
                <th className="topic-list__table-header">ID</th>
                <th className="topic-list__table-header">Topic Name</th>
                <th className="topic-list__table-header">Details</th>
              </tr>
            </thead>
            <tbody>
              {dataAnswers.map((item) => (
                <tr key={item.id} className="topic-list__table-row">
                  <td className="topic-list__table-cell">{item.id}</td>
                  <td className="topic-list__table-cell">{item.name}</td>
                  <td className="topic-list__table-cell">
                    <Link to={"/result/" + item.id}>View Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Answers;
