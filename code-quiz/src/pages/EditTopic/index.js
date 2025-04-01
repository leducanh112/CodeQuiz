import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic, deleteTopic } from "../../services/topicService";
import { createQuestion } from "../../services/questionService";
import Swal from "sweetalert2";
import "./CreateTopic.css";

function EditTopic() {
  const params = useParams();
  const { handleSubmit } = useForm();
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

  const [questions, setQuestions] = useState([
    { topicId: params.id, questions: "", answers: [""], correctAnswer: 0 },
  ]);

  const onSubmit = async () => {
    console.log("Dữ liệu gửi lên:", { questions });
    Swal.fire({
      title: "Updating...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const responses = await Promise.all(
        questions.map((question) => createQuestion(question))
      );
      const successCount = responses.filter(Boolean).length;
      console.log(successCount, questions.length);
      if (successCount === questions.length) {
        Swal.fire({
          title: "Success",
          icon: "success",
        }).then(() => {
          navigate("/topic");
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Update topic fail!",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Update topic fail!",
        icon: "error",
      });
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

  const handleDeleteTopic = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: "Deleting...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const response = await deleteTopic(params.id);
        if (response) {
          Swal.fire({
            title: "Deleted!",
            text: "Bạn đã xóa thành công",
            icon: "success",
          }).then(() => {
            navigate("/topic");
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Xóa thất bại, vui lòng thử lại!",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Xóa thất bại, vui lòng thử lại!",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Create Topic</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <h3>Topic: {topic}</h3>
        </div>

        {/* Lặp qua từng câu hỏi */}
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="question-container">
            <label>Question {qIndex + 1}:</label>
            <input
              type="text"
              placeholder="Input question"
              value={q.questions}
              required
              onChange={(e) =>
                handleInputChange(qIndex, null, e.target.value, "questions")
              }
            />

            {/* Lặp qua các đáp án */}
            <label>Answers:</label>
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
                  placeholder={`Answer ${aIndex + 1}`}
                  value={answer}
                  required
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
              + Add Answer
            </button>

            {/* Nút xóa câu hỏi */}
            {questions.length > 1 && (
              <button
                type="button"
                className="btn-delete-question"
                onClick={() => removeQuestion(qIndex)}
              >
                Delete Question
              </button>
            )}
          </div>
        ))}

        {/* Nút thêm câu hỏi */}
        <button type="button" className="btn-add" onClick={addQuestion}>
          + Add Question
        </button>
        <div className="button-group">
          {/* Nút lưu bộ câu hỏi */}
          <button type="submit" className="btn-purple">
            Save
          </button>
          {/* Nút xóa bộ câu hỏi */}
          <button type="button" className="btn-red" onClick={handleDeleteTopic}>
            Delete Topic
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTopic;
