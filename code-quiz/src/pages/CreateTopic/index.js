import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { createQuestion } from "../../services/questionService";
import "./CreateTopic.css";

function CreateTopic() {
  const params = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const [topic, setTopic] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getTopic(params.id);
      if (response) {
        setTopic(response.name);
      }
    };
    fetchApi();
  }, []);

  const [questions, setQuestions] = useState([]);

  const onSubmit = async () => {
    console.log("Dữ liệu gửi lên:", { questions });

    const responses = await Promise.all(
      questions.map((question) => createQuestion(question))
    );
    const successCount = responses.filter(Boolean).length;
    console.log(successCount, questions.length);
    if (successCount == questions.length) {
      alert("Success");
      navigate("/topic");
    } else {
      alert("Fail!");
    }
  };

  // Thêm một câu hỏi mới
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { topicId: params.id, questions: "", answers: [""], correctAnswer: 0 },
    ]);
  };

  // Xóa một câu hỏi
  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  // Thêm đáp án vào câu hỏi
  const addAnswer = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers.push("");
    setQuestions(newQuestions);
  };

  // Xóa một đáp án
  const removeAnswer = (qIndex, aIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[qIndex].answers.length > 1) {
      newQuestions[qIndex].answers.splice(aIndex, 1);
      setQuestions(newQuestions);
    }
  };

  // Cập nhật nội dung câu hỏi hoặc đáp án
  const handleInputChange = (qIndex, aIndex, value, type) => {
    const newQuestions = [...questions];
    if (type === "questions") {
      newQuestions[qIndex].questions = value;
    } else {
      newQuestions[qIndex].answers[aIndex] = value;
    }
    setQuestions(newQuestions);
  };

  return (
    <div className="form-container">
      <h2>Tạo Bộ Câu Hỏi</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Nhập tên chủ đề */}
        <div className="form-group">
          <label>Tên Chủ Đề: {topic}</label>
        </div>

        {/* Lặp qua từng câu hỏi */}
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="question-container">
            <label>Câu hỏi {qIndex + 1}:</label>
            <input
              type="text"
              placeholder="Nhập câu hỏi"
              value={q.questions}
              onChange={(e) =>
                handleInputChange(qIndex, null, e.target.value, "questions")
              }
            />

            {/* Lặp qua các đáp án */}
            <label>Đáp án:</label>
            {q.answers.map((answer, aIndex) => (
              <div key={aIndex} className="answer-group">
                <input
                  type="radio"
                  name={`correctAnswer-${qIndex}`}
                  onChange={() => {
                    const newQuestions = [...questions];
                    newQuestions[qIndex].correctAnswer = aIndex;
                    setQuestions(newQuestions);
                  }}
                  checked={q.correctAnswer === aIndex}
                />
                <input
                  type="text"
                  placeholder={`Đáp án ${aIndex + 1}`}
                  value={answer}
                  onChange={(e) =>
                    handleInputChange(qIndex, aIndex, e.target.value, "answer")
                  }
                />
                {q.answers.length > 1 && (
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => removeAnswer(qIndex, aIndex)}
                  >
                    ✖
                  </button>
                )}
              </div>
            ))}

            {/* Nút thêm đáp án */}
            <button
              type="button"
              className="btn-add"
              onClick={() => addAnswer(qIndex)}
            >
              + Thêm Đáp Án
            </button>

            {/* Nút xóa câu hỏi */}
            {questions.length > 1 && (
              <button
                type="button"
                className="btn-delete-question"
                onClick={() => removeQuestion(qIndex)}
              >
                Xóa Câu Hỏi
              </button>
            )}
          </div>
        ))}

        {/* Nút thêm câu hỏi */}
        <button type="button" className="btn-add" onClick={addQuestion}>
          + Thêm Câu Hỏi
        </button>

        {/* Nút lưu bộ câu hỏi */}
        <button type="submit" className="btn-submit">
          Lưu Bộ Câu Hỏi
        </button>
        <button className="btn-delete-question">Xóa Bộ Câu Hỏi</button>
      </form>
    </div>
  );
}

export default CreateTopic;
