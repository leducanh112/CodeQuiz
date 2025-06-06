import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionService";
import { getCookie } from "../../helpers/cookie";
import { createAnswer } from "../../services/quizService";
import "./Quizz.scss";

function Quiz() {
  const params = useParams();
  const [dataTopic, setDataTopic] = useState();
  const [dataQuestions, setDataQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getTopic(params.id);
      console.log(params.id);
      setDataTopic(response);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListQuestion(params.id);
      setDataQuestions(response);
    };
    fetchApi(params.id);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let selectedAnswers = [];
    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].checked) {
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;
        selectedAnswers.push({
          questionId: parseInt(name),
          answer: parseInt(value),
        });
      }
    }
    let options = {
      userId: parseInt(getCookie("id")),
      topicId: params.id,
      answers: selectedAnswers,
    };
    const response = await createAnswer(options);
    if (response) {
      navigate(`/result/${response.id}`);
    }
    console.log(response);
  };

  // console.log("data", dataTopic);
  // console.log("dataQuestion", dataQuestions);
  return (
    <>
      <div className="quiz-page">
        <h2 className="quiz-page__heading">
          Topic name: {dataTopic && <>{dataTopic.name}</>}
        </h2>
        <div className="form-quiz">
          <form onSubmit={handleSubmit}>
            {dataQuestions.map((item, index) => (
              <div className="form-quiz__item" key={item.id}>
                <p className="form-quiz__question">
                  Question {index + 1}: {item.questions}
                </p>
                {item.answers.map((itemAns, indexAns) => (
                  <div className="form-quiz__answer" key={indexAns}>
                    <input
                      type="radio"
                      name={item.id}
                      value={indexAns}
                      id={`quiz-${item.id}-${indexAns}`}
                    ></input>
                    <label htmlFor={`quiz-${item.id}-${indexAns}`}>
                      {itemAns}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <div className="button-group">
              <button
                type="Submit"
                className="btn-purple form-quiz__submit-btn"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Quiz;
