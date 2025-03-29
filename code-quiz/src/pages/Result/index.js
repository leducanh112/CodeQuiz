import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAnswers } from "../../services/answersService";
import { getListQuestion } from "../../services/questionService";
import "./Result.css";

function Result() {
  const params = useParams();
  const [dataResult, setDataResult] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const dataAnswers = await getAnswers(params.id);
      const dataQuestions = await getListQuestion(dataAnswers.topicId);

      let resultFinal = [];
      for (let i = 0; i < dataQuestions.length; i++) {
        resultFinal.push({
          ...dataQuestions[i],
          ...dataAnswers.answers.find((item) => item.id === dataQuestions.id),
        });
      }
      console.log("result Final", resultFinal);
      setDataResult(resultFinal);
    };
    fetchApi();
  }, []);
  return (
    <>
      <h1>Kết quả</h1>
      <div className="result__list">
        {dataResult.map((item, index) => (
          <div className="result__item" key={item.id}>
            <p>
              Câu {index + 1}: {item.questions}
              {item.correctAnswer === item.answer ? (
                <span className="result__tag result__tag--true">Đúng</span>
              ) : (
                <span className="result__tag result__tag--false">Sai</span>
              )}
            </p>
            {item.answers.map((itemAns, indexAns) => {
              let className = "";
              let checked = false;
              if (item.answer === indexAns) {
                checked = true;
                className = " result__item--selected";
              }
              if (item.correctAnswer === indexAns) {
                className += " result__item--result";
              }

              return (
                <div className="result__answer" key={indexAns}>
                  <input type="radio" checked={checked} disabled></input>
                  <label>{itemAns}</label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default Result;
