import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createTopic, getListTopic } from "../../services/topicService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Topic.scss";

function Topic() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListTopic();
      setTopics(response);
    };
    fetchApi();
  }, []);

  const handleCreateTopic = () => {
    Swal.fire({
      title: "Nhập Tên Chủ Đề",
      input: "text",
      inputPlaceholder: "Nhập tên chủ đề...",
      showCancelButton: true,
      confirmButtonText: "Tạo",
      cancelButtonText: "Hủy",
      inputValidator: (value) => {
        if (!value) {
          return "Vui lòng nhập tên chủ đề!";
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await createTopic({ name: result.value });
        if (response) {
          navigate(`/create-topic/${response.id}`);
        } else {
          alert("Fail!");
        }
      }
    });
  };
  return (
    <>
      <div className="topic-list">
        <h2 className="topic-list__heading">Topic List</h2>
        {topics.length > 0 && (
          <table className="topic-list__table">
            <thead>
              <tr>
                <th className="topic-list__table-header">ID</th>
                <th className="topic-list__table-header">Topic Name</th>
                <th className="topic-list__table-header">Link</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((item) => (
                <tr key={item.id} className="topic-list__table-row">
                  <td className="topic-list__table-cell">{item.id}</td>
                  <td className="topic-list__table-cell">{item.name}</td>
                  <td className="topic-list__table-cell">
                    <Link to={"/quiz/" + item.id}>Take Quiz</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button
          className="btn-purple topic-list__create-button"
          onClick={handleCreateTopic}
        >
          Create New Topic
        </button>
      </div>
    </>
  );
}

export default Topic;
