import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAnswers } from "../../services/answersService";
import { getListQuestion } from "../../services/questionService";
import "./Result.css";

function Result() {
  const params = useParams();
  const [dataResult, setDataResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const dataAnswers = await getAnswers(params.id);
      const dataQuestions = await getListQuestion(dataAnswers.topicId);

      console.log("dataAnswers ", dataAnswers);
      console.log("dataQuestions ", dataQuestions);

      let resultFinal = [];
      for (let i = 0; i < dataQuestions.length; i++) {
        resultFinal.push({
          ...dataQuestions[i],
          ...dataAnswers.answers.find(
            (item) => item.questionId === dataQuestions[i].id
          ),
        });
      }
      console.log("result Final", resultFinal);
      setDataResult(resultFinal);
    };
    fetchApi();
  }, []);

  let countTrue = dataResult.reduce(
    (total, item) => total + (item.answer === item.correctAnswer ? 1 : 0),
    0
  );
  return (
    <>
      <div className="quiz-page">
        <h2>
          Kết quả {` `}
          <span className="result">
            {countTrue}/{dataResult.length}
          </span>
        </h2>
        <div className="form-quiz result__list">
          {dataResult.map((item, index) => (
            <div className="form-quiz__item result__item" key={item.id}>
              <p className="form-quiz__question result__question">
                Câu {index + 1}: {item.questions}
                {item.correctAnswer === item.answer ? (
                  <span className="result__tag result__tag--true">
                    <i class="bx bx-check"></i>
                  </span>
                ) : (
                  <span className="result__tag result__tag--false">
                    <i class="bx bx-x"></i>
                  </span>
                )}
              </p>
              {item.answers.map((itemAns, indexAns) => {
                let className = "";
                let checked = false;
                if (item.answer === indexAns) {
                  checked = true;
                  className = "result__item--selected";
                }
                if (item.correctAnswer === indexAns) {
                  className += " result__item--result";
                }

                return (
                  <div
                    className="form-quiz__answer result__answer"
                    key={indexAns}
                  >
                    <input type="radio" checked={checked} disabled></input>
                    <label className={className}>{itemAns}</label>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="button-group">
          {dataResult[0] && (
            <button
              className="btn-purple"
              onClick={() => navigate(`/quiz/${dataResult[0].topicId}`)}
            >
              Làm lại bài này
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Result;
