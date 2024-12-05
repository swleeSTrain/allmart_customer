import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import {IQuestion} from "../../types/qna.ts";
import {fetchQuestionById} from "../../api/qnaAPi.ts";

const QnaDetailComponent = () => {
    const { qno } = useParams<{ qno: string }>();
    const [question, setQuestion] = useState<IQuestion | null>(null);

    useEffect(() => {
        if (qno) {
            fetchQuestionById(Number(qno)).then(setQuestion);
        }
    }, [qno]);

    if (!question) return <div>Loading...</div>;

    return (
        <div>
            <h1>{question.title}</h1>
            <p>{question.content}</p>
            <p>작성자: {question.writer}</p>
        </div>
    );
};

export default QnaDetailComponent;
